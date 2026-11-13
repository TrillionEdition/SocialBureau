import React from 'react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-12 flex justify-center items-start">
        <button name='back'
          onClick={() => navigate('/')}
          className="absolute top-5 left-10 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition"
        >
          ← Back
        </button>
      <div className="w-full max-w-5xl border-4 border-[#ff0000] rounded-xl p-6 md:p-10 overflow-y-auto shadow-lg relative">
        <h1 className="text-4xl font-bold text-[#ff0000] mb-2">Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: July 21, 2025</p>

        <div className="space-y-5 text-white leading-relaxed text-justify text-sm sm:text-base max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          
          <h2 className="text-xl font-semibold text-[#ff0000] mt-6">Interpretation and Definitions</h2>

          <h3 className="text-lg font-medium text-white mt-4">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3 className="text-lg font-medium text-white mt-4">Definitions</h3>
          <p>For the purposes of this Disclaimer:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our") refers to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, Business Bureau, Main Avenue, Panampilly Nagar, Kochi, Ernakulam, Kerala 682036.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.</li>
            <li><strong>Website</strong> refers to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, accessible from <span className="text-[#ff0000]" onClick={()=>navigate('/')}>socialbureau.in</span></li>
          </ul>

 
<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  Disclaimer
</h2>
<p>
  The information contained on this Service is provided for general
  informational purposes only. While we make reasonable efforts to
  keep the information accurate and up to date, we make no guarantees
  or warranties, express or implied, regarding its accuracy,
  completeness, reliability, suitability, or availability.
</p>
<p>
  The Company assumes no responsibility for errors or omissions in
  the contents of the Service. Your use of the Service and reliance
  on any information provided is solely at your own risk.
</p>
<p>
  To the maximum extent permitted by applicable law, the Company
  shall not be liable for any direct, indirect, incidental, special,
  consequential, or punitive damages, including loss of data, profits,
  business opportunities, or goodwill, arising out of or in connection
  with your use of, or inability to use, the Service.
</p>
<p>
  The Company does not warrant that the Service will be uninterrupted,
  error-free, secure, or free from viruses, malware, or other harmful
  components. Users are responsible for maintaining appropriate
  security measures on their own devices.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  External Links Disclaimer
</h2>
<p>
  The Service may contain links to third-party websites, applications,
  or resources that are not owned, operated, maintained, or controlled
  by the Company. Such links are provided solely for convenience and
  informational purposes.
</p>
<p>
  The inclusion of any external link does not imply endorsement,
  sponsorship, approval, or affiliation with the linked website or
  its operators.
</p>
<p>
  The Company does not guarantee the accuracy, relevance, timeliness,
  availability, security, or completeness of information provided
  by external websites. We are not responsible for their content,
  privacy practices, terms, products, or services.
</p>
<p>
  Accessing third-party websites through links on our Service is
  entirely at your own discretion and subject to the applicable
  terms and privacy policies of those websites.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  Errors and Omissions Disclaimer
</h2>
<p>
  Although the Company takes reasonable precautions to ensure that
  the information published on the Service is accurate and current,
  errors, omissions, or outdated information may occasionally occur.
</p>
<p>
  Information may be updated, modified, or removed at any time
  without prior notice. The Company does not undertake an obligation
  to update every item of information unless required by applicable
  law.
</p>
<p>
  If you identify an error or omission, you may contact us at
  info@socialbureau.in so that we can review it and make corrections
  where appropriate.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  Fair Use Disclaimer
</h2>
<p>
  The Service may contain certain copyrighted materials, including
  text, images, videos, graphics, or other content, which may be
  used for purposes such as criticism, comment, news reporting,
  research, teaching, education, or review, where permitted by
  applicable copyright law.
</p>
<p>
  Any such use is intended to comply with applicable copyright
  exceptions and limitations, including fair use where applicable.
  The Company does not claim ownership of third-party copyrighted
  materials unless expressly stated.
</p>
<p>
  All trademarks, copyrights, logos, and other intellectual property
  appearing on the Service remain the property of their respective
  owners. If you believe that material on our Service infringes
  your intellectual property rights, please contact us at
  info@socialbureau.in with relevant details for review.
</p>
<p>
  Nothing in this section guarantees that a particular use qualifies
  as fair use or another copyright exception. This determination
  depends on the facts and applicable law.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  Views Expressed Disclaimer
</h2>
<p>
  The Service may contain articles, opinions, commentary, reviews,
  contributions, or other materials expressing the views of
  individual authors, contributors, clients, or third parties.
  Such views are those of their respective authors and do not
  necessarily represent the official policies, positions, or
  opinions of the Company.
</p>
<p>
  The Company does not necessarily endorse or adopt every opinion
  or statement published by contributors or third parties. Content
  is provided for informational purposes and should not be treated
  as an official statement or professional advice unless expressly
  identified as such.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  No Professional Advice Disclaimer
</h2>
<p>
  Information available through the Service is not intended to
  constitute legal, financial, tax, medical, investment, or other
  professional advice. You should consult an appropriately qualified
  professional before making decisions based on such information.
</p>

<h2 className="text-xl font-semibold text-[#ff0000] mt-6">
  Changes to This Disclaimer
</h2>
<p>
  The Company reserves the right to modify, update, or replace
  any part of this Disclaimer at any time. Changes will become
  effective when published on this page. Your continued use of
  the Service following publication of changes constitutes
  acknowledgment of the updated Disclaimer, to the extent
  permitted by applicable law.
</p>

          <h2 className="text-xl font-semibold  mt-6">No Responsibility Disclaimer</h2>
          <p>The Company is not engaged in rendering legal, accounting, or other professional advice. Please consult a professional.</p>

          <h2 className="text-xl font-semibold t-6">"Use at Your Own Risk" Disclaimer</h2>
          <p>All information is provided "as is", without warranty of any kind. The Company is not liable for any reliance on the Service's information.</p>

          <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
          <p>If you have any questions about this Disclaimer, You can contact Us:</p>
          <p><strong>Email:</strong> info@socialbureau.in</p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

