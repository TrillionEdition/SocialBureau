const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function escapeXml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req, res) {
  try {
    const BACKEND = process.env.API_URL || process.env.VITE_API_URL || 'http://localhost:5000';

    // Fetch up to 1000 latest published blogs from backend and filter by 48 hours
    const listUrl = `${BACKEND.replace(/\/$/, '')}/blog?limit=1000&published=true`;
    const response = await fetch(listUrl, { method: 'GET' });
    if (!response.ok) {
      console.error('Failed to fetch blogs for sitemap-news:', response.statusText);
      return res.status(502).send('Bad Gateway');
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);

    const now = Date.now();
    const cutoff = now - 48 * 60 * 60 * 1000; // 48 hours in ms

    const recent = items.filter((b) => {
      const d = new Date(b.publishedAt || b.createdAt || b.created_at || b.createdAt || null);
      if (!d || isNaN(d.getTime())) return false;
      return d.getTime() >= cutoff;
    }).slice(0, 1000);

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">';

    const SITE = 'https://socialbureau.in';

    for (const post of recent) {
      const slug = post.slug || post._id || '';
      const loc = `${SITE.replace(/\/$/, '')}/blogs/${slug}/`;
      const pubDate = new Date(post.publishedAt || post.createdAt || post.created_at || null);
      const title = post.title || post.seo?.title || '';

      xml += '<url>';
      xml += `<loc>${escapeXml(loc)}</loc>`;
      xml += '<news:news>';
      xml += '<news:publication>';
      xml += '<news:name>SocialBureau</news:name>';
      xml += '<news:language>en</news:language>';
      xml += '</news:publication>';
      xml += `<news:publication_date>${escapeXml(pubDate.toISOString())}</news:publication_date>`;
      xml += `<news:title>${escapeXml(title)}</news:title>`;
      xml += '</news:news>';
      xml += '</url>';
    }

    xml += '</urlset>';

    // Cache briefly at CDN
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap-news error', err);
    return res.status(500).send('Internal Server Error');
  }
}
