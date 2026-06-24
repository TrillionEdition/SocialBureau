function clean(obj) {
  if (Array.isArray(obj)) return obj.map(clean).filter((v) => v !== undefined);
  if (obj && typeof obj === 'object') {
    const out = {};
    Object.keys(obj).forEach((k) => {
      const v = clean(obj[k]);
      if (v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '')) out[k] = v;
    });
    return Object.keys(out).length ? out : undefined;
  }
  return obj;
}

const SITE_URL = 'https://socialbureau.in';

export function generateHomepageSchemas({
  name = 'Social Bureau',
  url = SITE_URL,
  logo = `${SITE_URL}/assets/logo.png`,
  telephone,
  address = {
    streetAddress: undefined,
    addressLocality: 'Kochi',
    addressRegion: 'Kerala',
    addressCountry: 'India',
    postalCode: undefined,
  },
  businessType = 'Digital Marketing Agency',
} = {}) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
  };

  const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService", // Better for a marketing agency
  name,
  image: logo,
  "@id": url,
  url,
  telephone: "+918714952665",
  priceRange: "$$",

  address: {
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  },

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+918714952665",
      contactType: "customer support",
    },
  ],

  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return clean([org, localBusiness, website]);
}

export function generateBlogPostingSchema(post = {}) {
  if (!post) return null;
  const url = post.url || `${SITE_URL}/blogs/${post.slug || post._id}`;
  const image = post.image || post.featuredImage || undefined;
  const datePublished = post.publishedAt || post.createdAt ? new Date(post.publishedAt || post.createdAt).toISOString() : undefined;
  const dateModified = post.updatedAt ? new Date(post.updatedAt).toISOString() : datePublished;
  const authorName = post.authorName || (post.author && post.author.name) || (post.authorObj && post.authorObj.name) || 'Social Bureau';
  const headline = (post.seo && post.seo.title) || post.title || undefined;
  const description = (post.seo && post.seo.description) || post.excerpt || post.description || undefined;

  const articleBody = (Array.isArray(post.content)
    ? post.content.map((s) => (typeof s === 'string' ? s : s.text || '')).join('\n')
    : post.content || post.body || '')
    .replace(/<[^>]*>/g, '')
    .trim();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image: image ? [image] : undefined,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Social Bureau',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo.png`,
      },
    },
    datePublished,
    dateModified,
    articleBody: articleBody ? articleBody.slice(0, 20000) : undefined,
  };

  return clean(schema);
}

export function generateServiceSchema(service = {}, breadcrumbs = []) {
  const url = service.url || `${SITE_URL}/services/${encodeURIComponent(service.slug || service.title || '')}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title || service.name,
    description: service.meta?.description || service.description || undefined,
    serviceType: service.title || undefined,
    provider: {
      '@type': 'Organization',
      name: 'Social Bureau',
      url: SITE_URL,
    },
    url,
  };

  const breadcrumb = breadcrumbs && breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      }
    : undefined;

  return clean([serviceSchema, breadcrumb]);
}

export default { generateHomepageSchemas, generateBlogPostingSchema, generateServiceSchema };

