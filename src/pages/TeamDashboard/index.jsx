import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, User, Image as ImageIcon, Link as LinkIcon, 
  Tag, Hash, Eye, Globe, Github, 
  Linkedin, Instagram, Twitter, CheckCircle2, AlertCircle,
  Layout, Sparkles, UserCircle, Upload, X, Camera, Loader2
} from 'lucide-react';
import teamService from './teamService';
import { toast } from 'react-toastify';

const TeamDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState({
        image: false,
        cardImage: false,
        image1: false
    });
    
    const fileInputRef = useRef(null);
    const [activeUploadField, setActiveUploadField] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bgText: '',
        description: '',
        image: '',
        cardImage: '',
        image1: '',
        tags: [],
        category: [],
        bgColor: '#ff3358',
        hasBakedText: true,
        socials: {
            linkedin: '',
            instagram: '',
            twitter: ''
        },
        isPublic: false
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role?.toLowerCase() === 'admin') {
            window.location.href = '/team/admin';
            return;
        }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await teamService.getMyProfile(token);
            
            if (response.success) {
                const data = response.data;
                if (data.isNew) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || '',
                        role: data.role || '',
                    }));
                } else {
                    setFormData({
                        ...formData,
                        ...data,
                        tags: data.tags || [],
                        category: data.category || [],
                        socials: {
                            ...formData.socials,
                            ...(data.socials || {})
                        }
                    });
                }
            }
        } catch (error) {
            toast.error('Failed to load profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socials: {
                ...prev.socials,
                [name]: value
            }
        }));
    };

    const handleTagAdd = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim().toUpperCase())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim().toUpperCase()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }));
    };

    const toggleCategory = (cat) => {
        setFormData(prev => ({
            ...prev,
            category: prev.category.includes(cat)
                ? prev.category.filter(c => c !== cat)
                : [...prev.category, cat]
        }));
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file || !activeUploadField) return;

        setUploading(prev => ({ ...prev, [activeUploadField]: true }));
        try {
            const token = localStorage.getItem('token');
            const response = await teamService.uploadImage(file, token);
            if (response.success) {
                setFormData(prev => ({ ...prev, [activeUploadField]: response.url }));
                toast.success(`${activeUploadField} uploaded successfully!`);
            }
        } catch (error) {
            toast.error('Upload failed. Please try again.');
            console.error(error);
        } finally {
            setUploading(prev => ({ ...prev, [activeUploadField]: false }));
            setActiveUploadField(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const triggerUpload = (fieldName) => {
        setActiveUploadField(fieldName);
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await teamService.updateMyProfile(formData, token);
            if (response.success) {
                toast.success('Profile saved successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    const categories = [
        "LEADERSHIP", "TECHNOLOGY", "OPERATIONS", "STRATEGY", 
        "CREATIVE", "PERFORMANCE", "FINANCE", "CONTENT"
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full shadow-[0_0_20px_rgba(255,51,88,0.3)]"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark text-white pt-16 pb-10 px-6 font-roboto relative overflow-hidden">
            {/* Hidden File Input */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp"
            />

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-pink/5 blur-[150px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-brand-pink mb-4"
                        >
                            <Sparkles size={20} />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Private Dashboard</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none"
                        >
                            TEAM <span className="text-brand-pink">DASHBOARD</span>
                        </motion.h1>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-3xl"
                    >
                        <div className="flex items-center gap-3 px-4">
                            <div className={`w-3 h-3 rounded-full ${formData.isPublic ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'}`} />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">
                                {formData.isPublic ? 'LIVE ON WEBSITE' : 'PRIVATE DRAFT'}
                            </span>
                        </div>
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                                formData.isPublic 
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' 
                                    : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                            }`}
                        >
                            {formData.isPublic ? 'TAKE OFFLINE' : 'PUBLISH NOW'}
                        </button>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <UserCircle size={80} />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                <UserCircle className="text-brand-pink" size={28} />
                                <h2 className="text-2xl font-black tracking-tight uppercase">PERSONAL IDENTITY</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-lg"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Professional Role</label>
                                    <input 
                                        type="text" 
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-lg"
                                        placeholder="e.g. Senior Web Developer"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Visual Background Text</label>
                                    <input 
                                        type="text" 
                                        name="bgText"
                                        value={formData.bgText}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium tracking-wide"
                                        placeholder="e.g. TECHNOLOGY / DESIGN"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Hero Section Description</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium tracking-wide resize-none"
                                        placeholder="Write a short professional bio for the hero section slideshow..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Card Glow Color</label>
                                    <div className="flex gap-4 items-center">
                                        <input 
                                            type="color" 
                                            name="bgColor"
                                            value={formData.bgColor || '#ff3358'}
                                            onChange={handleInputChange}
                                            className="w-16 h-16 bg-transparent border-none cursor-pointer rounded-xl overflow-hidden"
                                        />
                                        <input 
                                            type="text"
                                            name="bgColor"
                                            value={formData.bgColor}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-mono text-sm"
                                            placeholder="#HEXCODE"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div>
                                            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">Baked Background Text</h3>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Enable to show floating text behind your portrait</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, hasBakedText: !prev.hasBakedText }))}
                                            className={`w-14 h-8 rounded-full transition-all relative ${formData.hasBakedText ? 'bg-brand-pink' : 'bg-white/10'}`}
                                        >
                                            <motion.div 
                                                animate={{ x: formData.hasBakedText ? 28 : 4 }}
                                                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                <ImageIcon className="text-brand-pink" size={28} />
                                <h2 className="text-2xl font-black tracking-tight uppercase">MEDIA ASSETS</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Hero Portrait (PNG)</label>
                                    <div className="relative group/img aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                        {uploading.image ? (
                                            <Loader2 className="animate-spin text-brand-pink" size={40} />
                                        ) : formData.image ? (
                                            <>
                                                <img src={formData.image} className="w-full h-full object-contain" alt="Hero" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                    <button type="button" onClick={() => triggerUpload('image')} className="p-4 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                        <Camera size={24} />
                                                    </button>
                                                    <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))} className="p-4 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                        <X size={24} />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button type="button" onClick={() => triggerUpload('image')} className="flex flex-col items-center gap-4 group/btn">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-brand-pink/20 transition-colors">
                                                    <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={32} />
                                                </div>
                                                <span className="text-[10px] font-black tracking-widest text-white/20">UPLOAD HERO</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Card Background</label>
                                        <div className="relative h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                                            {uploading.cardImage ? (
                                                <Loader2 className="animate-spin text-brand-pink" size={24} />
                                            ) : formData.cardImage ? (
                                                <>
                                                    <img src={formData.cardImage} className="w-full h-full object-cover" alt="Card" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                        <button type="button" onClick={() => triggerUpload('cardImage')} className="p-2 bg-brand-pink rounded-full">
                                                            <Upload size={16} />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button type="button" onClick={() => triggerUpload('cardImage')} className="text-[10px] font-black tracking-widest text-white/20 uppercase">Upload Card</button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Full Profile Image</label>
                                        <div className="relative h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group/full flex items-center justify-center">
                                            {uploading.image1 ? (
                                                <Loader2 className="animate-spin text-brand-pink" size={24} />
                                            ) : formData.image1 ? (
                                                <>
                                                    <img src={formData.image1} className="w-full h-full object-cover" alt="Full" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/full:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                        <button type="button" onClick={() => triggerUpload('image1')} className="p-2 bg-brand-pink rounded-full">
                                                            <Upload size={16} />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button type="button" onClick={() => triggerUpload('image1')} className="text-[10px] font-black tracking-widest text-white/20 uppercase">Upload Profile</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                <LinkIcon className="text-brand-pink" size={28} />
                                <h2 className="text-2xl font-black tracking-tight uppercase">NETWORKS</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                        <Linkedin size={14} className="text-brand-pink" /> LinkedIn
                                    </label>
                                    <input 
                                        type="text" 
                                        name="linkedin"
                                        value={formData.socials.linkedin}
                                        onChange={handleSocialChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                        placeholder="linkedin.com/in/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                        <Instagram size={14} className="text-brand-pink" /> Instagram
                                    </label>
                                    <input 
                                        type="text" 
                                        name="instagram"
                                        value={formData.socials.instagram}
                                        onChange={handleSocialChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                        placeholder="@username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                        <Twitter size={14} className="text-brand-pink" /> Twitter
                                    </label>
                                    <input 
                                        type="text" 
                                        name="twitter"
                                        value={formData.socials.twitter}
                                        onChange={handleSocialChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                        placeholder="@handle"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                <Tag className="text-brand-pink" size={28} />
                                <h2 className="text-2xl font-black tracking-tight uppercase">EXPERTISE</h2>
                            </div>

                            <div className="space-y-6">
                                <input 
                                    type="text" 
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagAdd}
                                    placeholder="Add skill (Enter)..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map(tag => (
                                        <motion.span 
                                            layout
                                            key={tag} 
                                            className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest"
                                        >
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors opacity-60 hover:opacity-100">
                                                <X size={12} />
                                            </button>
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                <Hash className="text-brand-pink" size={28} />
                                <h2 className="text-2xl font-black tracking-tight uppercase">DEPARTMENT</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleCategory(cat)}
                                        className={`px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border ${
                                            formData.category.includes(cat)
                                                ? 'bg-brand-pink border-brand-pink text-white shadow-[0_10px_20px_rgba(255,51,88,0.3)]'
                                                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:bg-white/10'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-brand-pink hover:bg-white hover:text-brand-pink text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-[0_25px_50px_rgba(255,51,88,0.4)] group"
                        >
                            {saving ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-current border-t-transparent rounded-full" />
                            ) : (
                                <>
                                    <Save size={24} className="group-hover:scale-125 transition-transform" />
                                    <span className="text-lg tracking-[0.2em] uppercase">Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamDashboard;
