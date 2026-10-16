import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | SocialBureau YouTube Automation</title>
        <meta
          name="description"
          content="Learn how SocialBureau handles personal information and Google/YouTube data for its campaign analytics services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://socialbureau.in/privacy-policy" />
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-gray-400">
              <strong>Effective Date:</strong> October 16, 2026
            </p>
            <p className="mt-3 text-gray-300">
              This policy explains how SocialBureau collects, uses, stores, and
              protects information when you visit our website or use SocialBureau
              YouTube Automation and Campaign Analytics.
            </p>
          </header>

          <div className="space-y-10 text-white leading-8 text-justify pr-2 custom-scrollbar">
            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">1. Who We Are and Scope</h2>
              <p>
                “SocialBureau,” “we,” “us,” and “our” refer to the operator of
                socialbureau.in and the SocialBureau campaign portal. This policy
                applies to our website, campaign services, and YouTube analytics
                features (collectively, the “Services”).
              </p>
              <p className="mt-4">
                SocialBureau provides campaign services to clients. When a client
                connects a YouTube channel, the portal may access information made
                available through Google APIs within the permissions that client
                grants. You remain responsible for ensuring that you are authorised
                to connect the channel and permit the requested access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">2. Information We May Collect</h2>
              <ul className="list-disc list-inside space-y-3">
                <li><strong>Contact and account information:</strong> name, email address, account identifiers, and information you provide when working with SocialBureau.</li>
                <li><strong>Campaign information:</strong> campaign names, instructions, campaign status, reporting preferences, and related communications.</li>
                <li><strong>YouTube and Google data:</strong> channel identifiers and names, video identifiers and metadata, and analytics metrics available through the Google/YouTube APIs that you authorise, such as views, watch time, and other supported report dimensions or metrics.</li>
                <li><strong>Authentication data:</strong> OAuth access and refresh tokens or related credential data needed to maintain the connection, subject to the application's implementation. We do not ask you to send your Google password to SocialBureau.</li>
                <li><strong>Technical and usage data:</strong> browser/device information, IP address, timestamps, diagnostic logs, and interactions with the Services where collected for security, troubleshooting, and operation.</li>
                <li><strong>Payment and business records:</strong> transaction references, invoices, and payment status where relevant. Payment providers may process payment details under their own policies.</li>
              </ul>
              <p className="mt-4">
                The exact data available depends on the features used, the API
                permissions granted, the connected channel, and Google's own
                availability and reporting rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">3. How We Use Information</h2>
              <p>We may use information to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>provide campaign management, analytics, reporting, and client support;</li>
                <li>authenticate a user and maintain a YouTube connection the user has requested;</li>
                <li>retrieve and display authorised channel or video analytics and prepare campaign reports;</li>
                <li>secure, maintain, troubleshoot, and improve the Services;</li>
                <li>communicate about campaigns, account access, service changes, invoices, or support requests; and</li>
                <li>comply with legal obligations and enforce our agreements.</li>
              </ul>
              <p className="mt-4">
                We do not use Google API data to determine creditworthiness or for
                unrelated advertising profiling. We do not sell Google user data.
                We do not use Google user data to develop, improve, or train
                generalised AI or machine-learning models.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">4. Google API Services and YouTube Data</h2>
              <p>
                If you connect a Google account or YouTube channel, Google will
                display an authorisation screen describing the requested access.
                You can decline the request. If you approve it, we access only the
                data permitted by the granted scopes and applicable API rules.
              </p>
              <p className="mt-4">
                Our use and transfer of information received from Google APIs will
                comply with the Google API Services User Data Policy, including its
                Limited Use requirements. We use this data to provide the user-facing
                features you request, such as channel connection and campaign
                analytics, and for security, legal compliance, and service support
                as permitted by that policy. We do not sell Google API data or use
                it for personalised advertising.
              </p>
              <p className="mt-4">
                YouTube data may be subject to additional Google or YouTube terms
                and policies. Google operates its own services and is responsible
                for its own processing under its policies. SocialBureau is not
                affiliated with or endorsed by Google or YouTube.
              </p>
              <p className="mt-4">
                Google privacy information: <a className="text-[#ff0000] underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.
                YouTube API rules: <a className="text-[#ff0000] underline" href="https://developers.google.com/youtube/terms/api-services-terms-of-service" target="_blank" rel="noreferrer">YouTube API Services Terms of Service</a>.
                Google API data policy: <a className="text-[#ff0000] underline" href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">5. Sharing and Service Providers</h2>
              <p>
                We may share information with service providers that help us host,
                secure, operate, or support the Services; with payment providers
                where needed to process transactions; when you direct us to share
                information; or when disclosure is required by law. Service providers
                should receive only information reasonably needed for their task and
                are expected to protect it under applicable agreements and law.
              </p>
              <p className="mt-4">
                We do not sell personal information or Google API data. We do not
                disclose Google API data to third parties except as necessary to
                provide the requested service, for security or legal purposes, or
                as otherwise permitted by Google's applicable policies and law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">6. Storage, Security, and Retention</h2>
              <p>
                We use reasonable administrative, technical, and organisational
                safeguards designed to protect information against unauthorised
                access, loss, misuse, alteration, or disclosure. No system or method
                of transmission can be guaranteed to be completely secure.
              </p>
              <p className="mt-4">
                We retain information only for as long as reasonably necessary for
                the purposes described in this policy, including providing the
                Services, maintaining campaign records, resolving disputes, meeting
                legal obligations, and enforcing agreements. Retention periods may
                vary by data type and operational requirements.
              </p>
              <p className="mt-4">
                Access tokens, refresh tokens, and other credentials must be handled
                as confidential secrets. Where OAuth tokens are stored by the
                application, their storage and encryption depend on the security
                controls implemented in the deployed system. Do not treat this policy
                as a substitute for verifying that encryption, access controls,
                logging restrictions, and secret management are enabled in production.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">7. Disconnecting YouTube and Deleting Data</h2>
              <p>
                You may stop future access by disconnecting your YouTube account
                through the portal, if that feature is available, or by revoking
                SocialBureau's access through your Google Account's third-party
                connections page. Revocation may prevent analytics features from
                working until you reconnect the account.
              </p>
              <p className="mt-4">
                To request deletion of data associated with your SocialBureau account
                or connected YouTube channel, email <a className="text-[#ff0000] underline" href="mailto:info@socialbureau.in">info@socialbureau.in</a> from
                your registered email address and describe the account or channel
                involved. We may ask for reasonable information to verify the request.
                We will process eligible requests in accordance with applicable law
                and Google's API requirements. Some records may be retained where
                legally required or necessary to resolve disputes, prevent fraud,
                or maintain security; retained data will be handled as required by law.
              </p>
              <p className="mt-4">
                Revoking Google access and deleting information already stored by
                SocialBureau are separate actions. Contact us if you need both actions
                completed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">8. Cookies and Technical Logs</h2>
              <p>
                The Services may use essential cookies, session storage, or similar
                technologies to support authentication, security, preferences, and
                core functionality. Server and security logs may be used to detect
                abuse, diagnose errors, and protect the Services. If analytics or
                optional tracking technologies are added, this policy and any required
                consent controls should be updated to describe them accurately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">9. Your Choices and Privacy Rights</h2>
              <p>
                Depending on your location and applicable law, you may have rights to
                request access to, correction of, deletion of, or a copy of personal
                information, or to withdraw consent or object to certain processing.
                You may exercise applicable rights by contacting info@socialbureau.in.
                We will review and respond to requests as required by applicable law.
              </p>
              <p className="mt-4">
                If you are in India, processing and rights are subject to applicable
                Indian data-protection law as in force and applicable to the Services.
                Rights available in other jurisdictions may also apply depending on
                the circumstances. This policy does not claim that every law applies
                to every user or that every right is available in every case.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">10. Children's Privacy</h2>
              <p>
                The Services are intended for business users and are not designed to
                be directed to children. Do not use the campaign portal on behalf of
                a child or provide children's personal information unless legally
                authorised. If you believe a child has provided personal information
                inappropriately, contact us so we can review the matter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">11. International Processing</h2>
              <p>
                Our service providers or infrastructure may process information in
                countries other than your own. Where required, we will use appropriate
                safeguards for international transfers under applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">12. Changes to This Policy</h2>
              <p>
                We may update this policy as our Services, security practices, or
                legal requirements change. We will publish the updated version on
                this page and revise the effective date. Material changes may also
                be communicated through the Services or by email where appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">13. Contact Us</h2>
              <div className="mt-4 border border-neutral-700 rounded-lg p-6">
                <p>Website: <a className="text-[#ff0000] underline" href="https://www.socialbureau.in" target="_blank" rel="noreferrer">socialbureau.in</a></p>
                <p>Email: <a className="text-[#ff0000] underline" href="mailto:info@socialbureau.in">info@socialbureau.in</a></p>
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default PrivacyPolicy;
