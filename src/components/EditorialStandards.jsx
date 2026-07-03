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
            Welcome to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> (socialbureau.in). We are committed to delivering accurate, unbiased, and timely news, analysis, and insights. Our editorial process is governed by strict professional journalistic standards. All articles published on <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> are rigorously fact-checked prior to publication.
          </p>
          <p>
            We rely primarily on original sources, primary public data, official press announcements, and direct statements from verified industry experts. Secondary sources are always cited and clearly hyperlinked. We utilize advanced technological tools, including AI-assisted workflows, to streamline data gathering, research, and initial drafting. However, no article is published purely through automation.
          </p>
          <p>
            Every story undergoes thorough human oversight, substantive expert editing, and fact-checked by a named editorial professional before release. We strive for absolute accuracy. When a factual error occurs, we correct it promptly and transparently. A 'Correction Note' is appended to the article explicitly explaining what was changed. Readers can report errors directly to <a href="mailto:info@socialbureau.in" className="text-blue-600">info@socialbureau.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
