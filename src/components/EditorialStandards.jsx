import React from "react";
import Seo from "./Seo";

export default function EditorialStandards() {
  return (
    <div className="min-h-screen bg-white text-black py-20 px-4 sm:px-6">
      <Seo
        title="Editorial Standards | SocialBureau"
        description="Our editorial standards and fact-checking policies at SocialBureau."
        canonicalUrl="https://www.socialbureau.in/editorial-standards"
        url="https://www.socialbureau.in/editorial-standards"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Editorial Standards</h1>

        <div className="prose max-w-none text-gray-800">
          <p>
            SocialBureau publishes articles and practical information about marketing,
            technology, and related business topics. This page explains the standards
            readers can expect; it is not a claim that every article has been
            independently fact-checked or reviewed by a named specialist.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Authorship and sources</h2>
          <p>
            Article pages may show an author, publication date, category, and links
            to supporting material. Check the article itself for those details.
            Where an article makes a claim that needs context or a source, readers
            should be able to identify that source from the article rather than
            relying on an unsupported assertion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Corrections and updates</h2>
          <p>
            If you find a factual error, outdated information, or a broken source
            link, email{" "}
            <a href="mailto:info@socialbureau.in" className="text-blue-600 underline">
              info@socialbureau.in
            </a>{" "}
            and include the article URL and the relevant passage. We will review
            the report and, if a correction is made, explain the material change
            on the article where appropriate.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Opinions and assistance tools</h2>
          <p>
            Commentary and opinion should be understood as the view expressed by
            its author, not as a guarantee of results or professional advice.
            Automated tools may assist research or drafting, but tool output is
            not itself evidence. Readers should verify time-sensitive claims
            against the original sources linked in the article.
          </p>
        </div>
      </div>
    </div>
  );
}
