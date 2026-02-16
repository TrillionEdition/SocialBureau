export function generateBlogSchema(post) {
  if (!post) return null;

  const url = post.url || `https://www.socialbureau.in/blogs/${post.slug}`;

  const image = post.image || undefined;
  const datePublished = post.createdAt || post.time || undefined;
  const dateModified = post.updatedAt || post.modifiedAt || datePublished;

  const authorName = post.author || post.authorName || (post.authorObj && post.authorObj.name) || "Social Bureau";

  const keywords = Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords || undefined);

  const articleBody = (Array.isArray(post.content)
    ? post.content.map(s => (typeof s === 'string' ? s : s.text || '')).join('\n')
    : (post.content || '')
  ).replace(/<[^>]*>/g, '').trim();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": post.seo?.title || post.title,
    "description": post.seo?.description || post.excerpt,
    "image": image ? [image] : undefined,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Bureau",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.socialbureau.in/assets/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "keywords": keywords,
    "articleBody": articleBody ? articleBody.slice(0, 20000) : undefined
  };

  // Remove undefined values recursively
  function clean(obj) {
    if (Array.isArray(obj)) return obj.map(clean).filter(v => v !== undefined);
    if (obj && typeof obj === 'object') {
      const out = {};
      Object.keys(obj).forEach(k => {
        const v = clean(obj[k]);
        if (v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '')) out[k] = v;
      });
      return Object.keys(out).length ? out : undefined;
    }
    return obj;
  }

  return clean(schema);
}
