import React from "react";
import Seo from "./Seo";

export default function CodeOfEthics() {
  return (
    <div className="min-h-screen bg-white text-black py-20 px-4 sm:px-6">
      <Seo
        title="Code of Ethics | SocialBureau"
        description="Our code of ethics and editorial independence policy."
        canonicalUrl="https://www.socialbureau.in/code-of-ethics"
        url="https://www.socialbureau.in/code-of-ethics"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Code of Ethics</h1>

        <div className="prose max-w-none text-gray-800">
          <p>
            SocialBureau operates with complete editorial independence. Our news coverage is driven solely by public interest and market relevance. We enforce a strict separation between our independent editorial team and commercial advertising/sponsored partnerships.
          </p>
          <p>
            We explicitly prohibit 'pay-for-coverage' models disguised as standard news. Any material support, affiliate interests, brand sponsorships, or native advertising will be explicitly disclosed to the reader with visible 'Sponsored' or 'Advertisement' labels in full compliance with Google News transparency guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
