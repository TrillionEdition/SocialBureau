import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.socialbureau.in";

function normalizeAbsoluteUrl(value, fallback = SITE_URL) {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalizedPath}`;
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  url,
  canonicalUrl,
  noindex = false,
}) {
  const resolvedCanonicalUrl = normalizeAbsoluteUrl(canonicalUrl || url || "/");
  const resolvedPageUrl = normalizeAbsoluteUrl(url || canonicalUrl || "/");
  const resolvedImageUrl = normalizeAbsoluteUrl(image || "/assets/socialbureau.png");

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={resolvedCanonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImageUrl} />
      <meta property="og:url" content={resolvedPageUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImageUrl} />
    </Helmet>
  );
}

