import { Helmet } from "react-helmet-async";

const SITE_NAME = "ACE Travel Experiences";
const BASE_URL = "https://acetravel-8hr6bdkr.manus.space";
const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663269568751/8hr6bDKr3QeoLbGusjYq8K/og-ace-default-TvEkHkG6MnegbC6ZdNFBaG.png";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
