import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 text-gray-300">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cookie Policy</h1>
        
        <div className="space-y-8">
          <section>
            <p className="text-gray-400 mb-4">
              <strong>Last Updated:</strong> November 19, 2025
            </p>
            <p className="leading-relaxed">
              This Cookie Policy explains how SocialBureau ("we", "us", or "our") uses cookies and similar 
              technologies when you visit our website at www.socialbureau.in (the "Website").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) 
              when you visit a website. They are widely used to make websites work more efficiently and 
              provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  Strictly Necessary Cookies
                </h3>
                <p className="leading-relaxed mb-3">
                  These cookies are essential for the website to function properly. They enable basic 
                  functions like page navigation and access to secure areas of the website.
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Examples:</strong> Session cookies, security cookies
                </p>
                <p className="text-sm text-red-400 mt-2">
                  These cookies cannot be disabled as they are necessary for the website to work.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  Analytics & Performance Cookies
                </h3>
                <p className="leading-relaxed mb-3">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Provider:</strong> Google Analytics
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Purpose:</strong> Track page views, user behavior, traffic sources, and website performance
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Data Collected:</strong> IP address (anonymized), pages visited, time spent, referrer URL
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  Marketing & Advertising Cookies
                </h3>
                <p className="leading-relaxed mb-3">
                  These cookies are used to deliver personalized advertisements and track the effectiveness 
                  of our marketing campaigns.
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Provider:</strong> Facebook Pixel (Meta)
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Purpose:</strong> Track conversions, retarget visitors, optimize ad delivery
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Data Collected:</strong> Pages visited, actions taken, device information
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>To remember your cookie preferences</li>
              <li>To analyze website traffic and user behavior</li>
              <li>To improve our website's performance and functionality</li>
              <li>To deliver relevant advertising based on your interests</li>
              <li>To measure the effectiveness of our marketing campaigns</li>
              <li>To provide a personalized browsing experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Choices</h2>
            <p className="leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your 
              cookie preferences through our cookie consent banner that appears when you first visit 
              our website.
            </p>
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mb-4">
              <p className="text-sm">
                <strong className="text-white">To manage your cookie preferences:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>Click the "Customize" button in the cookie banner</li>
                <li>Toggle the categories you want to enable/disable</li>
                <li>Click "Save Preferences"</li>
              </ul>
            </div>
            <p className="leading-relaxed">
              You can also set or amend your web browser controls to accept or refuse cookies. If you 
              choose to reject cookies, you may still use our website, but your access to some 
              functionality and areas may be restricted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
            <p className="leading-relaxed mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report 
              usage statistics of the website and deliver advertisements on and through the website.
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-semibold text-white mb-1">Google Analytics</h4>
                <p className="text-sm">
                  Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">https://policies.google.com/privacy</a>
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-semibold text-white mb-1">Facebook Pixel</h4>
                <p className="text-sm">
                  Privacy Policy: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">https://www.facebook.com/privacy/policy</a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookie Retention Period</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 1-2 years)</li>
              <li><strong>Your Consent:</strong> Stored for 12 months, after which you'll be asked again</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or 
              for other operational, legal, or regulatory reasons. Please revisit this page regularly 
              to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <p className="mb-2"><strong className="text-white">SocialBureau / TrillionEdition LLP</strong></p>
              <p className="mb-2">Email: <a href="mailto:hello@socialbureau.in" className="text-red-500 hover:underline">hello@socialbureau.in</a></p>
              <p>Website: <a href="https://www.socialbureau.in" className="text-red-500 hover:underline">www.socialbureau.in</a></p>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              This Cookie Policy is part of our{" "}
              <Link to="/privacy-policy" className="text-red-500 hover:underline">Privacy Policy</Link> and{" "}
              <Link to="/disclaimer" className="text-red-500 hover:underline">Disclaimer</Link>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
