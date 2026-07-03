import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy & Global Data Fiduciary Compliance | SocialBureau</title>

        <meta
          name="description"
          content="Read SocialBureau's Privacy Policy covering GDPR, DPDP Act 2023, CCPA/CPRA compliance, data collection, cookies, user rights, cloud infrastructure, and data protection."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://socialbureau.in/privacy-policy" />

        <meta property="og:title" content="Privacy Policy | SocialBureau" />

        <meta property="og:description" content="Privacy Policy & Global Data Fiduciary Compliance." />

        <meta property="og:url" content="https://socialbureau.in/privacy-policy" />

        <meta property="og:type" content="website" />
      </Helmet>

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
            Privacy Policy & Global Data Fiduciary Compliance
          </h1>

          <p className="mt-3 text-gray-400">
            <strong>Effective Date:</strong> July 1, 2026
          </p>
        </header>

        <div className="space-y-10 text-white leading-8 text-justify max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">

          {/* Section 1 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              1. Commitment to Global Privacy Architectures
            </h2>

            <p>
              At <strong>SocialBureau (socialbureau.in)</strong>, we recognize
              our responsibility as a trusted data fiduciary. This Privacy
              Policy explains how we collect, process, store, secure, and
              protect personal information while providing our digital news,
              subscription, and platform services.
            </p>

            <p className="mt-4">
              Our privacy framework is designed to align with internationally
              recognized data protection standards, including:
            </p>

            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>
                & DPDP Rules 2025 (Government of India)
              </li>

              <li>
                <strong>General Data Protection Regulation (GDPR)</strong>
                (Regulation (EU) 2016/679)
              </li>

              <li>
                <strong>California Consumer Privacy Act (CCPA)</strong> &
                California Privacy Rights Act (CPRA)
              </li>
            </ul>
          </section>

          {/* Section 2 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-6">
              2. Itemized Personal Data Processing Framework
            </h2>

            <p className="mb-6">
              We collect only the minimum amount of information required to
              provide secure authentication, deliver news content, process
              subscriptions, and improve our platform.
            </p>

            <div className="overflow-x-auto rounded-lg border border-neutral-700">
              <table className="min-w-full border-collapse text-left">
                <thead className="bg-[#111111]">
                  <tr>
                    <th className="border border-neutral-700 px-4 py-3 text-[#ff0000]">
                      Data Category
                    </th>

                    <th className="border border-neutral-700 px-4 py-3 text-[#ff0000]">
                      Specific Data Collected
                    </th>

                    <th className="border border-neutral-700 px-4 py-3 text-[#ff0000]">
                      Lawful Basis
                    </th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td className="border border-neutral-700 px-4 py-4">
                      Identity & Profile Data
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Full Name, Verified Email Address, Username
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      User Consent / Contract Performance
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-neutral-700 px-4 py-4">
                      Telemetry & Device Data
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Anonymized IP Address, Browser Information,
                      Device Type, Operating System, Referral URL
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Legitimate Interest
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-neutral-700 px-4 py-4">
                      Interaction Metrics
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Reading History, Time on Articles,
                      Newsletter Engagement
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Legitimate Interest
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-neutral-700 px-4 py-4">
                      Transaction Identifiers
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Payment Confirmation Tokens
                      (No raw banking or card details)
                    </td>

                    <td className="border border-neutral-700 px-4 py-4">
                      Performance of a Contract
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              3. Notice, Consent Mechanism & Right to Withdraw
            </h2>

            <p>
              Consent is obtained through clear affirmative action and is
              provided freely, specifically, knowingly, and without coercion.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6">
              Right to Withdraw
            </h3>

            <p className="mt-3">
              Users may review, update, restrict, or withdraw consent for
              personal data processing at any time. Requests for account
              deletion or data erasure may be initiated through the user
              account settings or by contacting our privacy team at
              <span className="text-[#ff0000]">
                {" "}info@socialbureau.in
              </span>.
            </p>
          </section>

          {/* Section 4 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              4. Third-Party Data Integrations & Cloud Infrastructure
            </h2>

            <p>
              To deliver reliable performance and secure digital services,
              SocialBureau utilizes trusted cloud infrastructure partners.
            </p>

            <div className="mt-6 space-y-5">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Frontend Infrastructure
                </h3>

                <p className="mt-2">
                  Rendered through Vercel Edge infrastructure to optimize
                  global content delivery and latency.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Backend Infrastructure
                </h3>

                <p className="mt-2">
                  Hosted securely within regional Amazon Web Services (AWS)
                  environments utilizing encrypted storage, encrypted
                  transmission, and enterprise security controls.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Enterprise Services
                </h3>

                <p className="mt-2">
                  Subscription management and reader engagement features may
                  utilize Google Reader Revenue Manager. Identity verification
                  and payment processing are managed by Google's secure
                  infrastructure in accordance with Google's applicable privacy
                  standards.
                </p>

                <p className="mt-3">
                  SocialBureau does not sell, rent, lease, or distribute
                  personal information to third-party advertisers, marketing
                  brokers, or external data marketplaces.
                </p>
              </div>

            </div>
          </section>

          {/* Section 5 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              5. Children's Data Protection Standard
            </h2>

            <p>
              Consistent with applicable international privacy regulations and
              Section 9 of the Indian Digital Personal Data Protection Act,
              SocialBureau does not knowingly collect or process personal data
              belonging to individuals under the age of 18 without verifiable
              parental or legal guardian consent.
            </p>

            <p className="mt-4">
              We do not intentionally perform behavioral profiling, targeted
              advertising, or tracking activities directed toward children.
              Where unauthorized collection is identified, such information
              will be promptly removed from our production systems.
            </p>
          </section>

          {/* Section 6 */}

          <section>
            <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">
              6. Data Protection Officer (DPO)
            </h2>

            <p>
              For requests regarding data portability, correction, deletion,
              privacy rights, or security concerns, please contact our
              designated Data Protection Officer.
            </p>

            <div className="mt-6 bg-neutral-900 border border-neutral-700 rounded-lg p-6">

              <p>
                <strong>Designated DPO</strong>
              </p>

              <p className="mt-2">
                Privacy & Data Compliance Division
              </p>

              <p>SocialBureau</p>

              <p className="mt-4">
                <strong>Email:</strong>{" "}
                <span className="text-[#ff0000]">
                  info@socialbureau.in
                </span>
              </p>

            </div>
          </section>

        </div>
      </article>
    </main>
    </>
  );
};

export default PrivacyPolicy;