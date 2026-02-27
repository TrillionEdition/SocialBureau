import React, { useState, useRef, useEffect } from 'react';
import { Camera, Edit2, Save, X, Upload, Loader, Mail, MapPin, User, Info, CheckCircle2 } from 'lucide-react';
import {
    getUserProfileAPI,
    updateUserProfileAPI,
    updateProfileWithImagesAPI
} from '../..userServices';
import { getUserData, setUserData as setLocalUserData } from '../../utils/authUtils';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [user, setUser] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        location: '',
        coverImage: '',
        avatar: '',
    });

    const [editedUser, setEditedUser] = useState(user);
    const [imageFiles, setImageFiles] = useState({ coverImage: null, avatar: null });
    const coverFileRef = useRef(null);
    const avatarFileRef = useRef(null);

    // Initial Fetch (Logic preserved from your original)
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
                    }
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
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
                name: editedUser.name,
                title: editedUser.title,
                bio: editedUser.bio,
                email: editedUser.email,
                location: editedUser.location,
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
            reader.onload = (event) => {
                setEditedUser(prev => ({ ...prev, [type]: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const displayUser = isEditing ? editedUser : user;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
            {/* Minimal Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">

                        <span className="font-bold tracking-tight text-slate-800 text-sm">ACCOUNT PROFILE</span>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all active:scale-95 shadow-md shadow-slate-200"
                        >
                            <Edit2 size={14} />
                            EDIT PROFILE
                        </button>
                    )}
                </div>
            </div>

            <main className="max-w-5xl mx-auto pb-20 px-6">
                {/* Hero Section */}
                <div className="relative mt-8">
                    {/* Cover Container */}
                    <div className="relative h-60 sm:h-80 w-full rounded-3xl overflow-hidden shadow-sm bg-slate-200">
                        {displayUser.coverImage ? (
                            <img src={displayUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90" />
                        )}

                        {isEditing && (
                            <button
                                onClick={() => coverFileRef.current?.click()}
                                className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"
                            >
                                <div className="bg-white p-3 rounded-full shadow-xl">
                                    <Upload className="text-indigo-600" size={24} />
                                </div>
                                <span className="text-white text-xs font-black uppercase tracking-widest drop-shadow-md">Change Cover</span>
                            </button>
                        )}
                        <input ref={coverFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'coverImage')} className="hidden" />
                    </div>

                    {/* Avatar Overlap */}
                    <div className="absolute -bottom-16 left-10 flex items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-[6px] border-[#F8FAFC] bg-white shadow-xl">
                                {displayUser.avatar ? (
                                    <img src={displayUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-3xl font-bold">
                                        {displayUser.name?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <button
                                    onClick={() => avatarFileRef.current?.click()}
                                    className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Camera size={20} />
                                </button>
                            )}
                            <input ref={avatarFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'avatar')} className="hidden" />
                        </div>
                    </div>
                </div>

                {/* Profile Heading View Mode */}
                {!isEditing && (
                    <div className="mt-20 ml-10">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">{displayUser.name || 'User Name'}</h1>
                        <p className="text-indigo-600 font-semibold text-lg">{displayUser.title || 'Professional Role'}</p>
                    </div>
                )}

                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isEditing ? 'mt-24' : 'mt-10'}`}>
                    {/* Left Sidebar: Contact & Status */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Mail size={18} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                                        <p className="text-sm font-bold text-slate-700 truncate">{displayUser.email || '—'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Location</p>
                                        <p className="text-sm font-bold text-slate-700">{displayUser.location || '—'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {success && (
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-medium animate-in fade-in zoom-in">
                                <CheckCircle2 size={18} /> {success}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
                                <Info size={18} /> {error}
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {isEditing ? (
                            <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl animate-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Display Name</label>
                                        <input
                                            type="text"
                                            value={editedUser.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Job Title</label>
                                        <input
                                            type="text"
                                            value={editedUser.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Short Bio</label>
                                    <textarea
                                        rows={4}
                                        value={editedUser.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-800 font-medium resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-200"
                                    >
                                        {isSaving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => { setIsEditing(false); setEditedUser(user); }}
                                        className="px-8 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in duration-700">
                                <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                        <h3 className="text-sm font-black text-slate-800 tracking-widest uppercase">About Me</h3>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                        {displayUser.bio || "No biography provided yet."}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;