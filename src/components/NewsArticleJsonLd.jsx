import React from 'react';
import { Helmet } from 'react-helmet-async';

function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function NewsArticleJsonLd({ post }) {
  if (!post) return null;

  const site = 'https://socialbureau.in';
  const slug = post.slug || (post.url && post.url.split('/').pop()) || '';
  const articleUrl = `${site}/blogs/${slug}`;
  const articlePath = slug || '';

  const headline = (post.seo && post.seo.title) || post.title || '';
  const description = (post.seo && post.seo.description) || post.excerpt || post.description || '';
  const datePublished = post.publishedAt || post.createdAt || post.date || null;
  const dateModified = post.updatedAt || post.modifiedAt || post.dateModified || datePublished;

  const authorName = post.authorName || (post.author && (post.author.name || post.authorName)) || 'SocialBureau';
  const authorSlug = post.authorSlug || (post.author && (post.author.slug || slugify(post.author.name))) || slugify(authorName);

  const newsArticle = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${site}/${articlePath}/#article`,
        'isPartOf': { '@type': 'WebPage', '@id': `${site}/${articlePath}/` },
        'headline': headline,
        'description': description,
        'datePublished': datePublished ? new Date(datePublished).toISOString() : undefined,
        'dateModified': dateModified ? new Date(dateModified).toISOString() : undefined,
        'mainEntityOfPage': `${site}/${articlePath}/`,
        'isAccessibleForFree': 'true',
        'author': {
          '@type': 'Person',
          'name': authorName,
          'url': `${site}/author/${authorSlug}/`
        },
        'publisher': { '@id': `${site}/#organization` }
      },
      {
        '@type': 'NewsMediaOrganization',
        '@id': `${site}/#organization`,
        'name': 'SocialBureau',
        'url': site,
        'logo': { '@type': 'ImageObject', 'url': `${site}/assets/logo.png` },
        'sameAs': [ 'https://www.linkedin.com/company/socialbureau' ],
        'correctionsPolicy': `${site}/editorial-standards`,
        'publishingPrinciples': `${site}/code-of-ethics`
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(newsArticle)}</script>
    </Helmet>
  );
}
