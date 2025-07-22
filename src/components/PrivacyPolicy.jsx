import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-12 flex justify-center items-start">
      <div className="w-full max-w-5xl border-4 border-[#ff0000] rounded-xl p-6 md:p-10 overflow-y-auto shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 left-10 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-[#ff0000] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: July 21, 2025</p>

<div className="space-y-5 text-white leading-relaxed text-justify text-sm sm:text-base max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
            information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
            collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been
            created with the help of the Free Privacy Policy Generator.
          </p>

          <h2 className="text-xl font-semibold text-[#ff0000] mt-6">Interpretation and Definitions</h2>
          <h3 className="text-lg font-medium text-white mt-4">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3 className="text-lg font-medium text-white mt-4">Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party...</li>
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our") refers to SocialBureau, Business Bureau...</li>
            <li><strong>Cookies</strong> are small files that are placed on Your device by a website...</li>
            <li><strong>Country</strong> refers to: Kerala, India</li>
            <li><strong>Device</strong> means any device that can access the Service...</li>
            <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Website</strong> refers to SocialBureau, accessible from <span className='text-[#ff0000]' onClick={()=>navigate('/')}>socialbureau.in</span></li>
            <li><strong>You</strong> means the individual accessing or using the Service...</li>
          </ul>
          <h2 className="text-xl font-semibold text-[#ff0000] mt-6">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us:<br />
            <strong>Email:</strong> info@socialbureau.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
