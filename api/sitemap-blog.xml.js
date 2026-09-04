const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function escapeXml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  try {
    // Note: vercel.json's VITE_API_URL points at a suspended onrender backend;
    // the live site actually calls this nip.io backend, so don't fall back to VITE_API_URL.
    const BACKEND = process.env.API_URL || 'https://13.207.200.198.nip.io/socialbureau';

    // Fetch all published blogs live from the backend (no rebuild needed)
    const listUrl = `${BACKEND.replace(/\/$/, '')}/blog?limit=5000&published=true`;
    const response = await fetch(listUrl, { method: 'GET' });
    if (!response.ok) {
      console.error('Failed to fetch blogs for sitemap-blog:', response.statusText);
      return res.status(502).send('Bad Gateway');
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);

    const SITE = 'https://www.socialbureau.in';

    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    for (const post of items) {
      const rawSlug = (post.customUrl && post.customUrl.trim().length) ? post.customUrl.trim().replace(/^\//, '') : post.slug;
      if (!rawSlug) continue;
      const slugPart = encodeURI(rawSlug.replace(/\s+/g, '-'));
      const loc = `${SITE}/blogs/${slugPart}`;
      const lastmod = formatDate(post.updatedAt || post.publishedAt || post.createdAt);

      xml += '<url>';
      xml += `<loc>${escapeXml(loc)}</loc>`;
      xml += `<lastmod>${lastmod}</lastmod>`;
      xml += '<changefreq>weekly</changefreq>';
      xml += '<priority>0.8</priority>';
      xml += '</url>';
    }

    xml += '</urlset>';

    // Cache briefly at CDN so new blogs show up quickly without hammering the backend
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap-blog error', err);
    return res.status(500).send('Internal Server Error');
  }
}
