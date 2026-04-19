/**
 * JsonLd — injects a JSON-LD <script> tag into the document <head>.
 * Usage: <JsonLd schema={schemaObject} />
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

// ─── Site-wide constants ──────────────────────────────────────────────────────
const SITE_URL = "https://acetravelexperiences.com";
const SITE_NAME = "ACE Travel Experiences";
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663269568751/ace-logo.png";

// ─── Organisation schema ─────────────────────────────────────────────────────
/**
 * Used on every page via App.tsx.
 * Tells Google who ACE Travel Experiences is — name, URL, logo, social profiles,
 * contact point, and that it is a TravelAgency.
 */
export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "TravelAgency"],
    "@id": `${SITE_URL}/#organisation`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 200,
      height: 60,
    },
    description:
      "ACE Travel Experiences organises small-group adventure tours for 18–35 year olds to Thailand, Bali, and the Philippines. £60 deposit, expert trip managers, unforgettable experiences.",
    foundingDate: "2020",
    areaServed: ["Thailand", "Bali", "Philippines"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@acetravelexperiences.com",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.instagram.com/acetravelexperiences",
      "https://www.tiktok.com/@acetravelexperiences",
      "https://www.facebook.com/acetravelexperiences",
    ],
  };
}

// ─── WebSite schema (enables Sitelinks Search Box) ───────────────────────────
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organisation` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tours?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── TouristTrip / TourPackage schema ────────────────────────────────────────
/**
 * Used on individual tour detail pages.
 * Combines TouristTrip (itinerary) with Product (for AggregateRating + Offer).
 */
export function tourSchema(tour: {
  name: string;
  slug: string;
  description: string;
  destination: string;
  duration: string;
  price: string;
  deposit: string;
  heroImage: string;
  rating: string | number;
  reviews: number;
  highlights?: Array<string | { title: string; description?: string }>;
  departureDates?: Array<{ date: string; price: string }>;
}) {
  const numericPrice = parseFloat(String(tour.price).replace(/[^0-9.]/g, "")) || 0;
  const numericRating = parseFloat(String(tour.rating)) || 4.9;
  const tourUrl = `${SITE_URL}/tour/${tour.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${tourUrl}#trip`,
    name: tour.name,
    description: tour.description,
    url: tourUrl,
    image: tour.heroImage,
    touristType: {
      "@type": "Audience",
      audienceType: "Young Adults (18–35)",
    },
    itinerary: {
      "@type": "ItemList",
      name: `${tour.name} Itinerary`,
      description: `${tour.duration} itinerary visiting ${tour.destination}`,
    },
    offers: {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: tourUrl,
      seller: { "@id": `${SITE_URL}/#organisation` },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: numericRating,
      reviewCount: tour.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    provider: { "@id": `${SITE_URL}/#organisation` },
  };
}

// ─── Individual Review schema ─────────────────────────────────────────────────
export function reviewSchema(review: {
  authorName: string;
  rating: number;
  reviewText: string;
  reviewDate?: string | null;
  tourName?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.authorName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewText,
    ...(review.reviewDate ? { datePublished: review.reviewDate } : {}),
    ...(review.tourName
      ? { itemReviewed: { "@type": "TouristTrip", name: review.tourName } }
      : { itemReviewed: { "@id": `${SITE_URL}/#organisation` } }),
  };
}

// ─── FAQPage schema ───────────────────────────────────────────────────────────
export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────────
export function breadcrumbSchema(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

// ─── WebPage schema (for meta/SEO on standard pages) ─────────────────────────
export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(opts.breadcrumbs ? { breadcrumb: breadcrumbSchema(opts.breadcrumbs) } : {}),
  };
}
