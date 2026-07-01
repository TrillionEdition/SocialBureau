import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black py-20 px-4 md:px-12 flex justify-center">
      <article className="relative w-full max-w-5xl border-4 border-[#ff0000] rounded-xl p-6 md:p-10 shadow-lg">

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-[#ff0000] hover:bg-[#ff0000] hover:text-white px-4 py-2 rounded-lg transition"
        >
          ← Back
        </button>

        <header className="mb-10 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ff0000]">
            Terms of Service 
          </h1>

          <p className="mt-3 text-gray-400">
            <strong>Effective Date:</strong> July 1, 2026
          </p>
        </header>

        <div className="space-y-10 text-white leading-8 text-justify max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">

          {/* Section 1 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              1. Acceptance of Terms & Institutional Entity
            </h2>

            <p>
              Welcome to <strong>SocialBureau (socialbureau.in)</strong>.
              This website, together with its associated subdomains,
              applications, Web3 analytical tools, subscription services,
              digital news distribution platforms, and related products
              (collectively referred to as the <strong>"Services"</strong>)
              is owned and operated by SocialBureau.
            </p>

            <p className="mt-4">
              By accessing, browsing, interacting with, registering for, or
              subscribing to our Services, you acknowledge that you have read,
              understood, and agree to be legally bound by these Terms of
              Service, all applicable laws, and any relevant governmental or
              regulatory requirements.
            </p>

            <p className="mt-4">
              If you do not agree with any provision contained within these
              Terms, you must immediately discontinue use of the Services.
            </p>
          </section>

          {/* Section 2 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              2. Jurisdiction, Statutory Alignment & Global Digital Media Compliance
            </h2>

            <p>
              SocialBureau operates as a digital publisher delivering
              journalism, technology reporting, industry analysis,
              market intelligence, and digital media services.
            </p>

            <div className="mt-5 space-y-5">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Indian Jurisdiction
                </h3>

                <p className="mt-2">
                  Users accessing the Services from India are governed by
                  applicable Indian laws, including the Information Technology
                  Act, 2000 and the Information Technology (Intermediary
                  Guidelines and Digital Media Ethics Code) Rules, 2021, together
                  with any subsequent amendments or regulations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Global Compliance
                </h3>

                <p className="mt-2">
                  For international users, SocialBureau aligns its operational
                  practices with globally recognized digital publishing,
                  privacy, transparency, and media compliance principles,
                  including regulatory expectations within the European Union,
                  the United Kingdom, and the United States where applicable.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              3. Intellectual Property, Licensing & Automated Scraping
            </h2>

            <p>
              All original content published by SocialBureau—including but not
              limited to articles, editorials, research, software code,
              interface designs, graphics, videos, databases, APIs,
              market intelligence, Web3 analytics, and proprietary digital
              assets—is protected by applicable copyright, trademark,
              intellectual property, and international legal frameworks.
            </p>

            <p className="mt-4">
              Users receive a limited, revocable, non-exclusive,
              non-transferable license to access and view our content solely
              for lawful personal and non-commercial purposes.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">
              Automated Scraping Prohibition
            </h3>

            <p className="mt-2">
              The use of bots, crawlers, automated scripts, scraping software,
              data extraction systems, AI harvesting tools, or similar
              technologies for collecting articles, databases, news archives,
              source code, metadata, or proprietary platform information is
              strictly prohibited without prior written authorization from
              SocialBureau.
            </p>

            <p className="mt-4">
              This restriction expressly includes unauthorized use of our
              proprietary content for commercial redistribution or the training,
              fine-tuning, or development of commercial Artificial Intelligence
              systems or Large Language Models (LLMs).
            </p>
          </section>

          {/* Section 4 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              4. Reader Accounts, Monetization & Reader Revenue Manager
            </h2>

            <p>
              SocialBureau may utilize reader engagement technologies including
              newsletters, subscriptions, premium memberships, contribution
              systems, and Google Reader Revenue Manager or similar services to
              facilitate user registration and premium content access.
            </p>

            <div className="mt-5 space-y-5">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Account Security
                </h3>

                <p className="mt-2">
                  Users are solely responsible for maintaining the
                  confidentiality of their account credentials and for all
                  activities occurring under their accounts. Accurate and
                  truthful registration information must always be provided.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Subscription Architecture
                </h3>

                <p className="mt-2">
                  Subscription payments, memberships, donations, and recurring
                  billing are processed securely through certified third-party
                  payment providers. SocialBureau does not store raw credit card
                  information or banking credentials within its internal
                  infrastructure.
                </p>

                <p className="mt-3">
                  Unless otherwise stated, subscriptions automatically renew
                  until cancelled through the applicable user portal or payment
                  provider.
                </p>
              </div>

            </div>
          </section>

          {/* Section 5 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              5. Disclaimers & Limitation of Liability
            </h2>

            <p>
              SocialBureau publishes journalism, software engineering
              insights, technology reporting, Web3 analysis, cybersecurity
              research, and macroeconomic commentary intended solely for
              informational and educational purposes.
            </p>

            <p className="mt-4">
              Nothing published on this platform constitutes financial,
              investment, accounting, taxation, legal, cybersecurity,
              cryptocurrency, or professional advisory services.
            </p>

            <p className="mt-4">
              All Services are provided on an <strong>"AS IS"</strong> and
              <strong> "AS AVAILABLE"</strong> basis without warranties of any
              kind, whether express or implied.
            </p>

            <p className="mt-4">
              To the maximum extent permitted by applicable law,
              SocialBureau, its directors, employees, contractors,
              affiliates, publishers, and technology partners shall not be
              liable for any direct, indirect, incidental, special,
              consequential, punitive, or economic damages arising from your
              reliance upon, or inability to access, the Services, including
              but not limited to financial losses, investment decisions,
              business interruption, data loss, or asset valuation changes.
            </p>
          </section>

        </div>
      </article>
    </main>
  );
};

export default TermsOfService;