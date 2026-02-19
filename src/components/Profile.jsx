// // import React, { useState, useRef, useEffect } from 'react';
// // import { Camera, Edit2, Save, X, Upload, Loader } from 'lucide-react';
// // import {
// //     getUserProfileAPI,
// //     updateUserProfileAPI,
// //     updateProfileWithImagesAPI
// // } from '../../services/userServices';
// // import { getUserData, setUserData as setLocalUserData } from '../../utils/authUtils'; // Import auth utils

// // const ProfilePage = () => {
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [isSaving, setIsSaving] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [success, setSuccess] = useState(null);

// //     const [user, setUser] = useState({
// //         name: '',
// //         title: '',
// //         bio: '',
// //         email: '',
// //         location: '',
// //         coverImage: '',
// //         avatar: '',
// //     });

// //     const [editedUser, setEditedUser] = useState(user);
// //     const [imageFiles, setImageFiles] = useState({ coverImage: null, avatar: null });
// //     const coverFileRef = useRef(null);
// //     const avatarFileRef = useRef(null);

// //     // Fetch user profile on component mount
// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             try {
// //                 const currentUser = getUserData();

// //                 if (currentUser) {
// //                     // Initialize with local data
// //                     const userData = {
// //                         ...user, // defaults
// //                         ...currentUser
// //                     };
// //                     setUser(userData);
// //                     setEditedUser(userData);

// //                     // Then fetch fresh data from API
// //                     const effectiveUserId = currentUser._id || currentUser.id;
// //                     if (effectiveUserId) {
// //                         try {
// //                             const profileData = await getUserProfileAPI(effectiveUserId);
// //                             if (profileData) {
// //                                 const freshData = { ...userData, ...profileData };
// //                                 setUser(freshData);
// //                                 setEditedUser(freshData);
// //                                 // Update local storage with fresh data
// //                                 setLocalUserData(freshData);
// //                             }
// //                         } catch (apiErr) {
// //                             console.warn('Background profile fetch failed, using local data', apiErr);
// //                             // Don't show error to user if we have local data
// //                         }
// //                     }
// //                 } else {
// //                     // Try to fetch without ID (e.g. via cookie/session if supported)
// //                     const profileData = await getUserProfileAPI();
// //                     setUser(profileData);
// //                     setEditedUser(profileData);
// //                 }
// //                 setError(null);
// //             } catch (err) {
// //                 // Only show error if we have no data at all
// //                 const currentUser = getUserData();
// //                 if (!currentUser) {
// //                     setError('Failed to load profile. Please log in.');
// //                 }
// //                 console.error('Profile fetch error:', err);
// //             }
// //         };

// //         fetchProfile();
// //     }, []);

// //     const handleEditClick = () => {
// //         setEditedUser(user);
// //         setImageFiles({ coverImage: null, avatar: null });
// //         setIsEditing(true);
// //     };

// //     const handleSave = async () => {
// //         try {
// //             setIsSaving(true);
// //             setError(null);
// //             setSuccess(null);

// //             let updatedUserData;
// //             const userId = user._id || user.id;

// //             if (!userId) {
// //                 setError("User ID missing. Cannot save changes.");
// //                 setIsSaving(false);
// //                 return;
// //             }

// //             // Create a clean payload with only necessary fields to avoid noise
// //             const updatePayload = {
// //                 name: editedUser.name,
// //                 title: editedUser.title,
// //                 bio: editedUser.bio,
// //                 email: editedUser.email,
// //                 location: editedUser.location,
// //             };

// //             // If images are selected, use the complete update endpoint
// //             if (imageFiles.coverImage || imageFiles.avatar) {
// //                 const payload = {
// //                     ...updatePayload,
// //                     coverImage: imageFiles.coverImage,
// //                     avatar: imageFiles.avatar
// //                 };
// //                 updatedUserData = await updateProfileWithImagesAPI(userId, payload);
// //             } else {
// //                 // Otherwise, just update profile text data
// //                 updatedUserData = await updateUserProfileAPI(userId, updatePayload);
// //             }

// //             if (updatedUserData) {
// //                 // Merge with existing user data to preserve fields not returned (like tools, achievements)
// //                 const mergedUser = { ...user, ...updatedUserData };

// //                 setUser(mergedUser);
// //                 setEditedUser(mergedUser);
// //                 setLocalUserData(mergedUser); // Update local storage

// //                 setImageFiles({ coverImage: null, avatar: null });
// //                 setIsEditing(false);
// //                 setSuccess('Profile updated successfully!');
// //             }

// //             // Clear success message after 3 seconds
// //             setTimeout(() => setSuccess(null), 3000);
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || err.message || 'Failed to save profile. Please try again.';
// //             setError(errorMsg);
// //             console.error('Profile save error:', {
// //                 message: err.message,
// //                 response: err.response?.data,
// //                 status: err.response?.status
// //             });
// //         } finally {
// //             setIsSaving(false);
// //         }
// //     };

// //     const handleCancel = () => {
// //         setIsEditing(false);
// //         setEditedUser(user);
// //         setImageFiles({ coverImage: null, avatar: null });
// //         setError(null);
// //     };

// //     const handleInputChange = (field, value) => {
// //         setEditedUser(prev => ({
// //             ...prev,
// //             [field]: value
// //         }));
// //     };

// //     const handleCoverImageUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             setImageFiles(prev => ({ ...prev, coverImage: file }));
// //             const reader = new FileReader();
// //             reader.onload = (event) => {
// //                 setEditedUser(prev => ({
// //                     ...prev,
// //                     coverImage: event.target.result
// //                 }));
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const handleAvatarUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             setImageFiles(prev => ({ ...prev, avatar: file }));
// //             const reader = new FileReader();
// //             reader.onload = (event) => {
// //                 setEditedUser(prev => ({
// //                     ...prev,
// //                     avatar: event.target.result
// //                 }));
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const displayUser = isEditing ? editedUser : user;

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
// //             {/* Navigation Bar */}
// //             <div className="backdrop-blur-md bg-slate-900/40 border-b border-slate-700/30 sticky top-0 z-40">
// //                 <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
// //                     <h1 className="text-xl font-semibold text-white">Profile</h1>
// //                     {!isEditing && (
// //                         <button
// //                             onClick={handleEditClick}
// //                             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
// //                         >
// //                             <Edit2 size={18} />
// //                             Edit Profile
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Alert Messages */}
// //             {error && (
// //                 <div className="max-w-5xl mx-auto px-6 mt-4">
// //                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
// //                         {error}
// //                     </div>
// //                 </div>
// //             )}

// //             {success && (
// //                 <div className="max-w-5xl mx-auto px-6 mt-4">
// //                     <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg">
// //                         {success}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* Main Content */}
// //             <div className="max-w-5xl mx-auto px-6 py-8">
// //                 {/* Cover Image Section */}
// //                 <div className="relative mb-20 group">
// //                     <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
// //                         {displayUser.coverImage ? (
// //                             <img
// //                                 src={displayUser.coverImage}
// //                                 alt="Cover"
// //                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //                             />
// //                         ) : (
// //                             <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
// //                                 <span className="text-slate-500">No cover image</span>
// //                             </div>
// //                         )}
// //                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

// //                         {isEditing && (
// //                             <button
// //                                 onClick={() => coverFileRef.current?.click()}
// //                                 className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// //                             >
// //                                 <div className="flex flex-col items-center gap-2 text-white">
// //                                     <Upload size={32} />
// //                                     <span className="text-sm font-medium">Change Cover</span>
// //                                 </div>
// //                             </button>
// //                         )}
// //                         <input
// //                             ref={coverFileRef}
// //                             type="file"
// //                             accept="image/*"
// //                             onChange={handleCoverImageUpload}
// //                             className="hidden"
// //                         />
// //                     </div>

// //                     {/* Avatar Section */}
// //                     <div className="absolute -bottom-20 left-8 group/avatar">
// //                         <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-700">
// //                             {displayUser.avatar ? (
// //                                 <img
// //                                     src={displayUser.avatar}
// //                                     alt="Avatar"
// //                                     className="w-full h-full object-cover"
// //                                 />
// //                             ) : (
// //                                 <div className="w-full h-full bg-slate-700 flex items-center justify-center">
// //                                     <span className="text-slate-500">No avatar</span>
// //                                 </div>
// //                             )}
// //                             {isEditing && (
// //                                 <button
// //                                     onClick={() => avatarFileRef.current?.click()}
// //                                     className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"
// //                                 >
// //                                     <Camera size={28} className="text-white" />
// //                                 </button>
// //                             )}
// //                             <input
// //                                 ref={avatarFileRef}
// //                                 type="file"
// //                                 accept="image/*"
// //                                 onChange={handleAvatarUpload}
// //                                 className="hidden"
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Profile Info Card */}
// //                 <div className="mt-12 bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-2xl">
// //                     {isEditing ? (
// //                         // Edit Mode
// //                         <div className="space-y-6">
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
// //                                 <input
// //                                     type="text"
// //                                     value={editedUser.name}
// //                                     onChange={(e) => handleInputChange('name', e.target.value)}
// //                                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                                 />
// //                             </div>

// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
// //                                 <input
// //                                     type="text"
// //                                     value={editedUser.title}
// //                                     onChange={(e) => handleInputChange('title', e.target.value)}
// //                                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                                 />
// //                             </div>

// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
// //                                 <textarea
// //                                     value={editedUser.bio}
// //                                     onChange={(e) => handleInputChange('bio', e.target.value)}
// //                                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none min-h-24"
// //                                 />
// //                             </div>

// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 <div>
// //                                     <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
// //                                     <input
// //                                         type="email"
// //                                         value={editedUser.email}
// //                                         onChange={(e) => handleInputChange('email', e.target.value)}
// //                                         className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                                     />
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
// //                                     <input
// //                                         type="text"
// //                                         value={editedUser.location}
// //                                         onChange={(e) => handleInputChange('location', e.target.value)}
// //                                         className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
// //                                     />
// //                                 </div>
// //                             </div>

// //                             {/* Action Buttons */}
// //                             <div className="flex gap-4 pt-6 border-t border-slate-700/30">
// //                                 <button
// //                                     onClick={handleSave}
// //                                     disabled={isSaving}
// //                                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors duration-200 font-medium"
// //                                 >
// //                                     {isSaving ? (
// //                                         <>
// //                                             <Loader size={18} className="animate-spin" />
// //                                             Saving...
// //                                         </>
// //                                     ) : (
// //                                         <>
// //                                             <Save size={18} />
// //                                             Save Changes
// //                                         </>
// //                                     )}
// //                                 </button>
// //                                 <button
// //                                     onClick={handleCancel}
// //                                     disabled={isSaving}
// //                                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-lg transition-colors duration-200 font-medium"
// //                                 >
// //                                     <X size={18} />
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     ) : (
// //                         // View Mode
// //                         <div className="space-y-4">
// //                             <div>
// //                                 <h2 className="text-4xl font-bold text-white mb-2">{displayUser.name}</h2>
// //                                 <p className="text-lg text-blue-400 font-medium">{displayUser.title}</p>
// //                             </div>

// //                             <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
// //                                 {displayUser.bio}
// //                             </p>

// //                             <div className="pt-6 border-t border-slate-700/30 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 <div>
// //                                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Email</p>
// //                                     <p className="text-white font-medium">{displayUser.email}</p>
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Location</p>
// //                                     <p className="text-white font-medium">{displayUser.location}</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>

// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;



// import React, { useState, useRef, useEffect } from 'react';
// import { Camera, Edit2, Save, X, Upload, Loader, Mail, MapPin, Briefcase, User, Info } from 'lucide-react';
// import {
//     getUserProfileAPI,
//     updateUserProfileAPI,
//     updateProfileWithImagesAPI
// } from '../../services/userServices';
// import { getUserData, setUserData as setLocalUserData } from '../../utils/authUtils';

// const ProfilePage = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const [user, setUser] = useState({
//         name: '',
//         title: '',
//         bio: '',
//         email: '',
//         location: '',
//         coverImage: '',
//         avatar: '',
//     });

//     const [editedUser, setEditedUser] = useState(user);
//     const [imageFiles, setImageFiles] = useState({ coverImage: null, avatar: null });
//     const coverFileRef = useRef(null);
//     const avatarFileRef = useRef(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const currentUser = getUserData();
//                 if (currentUser) {
//                     const userData = { ...user, ...currentUser };
//                     setUser(userData);
//                     setEditedUser(userData);

//                     const effectiveUserId = currentUser._id || currentUser.id;
//                     if (effectiveUserId) {
//                         const profileData = await getUserProfileAPI(effectiveUserId);
//                         if (profileData) {
//                             const freshData = { ...userData, ...profileData };
//                             setUser(freshData);
//                             setEditedUser(freshData);
//                             setLocalUserData(freshData);
//                         }
//                     }
//                 }
//             } catch (err) {
//                 console.error('Profile fetch error:', err);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleSave = async () => {
//         try {
//             setIsSaving(true);
//             setError(null);
//             const userId = user._id || user.id;

//             const updatePayload = {
//                 name: editedUser.name,
//                 title: editedUser.title,
//                 bio: editedUser.bio,
//                 email: editedUser.email,
//                 location: editedUser.location,
//             };

//             let updatedUserData;
//             if (imageFiles.coverImage || imageFiles.avatar) {
//                 const payload = { ...updatePayload, coverImage: imageFiles.coverImage, avatar: imageFiles.avatar };
//                 updatedUserData = await updateProfileWithImagesAPI(userId, payload);
//             } else {
//                 updatedUserData = await updateUserProfileAPI(userId, updatePayload);
//             }

//             const mergedUser = { ...user, ...updatedUserData };
//             setUser(mergedUser);
//             setLocalUserData(mergedUser);
//             setIsEditing(false);
//             setSuccess('Profile updated successfully!');
//             setTimeout(() => setSuccess(null), 3000);
//         } catch (err) {
//             setError(err.message || 'Failed to save profile.');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleInputChange = (field, value) => {
//         setEditedUser(prev => ({ ...prev, [field]: value }));
//     };

//     const handleImagePreview = (e, type) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFiles(prev => ({ ...prev, [type]: file }));
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setEditedUser(prev => ({ ...prev, [type]: event.target.result }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const displayUser = isEditing ? editedUser : user;

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
//             {/* Top Navigation */}
//             <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800/50">
//                 <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
//                             <User size={18} className="text-white" />
//                         </div>
//                         <span className="font-bold tracking-tight text-white">USER SETTINGS</span>
//                     </div>

//                     {!isEditing && (
//                         <button
//                             onClick={() => setIsEditing(true)}
//                             className="group flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white rounded-full border border-slate-700 transition-all active:scale-95"
//                         >
//                             <Edit2 size={14} className="group-hover:rotate-12 transition-transform" />
//                             Edit Profile
//                         </button>
//                     )}
//                 </div>
//             </nav>

//             <main className="max-w-6xl mx-auto pb-20">
//                 {/* Header Section */}
//                 <div className="relative px-4 sm:px-6">
//                     {/* Cover Photo */}
//                     <div className="relative h-48 sm:h-72 w-full mt-6 rounded-3xl overflow-hidden group shadow-2xl bg-slate-800">
//                         {displayUser.coverImage ? (
//                             <img src={displayUser.coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//                         ) : (
//                             <div className="w-full h-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 opacity-50" />
//                         )}

//                         {isEditing && (
//                             <button
//                                 onClick={() => coverFileRef.current?.click()}
//                                 className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"
//                             >
//                                 <Upload className="text-white animate-bounce" />
//                                 <span className="text-white text-sm font-bold uppercase tracking-widest">Replace Cover</span>
//                             </button>
//                         )}
//                         <input ref={coverFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'coverImage')} className="hidden" />
//                     </div>

//                     {/* Avatar & Basic Info */}
//                     <div className="relative -mt-16 sm:-mt-24 px-8 flex flex-col sm:flex-row items-end gap-6">
//                         <div className="relative group/avatar">
//                             <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-[2.5rem] overflow-hidden border-[6px] border-[#0f172a] bg-slate-800 shadow-2xl relative z-10">
//                                 {displayUser.avatar ? (
//                                     <img src={displayUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 uppercase text-3xl font-bold">
//                                         {displayUser.name?.charAt(0) || 'U'}
//                                     </div>
//                                 )}
//                             </div>

//                             {isEditing && (
//                                 <button
//                                     onClick={() => avatarFileRef.current?.click()}
//                                     className="absolute inset-0 z-20 m-[6px] rounded-[2.2rem] bg-black/50 backdrop-blur-sm opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center"
//                                 >
//                                     <Camera size={32} className="text-white" />
//                                 </button>
//                             )}
//                             <input ref={avatarFileRef} type="file" accept="image/*" onChange={(e) => handleImagePreview(e, 'avatar')} className="hidden" />
//                         </div>

//                         {!isEditing && (
//                             <div className="mb-4 sm:mb-8 flex-1">
//                                 <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{displayUser.name || 'Anonymous User'}</h1>
//                                 <p className="text-blue-400 font-medium text-lg">{displayUser.title || 'Professional Title'}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Notifications */}
//                 <div className="px-6 mt-8">
//                     {error && (
//                         <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
//                             <Info size={18} /> {error}
//                         </div>
//                     )}
//                     {success && (
//                         <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
//                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {success}
//                         </div>
//                     )}
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 mt-4">
//                     {/* Sidebar Info */}
//                     <div className="space-y-6">
//                         <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-[2rem] backdrop-blur-sm">
//                             <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Contact Details</h3>
//                             <div className="space-y-5">
//                                 <div className="flex items-center gap-4 group">
//                                     <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
//                                         <Mail size={18} />
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-slate-500 font-bold uppercase">Email Address</p>
//                                         <p className="text-sm font-medium text-slate-200">{displayUser.email || 'Not provided'}</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-4 group">
//                                     <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
//                                         <MapPin size={18} />
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] text-slate-500 font-bold uppercase">Location</p>
//                                         <p className="text-sm font-medium text-slate-200">{displayUser.location || 'Remote / Unknown'}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Content Area */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {isEditing ? (
//                             <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem] space-y-6 animate-in zoom-in-95 duration-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="space-y-2">
//                                         <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
//                                         <input
//                                             type="text"
//                                             value={editedUser.name}
//                                             onChange={(e) => handleInputChange('name', e.target.value)}
//                                             className="w-full px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-white"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="text-xs font-bold text-slate-400 uppercase ml-1">Job Title</label>
//                                         <input
//                                             type="text"
//                                             value={editedUser.title}
//                                             onChange={(e) => handleInputChange('title', e.target.value)}
//                                             className="w-full px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-white"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="text-xs font-bold text-slate-400 uppercase ml-1">Biography</label>
//                                     <textarea
//                                         rows={4}
//                                         value={editedUser.bio}
//                                         onChange={(e) => handleInputChange('bio', e.target.value)}
//                                         className="w-full px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-white resize-none"
//                                         placeholder="Tell us about yourself..."
//                                     />
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="space-y-2">
//                                         <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
//                                         <input
//                                             type="email"
//                                             value={editedUser.email}
//                                             onChange={(e) => handleInputChange('email', e.target.value)}
//                                             className="w-full px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-white"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="text-xs font-bold text-slate-400 uppercase ml-1">Location</label>
//                                         <input
//                                             type="text"
//                                             value={editedUser.location}
//                                             onChange={(e) => handleInputChange('location', e.target.value)}
//                                             className="w-full px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-white"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="flex gap-4 pt-4">
//                                     <button
//                                         onClick={handleSave}
//                                         disabled={isSaving}
//                                         className="flex-1 h-12 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
//                                     >
//                                         {isSaving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
//                                         Save Changes
//                                     </button>
//                                     <button
//                                         onClick={() => { setIsEditing(false); setEditedUser(user); }}
//                                         className="px-8 h-12 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all active:scale-95"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                                 <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem]">
//                                     <div className="flex items-center gap-3 mb-6">
//                                         <div className="w-2 h-8 bg-blue-500 rounded-full" />
//                                         <h3 className="text-lg font-bold text-white tracking-tight uppercase">About Me</h3>
//                                     </div>
//                                     <p className="text-slate-300 text-lg leading-relaxed italic font-serif">
//                                         {displayUser.bio || "This user hasn't written a bio yet. Stay tuned for updates!"}
//                                     </p>
//                                 </div>

//                                 {/* Placeholder for Stats or Achievements */}
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                                     {[
//                                         { label: 'Status', val: 'Active', color: 'text-emerald-400' },
//                                         { label: 'Member Since', val: '2024', color: 'text-blue-400' },
//                                         { label: 'Account Type', val: 'Standard', color: 'text-purple-400' }
//                                     ].map((stat, i) => (
//                                         <div key={i} className="bg-slate-800/20 border border-slate-700/30 p-4 rounded-2xl text-center">
//                                             <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{stat.label}</p>
//                                             <p className={`text-sm font-bold ${stat.color}`}>{stat.val}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProfilePage;



import React, { useState, useRef, useEffect } from 'react';
import { Camera, Edit2, Save, X, Upload, Loader, Mail, MapPin, User, Info, CheckCircle2 } from 'lucide-react';
import {
    getUserProfileAPI,
    updateUserProfileAPI,
    updateProfileWithImagesAPI
} from '../../services/userServices';
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
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
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
            </nav>

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