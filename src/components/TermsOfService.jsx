import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Terms of Service | SocialBureau YouTube Automation</title>
        <meta
          name="description"
          content="Terms governing SocialBureau's campaign services and YouTube channel analytics portal."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://socialbureau.in/terms-of-service" />
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#ff0000]">Terms of Service</h1>
            <p className="mt-3 text-gray-400"><strong>Effective Date:</strong> October 16, 2026</p>
          </header>

          <div className="space-y-10 text-white leading-8 text-justify pr-2 custom-scrollbar">
            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">1. Agreement and Services</h2>
              <p>
                These Terms of Service (“Terms”) govern access to socialbureau.in,
                SocialBureau YouTube Automation and Campaign Analytics, and related
                services provided by SocialBureau (“SocialBureau,” “we,” “us,” or
                “our”). The services may include campaign coordination, reporting,
                analytics dashboards, and client support (collectively, the “Services”).
              </p>
              <p className="mt-4">
                By accessing or using the Services, you agree to these Terms and our
                Privacy Policy. If you do not agree, do not use the Services. If you
                use the Services on behalf of a company or client, you confirm that
                you are authorised to bind that organisation to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">2. Eligibility and Account Security</h2>
              <p>
                You must provide accurate information, keep account credentials
                confidential, and promptly notify us of suspected unauthorised access.
                You are responsible for activity carried out through your account,
                except to the extent applicable law provides otherwise. We may suspend
                access where reasonably necessary to protect the Services, users, or
                third parties, investigate abuse, or comply with law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">3. Connecting a Google Account or YouTube Channel</h2>
              <p>
                The portal may allow you to connect a Google account or YouTube
                channel using Google's OAuth authorisation process. You must use an
                account and channel that you own or are authorised to manage, and you
                must have authority to grant the requested permissions. SocialBureau
                will not ask you to provide your Google password directly to us.
              </p>
              <p className="mt-4">
                You can refuse or revoke access through your Google Account settings.
                If you revoke access, certain portal features may stop working. You
                are responsible for ensuring that your use of the connected channel
                and its data complies with applicable laws, Google's terms, YouTube's
                terms, and any obligations you owe to the channel owner.
              </p>
              <p className="mt-4">
                Google and YouTube are third-party services. Their availability,
                API permissions, quotas, eligibility rules, reporting metrics, and
                policies may change. SocialBureau does not control those services
                and cannot guarantee uninterrupted API access or the availability of
                every metric or report.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">4. Campaign Data and Analytics Reports</h2>
              <p>
                Analytics are generated from data made available by YouTube and other
                information provided for a campaign. Metrics may be delayed, estimated,
                adjusted by YouTube, subject to reporting thresholds, or unavailable
                for certain periods or channels. Reports are provided for information
                and campaign-management purposes and should not be treated as a
                guarantee of campaign performance, reach, revenue, ranking, or results.
              </p>
              <p className="mt-4">
                You remain responsible for reviewing reports and decisions made using
                them. You must not misrepresent reports, alter them to deceive another
                party, or use data belonging to a channel or client without appropriate
                authority. Client-specific information should be accessed only by
                people authorised to work on that client or campaign.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>access a channel, account, report, or client workspace without authorisation;</li>
                <li>attempt to bypass access controls, OAuth permissions, API quotas, or security measures;</li>
                <li>use bots, scraping, or automated extraction to access the Services except through expressly authorised interfaces and in accordance with applicable terms;</li>
                <li>interfere with the availability, integrity, or security of the Services;</li>
                <li>upload malware or use the Services for fraud, unlawful activity, harassment, or infringement of another party's rights;</li>
                <li>share OAuth credentials, tokens, or confidential client data with unauthorised people; or</li>
                <li>use the Services in a way that violates Google's or YouTube's policies or applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">6. Intellectual Property and Licence</h2>
              <p>
                Except for content and data owned by you or third parties, SocialBureau
                and its licensors retain rights in the Services, software, branding,
                design, and original materials. Subject to these Terms, we grant you a
                limited, non-exclusive, non-transferable, revocable right to use the
                Services for their intended business purpose during your authorised
                access period.
              </p>
              <p className="mt-4">
                You retain rights in materials you provide, subject to the rights
                necessary for us to operate the Services and perform the services you
                request. You must ensure that you have the rights and permissions
                needed to submit or use those materials. Google, YouTube, and their
                respective owners retain all rights in their services, names, and data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">7. Fees, Payment, and Cancellation</h2>
              <p>
                Fees, billing terms, deliverables, timelines, cancellation rights, and
                refund terms for any paid campaign or service will be stated in the
                applicable proposal, order, invoice, or written agreement. If a separate
                written agreement conflicts with these Terms, that agreement will
                control for the specific service to the extent of the conflict.
                Applicable taxes will be charged as required by law and as stated in
                the relevant invoice or agreement.
              </p>
              <p className="mt-4">
                Do not assume that a payment is refundable or non-refundable unless
                the applicable order terms say so. Contact SocialBureau promptly if
                you believe a charge is incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">8. Privacy and Data Protection</h2>
              <p>
                Our collection and use of personal information is described in our
                <a className="text-[#ff0000] underline" href="/privacy-policy"> Privacy Policy</a>.
                You must not provide personal data or channel data that you are not
                authorised to share. You acknowledge that Google API data is subject
                to applicable Google API Services User Data Policy and YouTube API
                Services Terms, in addition to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">9. Third-Party Services</h2>
              <p>
                The Services may rely on third-party platforms, including Google and
                YouTube, hosting providers, and payment providers. Third-party services
                are governed by their own terms and privacy policies. We are not
                responsible for outages, decisions, policy changes, or features that
                are controlled by third parties, except where applicable law provides
                otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">10. Availability, Disclaimers, and Liability</h2>
              <p>
                We aim to operate the Services reliably but do not guarantee that they
                will always be available, uninterrupted, error-free, or compatible with
                every device or third-party service. To the maximum extent permitted
                by applicable law, the Services are provided on an “as available” basis
                and, where legally permissible, without warranties not expressly stated
                in a written agreement.
              </p>
              <p className="mt-4">
                To the maximum extent permitted by law, SocialBureau will not be liable
                for indirect, incidental, special, consequential, or punitive losses,
                loss of profits, loss of business opportunity, or loss of data arising
                from use of the Services. Nothing in these Terms excludes or limits
                liability that cannot legally be excluded or limited, including any
                mandatory consumer rights or liability for fraud or wilful misconduct
                where applicable law prohibits such limitation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">11. Suspension and Termination</h2>
              <p>
                You may stop using the Services at any time and may revoke Google access
                through your Google Account settings. We may suspend or terminate access
                where reasonably necessary due to a breach of these Terms, a security
                risk, a legal requirement, or discontinuation of a service. On termination,
                your right to use the affected Services ends. Data handling after
                termination is governed by the Privacy Policy and applicable agreements
                and law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">12. Changes to These Terms</h2>
              <p>
                We may update these Terms as our Services or legal requirements change.
                We will publish the revised Terms on this page and update the effective
                date. Continued use after updated Terms take effect constitutes
                acceptance where permitted by applicable law. If you do not agree to a
                change, stop using the affected Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#ff0000] mb-4">13. Governing Law and Contact</h2>
              <p>
                These Terms are subject to applicable laws of India, without removing
                any mandatory rights that may apply to you under other applicable law.
                Any dispute will be handled by the competent courts or dispute forum
                determined under applicable law and any valid written agreement between
                the parties.
              </p>
              <div className="mt-6 border border-neutral-700 rounded-lg p-6">
                <p><strong>SocialBureau</strong></p>
                <p className="mt-2">Website: <a className="text-[#ff0000] underline" href="https://www.socialbureau.in" target="_blank" rel="noreferrer">socialbureau.in</a></p>
                <p>Email: <a className="text-[#ff0000] underline" href="mailto:info@socialbureau.in">info@socialbureau.in</a></p>
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default TermsOfService;