import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Scale,
    Briefcase,
    Globe,
    Megaphone,
    Wallet,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Upload,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    Twitter,
    MessageCircle,
    Music2,
    MoreHorizontal,
    FileText,
    MousePointer2,
    Users,
    Plus,
    Trash2,
    MapPin,
    AlertCircle,
    Check,
    User,
    Image as ImageIcon,
    ExternalLink
} from 'lucide-react';

const items = [
    { value: "7", label: "Sections" },
    { value: "48h", label: "Response Time" },
    { value: "100%", label: "Confidential" },
    { value: "0₹", label: "Discovery Cost" },
];

const SocialLogo = ({ platform }) => {
    const logos = {
        ig: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
        fb: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
        yt: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
        li: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
        tw: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z",
        wa: "M17.472 14.382c-.301-.149-1.767-.872-2.04-.971-.272-.099-.47-.149-.667.149-.198.298-.767.971-.941 1.171-.173.199-.347.224-.648.075-.301-.149-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.673-2.083-.174-.299-.018-.46.132-.609.134-.134.301-.351.451-.527.149-.176.199-.299.299-.497.099-.199.049-.373-.025-.521-.075-.149-.667-1.611-.914-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.871 1.213 3.07c.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.015-1.419.247-.698.247-1.291.173-1.418-.074-.128-.272-.204-.573-.353zm-5.467 7.426l-.004.001c-1.84 0-3.644-.496-5.215-1.434l-.374-.224-3.876 1.016 1.034-3.778-.246-.392c-.933-1.486-1.425-3.199-1.425-4.962 0-5.216 4.244-9.46 9.462-9.46 2.528 0 4.904.985 6.69 2.774a9.404 9.404 0 0 1 2.769 6.686c0 5.217-4.246 9.461-9.464 9.461zm0-21.053C5.558.755.004 6.31.004 13.165c0 2.19.573 4.329 1.659 6.213L0 23.245l3.982-1.044a12.355 12.355 0 0 0 6.183 1.654h.005c6.852 0 12.407-5.555 12.407-12.208 0-3.411-1.328-6.618-3.742-9.032C16.42 1.401 13.568.75 12.005.75z",
        tk: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.08 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.74-1.49 5.66-1.04v4.28c-.92-.26-1.91-.2-2.79.23-.82.4-1.49 1.09-1.81 1.93-.35.82-.39 1.75-.17 2.6.32 1.25 1.2 2.33 2.32 2.86.84.41 1.79.53 2.71.4.92-.13 1.79-.54 2.45-1.21.78-.81 1.19-1.92 1.2-3.05-.01-4.75.01-9.51-.01-14.26z"
    };
    return (logos[platform] ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#E8242A">
            <path d={logos[platform]} />
        </svg>
    ) : <MoreHorizontal className="text-red-600" size={20} />);
};

const ClientFormaji = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLandingVisible, setIsLandingVisible] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState({ msg: '', type: '' });

    const [formData, setFormData] = useState({
        // Section 0: Company Profile
        legalName: '',
        brandName: '',
        companyType: '',
        incYear: '',
        cin: '',
        gst: '',
        regAddress: '',
        regCity: '',
        regDistrict: '',
        regPin: '',
        svcAddress: '',
        svcCity: '',
        svcDistrict: '',
        svcPin: '',
        contactName: '',
        contactDesig: '',
        contactPhone: '',
        contactEmail: '',
        partnersList: [{ name: '', role: '' }],
        brandFace: '',
        brandFaceLink: '',

        // Section 1: Legal & Documents
        legalChecks: [],
        legalPending: '',
        legalQuery: '',
        uploadedFiles: {}, // Will store Cloudinary URLs

        // Section 2: Services
        coreOffering: '',
        serviceCategories: [],
        otherServices: '',
        targetAudience: '',
        ageGroup: '',
        geoExpansion: '',
        currentOps: [''],
        expansionTarget: [''],
        mktFocus: '',
        usp: '',
        enrolled: '',
        successRate: '',

        // Section 3: Digital Presence
        website: '',
        webStatus: '',
        socialMedia: {
            ig: '', fb: '', yt: '', li: '', tw: '', wa: '', tk: '', other: '', otherName: ''
        },
        igFollowers: '',
        fbFollowers: '',
        ytSubs: '',
        gmb: '',
        gmbReviews: '',
        assetOwnership: '',
        accessIssues: '',

        // Section 4: Marketing
        hasAgency: '',
        agencyName: '',
        currentMktActivities: '',
        leadVolume: '',
        leadConversion: '',
        leadSources: [], // { label, link }
        engRate: '',
        postFreq: '',
        mktChallenges: '',
        servicesNeeded: [], // { label, link }
        mktGoals: '',

        // Section 5: Budget & Timeline
        selectedBudget: '',
        adSpend: '',
        contractDur: '',
        startDate: '',
        milestone: '',
        decisionProcess: '',
        anythingElse: '',
        referralSource: '',
        referredBy: '',
        partnersList: [{ name: '', role: '' }]
    });

    const handleListChange = (field, index, value) => {
        setFormData(prev => {
            const list = [...prev[field]];
            list[index] = value;
            return { ...prev, [field]: list };
        });
    };

    const addListItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeListItem = (field, index) => {
        setFormData(prev => {
            const list = [...prev[field]];
            if (list.length > 1) {
                list.splice(index, 1);
                return { ...prev, [field]: list };
            }
            return prev;
        });
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const list = [...prev[field]];
            if (list.includes(value)) {
                return { ...prev, [field]: list.filter(item => item !== value) };
            }
            return { ...prev, [field]: [...list, value] };
        });
    };

    const handlePartnerChange = (index, field, value) => {
        setFormData(prev => {
            const newList = [...prev.partnersList];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, partnersList: newList };
        });
    };

    const addPartner = () => {
        setFormData(prev => ({
            ...prev,
            partnersList: [...prev.partnersList, { name: '', role: '' }]
        }));
    };

    const removePartner = (index) => {
        setFormData(prev => ({
            ...prev,
            partnersList: prev.partnersList.filter((_, i) => i !== index)
        }));
    };

    const handlePartnerFileUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus({ msg: `Uploading ${file.name} to secure storage...`, type: 'loading' });

        try {
            const url = await uploadToCloudinary(file);
            if (url) {
                setFormData(prev => {
                    const newList = [...prev.partnersList];
                    newList[index] = { 
                        ...newList[index], 
                        photo: { name: file.name, url, uploadedAt: new Date().toISOString() } 
                    };
                    return { ...prev, partnersList: newList };
                });
                setStatus({ msg: 'Partner photo secured.', type: 'success' });
            }
        } catch (err) {
            setStatus({ msg: 'Partner photo upload failed.', type: 'error' });
        }
    };

    const handleLinkCheckboxChange = (group, value) => {
        setFormData(prev => {
            const current = prev[group] || [];
            const exists = current.find(item => item.label === value);
            if (exists) {
                return { ...prev, [group]: current.filter(item => item.label !== value) };
            } else {
                return { ...prev, [group]: [...current, { label: value, link: '' }] };
            }
        });
    };

    const updateLinkValue = (group, label, link) => {
        setFormData(prev => ({
            ...prev,
            [group]: prev[group].map(item => item.label === label ? { ...item, link } : item)
        }));
    };

    const steps = [
        { name: 'Company', icon: <Building2 size={14} /> },
        { name: 'Legal', icon: <Scale size={14} /> },
        { name: 'Services', icon: <Briefcase size={14} /> },
        { name: 'Digital', icon: <Globe size={14} /> },
        { name: 'Marketing', icon: <Megaphone size={14} /> },
        { name: 'Project', icon: <Wallet size={14} /> },
        { name: 'Review', icon: <CheckCircle2 size={14} /> }
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSocialChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: { ...prev.socialMedia, [id]: value }
        }));
    };

    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'social_bureau');
        data.append('cloud_name', 'dtwcgfmar');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dtwcgfmar/image/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            return result.secure_url;
        } catch (err) {
            console.error('Upload failed', err);
            return null;
        }
    };

    const handleFileUpload = async (id, e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        
        setStatus({ msg: `Uploading ${files.length} asset(s) to secure storage...`, type: 'loading' });

        try {
            const urls = [];
            for (const file of files) {
                const url = await uploadToCloudinary(file);
                if (url) {
                    urls.push({ 
                        name: file.name, 
                        url, 
                        type: file.type,
                        size: (file.size / 1024).toFixed(2) + ' KB',
                        uploadedAt: new Date().toISOString()
                    });
                }
            }

            setFormData(prev => ({
                ...prev,
                uploadedFiles: {
                    ...prev.uploadedFiles,
                    [id]: [...(prev.uploadedFiles[id] || []), ...urls]
                }
            }));
            setStatus({ msg: 'Cloudinary link secured and mapped to intelligence dossier.', type: 'success' });
        } catch (err) {
            console.error('File processing error:', err);
            setStatus({ msg: 'Asset transmission failed. Please check connection.', type: 'error' });
        }
    };

    const getStepStatus = (idx) => {
        switch (idx) {
            case 0: // Company
                const req0 = ['legalName', 'companyType', 'incYear', 'regAddress', 'contactName', 'contactPhone', 'contactEmail'];
                return req0.every(f => formData[f]);
            case 1: // Legal
                return true; // Mostly optional uploads
            case 2: // Services & Expansion
                const hasOps = formData.currentOps.some(loc => loc && loc.trim() !== '');
                return !!(formData.coreOffering && formData.targetAudience && formData.mktFocus && hasOps);
            case 3: // Digital
                const hasSocial = Object.values(formData.socialMedia).some(val => val && val.trim() !== '');
                return !!(formData.website || hasSocial);
            case 4: // Marketing & Lead Sources
                return true; // Mostly optional feedback
            case 5: // Budget & Timeline
                return !!(formData.selectedBudget && formData.contractDur && formData.startDate);
            default:
                return true;
        }
    };

    const goTo = (n) => {
        if (n >= 0 && n < steps.length) {
            setCurrentStep(n);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const submitAll = async () => {
        const incompleteSteps = [0, 1, 2, 3, 5].filter(idx => !getStepStatus(idx));

        if (incompleteSteps.length > 0) {
            const firstIncomplete = incompleteSteps[0];
            setStatus({
                msg: `⚠ Section "${steps[firstIncomplete].name}" is incomplete. Please complete all required fields before transmission.`,
                type: 'error'
            });
            goTo(firstIncomplete);
            return;
        }

        setStatus({ msg: 'Submitting and saving to all workspaces...', type: 'loading' });

        try {
            // Import the service dynamically or use it if imported at top
            const ajnoraService = (await import('../../services/ajnoraService')).default;
            await ajnoraService.createEntry({
                ...formData,
                project: formData.brandName || 'Ajinora Phase 01'
            });
            setIsSubmitted(true);
        } catch (error) {
            setStatus({ msg: 'Submission failed: ' + (error.message || error), type: 'error' });
        }
    };

    const nextStep = () => goTo(currentStep + 1);
    const prevStep = () => goTo(currentStep - 1);

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#050505] text-white font-['DM_Sans'] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="max-w-2xl w-full text-center space-y-6 py-16 px-8 border border-white/10 rounded-3xl bg-[#0d0d0d]/80 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(232,36,42,0.4)]"
                        >
                            <CheckCircle2 size={48} className="text-white" />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-red-600 rounded-full blur-2xl -z-10"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-6xl font-['Bebas_Neue'] tracking-wider leading-none">Dossier <span className="text-red-600">Transmitted</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto font-medium">
                            Phase 01 intake for <span className="text-white font-bold">{formData.brandName || formData.legalName}</span> has been securely uploaded to Social Bureau's Strategy Lab.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-8 border-y border-white/5">
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Status</p>
                            <p className="text-xs font-bold text-green-500 uppercase">Verified</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Protocol</p>
                            <p className="text-xs font-bold text-red-500 uppercase">Phase 01</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Queue</p>
                            <p className="text-xs font-bold text-white uppercase">Priority</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <a href='/ajnoradashboard'>
                        <button className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-full font-black uppercase text-[11px] tracking-widest transition-all shadow-lg shadow-red-600/20">
                            Access Intelligence Portal
                        </button>
                        </a>
                        <button onClick={() => window.location.reload()} className="px-10 py-4 border border-white/10 hover:bg-white/5 rounded-full font-black uppercase text-[11px] tracking-widest transition-all">
                            New Onboarding
                        </button>
                    </div>

                    <div className="pt-4 text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">
                        Secure Link Established · Social Bureau Strategy Lab
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-['DM_Sans'] selection:bg-red-600/30 selection:text-red-500">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
        }

        .glass-card {
          background: rgba(17, 17, 17, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .input-glow:focus {
          box-shadow: 0 0 15px rgba(232, 19, 42, 0.15);
          border-color: #e8132a;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <div className="noise-overlay fixed inset-0 opacity-40" />

            <AnimatePresence>
                {isLandingVisible && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center text-black p-6 overflow-hidden"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-red-600/5 to-transparent blur-3xl" />

                        <div className="absolute top-8 left-8 w-14 h-14 border-t-2 border-l-2 border-red-600/20" />
                        <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-red-600/20" />
                        <div className="absolute bottom-8 left-8 w-14 h-14 border-b-2 border-l-2 border-red-600/20" />
                        <div className="absolute bottom-8 right-8 w-14 h-14 border-b-2 border-r-2 border-red-600/20" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center relative z-10 space-y-6"
                        >
                            <div className="flex justify-center mb-8">
                                <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777127379/SB_logo_-_black_1_as6til.png" alt="Social Bureau" className="h-12 w-auto" />
                            </div>

                            <div className="flex items-center gap-4 justify-center">
                                <div className="h-px w-8 bg-red-600/40" />
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600">Phase 01 — Discovery</span>
                                <div className="h-px w-8 bg-red-600/40" />
                            </div>

                            <h1 className="text-8xl md:text-[10rem] font-['Bebas_Neue'] tracking-tight leading-[0.8]">
                                Client <span className="text-red-600">Intake</span>
                            </h1>

                            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue'] tracking-widest text-gray-400 uppercase">
                                Data Integration Portal
                            </h2>

                            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xl flex items-center gap-6 mx-auto max-w-md my-10">
                                <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777124347/ajnorah_bapakr.png" alt="Ajinorah" className="h-10" />
                                <div className="h-8 w-px bg-gray-200" />
                                <div className="text-left">
                                    <p className="text-sm font-bold font-['DM_Sans']">Ajinora Education Consulting</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">CLIENT-202-00</p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsLandingVisible(false)}
                                className="group relative inline-flex items-center gap-4 bg-red-600 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_10px_40px_rgba(232,19,42,0.35)] hover:shadow-[0_15px_50px_rgba(232,19,42,0.5)] transition-all overflow-hidden"
                            >
                                Begin Onboarding
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </motion.button>

                            <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-8">
                                <span>API Driven</span>
                                <div className="w-1 h-1 rounded-full bg-red-600" />
                                <span>Data First</span>
                                <div className="w-1 h-1 rounded-full bg-red-600" />
                                <span>Strategy Lab</span>
                            </div>

                               <div className="mt-10 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-6 flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            
            {/* Item */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wide text-black leading-none">
                {item.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
                {item.label}
              </span>
            </div>

            {/* Separator */}
            {index !== items.length - 1 && (
              <div className="w-px h-8 bg-gray-200 mx-6" />
            )}
          </div>
        ))}
      </div>
    </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="sticky top-0 z-[150] bg-[#0A0A0A]/95 border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777127379/SB_logo_-_black_1_as6til.png" alt="SB" className="h-8 w-auto" />
                        <div className="h-6 w-px bg-white/10" />
                        <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777124347/ajnorah_bapakr.png" alt="Ajinorah" className="h-6 w-auto" />
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progress</span>
                        <div className="w-48 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs font-mono text-red-500 ml-2 font-bold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">
                <header className="mb-8 flex justify-between items-end gap-6 flex-wrap">
                    <div className="space-y-2">
                        <div className="logo font-['Bebas_Neue'] text-2xl text-red-600 tracking-widest">Social Bureau</div>
                        <h1 className="text-6xl md:text-8xl font-['Bebas_Neue'] leading-[0.9] text-white">
                            Client<br />Intake<br /><span className="text-red-600">Form</span>
                        </h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Kerala's Data-Driven API Marketing Agency</p>
                    </div>
                    <div className="text-right space-y-2">
                        <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">Phase 01 — Discovery</span>
                        <div className="text-[11px] font-mono text-gray-600">CLIENT-2025-001</div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase">Ajinora Education Consulting</div>
                    </div>
                </header>

                <div className="flex gap-0 mb-8 border border-white/5 rounded overflow-hidden">
                    {steps.map((step, idx) => {
                        const isComplete = getStepStatus(idx);
                        return (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                className={`flex-1 py-2 text-center transition-all border-r border-white/5 last:border-none ${idx === currentStep
                                    ? 'bg-red-600 text-white'
                                    : idx < currentStep
                                        ? 'bg-[#1A1A1A] text-gray-400'
                                        : 'bg-[#111] text-gray-600 hover:text-gray-400'
                                    }`}
                            >
                                <div className="text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                                    {step.name}
                                    {isComplete && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 size={10} className={idx === currentStep ? "text-white" : "text-green-500"} />
                                        </motion.div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-lg p-6 relative"
                >
                    {/* SECTION 0: COMPANY PROFILE */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">01 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Company Profile</h2>
                                <p className="text-gray-500 text-sm mt-1">Basic company identification, registration details, and office locations.</p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Legal Company Name <span className="text-red-600">*</span></label>
                                    <input id="legalName" value={formData.legalName} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. Ajinora Education Consulting Pvt Ltd" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        Brand Logo
                                        {formData.uploadedFiles['logo']?.length > 0 && <CheckCircle2 size={12} className="text-green-500" />}
                                    </label>
                                    <div className={`relative group overflow-hidden border border-dashed rounded bg-[#0d0d0d] p-4 text-center transition-all ${formData.uploadedFiles['logo']?.length > 0 ? 'border-green-600/50 bg-green-600/5' : 'border-white/10'}`}>
                                        <input type="file" onChange={(e) => handleFileUpload('logo', e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        <div className="flex items-center justify-center gap-3">
                                            {formData.uploadedFiles['logo']?.length > 0 ? (
                                                <>
                                                    <div className="w-10 h-10 bg-white/5 rounded p-1 flex items-center justify-center overflow-hidden border border-white/10">
                                                        <img src={formData.uploadedFiles['logo'][0].url} alt="Logo" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Logo Uploaded</div>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={16} className="text-white/20" />
                                                    <div className="text-[10px] font-bold text-gray-500">Upload Official Logo</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Brand / Trade Name</label>
                                    <input id="brandName" value={formData.brandName} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. Ajinorah" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Brand Tagline / Slogan</label>
                                    <input id="brandTagline" value={formData.brandTagline} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="The core message of your brand" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Company Type <span className="text-red-600">*</span></label>
                                    <select id="companyType" value={formData.companyType} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select type</option>
                                        <option>Private Limited (Pvt Ltd)</option>
                                        <option>LLP</option>
                                        <option>Partnership Firm</option>
                                        <option>Proprietorship</option>
                                        <option>Trust / NGO</option>
                                        <option>Other</option>
                                    </select>
                                    {formData.companyType === 'Other' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                                            <input 
                                                id="otherCompanyType" 
                                                value={formData.otherCompanyType} 
                                                onChange={handleInputChange} 
                                                className="w-full bg-[#050505] border border-red-600/30 rounded px-4 py-2 text-xs text-red-500 focus:outline-none focus:border-red-600" 
                                                placeholder="Please specify your company type..." 
                                            />
                                        </motion.div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Year of Incorporation <span className="text-red-600">*</span></label>
                                    <input id="incYear" value={formData.incYear} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 2022" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">CIN / Registration Number</label>
                                    <input id="cin" value={formData.cin} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. U85100KL2022PTC..." />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">GST Number</label>
                                    <input id="gst" value={formData.gst} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 32AAAAA0000A1ZX" />
                                </div>
                            </div>

                            <div className="pt-6 border-l-2 border-red-600 pl-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Registered Office</h3>
                                    <p className="text-[10px] text-gray-600 mt-1 uppercase">The legal address as per incorporation documents</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Full Address <span className="text-red-600">*</span></label>
                                        <input id="regAddress" value={formData.regAddress} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Building, Street, Area" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">City</label>
                                            <input id="regCity" value={formData.regCity} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. Kochi" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">District</label>
                                            <input id="regDistrict" value={formData.regDistrict} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. Ernakulam" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">PIN Code</label>
                                            <input id="regPin" value={formData.regPin} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="682XXX" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-l-2 border-red-600 pl-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Service / Operational Office</h3>
                                    <p className="text-[10px] text-gray-600 mt-1 uppercase">Where day-to-day operations run (if different)</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Full Address</label>
                                        <input id="svcAddress" value={formData.svcAddress} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Building, Street, Area" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">City</label>
                                            <input id="svcCity" value={formData.svcCity} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">District</label>
                                            <input id="svcDistrict" value={formData.svcDistrict} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">PIN Code</label>
                                            <input id="svcPin" value={formData.svcPin} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Primary Contact</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Contact Person Name <span className="text-red-600">*</span></label>
                                        <input id="contactName" value={formData.contactName} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Full name" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Designation</label>
                                        <input id="contactDesig" value={formData.contactDesig} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. CEO / Managing Partner" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Phone / WhatsApp <span className="text-red-600">*</span></label>
                                        <input id="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="+91 98XXX XXXXX" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Email Address <span className="text-red-600">*</span></label>
                                        <input id="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="email@company.com" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Partners & Stakeholders</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Directors / Partners (names & roles)</label>
                                        <button onClick={addPartner} className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:opacity-70 flex items-center gap-1">
                                            <Plus size={12} /> Add Partner
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {formData.partnersList.map((partner, idx) => (
                                            <div key={idx} className="flex gap-2 items-start bg-black/20 p-3 rounded-xl border border-white/5 relative group">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[9px] text-gray-600 uppercase font-bold">Name</span>
                                                        <input 
                                                            value={partner.name} 
                                                            onChange={(e) => handlePartnerChange(idx, 'name', e.target.value)}
                                                            className="bg-[#111] border border-white/5 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-red-600 transition-all"
                                                            placeholder="Partner Name"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[9px] text-gray-600 uppercase font-bold">Role & Identity</span>
                                                            {partner.photo && <span className="text-[8px] text-green-500 font-black">ID PHOTO SECURED</span>}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <input 
                                                                value={partner.role} 
                                                                onChange={(e) => handlePartnerChange(idx, 'role', e.target.value)}
                                                                className="flex-1 bg-[#111] border border-white/5 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-red-600 transition-all"
                                                                placeholder="e.g. Managing Director"
                                                            />
                                                            <div className="relative group overflow-hidden border border-dashed border-white/10 rounded bg-black/40 px-3 flex items-center justify-center hover:border-red-600 transition-all">
                                                                <input type="file" onChange={(e) => handlePartnerFileUpload(idx, e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                                {partner.photo ? (
                                                                    <CheckCircle2 size={12} className="text-green-500" />
                                                                ) : (
                                                                    <User size={12} className="text-white/20" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {formData.partnersList.length > 1 && (
                                                    <button onClick={() => removePartner(idx)} className="mt-5 p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-600/10 rounded-lg transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                                            Brand Face / Public Spokesperson
                                            {formData.uploadedFiles['brand_face_img']?.length > 0 && <span className="text-[9px] text-green-500 font-black">IMAGE SECURED</span>}
                                        </label>
                                        <div className="flex gap-4">
                                            <input id="brandFace" value={formData.brandFace} onChange={handleInputChange} className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Person who represents the brand publicly" />
                                            <div className="relative group overflow-hidden border border-dashed border-white/10 rounded bg-[#0d0d0d] px-4 flex items-center justify-center hover:border-red-600 transition-all">
                                                <input type="file" onChange={(e) => handleFileUpload('brand_face_img', e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                {formData.uploadedFiles['brand_face_img']?.length > 0 ? (
                                                    <CheckCircle2 size={16} className="text-green-500" />
                                                ) : (
                                                    <ImageIcon size={16} className="text-white/20" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Brand Face Portfolio Link</label>
                                        <input id="brandFaceLink" value={formData.brandFaceLink} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="LinkedIn / IG URL" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 1: LEGAL & DOCUMENTS */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">02 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Legal & Documents</h2>
                                <p className="text-gray-500 text-sm mt-1">Upload incorporation certificates, licenses, and tell us about your legal compliance status.</p>
                            </section>

                            <div className="bg-[#0e1a0e] border border-[#1a2e1a] rounded p-4 text-[13px] text-[#8fbe8f] leading-relaxed">
                                <strong className="text-[#aae0aa]">Why we collect this:</strong> Social Bureau has in-house legal expertise to help clients navigate business registration, IP protection, and platform compliance.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'inc_cert', label: 'Incorporation Certificate', desc: 'COI / Registration' },
                                    { id: 'gst_cert', label: 'GST Registration', desc: 'GSTIN Certificate' },
                                    { id: 'trade_lic', label: 'Trade License', desc: 'Local body trade license' },
                                    { id: 'brand_book', label: 'Brand Style Guide', desc: 'Logos & Visual Guidelines' },
                                    { id: 'logo', label: 'Company Logo', desc: 'Official Vector or HD Logo' },
                                    { id: 'partner_port', label: 'Partner Portfolio', desc: 'Partner profiles, credentials' },
                                    { id: 'other_docs', label: 'Other Supporting Docs', desc: 'MoUs, agreements, permits' }
                                ].map(file => (
                                    <div key={file.id} className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            {file.label}
                                            {formData.uploadedFiles[file.id]?.length > 0 && <CheckCircle2 size={12} className="text-green-500" />}
                                        </label>
                                        <div className={`relative group overflow-hidden border border-dashed rounded bg-[#0d0d0d] p-6 text-center transition-all ${formData.uploadedFiles[file.id]?.length > 0 
                                            ? 'border-green-600/50 bg-green-600/10 shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]' 
                                            : 'border-white/10 hover:border-red-600 hover:bg-[#150000]'}`}>
                                            <input type="file" multiple={file.id === 'partner_port' || file.id === 'other_docs'} onChange={(e) => handleFileUpload(file.id, e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            
                                            {formData.uploadedFiles[file.id] && formData.uploadedFiles[file.id].length > 0 ? (
                                                <>
                                                    <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-green-600 px-2 py-0.5 rounded-full shadow-lg">
                                                        <CheckCircle2 className="text-white" size={10} />
                                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Link Secured</span>
                                                    </div>
                                                    <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <CheckCircle2 className="text-green-500" size={24} />
                                                    </div>
                                                    <div className="text-[13px] font-bold text-green-500 uppercase tracking-widest">
                                                        {formData.uploadedFiles[file.id].length} Document{formData.uploadedFiles[file.id].length > 1 ? 's' : ''} Uploaded
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="mx-auto mb-2 text-white/20" size={20} />
                                                    <div className="text-[13px] font-bold text-gray-300 uppercase tracking-widest">Upload {file.label}</div>
                                                </>
                                            )}
                                            
                                            <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">{file.desc}</div>
                                            {formData.uploadedFiles[file.id] && (
                                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                    {formData.uploadedFiles[file.id].map((f, i) => (
                                                        <div key={i} className="group/item relative flex items-center gap-2 bg-black/40 border border-white/5 pl-2 pr-1 py-1 rounded text-[9px] font-bold text-white/40">
                                                            <FileText size={10} className="text-red-600" />
                                                            <span className="truncate max-w-[100px]">{f.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Legal Compliance Status</h3>
                                    <p className="text-[10px] text-gray-600 mt-1 uppercase">Check all that are currently completed</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Company Registration', 'GST Registration', 'Trade License', 'MSME Registration',
                                        'ISO Certification', 'Trademark Registration', 'Copyright Filed', 'FSSAI Recognition',
                                        'Education Board Recognition', 'Import Export Code'
                                    ].map(item => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => handleCheckboxChange('legalChecks', item)}
                                            className={`px-3 py-2 rounded text-[11px] font-bold transition-all border ${formData.legalChecks.includes(item)
                                                ? 'bg-[#150000] border-red-600 text-white'
                                                : 'bg-[#111] border-white/5 text-gray-500 hover:border-white/10'
                                                }`}
                                        >
                                            {formData.legalChecks.includes(item) && '✓ '} {item}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Pending / In-Progress Legal Items</label>
                                        <textarea id="legalPending" value={formData.legalPending} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[80px]" placeholder="Mention anything currently in process" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Legal Queries / Areas Needing Support</label>
                                        <textarea id="legalQuery" value={formData.legalQuery} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[80px]" placeholder="Any legal challenges or areas needing Social Bureau guidance" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: SERVICES */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">03 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Service Details</h2>
                                <p className="text-gray-500 text-sm mt-1">Tell us about Ajinora's education consulting offerings.</p>
                            </section>

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">What does Ajinora offer? <span className="text-red-600">*</span></label>
                                <textarea id="coreOffering" value={formData.coreOffering} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[110px]" placeholder="Describe your education consulting services in detail..." />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Service Categories You Offer</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Abroad Study Counseling', 'Domestic Admission Counseling', 'IELTS / TOEFL Coaching',
                                        'UPSC / PSC Coaching', 'School Admissions', 'Engineering / Medical Counseling',
                                        'MBA / Management Programs', 'Skill Development', 'Career Counseling',
                                        'Scholarship Assistance', 'Visa Processing Support', 'Online Courses', 'Corporate Training'
                                    ].map(item => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => handleCheckboxChange('serviceCategories', item)}
                                            className={`px-3 py-2 rounded text-[11px] font-bold transition-all border ${formData.serviceCategories.includes(item)
                                                ? 'bg-[#150000] border-red-600 text-white'
                                                : 'bg-[#111] border-white/5 text-gray-500 hover:border-white/10'
                                                }`}
                                        >
                                            {formData.serviceCategories.includes(item) && '✓ '} {item}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Other Services (not listed above)</label>
                                    <input id="otherServices" value={formData.otherServices} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Describe any additional services" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Primary Target Audience <span className="text-red-600">*</span></label>
                                    <select id="targetAudience" value={formData.targetAudience} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select audience</option>
                                        <option>School Students (Grades 9–12)</option>
                                        <option>Undergraduate Aspirants</option>
                                        <option>Postgraduate Aspirants</option>
                                        <option>Working Professionals</option>
                                        <option>Parents</option>
                                        <option>Institutions / Schools</option>
                                        <option>All of the above</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Age Group of Primary Target</label>
                                    <select id="ageGroup" value={formData.ageGroup} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select range</option>
                                        <option>13–17 years</option>
                                        <option>18–24 years</option>
                                        <option>25–35 years</option>
                                        <option>35+ years</option>
                                        <option>Multiple segments</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-l-2 border-red-600 pl-6 space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Operating Locations</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Currently Operating In</label>
                                    <div className="space-y-3">
                                        {formData.currentOps.map((op, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    value={op}
                                                    onChange={(e) => handleListChange('currentOps', idx, e.target.value)}
                                                    className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all"
                                                    placeholder="e.g. Kerala, India"
                                                />
                                                {idx > 0 && (
                                                    <button type="button" onClick={() => removeListItem('currentOps', idx)} className="px-3 text-red-600 hover:bg-red-600/10 rounded">✕</button>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addListItem('currentOps')} className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:opacity-70 transition-all">
                                            <span className="w-5 h-5 rounded-full border border-red-600 flex items-center justify-center font-bold">+</span> Add Location
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Target Expansion Regions</label>
                                    <div className="space-y-3">
                                        {formData.expansionTarget.map((op, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    value={op}
                                                    onChange={(e) => handleListChange('expansionTarget', idx, e.target.value)}
                                                    className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all"
                                                    placeholder="e.g. GCC, Europe"
                                                />
                                                {idx > 0 && (
                                                    <button type="button" onClick={() => removeListItem('expansionTarget', idx)} className="px-3 text-red-600 hover:bg-red-600/10 rounded">✕</button>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addListItem('expansionTarget')} className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:opacity-70 transition-all">
                                            <span className="w-5 h-5 rounded-full border border-red-600 flex items-center justify-center font-bold">+</span> Add Region
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Priority Services for Marketing <span className="text-red-600">*</span></label>
                                    <textarea id="mktFocus" value={formData.mktFocus} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[80px]" placeholder="Tell us which 2–3 services you want to promote most aggressively." />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Key Competitive Advantage</label>
                                    <textarea id="usp" value={formData.usp} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[80px]" placeholder="What makes Ajinora different from other education consultancies?" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">No. of Students Enrolled (approx)</label>
                                        <input id="enrolled" value={formData.enrolled} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Current student count or monthly intake" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Success Rate / Key Metric</label>
                                        <input id="successRate" value={formData.successRate} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 95% visa success, 200+ students abroad" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: DIGITAL PRESENCE */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">04 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Digital Presence</h2>
                                <p className="text-gray-500 text-sm mt-1">Website, social media platforms, and existing digital assets.</p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Website URL</label>
                                    <input id="website" value={formData.website} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="https://ajinora.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Website Status</label>
                                    <select id="webStatus" value={formData.webStatus} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>Live and active</option>
                                        <option>Under development</option>
                                        <option>Outdated / needs redesign</option>
                                        <option>No website yet</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Social Media Profiles</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: 'ig', label: 'Instagram', icon: 'ig' },
                                        { id: 'fb', label: 'Facebook', icon: 'fb' },
                                        { id: 'yt', label: 'YouTube', icon: 'yt' },
                                        { id: 'li', label: 'LinkedIn', icon: 'li' },
                                        { id: 'tw', label: 'X / Twitter', icon: 'tw' },
                                        { id: 'wa', label: 'WhatsApp', icon: 'wa' },
                                        { id: 'tk', label: 'TikTok / Reels', icon: 'tk' },
                                        { id: 'other', label: 'Other Platform', icon: 'other' }
                                    ].map(platform => (
                                        <div key={platform.id} className="flex flex-col gap-2 bg-[#111] border border-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-red-600/5">
                                                    <SocialLogo platform={platform.icon} />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{platform.label}</label>
                                                    <input
                                                        id={platform.id}
                                                        value={formData.socialMedia[platform.id]}
                                                        onChange={handleSocialChange}
                                                        className="w-full bg-transparent border-none text-[13px] text-gray-300 focus:outline-none p-0 border-b border-white/10 focus:border-red-600"
                                                        placeholder={platform.id === 'wa' ? 'Phone number' : 'Profile URL'}
                                                    />
                                                </div>
                                            </div>
                                            {platform.id === 'other' && formData.socialMedia.other && (
                                                <div className="pl-11">
                                                    <input
                                                        id="otherName"
                                                        value={formData.socialMedia.otherName}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, otherName: e.target.value } }))}
                                                        className="w-full bg-transparent border-none text-[11px] text-red-500 focus:outline-none p-0 border-b border-red-600/30"
                                                        placeholder="Specify platform name..."
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Instagram Followers</label>
                                    <input id="igFollowers" value={formData.igFollowers} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 3,200" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Facebook Followers</label>
                                    <input id="fbFollowers" value={formData.fbFollowers} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 12,000" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">YouTube Subscribers</label>
                                    <input id="ytSubs" value={formData.ytSubs} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 850" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Google Business Profile Link</label>
                                    <input id="gmb" value={formData.gmb} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="maps.google.com/..." />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Google Reviews (approx)</label>
                                    <input id="gmbReviews" value={formData.gmbReviews} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 4.7★ with 43 reviews" />
                                </div>
                            </div>

                            <div className="space-y-6 pt-6">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Digital Asset Ownership</h3>
                                    <p className="text-[10px] text-gray-600 mt-1 uppercase">Audit service requirements</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Account Registration Status</label>
                                    <select id="assetOwnership" value={formData.assetOwnership} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>Yes — all under company email</option>
                                        <option>Some under personal emails</option>
                                        <option>Managed by previous agency / employee</option>
                                        <option>Not sure / need audit</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Known Ownership / Access Issues</label>
                                    <textarea id="accessIssues" value={formData.accessIssues} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[90px]" placeholder="Any lost accounts, admin access problems? Describe here." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: MARKETING */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">05 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Marketing & Engagement</h2>
                                <p className="text-gray-500 text-sm mt-1">Current marketing activities, lead generation, and support areas.</p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Currently Working With Any Agency?</label>
                                    <select id="hasAgency" value={formData.hasAgency} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>No — handling in-house</option>
                                        <option>Yes — full service agency</option>
                                        <option>Yes — social media only</option>
                                        <option>Yes — ads only</option>
                                        <option>Freelancers / ad-hoc</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Agency Name (if any)</label>
                                    <input id="agencyName" value={formData.agencyName} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="Previous or current agency name" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Current Marketing Activities</label>
                                <textarea id="currentMktActivities" value={formData.currentMktActivities} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[100px]" placeholder="e.g. Running Meta ads, posting reels 3x/week, Google ads, WhatsApp broadcasts..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Monthly Lead Volume (approx)</label>
                                    <input id="leadVolume" value={formData.leadVolume} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 50–80 leads/month" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Lead Conversion Rate (approx)</label>
                                    <input id="leadConversion" value={formData.leadConversion} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 20% → enrolled" />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Primary Lead Sources</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {[
                                        'Walk-in / Referral', 'Meta Ads', 'Google Ads', 'Organic Social', 'WhatsApp',
                                        'Website Forms', 'Educational Fairs', 'Influencer / KOL', 'Email Campaigns', 'YouTube'
                                    ].map(item => {
                                        const selected = formData.leadSources.find(s => s.label === item);
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => handleLinkCheckboxChange('leadSources', item)}
                                                className={`px-3 py-2 rounded text-[10px] font-bold transition-all border text-center flex items-center justify-center gap-2 ${selected
                                                    ? 'bg-[#150000] border-red-600 text-white'
                                                    : 'bg-[#111] border-white/5 text-gray-500 hover:border-white/10'
                                                    }`}
                                            >
                                                {selected && <Check size={10} />} {item}
                                            </button>
                                        );
                                    })}
                                </div>

                                {formData.leadSources.length > 0 && (
                                    <div className="mt-6 space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-red-500/50">Lead Source Details / Links</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {formData.leadSources.map(selected => (
                                                <div key={selected.label} className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold text-gray-400">{selected.label}</span>
                                                    <input
                                                        placeholder="Reference link (optional)"
                                                        value={selected.link}
                                                        onChange={(e) => updateLinkValue('leadSources', selected.label, e.target.value)}
                                                        className="w-full bg-[#050505] border border-white/5 rounded px-3 py-1.5 text-[10px] text-gray-400 focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Avg. Engagement Rate</label>
                                    <input id="engRate" value={formData.engRate} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. 3–5% / low" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Posting Frequency</label>
                                    <select id="postFreq" value={formData.postFreq} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>Daily</option>
                                        <option>4–5x / week</option>
                                        <option>2–3x / week</option>
                                        <option>Weekly</option>
                                        <option>Irregular / minimal</option>
                                        <option>Not currently posting</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Biggest Marketing Challenges</label>
                                <textarea id="mktChallenges" value={formData.mktChallenges} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[90px]" placeholder="What is not working? Where do you feel stuck?" />
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Services Needed from Social Bureau</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        'Social Media Management', 'Meta Ads', 'Google Ads / SEO', 'YouTube Marketing',
                                        'Content Creation', 'Influencer Marketing', 'Website Design / Redesign',
                                        'Brand Identity / Rebranding', 'WhatsApp Marketing', 'CRM & Lead Automation',
                                        'Email Marketing', 'Legal Digital Asset Recovery', 'Analytics & Reporting', 'PR & Media Coverage'
                                    ].map(item => {
                                        const selected = formData.servicesNeeded.find(s => s.label === item);
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => handleLinkCheckboxChange('servicesNeeded', item)}
                                                className={`px-3 py-2 rounded text-[10px] font-bold transition-all border text-center flex items-center justify-center gap-2 ${selected
                                                    ? 'bg-[#150000] border-red-600 text-white'
                                                    : 'bg-[#111] border-white/5 text-gray-500 hover:border-white/10'
                                                    }`}
                                            >
                                                {selected && <Check size={10} />} {item}
                                            </button>
                                        );
                                    })}
                                </div>

                                {formData.servicesNeeded.length > 0 && (
                                    <div className="mt-6 space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-red-500/50">Service Requirements / Example Links</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {formData.servicesNeeded.map(selected => (
                                                <div key={selected.label} className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold text-gray-400">{selected.label}</span>
                                                    <input
                                                        placeholder="Requirements / example link (optional)"
                                                        value={selected.link}
                                                        onChange={(e) => updateLinkValue('servicesNeeded', selected.label, e.target.value)}
                                                        className="w-full bg-[#050505] border border-white/5 rounded px-3 py-1.5 text-[10px] text-gray-400 focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 pt-4">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Marketing Goals for Next 6 Months</label>
                                <textarea id="mktGoals" value={formData.mktGoals} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[90px]" placeholder="e.g. 3x lead volume, 10K IG followers, dominate Kochi market..." />
                            </div>
                        </div>
                    )}

                    {/* SECTION 5: BUDGET & TIMELINE */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">06 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Budget & Timeline</h2>
                                <p className="text-gray-500 text-sm mt-1">Monthly marketing investment range and project timelines.</p>
                            </section>

                            <div className="space-y-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Monthly Marketing Budget</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { label: 'Starter', amount: 'less than ₹1L', range: '₹15K–30K' },
                                        { label: 'Growth', amount: '₹1L', range: '₹30K–60K' },
                                        { label: 'Scale', amount: '₹5L', range: '₹60K–1L' },
                                        { label: 'Premium', amount: '₹10L+', range: '₹1L+' },
                                    ].map(budget => (
                                        <button
                                            key={budget.label}
                                            onClick={() => setFormData(prev => ({ ...prev, selectedBudget: budget.range }))}
                                            className={`p-6 rounded border transition-all text-center ${formData.selectedBudget === budget.range
                                                ? 'bg-[#150000] border-red-600'
                                                : 'bg-[#111] border-white/5 hover:border-white/10'
                                                }`}
                                        >
                                            <div className="text-2xl font-['Bebas_Neue'] text-red-600">{budget.amount}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">{budget.label}</div>
                                            <div className="text-[8px] font-mono text-gray-700 mt-1">{budget.range}/mo</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Separate Ad Spend Budget?</label>
                                    <select id="adSpend" value={formData.adSpend} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>Included in above</option>
                                        <option>₹5,000–15,000/mo</option>
                                        <option>₹15,000–30,000/mo</option>
                                        <option>₹30,000–50,000/mo</option>
                                        <option>₹50,000+/mo</option>
                                        <option>Flexible / TBD</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Preferred Contract Duration</label>
                                    <select id="contractDur" value={formData.contractDur} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select duration</option>
                                        <option>Month-to-Month</option>
                                        <option>3 Months</option>
                                        <option>6 Months</option>
                                        <option>12 Months</option>
                                        <option>Flexible</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Expected Start Date</label>
                                    <input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">First Priority Milestone</label>
                                    <input id="milestone" value={formData.milestone} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all" placeholder="e.g. Campaign live before June" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 pt-4">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Decision-Making Process</label>
                                <select id="decisionProcess" value={formData.decisionProcess} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                    <option value="">Select</option>
                                    <option>I decide alone</option>
                                    <option>Need partner approval</option>
                                    <option>Committee decision</option>
                                    <option>Board approval needed</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2 pt-4">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Anything Else Social Bureau Should Know</label>
                                <textarea id="anythingElse" value={formData.anythingElse} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all min-h-[100px]" placeholder="Special considerations, brand sensitivities, competitor intel..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Source (How did you hear about us?)</label>
                                    <select id="referralSource" value={formData.referralSource} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select</option>
                                        <option>Referral from Client</option>
                                        <option>Google Search</option>
                                        <option>Instagram / Social Media</option>
                                        <option>LinkedIn</option>
                                        <option>Word of Mouth</option>
                                        <option>Event / Conference</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Referred By (name, if applicable)</label>
                                    <select id="referralSource" value={formData.referralSource} onChange={handleInputChange} className="bg-[#111] border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%23666%27/%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                                        <option value="">Select source</option>
                                        <option>Social Media</option>
                                        <option>Google Search</option>
                                        <option>Word of Mouth / Referral</option>
                                        <option>Previous Client</option>
                                        <option>Other</option>
                                    </select>
                                    {formData.referralSource === 'Other' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                                            <input 
                                                id="referredBy" 
                                                value={formData.referredBy} 
                                                onChange={handleInputChange} 
                                                className="w-full bg-[#050505] border border-red-600/30 rounded px-4 py-2 text-xs text-red-500 focus:outline-none focus:border-red-600" 
                                                placeholder="Please specify how you heard about us..." 
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 6: REVIEW */}
                    {currentStep === 6 && (
                        <div className="space-y-6">
                            <section className="sec-header">
                                <div className="text-[10px] font-mono text-red-500 tracking-[0.2em] mb-2 uppercase">07 / 07</div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white">Review & <span className="text-red-600">Finalize</span></h2>
                                <p className="text-gray-500 text-sm mt-1">Review your intelligence dossier before transmission.</p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-red-600/30 transition-all group">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                                        <Building2 size={12} className="group-hover:scale-110 transition-transform" /> Company Snapshot
                                    </h4>
                                    <div className="space-y-2 text-[12px]">
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Brand</span><span className="text-gray-200 font-bold">{formData.brandName || formData.legalName}</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Contact</span><span className="text-gray-200">{formData.contactName}</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Type</span><span className="text-gray-200">{formData.companyType}</span></div>
                                    </div>
                                </div>
                                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-red-600/30 transition-all group">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                                        <Globe size={12} className="group-hover:scale-110 transition-transform" /> Digital Footprint
                                    </h4>
                                    <div className="space-y-2 text-[12px]">
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Website</span><span className="text-red-500 truncate max-w-[120px]">{formData.website || '—'}</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Socials</span><span className="text-gray-200 font-bold">{Object.values(formData.socialMedia).filter(Boolean).length} Platforms</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-600">Ads</span><span className="text-gray-200 font-bold">{formData.adSpend || '—'}</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-red-600/30 transition-all">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2"><MapPin size={12} /> Expansion Strategy</h4>
                                <div className="flex flex-wrap gap-2">
                                    {formData.currentOps.filter(Boolean).map((loc, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/5 text-[10px] font-bold rounded-full text-white/40">Operating: {loc}</span>
                                    ))}
                                    {formData.expansionTarget.filter(Boolean).map((loc, i) => (
                                        <span key={i} className="px-2 py-1 bg-red-600/10 text-[10px] font-bold rounded-full text-red-500">Targeting: {loc}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-red-600/30 transition-all">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2"><FileText size={12} /> Uploaded Intelligence Assets</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(formData.uploadedFiles).map(([id, files]) => (
                                        files.length > 0 && (
                                            <div key={id} className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{id.replace('_', ' ')}</p>
                                                    <p className="text-[11px] font-bold text-white">{files.length} File{files.length > 1 ? 's' : ''}</p>
                                                </div>
                                                <CheckCircle2 size={14} className="text-green-500" />
                                            </div>
                                        )
                                    ))}
                                    {Object.values(formData.uploadedFiles).every(files => files.length === 0) && (
                                        <div className="col-span-full py-4 text-center border-2 border-dashed border-white/5 rounded-xl">
                                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No assets attached to dossier</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">Section Readiness Summary</h4>
                                <div className="space-y-3">
                                    {[0, 1, 2, 3, 4, 5].map(idx => {
                                        const isComplete = getStepStatus(idx);
                                        return (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
                                                <div className="flex items-center gap-3">
                                                    {isComplete ? (
                                                        <CheckCircle2 size={16} className="text-green-500" />
                                                    ) : (
                                                        <AlertCircle size={16} className="text-red-500" />
                                                    )}
                                                    <span className={`text-[12px] font-bold uppercase tracking-wider ${isComplete ? 'text-gray-300' : 'text-red-500'}`}>
                                                        {steps[idx].name} {isComplete ? 'Complete' : 'Incomplete'}
                                                    </span>
                                                </div>
                                                {!isComplete && (
                                                    <button
                                                        onClick={() => goTo(idx)}
                                                        className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline"
                                                    >
                                                        Go back to complete
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-red-600/5 border border-red-600/20 rounded-3xl p-6 text-center space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(232,36,42,0.05)_0%,_transparent_70%)]" />

                                <div className="relative">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(232,36,42,0.4)]"
                                    >
                                        <CheckCircle2 size={40} className="text-white" />
                                    </motion.div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Protocol Ready</h3>
                                    <p className="text-xs text-gray-500 max-w-sm mx-auto">All Phase 01 intelligence has been validated. Transmission will be encrypted and sent to Strategy Lab.</p>
                                </div>

                                <button
                                    onClick={submitAll}
                                    disabled={status.type === 'loading'}
                                    className="group relative w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.3em] text-[12px] rounded-full transition-all shadow-2xl shadow-red-600/20 flex items-center justify-center gap-4 overflow-hidden"
                                >
                                    {status.type === 'loading' ? (
                                        <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> INITIATING UPLOAD...</>
                                    ) : (
                                        <>TRANSMIT TO STRATEGY LAB <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </div>

                            {status.msg && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-2xl text-[11px] font-bold text-center border ${status.type === 'error' ? 'bg-red-900/20 text-red-500 border-red-900/40' :
                                    status.type === 'success' ? 'bg-green-900/20 text-green-500 border-green-900/40' :
                                        'bg-white/5 text-gray-400 border-white/10'
                                    }`}>
                                    {status.msg}
                                </motion.div>
                            )}
                        </div>
                    )}

                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                        <button
                            disabled={currentStep === 0}
                            onClick={prevStep}
                            className={`flex items-center gap-2 px-6 py-2 rounded font-bold text-[11px] uppercase tracking-widest transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <ArrowLeft size={14} /> Back
                        </button>

                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="bg-red-600 text-white px-8 py-2 rounded font-bold uppercase tracking-widest text-[11px] hover:bg-red-700 transition-all flex items-center gap-2"
                            >
                                Next Step <ArrowRight size={14} />
                            </button>
                        ) : null}
                    </div>
                </motion.div>

                <footer className="mt-16 text-center space-y-4">
                    <div className="h-px bg-white/5 w-full" />
                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em]">Social Bureau · Kerala's API Marketing Agency · socialbureau.in</p>
                </footer>
            </div>
        </div>
    );
};

export default ClientFormaji;
