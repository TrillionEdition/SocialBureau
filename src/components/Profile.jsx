import React, { useState, useRef, useEffect } from 'react';
import { Camera, Edit2, Save, X, Upload, Loader, Mail, MapPin, User, Info, CheckCircle2, Briefcase, Bookmark, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    getUserProfileAPI,
    updateUserProfileAPI,
    updateProfileWithImagesAPI,
    getUserApplicationsAPI,
    getUserSavedJobsAPI
} from '../../services/userServices';
import { getUserData, setUserData as setLocalUserData } from '../../utils/authUtils';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    const [user, setUser] = useState({
        name: '', title: '', bio: '', email: '', location: '', coverImage: '', avatar: '',
    });

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loadingActivity, setLoadingActivity] = useState(false);

    const [editedUser, setEditedUser] = useState(user);
    const [imageFiles, setImageFiles] = useState({ coverImage: null, avatar: null });
    const coverFileRef = useRef(null);
    const avatarFileRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const currentUser = getUserData();
                if (currentUser) {
                    const userData = { ...user, ...currentUser };
                    setUser(userData);
                    setEditedUser(userData);
                    const effectiveUserId = currentUser._id || currentUser.id;
                    if (effectiveUserId) {
                        const profileData = await getUserProfileAPI(effectiveUserId);
                        if (profileData) {
                            const freshData = { ...userData, ...profileData };
                            setUser(freshData);
                            setEditedUser(freshData);
                            setLocalUserData(freshData);
                        }

                        // Fetch Activity
                        setLoadingActivity(true);
                        const [apps, saved] = await Promise.all([
                            getUserApplicationsAPI(effectiveUserId),
                            getUserSavedJobsAPI(effectiveUserId)
                        ]);
                        setAppliedJobs(apps);
                        setSavedJobs(saved);
                        setLoadingActivity(false);
                    }
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
                setLoadingActivity(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);
            const userId = user._id || user.id;
            const updatePayload = {
                name: editedUser.name, title: editedUser.title, bio: editedUser.bio, email: editedUser.email, location: editedUser.location,
            };

            let updatedUserData;
            if (imageFiles.coverImage || imageFiles.avatar) {
                const payload = { ...updatePayload, coverImage: imageFiles.coverImage, avatar: imageFiles.avatar };
                updatedUserData = await updateProfileWithImagesAPI(userId, payload);
            } else {
                updatedUserData = await updateUserProfileAPI(userId, updatePayload);
            }

            const mergedUser = { ...user, ...updatedUserData };
            setUser(mergedUser);
            setLocalUserData(mergedUser);
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message || 'Failed to save profile.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedUser(prev => ({ ...prev, [field]: value }));
    };

    const handleImagePreview = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setImageFiles(prev => ({ ...prev, [type]: file }));
            const reader = new FileReader();
            reader.onload = (event) => setEditedUser(prev => ({ ...prev, [type]: event.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const displayUser = isEditing ? editedUser : user;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
            {/* Minimal Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <span className="font-black tracking-tighter text-slate-900 text-lg">SOCIALBUREAU</span>
                        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'activity' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Job Activity
                                {appliedJobs.length > 0 && <span className="ml-2 bg-indigo-600 text-white rounded-full w-4 h-4 inline-flex items-center justify-center text-[8px]">{appliedJobs.length}</span>}
                            </button>
                        </nav>
                    </div>

                    {!isEditing && activeTab === 'profile' && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-full transition-all active:scale-95 shadow-md shadow-slate-200"
                        >
                            <Edit2 size={12} /> EDIT PROFILE
                        </button>
                    )}
                </div>
            </div>

            <main className="max-w-6xl mx-auto pb-20 px-6">
                {activeTab === 'profile' ? (
                    <>
                        <div className="relative mt-8">
                            <div className="relative h-64 sm:h-96 w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-200">
                                {displayUser.coverImage ? (
                                    <img src={displayUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x" />
                                )}
                                {isEditing && (
                                    <button onClick={() => coverFileRef.current?.click()} className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <div className="bg-white p-4 rounded-full shadow-2xl"><Upload className="text-indigo-600" size={24} /></div>
                                        <span className="text-white text-xs font-black uppercase tracking-widest drop-shadow-lg">Change Cover</span>
                                    </button>
                                )}
                                <input ref={coverFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'coverImage')} className="hidden" />
                            </div>

                            <div className="absolute -bottom-20 left-12 flex items-end gap-8">
                                <div className="relative group">
                                    <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-[2.5rem] overflow-hidden border-[10px] border-[#F8FAFC] bg-white shadow-2xl">
                                        {displayUser.avatar ? (
                                            <img src={displayUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 text-5xl font-black">
                                                {displayUser.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button onClick={() => avatarFileRef.current?.click()} className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all scale-100 hover:scale-110 active:scale-90">
                                            <Camera size={24} />
                                        </button>
                                    )}
                                    <input ref={avatarFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'avatar')} className="hidden" />
                                </div>
                            </div>
                        </div>

                        {!isEditing && (
                            <div className="mt-24 ml-12">
                                <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">{displayUser.name || 'User Name'}</h1>
                                <p className="text-indigo-600 font-bold text-2xl tracking-tight">{displayUser.title || 'Creative Professional'}</p>
                            </div>
                        )}

                        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isEditing ? 'mt-32' : 'mt-12'}`}>
                            <div className="space-y-8">
                                <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-shadow">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Identification</h3>
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner"><Mail size={24} /></div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email Channel</p>
                                                <p className="text-lg font-bold text-slate-800 truncate">{displayUser.email || '—'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner"><MapPin size={24} /></div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Current Sphere</p>
                                                <p className="text-lg font-bold text-slate-800">{displayUser.location || 'Remote'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {success && <div className="bg-emerald-500 text-white p-6 rounded-3xl font-bold flex items-center gap-3 animate-in slide-in-from-bottom-5">
                                    <CheckCircle2 size={24} /> {success}
                                </div>}
                            </div>

                            <div className="lg:col-span-2">
                                {isEditing ? (
                                    <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Name</label>
                                                <input type="text" value={editedUser.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-slate-800 font-bold text-lg" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Title</label>
                                                <input type="text" value={editedUser.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-slate-800 font-bold text-lg" />
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-10">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biography</label>
                                            <textarea rows={5} value={editedUser.bio} onChange={(e) => handleInputChange('bio', e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-3xl focus:bg-white focus:border-indigo-500 outline-none transition-all text-slate-800 font-bold text-lg resize-none" />
                                        </div>
                                        <div className="flex gap-6">
                                            <button onClick={handleSave} disabled={isSaving} className="flex-1 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-100">
                                                {isSaving ? <Loader className="animate-spin" size={24} /> : <Save size={24} />} COMMIT CHANGES
                                            </button>
                                            <button onClick={() => { setIsEditing(false); setEditedUser(user); }} className="px-10 h-16 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[2rem] font-black transition-all">CANCEL</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-sm">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
                                            <h3 className="text-sm font-black text-slate-900 tracking-widest uppercase">Professional Manifesto</h3>
                                        </div>
                                        <p className="text-slate-500 text-2xl font-medium leading-relaxed italic">
                                            "{displayUser.bio || "Crafting digital excellence through strategic innovation."}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mt-12 space-y-12 animate-in fade-in duration-500">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Applications</p>
                                <div className="flex items-end gap-3">
                                    <p className="text-5xl font-black text-indigo-600">{appliedJobs.length}</p>
                                    <Briefcase className="mb-1 text-indigo-200" size={32} />
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Saved Positions</p>
                                <div className="flex items-end gap-3">
                                    <p className="text-5xl font-black text-amber-500">{savedJobs.length}</p>
                                    <Bookmark className="mb-1 text-amber-200" size={32} />
                                </div>
                            </div>
                            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">HR Status</p>
                                <p className="text-2xl font-black">Active Seeker</p>
                                <p className="text-[10px] font-bold mt-2 text-white/80">Employer response time: 24-48h</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* APPLIED JOBS */}
                            <section>
                                <div className="flex items-center justify-between mb-8 px-4">
                                    <h3 className="text-2xl font-black text-slate-900">Application History</h3>
                                    <Link to="/hr-forum" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Find More Jobs →</Link>
                                </div>
                                <div className="space-y-4">
                                    {loadingActivity ? (
                                        <div className="flex justify-center p-20"><Loader className="animate-spin text-indigo-600" size={40} /></div>
                                    ) : appliedJobs.length === 0 ? (
                                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-[2.5rem] text-center">
                                            <Briefcase className="mx-auto mb-4 text-slate-300" size={40} />
                                            <p className="text-slate-500 font-bold text-lg">No applications yet.</p>
                                        </div>
                                    ) : (
                                        appliedJobs.map(app => (
                                            <div key={app._id} className="bg-white border border-slate-100 p-6 rounded-[2rem] hover:shadow-xl hover:scale-[1.02] transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <Link to={`/job-details/${app.jobId?._id}`} className="text-xl font-black text-slate-900 hover:text-indigo-600 transition-colors">{app.jobId?.jobTitle}</Link>
                                                        <p className="text-sm font-bold text-slate-400 mt-1">{app.jobId?.companyName}</p>
                                                    </div>
                                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${app.status === 'shortlisted' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase">
                                                    <div className="flex items-center gap-1.5"><Clock size={12} /> {new Date(app.appliedAt).toLocaleDateString()}</div>
                                                    <div className="flex items-center gap-1.5"><Briefcase size={12} /> {app.jobId?.location}</div>
                                                </div>
                                                {app.employerMessage && (
                                                    <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                                                        <MessageSquare size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                                                        <p className="text-xs text-indigo-900 font-medium leading-relaxed italic">"{app.employerMessage}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* SAVED JOBS */}
                            <section>
                                <div className="flex items-center justify-between mb-8 px-4">
                                    <h3 className="text-2xl font-black text-slate-900">Saved for Later</h3>
                                </div>
                                <div className="space-y-4">
                                    {loadingActivity ? (
                                        <div className="flex justify-center p-20"><Loader className="animate-spin text-indigo-600" size={40} /></div>
                                    ) : savedJobs.length === 0 ? (
                                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-[2.5rem] text-center">
                                            <Bookmark className="mx-auto mb-4 text-slate-300" size={40} />
                                            <p className="text-slate-500 font-bold text-lg">Your wishlist is empty.</p>
                                        </div>
                                    ) : (
                                        savedJobs.map(job => (
                                            <div key={job._id} className="bg-white border border-slate-100 p-8 rounded-[2rem] group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <BookmarkCheck size={24} className="text-amber-500" />
                                                </div>
                                                <Link to={`/job-details/${job._id}`} className="text-xl font-black text-slate-900 hover:text-indigo-600 transition-colors block mb-2">{job.jobTitle}</Link>
                                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">{job.companyName} · {job.location}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-lg font-black text-emerald-600">₹{job.payRange?.min?.toLocaleString()} <span className="text-[10px] text-slate-400 uppercase">/ mo</span></p>
                                                    <Link to={`/job-details/${job._id}`} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">View Details</Link>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 15s ease infinite;
                }
            `}</style>
        </div>
    );
};

const BookmarkCheck = ({ className, size }) => (
    <svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l2 2 4-4" />
    </svg>
);

export default ProfilePage;
