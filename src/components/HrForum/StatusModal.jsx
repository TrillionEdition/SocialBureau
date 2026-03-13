import React, { useState } from 'react';
import { X, CheckCircle, XCircle, HelpCircle, MessageSquare, Send, AlertTriangle } from 'lucide-react';

export default function StatusModal({ isOpen, applicant, onClose, onConfirm, actionType }) {
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen || !applicant) return null;

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await onConfirm(applicant._id, actionType === 'shortlist' ? 'shortlisted' : actionType === 'reject' ? 'rejected' : 'clarification', message);
            onClose();
            setMessage("");
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const getActionData = () => {
        switch (actionType) {
            case 'shortlist':
                return {
                    title: 'Shortlist Candidate',
                    subtitle: 'Moves candidate to the next round',
                    icon: <CheckCircle className="text-green-600" size={32} />,
                    color: 'text-green-600',
                    bg: 'bg-green-50',
                    btn: 'bg-green-600 hover:bg-green-700 shadow-green-200',
                    placeholder: 'Optional: add a note for the candidate...'
                };
            case 'reject':
                return {
                    title: 'Reject Application',
                    subtitle: 'Candidate will be notified of the decision',
                    icon: <XCircle className="text-red-600" size={32} />,
                    color: 'text-red-600',
                    bg: 'bg-red-50',
                    btn: 'bg-red-600 hover:bg-red-700 shadow-red-200',
                    placeholder: 'Optional: provide reasoning for rejection...'
                };
            default:
                return {
                    title: 'Ask Question',
                    subtitle: 'Ask the candidate for more details',
                    icon: <HelpCircle className="text-amber-600" size={32} />,
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                    btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
                    placeholder: 'e.g. Please share your portfolio link or more details about your previous role...'
                };
        }
    };

    const data = getActionData();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b bg-slate-50 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${data.bg} rounded-2xl flex items-center justify-center shadow-sm`}>
                            {data.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{data.title}</h2>
                            <p className="text-slate-500 font-bold text-xs tracking-tight uppercase tracking-widest">{applicant.candidateName}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-blue-900 leading-none mb-1">{data.subtitle}</p>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Status will be updated to <span className="font-black uppercase">{actionType === 'shortlist' ? 'shortlisted' : actionType === 'reject' ? 'rejected' : 'clarification'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                                <MessageSquare size={12} /> Message for Candidate
                            </label>
                            <textarea
                                placeholder={data.placeholder}
                                className="w-full h-32 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-semibold text-slate-700 resize-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || (actionType === 'clarify' && !message.trim())}
                            className={`flex-[2] py-4 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none ${data.btn}`}
                        >
                            {submitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>Confirm</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Info = ({ className, size }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
);
