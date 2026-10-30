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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const BACKEND = (process.env.API_URL || 'https://api.socialbureau.in').replace(/\/$/, '');
    const response = await fetch(`${BACKEND}/socialbureau/blog/sitemap-data`, {
      method: 'GET',
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Upstream responded ${response.status}`);
    }

    const payload = await response.json();
    if (!payload?.success || !Array.isArray(payload.data)) {
      throw new Error('Unexpected sitemap-data response shape');
    }
    const items = payload.data;

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

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap-blog error', err);
    res.setHeader('Retry-After', '3600');
    return res.status(503).send('Service Unavailable');
  } finally {
    clearTimeout(timer);
  }
}
