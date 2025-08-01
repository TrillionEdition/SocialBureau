import React from 'react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-12 flex justify-center items-start">
        <button
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
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our") refers to SocialBureau, Business Bureau, Main Avenue, Panampilly Nagar, Kochi, Ernakulam, Kerala 682036.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.</li>
            <li><strong>Website</strong> refers to SocialBureau, accessible from <span className="text-[#ff0000]" onClick={()=>navigate('/')}>socialbureau.in</span></li>
          </ul>

          <h2 className="text-xl font-semibold text-[#ff0000] mt-6">Disclaimer</h2>
          <p>The information contained on the Service is for general information purposes only.</p>
          <p>The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
          <p>In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages...</p>
          <p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>

          <h2 className="text-xl font-semibold  mt-6">External Links Disclaimer</h2>
          <p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</p>
          <p>Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>

          <h2 className="text-xl font-semibold  mt-6">Errors and Omissions Disclaimer</h2>
          <p>Even if the Company takes every precaution to ensure that the content of the Service is accurate, errors can occur...</p>

          <h2 className="text-xl font-semibold mt-6">Fair Use Disclaimer</h2>
          <p>The Company may use copyrighted material under "fair use" for criticism, comment, news reporting, teaching, etc...</p>

          <h2 className="text-xl font-semibold mt-6">Views Expressed Disclaimer</h2>
          <p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy...</p>

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
