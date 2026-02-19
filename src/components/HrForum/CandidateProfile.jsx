// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

// export default function CandidateProfile() {
//     const [toast, setToast] = useState(null);

//     const showToast = (message, type) => {
//         setToast({ message, type });
//         setTimeout(() => setToast(null), 3000);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex gap-6 p-6">

//             {/* LEFT – Job Summary (Sticky, navbar-safe) */}
//             <aside className="w-1/4 bg-white border rounded-lg p-5 h-fit sticky top-[80px]">
//                 <h2 className="text-lg font-semibold mb-2">
//                     Content Writers / Director
//                 </h2>

//                 <p className="text-sm text-gray-600 mb-4">
//                     Kochi, Kerala · SocialBureau
//                 </p>

//                 <div className="space-y-2 text-sm mb-4">
//                     <p><strong>Job type:</strong> Full-time</p>
//                     <p><strong>Experience:</strong> 1–3 years</p>
//                     <p><strong>Salary:</strong> ₹20,000 – ₹35,000 / month</p>
//                     <p>
//                         <strong>Status:</strong>{" "}
//                         <span className="text-green-600">Open</span>
//                     </p>
//                 </div>

//                 {/* Job Skills */}
//                 <div className="mb-5">
//                     <p className="text-sm font-medium mb-2">Required Skills</p>
//                     <div className="flex flex-wrap gap-2">
//                         {[
//                             "SEO",
//                             "Content Writing",
//                             "Keyword Research",
//                             "WordPress",
//                             "Editing",
//                         ].map((skill) => (
//                             <span
//                                 key={skill}
//                                 className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
//                             >
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Responsibilities */}
//                 <div className="mb-5">
//                     <p className="text-sm font-medium mb-2">Responsibilities</p>
//                     <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                         <li>Write engaging blog content</li>
//                         <li>Optimize content for SEO</li>
//                         <li>Collaborate with marketing team</li>
//                         <li>Edit and proofread articles</li>
//                     </ul>
//                 </div>

//                 {/* Benefits */}
//                 <div className="mb-5">
//                     <p className="text-sm font-medium mb-2">Benefits</p>
//                     <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                         <li>Flexible work hours</li>
//                         <li>Work from home</li>
//                         <li>Paid leave</li>
//                         <li>Performance bonus</li>
//                     </ul>
//                 </div>

//                 <Link to="/job-details">
//                     <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
//                         View job details
//                     </button>
//                 </Link>
//             </aside>

//             {/* CENTER – Candidate Details */}
//             <main className="flex-1 bg-white border rounded-lg p-6">

//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-6">
//                     <div>
//                         <h1 className="text-2xl font-semibold">Ranju Jiji</h1>
//                         <p className="text-gray-600">
//                             Content Writer · Kochi, Kerala
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             📧 ranju@email.com · 📞 +91 98765 43210
//                         </p>
//                     </div>

//                     <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
//                         Under review
//                     </span>
//                 </div>

//                 {/* Actions – ATS style with Toast */}
//                 <div className="flex items-center gap-4 mb-6">

//                     <button
//                         onClick={() => showToast("Candidate marked as Interested", "success")}
//                         title="Interested"
//                         className="w-12 h-12 rounded-full border border-gray-300 
//                        flex items-center justify-center 
//                        text-gray-600
//                        hover:bg-green-50 hover:text-green-600 hover:border-green-300
//                        transition-all"
//                     >
//                         <CheckCircle className="w-6 h-6" />
//                     </button>

//                     <button
//                         onClick={() => showToast("Clarification requested from candidate", "warning")}
//                         title="Clarify"
//                         className="w-12 h-12 rounded-full border border-gray-300 
//                        flex items-center justify-center 
//                        text-gray-600
//                        hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300
//                        transition-all"
//                     >
//                         <HelpCircle className="w-6 h-6" />
//                     </button>

//                     <button
//                         onClick={() => showToast("Candidate marked as Not Interested", "error")}
//                         title="Reject"
//                         className="w-12 h-12 rounded-full border border-gray-300 
//                        flex items-center justify-center 
//                        text-gray-600
//                        hover:bg-red-50 hover:text-red-600 hover:border-red-300
//                        transition-all"
//                     >
//                         <XCircle className="w-6 h-6" />
//                     </button>

//                 </div>

//                 {/* Professional Summary */}
//                 <section className="mb-6">
//                     <h2 className="font-semibold mb-2">Professional Summary</h2>
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                         Creative content writer with 2+ years of experience in digital
//                         marketing, blogs, and social media campaigns. Skilled in SEO,
//                         storytelling, and brand voice development.
//                     </p>
//                 </section>

//                 {/* Experience */}
//                 <section className="mb-6">
//                     <h2 className="font-semibold mb-3">Experience</h2>
//                     <div className="space-y-3 text-sm">
//                         <div>
//                             <p className="font-medium">Content Writer</p>
//                             <p className="text-gray-600">
//                                 ABC Digital Agency · 2023 – Present
//                             </p>
//                         </div>
//                         <div>
//                             <p className="font-medium">Junior Copywriter</p>
//                             <p className="text-gray-600">
//                                 XYZ Media · 2021 – 2023
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Skills */}
//                 <section className="mb-6">
//                     <h2 className="font-semibold mb-3">Skills</h2>
//                     <div className="flex flex-wrap gap-2">
//                         {[
//                             "SEO Writing",
//                             "Content Strategy",
//                             "Blog Writing",
//                             "Social Media",
//                             "Editing",
//                         ].map((skill) => (
//                             <span
//                                 key={skill}
//                                 className="px-3 py-1 text-sm rounded-full bg-gray-100"
//                             >
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Resume */}
//                 <section>
//                     <h2 className="font-semibold mb-2">Resume</h2>
//                     <button className="text-blue-600 hover:underline text-sm mb-3">
//                         📄 Download resume
//                     </button>
//                     <img
//                         src="/assets/hr/resume.png"
//                         alt="resume"
//                         className="w-full border rounded-md"
//                     />
//                 </section>
//             </main>

//             {/* Toast */}
//             {toast && (
//                 <div
//                     className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg border
//             animate-in slide-in-from-bottom-4 duration-300
//             ${toast.type === "success"
//                             ? "bg-green-50 border-green-300 text-green-800"
//                             : toast.type === "warning"
//                                 ? "bg-amber-50 border-amber-300 text-amber-800"
//                                 : "bg-red-50 border-red-300 text-red-800"
//                         }`}
//                 >
//                     <p className="font-semibold">{toast.message}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

import { Link } from "react-router-dom";
import { useState } from "react";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

export default function CandidateProfile() {
    const [toast, setToast] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleActionClick = (action, message, type) => {
        setSelectedAction(action);
        showToast(message, type);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex gap-6 p-6">

            {/* LEFT – Job Summary (Sticky, navbar-safe) */}
            <aside className="w-1/4 bg-white border rounded-lg p-5 h-fit sticky top-[80px]">
                <h2 className="text-lg font-semibold mb-2">
                    Content Writers / Director
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Kochi, Kerala · SocialBureau
                </p>

                <div className="space-y-2 text-sm mb-4">
                    <p><strong>Job type:</strong> Full-time</p>
                    <p><strong>Experience:</strong> 1–3 years</p>
                    <p><strong>Salary:</strong> ₹20,000 – ₹35,000 / month</p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="text-green-600">Open</span>
                    </p>
                </div>

                {/* Job Skills */}
                <div className="mb-5">
                    <p className="text-sm font-medium mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "SEO",
                            "Content Writing",
                            "Keyword Research",
                            "WordPress",
                            "Editing",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-5">
                    <p className="text-sm font-medium mb-2">Responsibilities</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Write engaging blog content</li>
                        <li>Optimize content for SEO</li>
                        <li>Collaborate with marketing team</li>
                        <li>Edit and proofread articles</li>
                    </ul>
                </div>

                {/* Benefits */}
                <div className="mb-5">
                    <p className="text-sm font-medium mb-2">Benefits</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Flexible work hours</li>
                        <li>Work from home</li>
                        <li>Paid leave</li>
                        <li>Performance bonus</li>
                    </ul>
                </div>

                <Link to="/job-details">
                    <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
                        View job details
                    </button>
                </Link>
            </aside>

            {/* CENTER – Candidate Details */}
            <main className={`flex-1 border rounded-lg p-6 transition-all duration-300 ${selectedAction === 'interested'
                    ? 'bg-green-50 border-green-200'
                    : selectedAction === 'clarify'
                        ? 'bg-amber-50 border-amber-200'
                        : selectedAction === 'rejected'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-white'
                }`}>

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Ranju Jiji</h1>
                        <p className="text-gray-600">
                            Content Writer · Kochi, Kerala
                        </p>
                        <p className="text-sm text-gray-500">
                            📧 ranju@email.com · 📞 +91 98765 43210
                        </p>
                    </div>

                    {/* Status Badge - Changes based on action */}
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedAction === 'interested'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : selectedAction === 'clarify'
                                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                : selectedAction === 'rejected'
                                    ? 'bg-red-100 text-red-700 border border-red-300'
                                    : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {selectedAction === 'interested'
                            ? '✓ Shortlisted'
                            : selectedAction === 'clarify'
                                ? '? Clarification Needed'
                                : selectedAction === 'rejected'
                                    ? '✕ Not Interested'
                                    : 'Under review'
                        }
                    </span>
                </div>

                {/* Actions – ATS style with Toast */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">Mark candidate as:</p>
                    <div className="flex items-center gap-4">

                        {/* Interested Button */}
                        <button
                            onClick={() => handleActionClick('interested', "Candidate marked as Shortlisted ✓", "success")}
                            title="Shortlist"
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${selectedAction === 'interested'
                                    ? 'bg-green-500 border-green-600 text-white scale-110'
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-300'
                                }`}
                        >
                            <CheckCircle className="w-7 h-7" />
                        </button>

                        {/* Clarify Button */}
                        <button
                            onClick={() => handleActionClick('clarify', "Clarification requested from candidate", "warning")}
                            title="Need Clarification"
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${selectedAction === 'clarify'
                                    ? 'bg-amber-500 border-amber-600 text-white scale-110'
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300'
                                }`}
                        >
                            <HelpCircle className="w-7 h-7" />
                        </button>

                        {/* Rejected Button */}
                        <button
                            onClick={() => handleActionClick('rejected', "Candidate marked as Not Interested", "error")}
                            title="Not Interested"
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${selectedAction === 'rejected'
                                    ? 'bg-red-500 border-red-600 text-white scale-110'
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300'
                                }`}
                        >
                            <XCircle className="w-7 h-7" />
                        </button>

                        {/* Undo Button - Shows only if action selected */}
                        {selectedAction && (
                            <button
                                onClick={() => {
                                    setSelectedAction(null);
                                    showToast("Action cleared", "warning");
                                }}
                                className="ml-4 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Action Status Indicator */}
                {selectedAction && (
                    <div className={`mb-6 p-4 rounded-lg border-2 transition-all duration-300 ${selectedAction === 'interested'
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : selectedAction === 'clarify'
                                ? 'bg-amber-100 border-amber-300 text-amber-800'
                                : 'bg-red-100 border-red-300 text-red-800'
                        }`}>
                        <p className="font-semibold">
                            {selectedAction === 'interested'
                                ? '✓ Candidate has been shortlisted for interview'
                                : selectedAction === 'clarify'
                                    ? '? Waiting for clarification from candidate'
                                    : '✕ Candidate has been marked as not interested'
                            }
                        </p>
                    </div>
                )}

                {/* Professional Summary */}
                <section className="mb-6">
                    <h2 className="font-semibold mb-2">Professional Summary</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Creative content writer with 2+ years of experience in digital
                        marketing, blogs, and social media campaigns. Skilled in SEO,
                        storytelling, and brand voice development.
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-6">
                    <h2 className="font-semibold mb-3">Experience</h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="font-medium">Content Writer</p>
                            <p className="text-gray-600">
                                ABC Digital Agency · 2023 – Present
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">Junior Copywriter</p>
                            <p className="text-gray-600">
                                XYZ Media · 2021 – 2023
                            </p>
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h2 className="font-semibold mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "SEO Writing",
                            "Content Strategy",
                            "Blog Writing",
                            "Social Media",
                            "Editing",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-sm rounded-full bg-gray-100"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Resume */}
                <section>
                    <h2 className="font-semibold mb-2">Resume</h2>
                    <button className="text-blue-600 hover:underline text-sm mb-3">
                        📄 Download resume
                    </button>
                    <img
                        src="/assets/hr/resume.png"
                        alt="resume"
                        className="w-full border rounded-md"
                    />
                </section>
            </main>

            {/* Toast */}
            {toast && (
                <div
                    className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg border-2
            animate-in slide-in-from-bottom-4 duration-300 font-semibold
            ${toast.type === "success"
                            ? "bg-green-50 border-green-400 text-green-800"
                            : toast.type === "warning"
                                ? "bg-amber-50 border-amber-400 text-amber-800"
                                : "bg-red-50 border-red-400 text-red-800"
                        }`}
                >
                    <p>{toast.message}</p>
                </div>
            )}
        </div>
    );
}