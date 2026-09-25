import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, getFullImageUrl } from '../utils/seoData';

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  schema = null,
  noindex = false,
}) {
  const finalTitle = title || 'CityCabs24 - Premium Cabs & Guided Sightseeing in Mumbai';
  const finalDesc = description || 'Book comfortable outstation & local cabs with expert drivers who act as tour guides in Mumbai. Doorstep pickup, transparent fares & 24/7 service.';
  const finalCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`) : SITE_URL;
  const finalImage = getFullImageUrl(ogImage || '/logo.png');

  // Format schema array or single object
  const schemaList = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Helmet>
      {/* Primary Page Title & Meta */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDesc} />

      {/* Crawl Control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={finalCanonical} />
      )}

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="CityCabs24" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {/* Structured Data (JSON-LD) */}
      {schemaList.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
