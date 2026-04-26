import React from 'react';

export default function SchemaMarkup({ data }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>{payload.map((d, i) => (
      <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
    ))}</>
  );
}

