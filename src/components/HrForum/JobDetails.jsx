// import { Link } from "react-router-dom";

// export default function JobDetails() {
//     return (
//         <div className="min-h-screen bg-gray-50 flex">

//             {/* Main */}
//             <main className="flex-1 p-8">
//                 <Link to='/job-listing'>
//                     <button className="text-blue-600 text-sm mb-4">
//                         ← Back to jobs
//                     </button>
//                 </Link>

//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h1 className="text-2xl font-semibold">
//                             Content Writers / Director
//                         </h1>
//                         <p className="text-gray-600">
//                             Location: Kochi, Kerala · Company: SocialBureau
//                         </p>

//                         <div className="mt-4 flex gap-3">
//                             <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
//                                 Edit job
//                             </button>
//                             <button className="border px-4 py-2 rounded-md">
//                                 View public job page
//                             </button>
//                         </div>
//                     </div>

//                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                         Open
//                     </span>
//                 </div>

//                 {/* Candidates */}
//                 <section className="mt-8">
//                     <h2 className="font-semibold mb-2">Candidates</h2>
//                     <div className="bg-white border rounded-lg p-4 flex gap-8">
//                         <p>
//                             <strong>17</strong> <span className="text-gray-500">All</span>
//                         </p>
//                         <p>
//                             <strong>0</strong> <span className="text-gray-500">New</span>
//                         </p>
//                         <p className="text-blue-600 cursor-pointer">Matches</p>
//                     </div>
//                 </section>

//                 {/* Sponsored */}
//                 <section className="mt-8">
//                     <h3 className="font-medium mb-3">
//                         Enhance performance with Sponsored Job features
//                     </h3>

//                     <div className="bg-white border rounded-lg p-5 flex justify-between items-center">
//                         <div>
//                             <p className="font-medium">Urgently hiring label</p>
//                             <p className="text-sm text-gray-600">
//                                 Add this label to get up to{" "}
//                                 <strong>70% more applications</strong>.
//                             </p>
//                         </div>

//                         <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
//                             Premium
//                         </span>
//                     </div>

//                     <div className="mt-4 flex gap-3">
//                         <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
//                             Upgrade plan
//                         </button>
//                         <button className="border px-4 py-2 rounded-md">
//                             View performance report
//                         </button>
//                     </div>
//                 </section>

//                 {/* Reviewers / People actions */}
//                 <section className="mt-12 border-t pt-6">
//                     <h3 className="text-sm font-medium text-gray-700 mb-4">
//                         Reviewers
//                     </h3>

//                     <div className="space-y-3">
//                         {[
//                             "Ranju Jiji",
//                             "Anu Thomas",
//                             "Rahul Menon",
//                             "Neha Singh",
//                             "Arjun Kumar",
//                             "Sreelakshmi",
//                         ].map((name, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-between bg-white border rounded-md px-4 py-3"
//                             >
//                                 {/* Name */}
//                                 <p className="text-gray-800 font-medium">
//                                     {name}
//                                 </p>

//                                 {/* Actions */}
//                                 <div className="flex items-center gap-3">
//                                     <button
//                                         title="Approve"
//                                         className="w-8 h-8 rounded-full border flex items-center justify-center
//                        hover:bg-green-50 hover:text-green-600"
//                                     >
//                                         ✔
//                                     </button>

//                                     <button
//                                         title="Need clarification"
//                                         className="w-8 h-8 rounded-full border flex items-center justify-center
//                        hover:bg-yellow-50 hover:text-yellow-600"
//                                     >
//                                         ?
//                                     </button>

//                                     <button
//                                         title="Reject"
//                                         className="w-8 h-8 rounded-full border flex items-center justify-center
//                        hover:bg-red-50 hover:text-red-600"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>


//             </main>
//         </div>
//     );
// }



import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, CheckCircle, HelpCircle, XCircle } from "lucide-react";

const MOCK_CANDIDATES = [
    "Ranju Jiji",
    "Anu Thomas",
    "Rahul Menon",
    "Neha Singh",
    "Arjun Kumar",
    "Sreelakshmi",
];

const ACTION_CONFIGS = {
    interested: {
        icon: CheckCircle,
        title: "Mark as Interested",
        color: "green",
        description: "This candidate will be shortlisted for further review.",
        confirmText: "Shortlist Candidate",
        bgClass: "bg-green-50 border-green-200",
        iconClass: "text-green-600",
        buttonClass: "bg-green-600 hover:bg-green-700",
    },
    clarify: {
        icon: HelpCircle,
        title: "Need Clarification",
        color: "amber",
        description: "Request additional information from this candidate.",
        confirmText: "Request Clarification",
        bgClass: "bg-amber-50 border-amber-200",
        iconClass: "text-amber-600",
        buttonClass: "bg-amber-600 hover:bg-amber-700",
    },
    rejected: {
        icon: XCircle,
        title: "Mark as Not Interested",
        color: "red",
        description: "This candidate will be marked as not matching the role requirements.",
        confirmText: "Reject Candidate",
        bgClass: "bg-red-50 border-red-200",
        iconClass: "text-red-600",
        buttonClass: "bg-red-600 hover:bg-red-700",
    },
};

function ActionModal({ isOpen, candidate, actionType, onClose, onConfirm }) {
    if (!isOpen) return null;

    const config = ACTION_CONFIGS[actionType];
    const IconComponent = config.icon;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header with accent color */}
                <div className={`${config.bgClass} border-b px-6 py-4`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.bgClass}`}>
                            <IconComponent className={`w-6 h-6 ${config.iconClass}`} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {config.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <p className="text-gray-700 mb-4">
                        Candidate: <span className="font-semibold text-gray-900">{candidate}</span>
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {config.description}
                    </p>

                    {/* Status indicator */}
                    <div className={`${config.bgClass} border rounded-lg px-4 py-3 mb-6`}>
                        <p className="text-sm font-medium text-gray-700">
                            This action will be recorded in your hiring pipeline.
                        </p>
                    </div>
                </div>

                {/* Footer with actions */}
                <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${config.buttonClass}`}
                    >
                        {config.confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function JobDetails() {
    const [modalState, setModalState] = useState({
        isOpen: false,
        candidate: null,
        actionType: null,
    });

    const [processedCandidates, setProcessedCandidates] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const openModal = (candidate, actionType) => {
        setModalState({
            isOpen: true,
            candidate,
            actionType,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            candidate: null,
            actionType: null,
        });
    };

    const handleConfirm = () => {
        const { candidate, actionType } = modalState;
        setProcessedCandidates((prev) => ({
            ...prev,
            [candidate]: actionType,
        }));

        // Show notification
        const action = {
            interested: "shortlisted",
            clarify: "marked for clarification",
            rejected: "marked as not interested",
        };
        setNotificationMessage(
            `${candidate} has been ${action[actionType]} ✓`
        );
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);

        closeModal();
    };

    const getStatusBadge = (candidate) => {
        const status = processedCandidates[candidate];
        if (!status) return null;

        const statusConfig = {
            interested: {
                label: "Shortlisted",
                className: "bg-green-100 text-green-700 border-green-200",
            },
            clarify: {
                label: "Clarification Needed",
                className: "bg-amber-100 text-amber-700 border-amber-200",
            },
            rejected: {
                label: "Not Interested",
                className: "bg-red-100 text-red-700 border-red-200",
            },
        };

        const config = statusConfig[status];
        return (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <Link to="/job-listing">
                    <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to jobs
                    </button>
                </Link>

                {/* Job Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex justify-between items-start gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Content Writers / Director
                            </h1>
                            <p className="text-gray-600 text-lg mb-6">
                                Kochi, Kerala · SocialBureau
                            </p>

                            <div className="flex gap-3 flex-wrap">
                                <Link to="/appy-job">
                                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                                        Edit job
                                    </button>
                                </Link>
                                <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    View public page
                                </button>
                            </div>
                        </div>

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm border border-green-200 whitespace-nowrap">
                            ● Open
                        </span>
                    </div>
                </div>

                {/* Candidates Summary */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Applications</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <p className="text-4xl font-bold text-blue-600 mb-1">17</p>
                            <p className="text-gray-600 font-medium">Total Applications</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <p className="text-4xl font-bold text-amber-600 mb-1">0</p>
                            <p className="text-gray-600 font-medium">New Applications</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer hover:bg-blue-50">
                            <p className="text-4xl font-bold text-gray-900 mb-1">—</p>
                            <p className="text-blue-600 font-semibold">View Matches</p>
                        </div>
                    </div>
                </section>

                {/* Sponsored Section */}
                <section className="mb-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Boost Your Job Post
                    </h3>

                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900 mb-2">Urgently Hiring Label</p>
                            <p className="text-gray-700">
                                Add this label to attract <span className="font-semibold text-orange-600">70% more applications</span>
                            </p>
                        </div>
                        <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap">
                            Premium
                        </span>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Upgrade Plan
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            View Performance Report
                        </button>
                    </div>
                </section>

                {/* Reviewers Section */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Candidate Reviews
                    </h3>

                    <div className="space-y-3">
                        {MOCK_CANDIDATES.map((name) => {
                            const status = processedCandidates[name];
                            return (
                                <div
                                    key={name}
                                    className={`bg-white border rounded-xl px-5 py-4 flex items-center justify-between transition-all ${status ? "border-gray-300 bg-gray-50" : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                        }`}
                                >
                                    {/* Candidate Name */}
                                    <Link to={`/candidate-profile`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{name}</p>
                                                <p className="text-xs text-gray-500">Candidate ID: #{Math.floor(Math.random() * 10000)}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Status Badge or Action Buttons */}
                                    {status ? (
                                        <div className="flex items-center gap-3">
                                            {getStatusBadge(name)}
                                            <button
                                                onClick={() => {
                                                    setProcessedCandidates((prev) => {
                                                        const newState = { ...prev };
                                                        delete newState[name];
                                                        return newState;
                                                    });
                                                }}
                                                className="text-gray-500 hover:text-gray-700 font-medium text-xs hover:underline"
                                            >
                                                Undo
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openModal(name, "interested")}
                                                title="Shortlist"
                                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all font-bold text-lg"
                                            >
                                                ✓
                                            </button>

                                            <button
                                                onClick={() => openModal(name, "clarify")}
                                                title="Need Clarification"
                                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 transition-all font-bold text-lg"
                                            >
                                                ?
                                            </button>

                                            <button
                                                onClick={() => openModal(name, "rejected")}
                                                title="Not Interested"
                                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all font-bold text-lg"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* Action Modal */}
            <ActionModal
                isOpen={modalState.isOpen}
                candidate={modalState.candidate}
                actionType={modalState.actionType}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />

            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed bottom-6 right-6 bg-white border-2 border-green-400 rounded-xl px-6 py-4 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
                    <p className="font-semibold text-gray-900">{notificationMessage}</p>
                </div>
            )}
        </div>
    );
}