import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, User, Image as ImageIcon, Link as LinkIcon, 
  Tag, Hash, Eye, Globe, Github, 
  Linkedin, Instagram, Twitter, CheckCircle2, AlertCircle,
  Layout, Sparkles, UserCircle, Upload, X, Camera, Loader2,
  Wrench, Briefcase, Award, Shield, MapPin, Phone, Calendar, DollarSign, Trash2, Edit3, Check,
  GraduationCap, Mic, Play, BookOpen, ExternalLink
} from 'lucide-react';
import teamService from './teamService';
import { toast } from 'react-toastify';

const TeamDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('identity');
    const [uploading, setUploading] = useState({
        image: false,
        cardImage: false,
        image1: false,
        coverImage: false,
        idCard: false,
        clientLogo: false,
        showcaseImage: false,
        blogImage: false
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
        hobbies: [],
        category: [],
        bgColor: '#ff3358',
        hasBakedText: true,
        socials: {
            linkedin: '',
            instagram: '',
            twitter: ''
        },
        consultations: {
            price30Min: '',
            price60Min: '',
            priceFullDay: ''
        },
        isPublic: false,
        
        // Relational and extra credentials
        department: '',
        coverImage: '',
        idCard: '',
        location: '',
        phone: '',
        clickupId: '',
        emp_id: '',
        doj: '',
        rate: '',
        tools: [],
        clients: [],
        achievements: [],
        podcasts: [],
        innovations: [],
        workShowcase: [],
        blogs: []
    });

    const [tagInput, setTagInput] = useState('');
    const [hobbyInput, setHobbyInput] = useState('');

    // Inline form states for relational arrays
    const [toolForm, setToolForm] = useState({ toolName: '', level: 85 });
    const [editingToolIndex, setEditingToolIndex] = useState(null);
    const [isAddingTool, setIsAddingTool] = useState(false);

    const [clientForm, setClientForm] = useState({ name: '', companyName: '', email: '', phone: '', website: '', logo: '', status: 'active', notes: '' });
    const [editingClientIndex, setEditingClientIndex] = useState(null);
    const [isAddingClient, setIsAddingClient] = useState(false);

    const [achievementForm, setAchievementForm] = useState({ title: '', description: '', image: 'MILESTONE', date: '' });
    const [editingAchievementIndex, setEditingAchievementIndex] = useState(null);
    const [isAddingAchievement, setIsAddingAchievement] = useState(false);

    const [podcastForm, setPodcastForm] = useState({ episodeNo: '', title: '', duration: '', url: '', host: 'Sham SK' });
    const [editingPodcastIndex, setEditingPodcastIndex] = useState(null);
    const [isAddingPodcast, setIsAddingPodcast] = useState(false);

    const [innovationForm, setInnovationForm] = useState({ type: 'INNOVATION', date: '', title: '', content: '', url: '', likes: 0, comments: 0 });
    const [editingInnovationIndex, setEditingInnovationIndex] = useState(null);
    const [isAddingInnovation, setIsAddingInnovation] = useState(false);

    const [workShowcaseForm, setWorkShowcaseForm] = useState({ category: '', title: '', description: '', images: [], link: '' });
    const [editingWorkShowcaseIndex, setEditingWorkShowcaseIndex] = useState(null);
    const [isAddingWorkShowcase, setIsAddingWorkShowcase] = useState(false);

    const [educationForm, setEducationForm] = useState({ degree: '', institution: '', year: '', grade: '' });
    const [editingEducationIndex, setEditingEducationIndex] = useState(null);
    const [isAddingEducation, setIsAddingEducation] = useState(false);

    const [certificationForm, setCertificationForm] = useState({ name: '', issuedBy: '', year: '', credentialUrl: '' });
    const [editingCertificationIndex, setEditingCertificationIndex] = useState(null);
    const [isAddingCertification, setIsAddingCertification] = useState(false);

    const [blogForm, setBlogForm] = useState({ heading: '', link: '', image: '' });
    const [editingBlogIndex, setEditingBlogIndex] = useState(null);
    const [isAddingBlog, setIsAddingBlog] = useState(false);

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
                const userObj = data.user || {};
                
                // Format DOJ date to YYYY-MM-DD for the input type="date"
                let formattedDoj = '';
                if (userObj.doj) {
                    try {
                        formattedDoj = new Date(userObj.doj).toISOString().split('T')[0];
                    } catch (e) {}
                }

                if (data.isNew) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || userObj.name || '',
                        role: data.role || userObj.role || '',
                        department: data.department || userObj.department || '',
                        coverImage: userObj.coverImage || '',
                        idCard: userObj.idCard || '',
                        location: userObj.location || '',
                        phone: userObj.phone || '',
                        clickupId: userObj.clickupId || '',
                        emp_id: userObj.emp_id || '',
                        doj: formattedDoj || '',
                        rate: userObj.rate || '',
                        tools: userObj.tools || [],
                        clients: userObj.clients || [],
                        achievements: userObj.achievements || [],
                        podcasts: userObj.podcasts || [],
                        education: userObj.education || [],
                        certifications: userObj.certifications || [],
                        hobbies: userObj.hobbies || [],
                        innovations: userObj.innovations || [],
                        workShowcase: userObj.workShowcase || [],
                        blogs: userObj.blogs || [],
                        consultations: {
                            price30Min: '',
                            price60Min: '',
                            priceFullDay: ''
                        }
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        tags: data.tags || [],
                        category: data.category || [],
                        socials: {
                            ...prev.socials,
                            ...(data.socials || {})
                        },
                        consultations: {
                            ...prev.consultations,
                            ...(data.consultations || {})
                        },
                        department: data.department || userObj.department || '',
                        coverImage: userObj.coverImage || '',
                        idCard: userObj.idCard || '',
                        location: userObj.location || '',
                        phone: userObj.phone || '',
                        clickupId: userObj.clickupId || '',
                        emp_id: userObj.emp_id || '',
                        doj: formattedDoj || '',
                        rate: userObj.rate || '',
                        tools: userObj.tools || [],
                        clients: userObj.clients || [],
                        achievements: userObj.achievements || [],
                        podcasts: userObj.podcasts || [],
                        education: userObj.education || [],
                        certifications: userObj.certifications || [],
                        hobbies: data.hobbies || userObj.hobbies || [],
                        innovations: userObj.innovations || [],
                        workShowcase: userObj.workShowcase || [],
                        blogs: data.blogs || userObj.blogs || []
                    }));
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

    const handleConsultationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            consultations: {
                ...prev.consultations,
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

    const handleHobbyAdd = (e) => {
        if (e.key === 'Enter' && hobbyInput.trim()) {
            e.preventDefault();
            if (!(formData.hobbies || []).includes(hobbyInput.trim().toUpperCase())) {
                setFormData(prev => ({
                    ...prev,
                    hobbies: [...(prev.hobbies || []), hobbyInput.trim().toUpperCase()]
                }));
            }
            setHobbyInput('');
        }
    };

    const removeHobby = (hobbyToRemove) => {
        setFormData(prev => ({
            ...prev,
            hobbies: (prev.hobbies || []).filter(h => h !== hobbyToRemove)
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
                if (activeUploadField === 'clientLogo') {
                    setClientForm(prev => ({ ...prev, logo: response.url }));
                } else if (activeUploadField === 'showcaseImage') {
                    setWorkShowcaseForm(prev => ({
                        ...prev,
                        images: [...(prev.images || []), response.url]
                    }));
                } else if (activeUploadField === 'blogImage') {
                    setBlogForm(prev => ({ ...prev, image: response.url }));
                } else {
                    setFormData(prev => ({ ...prev, [activeUploadField]: response.url }));
                }
                toast.success('Media uploaded successfully!');
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
        if (e) e.preventDefault();
        
        let currentFormData = { ...formData };
        
        // Auto-confirm currently active inline forms if they have minimal required fields filled
        if (isAddingWorkShowcase || editingWorkShowcaseIndex !== null) {
            if (workShowcaseForm.title.trim() && workShowcaseForm.category.trim() && workShowcaseForm.description.trim()) {
                if (editingWorkShowcaseIndex !== null) {
                    const updated = [...(currentFormData.workShowcase || [])];
                    updated[editingWorkShowcaseIndex] = workShowcaseForm;
                    currentFormData.workShowcase = updated;
                } else {
                    currentFormData.workShowcase = [...(currentFormData.workShowcase || []), workShowcaseForm];
                }
            }
        }
        
        if (isAddingTool || editingToolIndex !== null) {
            if (toolForm.toolName.trim()) {
                if (editingToolIndex !== null) {
                    const updated = [...(currentFormData.tools || [])];
                    updated[editingToolIndex] = toolForm;
                    currentFormData.tools = updated;
                } else {
                    currentFormData.tools = [...(currentFormData.tools || []), toolForm];
                }
            }
        }
        
        if (isAddingClient || editingClientIndex !== null) {
            if (clientForm.name.trim()) {
                if (editingClientIndex !== null) {
                    const updated = [...(currentFormData.clients || [])];
                    updated[editingClientIndex] = clientForm;
                    currentFormData.clients = updated;
                } else {
                    currentFormData.clients = [...(currentFormData.clients || []), clientForm];
                }
            }
        }
        
        if (isAddingAchievement || editingAchievementIndex !== null) {
            if (achievementForm.title.trim()) {
                if (editingAchievementIndex !== null) {
                    const updated = [...(currentFormData.achievements || [])];
                    updated[editingAchievementIndex] = achievementForm;
                    currentFormData.achievements = updated;
                } else {
                    currentFormData.achievements = [...(currentFormData.achievements || []), achievementForm];
                }
            }
        }
        
        if (isAddingPodcast || editingPodcastIndex !== null) {
            if (podcastForm.title.trim()) {
                const epNo = podcastForm.episodeNo ? Number(podcastForm.episodeNo) : (currentFormData.podcasts.length + 1);
                if (editingPodcastIndex !== null) {
                    const updated = [...(currentFormData.podcasts || [])];
                    updated[editingPodcastIndex] = { ...podcastForm, episodeNo: epNo };
                    currentFormData.podcasts = updated;
                } else {
                    currentFormData.podcasts = [...(currentFormData.podcasts || []), { ...podcastForm, episodeNo: epNo }];
                }
            }
        }
        
        if (isAddingInnovation || editingInnovationIndex !== null) {
            if (innovationForm.title.trim()) {
                if (editingInnovationIndex !== null) {
                    const updated = [...(currentFormData.innovations || [])];
                    updated[editingInnovationIndex] = innovationForm;
                    currentFormData.innovations = updated;
                } else {
                    currentFormData.innovations = [...(currentFormData.innovations || []), innovationForm];
                }
            }
        }

        if (isAddingEducation || editingEducationIndex !== null) {
            if (educationForm.degree.trim() && educationForm.institution.trim()) {
                if (editingEducationIndex !== null) {
                    const updated = [...(currentFormData.education || [])];
                    updated[editingEducationIndex] = educationForm;
                    currentFormData.education = updated;
                } else {
                    currentFormData.education = [...(currentFormData.education || []), educationForm];
                }
            }
        }

        if (isAddingCertification || editingCertificationIndex !== null) {
            if (certificationForm.name.trim()) {
                if (editingCertificationIndex !== null) {
                    const updated = [...(currentFormData.certifications || [])];
                    updated[editingCertificationIndex] = certificationForm;
                    currentFormData.certifications = updated;
                } else {
                    currentFormData.certifications = [...(currentFormData.certifications || []), certificationForm];
                }
            }
        }

        if (isAddingBlog || editingBlogIndex !== null) {
            if (blogForm.heading.trim()) {
                if (editingBlogIndex !== null) {
                    const updated = [...(currentFormData.blogs || [])];
                    updated[editingBlogIndex] = blogForm;
                    currentFormData.blogs = updated;
                } else {
                    currentFormData.blogs = [...(currentFormData.blogs || []), blogForm];
                }
            }
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await teamService.updateMyProfile(currentFormData, token);
            if (response.success) {
                toast.success('Profile saved successfully!');
                
                // Reset active inline forms states so they close nicely
                setIsAddingWorkShowcase(false);
                setEditingWorkShowcaseIndex(null);
                setWorkShowcaseForm({ category: '', title: '', description: '', images: [], link: '' });
                
                setIsAddingTool(false);
                setEditingToolIndex(null);
                setToolForm({ toolName: '', level: 85 });
                
                setIsAddingClient(false);
                setEditingClientIndex(null);
                setClientForm({ name: '', companyName: '', email: '', phone: '', website: '', logo: '', status: 'active', notes: '' });
                
                setIsAddingAchievement(false);
                setEditingAchievementIndex(null);
                setAchievementForm({ title: '', description: '', image: 'MILESTONE', date: '' });
                
                setIsAddingPodcast(false);
                setEditingPodcastIndex(null);
                setPodcastForm({ episodeNo: '', title: '', duration: '', url: '', host: 'Sham SK' });
                
                setIsAddingInnovation(false);
                setEditingInnovationIndex(null);
                setInnovationForm({ type: 'INNOVATION', date: '', title: '', content: '', url: '', likes: 0, comments: 0 });

                setIsAddingEducation(false);
                setEditingEducationIndex(null);
                setEducationForm({ degree: '', institution: '', year: '', grade: '' });

                setIsAddingCertification(false);
                setEditingCertificationIndex(null);
                setCertificationForm({ name: '', issuedBy: '', year: '', credentialUrl: '' });

                setIsAddingBlog(false);
                setEditingBlogIndex(null);
                setBlogForm({ heading: '', link: '', image: '' });

                // Reload from DB so the form stays in sync with persisted data
                await fetchProfile();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    // --- Technical Arsenal Actions ---
    const handleAddTool = () => {
        if (!toolForm.toolName.trim()) {
            toast.error('Tool Name is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            tools: [...prev.tools, { ...toolForm, level: toolForm.level !== undefined ? toolForm.level : 85 }]
        }));
        setToolForm({ toolName: '', level: 85 });
        setIsAddingTool(false);
    };

    const handleUpdateTool = () => {
        if (!toolForm.toolName.trim()) {
            toast.error('Tool Name is required');
            return;
        }
        setFormData(prev => {
            const updated = [...prev.tools];
            updated[editingToolIndex] = { ...toolForm, level: toolForm.level !== undefined ? toolForm.level : 85 };
            return { ...prev, tools: updated };
        });
        setToolForm({ toolName: '', level: 85 });
        setEditingToolIndex(null);
    };

    const handleDeleteTool = (index) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.filter((_, i) => i !== index)
        }));
    };

    // --- Clients Managed Actions ---
    const handleAddClient = () => {
        if (!clientForm.name.trim()) {
            toast.error('Client/Company Name is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            clients: [...prev.clients, clientForm]
        }));
        setClientForm({ name: '', companyName: '', email: '', phone: '', website: '', logo: '', status: 'active', notes: '' });
        setIsAddingClient(false);
    };

    const handleUpdateClient = () => {
        if (!clientForm.name.trim()) {
            toast.error('Client/Company Name is required');
            return;
        }
        setFormData(prev => {
            const updated = [...prev.clients];
            updated[editingClientIndex] = clientForm;
            return { ...prev, clients: updated };
        });
        setClientForm({ name: '', companyName: '', email: '', phone: '', website: '', logo: '', status: 'active', notes: '' });
        setEditingClientIndex(null);
    };

    const handleDeleteClient = (index) => {
        setFormData(prev => ({
            ...prev,
            clients: prev.clients.filter((_, i) => i !== index)
        }));
    };

    // --- Career Timeline Actions ---
    const handleAddAchievement = () => {
        if (!achievementForm.title.trim()) {
            toast.error('Milestone Title is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            achievements: [...prev.achievements, achievementForm]
        }));
        setAchievementForm({ title: '', description: '', image: 'MILESTONE', date: '' });
        setIsAddingAchievement(false);
    };

    const handleUpdateAchievement = () => {
        if (!achievementForm.title.trim()) {
            toast.error('Milestone Title is required');
            return;
        }
        setFormData(prev => {
            const updated = [...prev.achievements];
            updated[editingAchievementIndex] = achievementForm;
            return { ...prev, achievements: updated };
        });
        setAchievementForm({ title: '', description: '', image: 'MILESTONE', date: '' });
        setEditingAchievementIndex(null);
    };

    const handleDeleteAchievement = (index) => {
        setFormData(prev => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index)
        }));
    };

    // --- Education Actions ---
    const handleAddEducation = () => {
        if (!educationForm.degree.trim() || !educationForm.institution.trim()) {
            toast.error('Degree and Institution are required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            education: [...(prev.education || []), educationForm]
        }));
        setEducationForm({ degree: '', institution: '', year: '', grade: '' });
        setIsAddingEducation(false);
    };

    const handleUpdateEducation = () => {
        if (!educationForm.degree.trim() || !educationForm.institution.trim()) {
            toast.error('Degree and Institution are required');
            return;
        }
        setFormData(prev => {
            const updated = [...(prev.education || [])];
            updated[editingEducationIndex] = educationForm;
            return { ...prev, education: updated };
        });
        setEducationForm({ degree: '', institution: '', year: '', grade: '' });
        setEditingEducationIndex(null);
    };

    const handleDeleteEducation = (index) => {
        setFormData(prev => ({
            ...prev,
            education: (prev.education || []).filter((_, i) => i !== index)
        }));
    };

    // --- Certifications Actions ---
    const handleAddCertification = () => {
        if (!certificationForm.name.trim()) {
            toast.error('Certification Name is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            certifications: [...(prev.certifications || []), certificationForm]
        }));
        setCertificationForm({ name: '', issuedBy: '', year: '', credentialUrl: '' });
        setIsAddingCertification(false);
    };

    const handleUpdateCertification = () => {
        if (!certificationForm.name.trim()) {
            toast.error('Certification Name is required');
            return;
        }
        setFormData(prev => {
            const updated = [...(prev.certifications || [])];
            updated[editingCertificationIndex] = certificationForm;
            return { ...prev, certifications: updated };
        });
        setCertificationForm({ name: '', issuedBy: '', year: '', credentialUrl: '' });
        setEditingCertificationIndex(null);
    };

    const handleDeleteCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: (prev.certifications || []).filter((_, i) => i !== index)
        }));
    };

    // --- Blog Actions ---
    const handleAddBlog = () => {
        if (!blogForm.heading.trim()) {
            toast.error('Blog Heading is required');
            return;
        }
        if (!blogForm.link.trim()) {
            toast.error('Blog Link is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            blogs: [...(prev.blogs || []), blogForm]
        }));
        setBlogForm({ heading: '', link: '', image: '' });
        setIsAddingBlog(false);
    };

    const handleUpdateBlog = () => {
        if (!blogForm.heading.trim()) {
            toast.error('Blog Heading is required');
            return;
        }
        if (!blogForm.link.trim()) {
            toast.error('Blog Link is required');
            return;
        }
        setFormData(prev => {
            const updated = [...(prev.blogs || [])];
            updated[editingBlogIndex] = blogForm;
            return { ...prev, blogs: updated };
        });
        setBlogForm({ heading: '', link: '', image: '' });
        setEditingBlogIndex(null);
    };

    const handleDeleteBlog = (index) => {
        setFormData(prev => ({
            ...prev,
            blogs: (prev.blogs || []).filter((_, i) => i !== index)
        }));
    };

    // --- Voices Podcasts Actions ---
    const handleAddPodcast = () => {
        if (!podcastForm.title.trim()) {
            toast.error('Episode Title is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            podcasts: [...prev.podcasts, {
                ...podcastForm,
                episodeNo: podcastForm.episodeNo ? Number(podcastForm.episodeNo) : (prev.podcasts.length + 1)
            }]
        }));
        setPodcastForm({ episodeNo: '', title: '', duration: '', url: '', host: 'Sham SK' });
        setIsAddingPodcast(false);
    };

    const handleUpdatePodcast = () => {
        if (!podcastForm.title.trim()) {
            toast.error('Episode Title is required');
            return;
        }
        setFormData(prev => {
            const updated = [...prev.podcasts];
            updated[editingPodcastIndex] = {
                ...podcastForm,
                episodeNo: podcastForm.episodeNo ? Number(podcastForm.episodeNo) : (editingPodcastIndex + 1)
            };
            return { ...prev, podcasts: updated };
        });
        setPodcastForm({ episodeNo: '', title: '', duration: '', url: '', host: 'Sham SK' });
        setEditingPodcastIndex(null);
    };

    const handleDeletePodcast = (index) => {
        setFormData(prev => ({
            ...prev,
            podcasts: prev.podcasts.filter((_, i) => i !== index)
        }));
    };

    // --- Innovation Feed Actions ---
    const handleAddInnovation = () => {
        if (!innovationForm.title.trim()) {
            toast.error('Innovation Title is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            innovations: [...prev.innovations, innovationForm]
        }));
        setInnovationForm({ type: 'INNOVATION', date: '', title: '', content: '', url: '', likes: 0, comments: 0 });
        setIsAddingInnovation(false);
    };

    const handleUpdateInnovation = () => {
        if (!innovationForm.title.trim()) {
            toast.error('Innovation Title is required');
            return;
        }
        setFormData(prev => {
            const updated = [...prev.innovations];
            updated[editingInnovationIndex] = innovationForm;
            return { ...prev, innovations: updated };
        });
        setInnovationForm({ type: 'INNOVATION', date: '', title: '', content: '', url: '', likes: 0, comments: 0 });
        setEditingInnovationIndex(null);
    };

    const handleDeleteInnovation = (index) => {
        setFormData(prev => ({
            ...prev,
            innovations: prev.innovations.filter((_, i) => i !== index)
        }));
    };

    // --- Work Showcase Actions ---
    const handleAddWorkShowcase = () => {
        if (!workShowcaseForm.title.trim()) {
            toast.error('Showcase Title is required');
            return;
        }
        if (!workShowcaseForm.category.trim()) {
            toast.error('Category is required');
            return;
        }
        if (!workShowcaseForm.description.trim()) {
            toast.error('Description is required');
            return;
        }
        setFormData(prev => ({
            ...prev,
            workShowcase: [...(prev.workShowcase || []), workShowcaseForm]
        }));
        setWorkShowcaseForm({ category: '', title: '', description: '', images: [], link: '' });
        setIsAddingWorkShowcase(false);
    };

    const handleUpdateWorkShowcase = () => {
        if (!workShowcaseForm.title.trim()) {
            toast.error('Showcase Title is required');
            return;
        }
        if (!workShowcaseForm.category.trim()) {
            toast.error('Category is required');
            return;
        }
        if (!workShowcaseForm.description.trim()) {
            toast.error('Description is required');
            return;
        }
        setFormData(prev => {
            const updated = [...(prev.workShowcase || [])];
            updated[editingWorkShowcaseIndex] = workShowcaseForm;
            return { ...prev, workShowcase: updated };
        });
        setWorkShowcaseForm({ category: '', title: '', description: '', images: [], link: '' });
        setEditingWorkShowcaseIndex(null);
    };

    const handleDeleteWorkShowcase = (index) => {
        setFormData(prev => ({
            ...prev,
            workShowcase: (prev.workShowcase || []).filter((_, i) => i !== index)
        }));
    };

    const categories = [
        "LEADERSHIP", "TECHNOLOGY", "OPERATIONS", "STRATEGY", 
        "CREATIVE", "PERFORMANCE", "FINANCE", "CONTENT"
    ];

    const achievementBadges = [
        "MILESTONE", "INNOVATION", "CLIENT WIN", "PARTNERSHIP", "ACHIEVEMENT", "LAUNCH"
    ];

    const menuItems = [
        { id: 'identity', label: 'Identity & Bio', icon: <UserCircle size={18} /> },
        { id: 'credentials', label: 'Credentials', icon: <Shield size={18} /> },
        { id: 'tools', label: 'Arsenal & Tools', icon: <Wrench size={18} /> },
        { id: 'clients', label: 'Clients Managed', icon: <Briefcase size={18} /> },
        { id: 'workShowcase', label: 'Work Showcase', icon: <Layout size={18} /> },
        { id: 'timeline', label: 'Career Timeline', icon: <Award size={18} /> },
        { id: 'podcasts', label: 'Voices Podcasts', icon: <Mic size={18} /> },
        { id: 'innovations', label: 'Innovation Feed', icon: <Sparkles size={18} /> },
        { id: 'blogs', label: 'Blog Posts', icon: <BookOpen size={18} /> }
    ];

    if (loading) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #441649 0%, #160F2C 45%, #2A1440 75%, #20133C 100%)' }}
            >
                <div className="absolute inset-0 opacity-[0.03] z-0" 
                     style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
                />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full shadow-[0_0_20px_rgba(255,51,88,0.3)] relative z-10"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white pt-24 pb-16 px-6 font-roboto relative overflow-hidden bg-transparent">
            {/* Hidden File Input */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp"
            />

            {/* Background Decor Layer - Perfectly matches the linear gradient and grid colors */}
            <div 
                className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #441649 0%, #160F2C 45%, #2A1440 75%, #20133C 100%)'
                }}
            >
                {/* Subtle grid line effect */}
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
                />
            </div>

            <div className="max-w-full px-4 md:px-12 mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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
                            EMPLOYEE <span className="text-brand-pink">DASHBOARD</span>
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

                {/* Main Workspace Layout */}
                <div data-lenis-prevent className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Desktop/Mobile Sidebar Navigation */}
                    <div className="lg:col-span-1 lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto scrollbar-none space-y-4 z-20">
                        {/* Mobile Swipeable Header (scrollable flex on mobile, vertical stack on desktop) */}
                        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none bg-white/5 border border-white/10 p-3 rounded-3xl backdrop-blur-3xl">
                            {menuItems.map((item) => {
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black tracking-wider uppercase transition-all whitespace-nowrap lg:w-full border ${
                                            isActive
                                                ? 'bg-brand-pink border-brand-pink text-white shadow-[0_10px_20px_rgba(255,51,88,0.3)]'
                                                : 'bg-transparent border-transparent text-white/55 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Floating Global Save Changes Card */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-3xl hidden lg:block">
                            <h3 className="text-xs font-black tracking-widest text-white/40 uppercase mb-4">Actions</h3>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={saving}
                                className="w-full bg-brand-pink hover:bg-white hover:text-brand-pink text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-[0_15px_30px_rgba(255,51,88,0.3)] group"
                            >
                                {saving ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <Save size={18} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-xs tracking-wider uppercase">Save Profile</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Content Panel Area */}
                    <div className="lg:col-span-3 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                            >
                                
                                {/* TAB 1: IDENTITY & BIO */}
                                {activeTab === 'identity' && (
                                    <div className="space-y-8">
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
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {/* Hero Portrait */}
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Hero Portrait (PNG)</label>
                                                    <div className="relative group/img h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                                        {uploading.image ? (
                                                            <Loader2 className="animate-spin text-brand-pink" size={32} />
                                                        ) : formData.image ? (
                                                            <>
                                                                <img src={formData.image} className="w-full h-full object-contain" alt="Hero" />
                                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                    <button type="button" onClick={() => triggerUpload('image')} className="p-3 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                                        <Camera size={18} />
                                                                    </button>
                                                                    <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))} className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                                        <X size={18} />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <button type="button" onClick={() => triggerUpload('image')} className="flex flex-col items-center gap-3 group/btn">
                                                                <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={24} />
                                                                <span className="text-[9px] font-black tracking-widest text-white/30">UPLOAD HERO</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Card Background */}
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Card Background</label>
                                                    <div className="relative group/img aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                                        {uploading.cardImage ? (
                                                            <Loader2 className="animate-spin text-brand-pink" size={32} />
                                                        ) : formData.cardImage ? (
                                                            <>
                                                                <img src={formData.cardImage} className="w-full h-full object-cover rounded-2xl" alt="Card" />
                                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                    <button type="button" onClick={() => triggerUpload('cardImage')} className="p-3 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                                        <Camera size={18} />
                                                                    </button>
                                                                    <button type="button" onClick={() => setFormData(prev => ({...prev, cardImage: ''}))} className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                                        <X size={18} />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <button type="button" onClick={() => triggerUpload('cardImage')} className="flex flex-col items-center gap-3 group/btn">
                                                                <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={24} />
                                                                <span className="text-[9px] font-black tracking-widest text-white/30">UPLOAD CARD</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Full Profile Image */}
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Full Profile Image</label>
                                                    <div className="relative group/img aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                                        {uploading.image1 ? (
                                                            <Loader2 className="animate-spin text-brand-pink" size={32} />
                                                        ) : formData.image1 ? (
                                                            <>
                                                                <img src={formData.image1} className="w-full h-full object-cover rounded-2xl" alt="Full" />
                                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                    <button type="button" onClick={() => triggerUpload('image1')} className="p-3 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                                        <Camera size={18} />
                                                                    </button>
                                                                    <button type="button" onClick={() => setFormData(prev => ({...prev, image1: ''}))} className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                                        <X size={18} />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <button type="button" onClick={() => triggerUpload('image1')} className="flex flex-col items-center gap-3 group/btn">
                                                                <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={24} />
                                                                <span className="text-[9px] font-black tracking-widest text-white/30">UPLOAD FULL</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                                <LinkIcon className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">NETWORKS & CATEGORIES</h2>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                            
                                            <div className="border-t border-white/10 my-8 pt-8">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block mb-4">Interests & Tags</label>
                                                <input 
                                                    type="text" 
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={handleTagAdd}
                                                    placeholder="Add Tag or Interest (Enter)..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium mb-4"
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.tags.map(tag => (
                                                        <motion.span 
                                                            layout
                                                            key={tag} 
                                                            className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest animate-fade-in"
                                                        >
                                                            {tag}
                                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors opacity-60 hover:opacity-100">
                                                                <X size={12} />
                                                            </button>
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t border-white/10 my-8 pt-8">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block mb-4">Hobbies & Specialties</label>
                                                <input 
                                                    type="text" 
                                                    value={hobbyInput}
                                                    onChange={(e) => setHobbyInput(e.target.value)}
                                                    onKeyDown={handleHobbyAdd}
                                                    placeholder="Add Hobby (Enter)..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium mb-4"
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {(formData.hobbies || []).map(hobby => (
                                                        <motion.span 
                                                            layout
                                                            key={hobby} 
                                                            className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest animate-fade-in"
                                                        >
                                                            {hobby}
                                                            <button type="button" onClick={() => removeHobby(hobby)} className="hover:text-white transition-colors opacity-60 hover:opacity-100">
                                                                <X size={12} />
                                                            </button>
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t border-white/10 pt-8 mt-8">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block mb-4">Department Categories</label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                                            </div>
                                        </section>

                                        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl mt-8">
                                            <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                                <Calendar className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">BOOK CONSULTATION COST (₹)</h2>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                                        30 Min Strategy Session Cost (INR)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="price30Min"
                                                        value={formData.consultations?.price30Min || ''}
                                                        onChange={handleConsultationChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                                        placeholder="e.g., ₹500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                                        60 Min Strategy Session Cost (INR)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="price60Min"
                                                        value={formData.consultations?.price60Min || ''}
                                                        onChange={handleConsultationChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                                        placeholder="e.g., ₹1000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                                        Full Day Strategy Session Cost (INR)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="priceFullDay"
                                                        value={formData.consultations?.priceFullDay || ''}
                                                        onChange={handleConsultationChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                                                        placeholder="e.g., ₹5000"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {/* TAB 2: CREDENTIALS */}
                                {activeTab === 'credentials' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                                            <Shield className="text-brand-pink" size={28} />
                                            <h2 className="text-2xl font-black tracking-tight uppercase">CREDENTIALS & IDENTIFICATION</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-5 top-5 text-white/20" size={18} />
                                                    <input 
                                                        type="text" 
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">ClickUp Member ID</label>
                                                <input 
                                                    type="text" 
                                                    name="clickupId"
                                                    value={formData.clickupId}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium"
                                                    placeholder="ClickUp user ID (numeric)"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Date Joined (DOJ)</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-5 top-5 text-white/20" size={18} />
                                                    <input 
                                                        type="date" 
                                                        name="doj"
                                                        value={formData.doj}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Hourly Billing Rate (₹)</label>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-[18px] text-white/25 text-xl font-bold">₹</span>
                                                    <input 
                                                        type="number" 
                                                        name="rate"
                                                        value={formData.rate}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium"
                                                        placeholder="Hourly Rate"
                                                    />
                                                </div>
                                            </div>

                                            {/* Cover Image Upload */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Cover Image</label>
                                                <div className="relative group/img h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                                    {uploading.coverImage ? (
                                                        <Loader2 className="animate-spin text-brand-pink" size={24} />
                                                    ) : formData.coverImage ? (
                                                        <>
                                                            <img src={formData.coverImage} className="w-full h-full object-contain rounded-2xl" alt="Cover" />
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                <button type="button" onClick={() => triggerUpload('coverImage')} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                                    <Camera size={14} />
                                                                </button>
                                                                <button type="button" onClick={() => setFormData(prev => ({...prev, coverImage: ''}))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button type="button" onClick={() => triggerUpload('coverImage')} className="flex flex-col items-center gap-2 group/btn">
                                                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                                                            <span className="text-[9px] font-black tracking-widest text-white/30">UPLOAD COVER</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* ID Card Upload */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">ID Card Scan</label>
                                                <div className="relative group/img h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                                                    {uploading.idCard ? (
                                                        <Loader2 className="animate-spin text-brand-pink" size={24} />
                                                    ) : formData.idCard ? (
                                                        <>
                                                            <img src={formData.idCard} className="w-full h-full object-contain rounded-2xl" alt="ID Card" />
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                                <button type="button" onClick={() => triggerUpload('idCard')} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                                                    <Camera size={14} />
                                                                </button>
                                                                <button type="button" onClick={() => setFormData(prev => ({...prev, idCard: ''}))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button type="button" onClick={() => triggerUpload('idCard')} className="flex flex-col items-center gap-2 group/btn">
                                                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                                                            <span className="text-[9px] font-black tracking-widest text-white/30">UPLOAD ID CARD</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Education Section */}
                                            <div className="col-span-full border-t border-white/10 pt-8 mt-8">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center gap-3">
                                                        <GraduationCap className="text-brand-pink" size={24} />
                                                        <h3 className="text-lg font-bold tracking-tight uppercase">Education</h3>
                                                    </div>
                                                    {!isAddingEducation && editingEducationIndex === null && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setIsAddingEducation(true);
                                                                setEducationForm({ degree: '', institution: '', year: '', grade: '' });
                                                            }}
                                                            className="px-4 py-2 bg-brand-pink/15 hover:bg-brand-pink border border-brand-pink/20 hover:text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all"
                                                        >
                                                            + Add Entry
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Inline Education Form */}
                                                {(isAddingEducation || editingEducationIndex !== null) && (
                                                    <div className="bg-white/2 border border-white/5 rounded-3xl p-6 mb-8 space-y-6">
                                                        <h4 className="text-sm font-bold tracking-tight text-brand-pink uppercase">
                                                            {editingEducationIndex !== null ? 'Edit Education Entry' : 'Add New Education Entry'}
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Degree / Qualification *</label>
                                                                <input
                                                                    type="text"
                                                                    value={educationForm.degree}
                                                                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. B.Tech Computer Science"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Institution *</label>
                                                                <input
                                                                    type="text"
                                                                    value={educationForm.institution}
                                                                    onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. IIT Delhi"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Year of Graduation</label>
                                                                <input
                                                                    type="text"
                                                                    value={educationForm.year}
                                                                    onChange={(e) => setEducationForm({ ...educationForm, year: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. 2020"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Grade / GPA</label>
                                                                <input
                                                                    type="text"
                                                                    value={educationForm.grade}
                                                                    onChange={(e) => setEducationForm({ ...educationForm, grade: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. 8.5 CGPA"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4 justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsAddingEducation(false);
                                                                    setEditingEducationIndex(null);
                                                                }}
                                                                className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={editingEducationIndex !== null ? handleUpdateEducation : handleAddEducation}
                                                                className="px-5 py-3 bg-brand-pink hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                            >
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Education List */}
                                                <div className="space-y-4">
                                                    {(!formData.education || formData.education.length === 0) ? (
                                                        <div className="text-center py-6 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                            No education entries added yet. Click "+ Add Entry" to begin.
                                                        </div>
                                                    ) : (
                                                        formData.education.map((edu, index) => (
                                                            <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                                                                <div className="flex items-center gap-5">
                                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                        <GraduationCap className="text-brand-pink" size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-base font-bold tracking-tight text-white mb-0.5">{edu.degree}</h4>
                                                                        <p className="text-xs text-white/40 font-medium leading-relaxed uppercase tracking-wider">{edu.institution}</p>
                                                                        {(edu.year || edu.grade) && (
                                                                            <div className="flex items-center gap-3 mt-1">
                                                                                {edu.year && <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase">{edu.year}</span>}
                                                                                {edu.grade && <span className="text-[10px] text-brand-pink/70 font-bold tracking-widest uppercase bg-brand-pink/10 px-2.5 py-0.5 rounded-full border border-brand-pink/20">{edu.grade}</span>}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setEditingEducationIndex(index);
                                                                            setEducationForm(edu);
                                                                            setIsAddingEducation(false);
                                                                        }}
                                                                        className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                                    >
                                                                        <Edit3 size={14} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteEducation(index)}
                                                                        className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>

                                            {/* Certifications Section */}
                                            <div className="col-span-full border-t border-white/10 pt-8 mt-8">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center gap-3">
                                                        <Award className="text-brand-pink" size={24} />
                                                        <h3 className="text-lg font-bold tracking-tight uppercase">Certifications</h3>
                                                    </div>
                                                    {!isAddingCertification && editingCertificationIndex === null && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setIsAddingCertification(true);
                                                                setCertificationForm({ name: '', issuedBy: '', year: '', credentialUrl: '' });
                                                            }}
                                                            className="px-4 py-2 bg-brand-pink/15 hover:bg-brand-pink border border-brand-pink/20 hover:text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all"
                                                        >
                                                            + Add Certification
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Inline Certification Form */}
                                                {(isAddingCertification || editingCertificationIndex !== null) && (
                                                    <div className="bg-white/2 border border-white/5 rounded-3xl p-6 mb-8 space-y-6">
                                                        <h4 className="text-sm font-bold tracking-tight text-brand-pink uppercase">
                                                            {editingCertificationIndex !== null ? 'Edit Certification' : 'Add New Certification'}
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Certification Name *</label>
                                                                <input
                                                                    type="text"
                                                                    value={certificationForm.name}
                                                                    onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. AWS Solutions Architect"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Issued By</label>
                                                                <input
                                                                    type="text"
                                                                    value={certificationForm.issuedBy}
                                                                    onChange={(e) => setCertificationForm({ ...certificationForm, issuedBy: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. Amazon Web Services"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Year Issued</label>
                                                                <input
                                                                    type="text"
                                                                    value={certificationForm.year}
                                                                    onChange={(e) => setCertificationForm({ ...certificationForm, year: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="e.g. 2023"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Credential URL</label>
                                                                <input
                                                                    type="text"
                                                                    value={certificationForm.credentialUrl}
                                                                    onChange={(e) => setCertificationForm({ ...certificationForm, credentialUrl: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                                    placeholder="https://credential.link..."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4 justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsAddingCertification(false);
                                                                    setEditingCertificationIndex(null);
                                                                }}
                                                                className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={editingCertificationIndex !== null ? handleUpdateCertification : handleAddCertification}
                                                                className="px-5 py-3 bg-brand-pink hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                            >
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Certifications List */}
                                                <div className="space-y-4">
                                                    {(!formData.certifications || formData.certifications.length === 0) ? (
                                                        <div className="text-center py-6 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                            No certifications added yet. Click "+ Add Certification" to begin.
                                                        </div>
                                                    ) : (
                                                        formData.certifications.map((cert, index) => (
                                                            <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                                                                <div className="flex items-center gap-5">
                                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                        <Award className="text-brand-pink" size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-base font-bold tracking-tight text-white mb-0.5">{cert.name}</h4>
                                                                        <p className="text-xs text-white/40 font-medium leading-relaxed uppercase tracking-wider">{cert.issuedBy}</p>
                                                                        {(cert.year || cert.credentialUrl) && (
                                                                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                                                {cert.year && <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase">{cert.year}</span>}
                                                                                {cert.credentialUrl && (
                                                                                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-[10px] text-brand-pink font-semibold hover:underline tracking-wide uppercase">View Credential →</a>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setEditingCertificationIndex(index);
                                                                            setCertificationForm(cert);
                                                                            setIsAddingCertification(false);
                                                                        }}
                                                                        className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                                    >
                                                                        <Edit3 size={14} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteCertification(index)}
                                                                        className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* TAB 3: TECHNICAL ARSENAL */}
                                {activeTab === 'tools' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Wrench className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">TECHNICAL ARSENAL</h2>
                                            </div>
                                            {!isAddingTool && editingToolIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingTool(true);
                                                        setToolForm({ toolName: '', level: 85 });
                                                    }}
                                                    className="px-6 py-3 bg-brand-pink/10 border border-brand-pink/20 hover:bg-brand-pink hover:text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all"
                                                >
                                                    + Add Tool
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Tool Form */}
                                        {(isAddingTool || editingToolIndex !== null) && (
                                            <div className="bg-white/2 border border-white/5 rounded-3xl p-6 mb-8 space-y-6">
                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingToolIndex !== null ? 'Edit Tool Details' : 'Add New Technical Tool'}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block mb-2">Tool Name *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={toolForm.toolName || ''}
                                                            onChange={(e) => setToolForm({ ...toolForm, toolName: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. Photoshop / React / ClickUp"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block mb-2">Proficiency Level ({toolForm.level !== undefined ? toolForm.level : 85}%)</label>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={toolForm.level !== undefined ? toolForm.level : 85}
                                                            onChange={(e) => setToolForm({ ...toolForm, level: parseInt(e.target.value) })}
                                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-pink"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingTool(false);
                                                            setEditingToolIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingToolIndex !== null ? handleUpdateTool : handleAddTool}
                                                        className="px-5 py-3 bg-brand-pink hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tools List */}
                                        <div className="space-y-4">
                                            {formData.tools.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase">
                                                    No custom tools defined yet
                                                </div>
                                            ) : (
                                                formData.tools.map((tool, index) => (
                                                    <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                                                        <div className="flex items-center gap-5 flex-1 mr-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                                                <Wrench className="text-brand-pink/50" size={20} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-base font-bold tracking-tight text-white mb-1 truncate">{tool.toolName}</h4>
                                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden max-w-md mt-2">
                                                                    <div className="bg-brand-pink h-full" style={{ width: `${tool.level !== undefined ? tool.level : 85}%` }} />
                                                                </div>
                                                                <span className="text-[10px] text-brand-pink/70 font-bold tracking-widest uppercase block mt-1">
                                                                    Proficiency: {tool.level !== undefined ? tool.level : 85}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 shrink-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingToolIndex(index);
                                                                    setToolForm({
                                                                        toolName: tool.toolName || '',
                                                                        level: tool.level !== undefined ? tool.level : 85
                                                                    });
                                                                    setIsAddingTool(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteTool(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* TAB 4: CLIENTS MANAGED */}
                                {activeTab === 'clients' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Briefcase className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">CLIENTS MANAGED</h2>
                                            </div>
                                            {!isAddingClient && editingClientIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingClient(true);
                                                        setClientForm({ name: '', companyName: '', email: '', phone: '', website: '', logo: '', status: 'active', notes: '' });
                                                    }}
                                                    className="px-6 py-3 bg-brand-pink/10 border border-brand-pink/20 hover:bg-brand-pink hover:text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all"
                                                >
                                                    + Add Client
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Client Form */}
                                        {(isAddingClient || editingClientIndex !== null) && (
                                            <div className="bg-white/2 border border-white/5 rounded-3xl p-6 mb-8 space-y-6">
                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingClientIndex !== null ? 'Edit Client Details' : 'Add New Client Profile'}
                                                </h3>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">Client/Company Name</label>
                                                    <input
                                                        type="text"
                                                        value={clientForm.name}
                                                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none text-sm transition-all"
                                                        placeholder="e.g. Nike, Google, Ajnora"
                                                    />
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingClient(false);
                                                            setEditingClientIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingClientIndex !== null ? handleUpdateClient : handleAddClient}
                                                        className="px-5 py-3 bg-brand-pink hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Clients List */}
                                        <div className="space-y-4">
                                            {formData.clients.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase">
                                                    No custom clients managed yet
                                                </div>
                                            ) : (
                                                formData.clients.map((client, index) => (
                                                    <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                <Briefcase className="text-brand-pink/50" size={18} />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-base font-bold tracking-tight text-white">{client.name}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingClientIndex(index);
                                                                    setClientForm(client);
                                                                    setIsAddingClient(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteClient(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* TAB 5: CAREER TIMELINE */}
                                {activeTab === 'timeline' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Award className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">CAREER TIMELINE (ACHIEVEMENTS)</h2>
                                            </div>
                                            {!isAddingAchievement && editingAchievementIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingAchievement(true);
                                                        setAchievementForm({ title: '', description: '', image: 'MILESTONE', date: '' });
                                                    }}
                                                    className="px-4 py-2.5 bg-[#ff3358]/10 hover:bg-[#ff3358] border border-[#ff3358]/20 hover:text-white rounded-xl text-[11px] font-bold text-[#ff3358] tracking-wide uppercase transition-all"
                                                >
                                                    + Add Milestone
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Achievement Form */}
                                        {(isAddingAchievement || editingAchievementIndex !== null) && (
                                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-8 space-y-6 relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingAchievement(false);
                                                        setEditingAchievementIndex(null);
                                                    }}
                                                    className="absolute top-6 right-6 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                                >
                                                    <X size={16} />
                                                </button>

                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingAchievementIndex !== null ? 'Edit Milestone details' : 'Add New Career Milestone'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Milestone Title *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={achievementForm.title}
                                                            onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. Lead Developer, Raised Seed Round"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Milestone Date/Year (Custom)</label>
                                                        <input
                                                            type="text"
                                                            value={achievementForm.date || ''}
                                                            onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. JAN 2019, 2024"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Badge Category</label>
                                                        <select
                                                            value={achievementForm.image}
                                                            onChange={(e) => setAchievementForm({ ...achievementForm, image: e.target.value })}
                                                            className="w-full bg-[#110e16] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] outline-none text-sm transition-all text-white font-medium appearance-none"
                                                        >
                                                            <option value="MILESTONE">Milestone</option>
                                                            <option value="INNOVATION">Innovation</option>
                                                            <option value="CLIENT WIN">Client Win</option>
                                                            <option value="PARTNERSHIP">Partnership</option>
                                                            <option value="ACHIEVEMENT">Achievement</option>
                                                            <option value="LAUNCH">Launch</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Description</label>
                                                        <textarea
                                                            value={achievementForm.description}
                                                            onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                                                            rows={3}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20 h-24 resize-none"
                                                            placeholder="Provide short details about this milestone..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingAchievement(false);
                                                            setEditingAchievementIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingAchievementIndex !== null ? handleUpdateAchievement : handleAddAchievement}
                                                        className="px-5 py-3 bg-[#ff3358] hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Achievements List */}
                                        <div className="space-y-4">
                                            {formData.achievements.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase">
                                                    No achievements or milestones defined yet
                                                </div>
                                            ) : (
                                                formData.achievements.map((ach, index) => (
                                                    <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all animate-fade-in">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                <Award className="text-brand-pink" size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-3">
                                                                    <h4 className="text-base font-bold tracking-tight text-white mb-0.5">{ach.title}</h4>
                                                                    <span className="px-2 py-0.5 rounded-full bg-brand-pink/15 border border-brand-pink/20 text-[7px] font-bold tracking-widest text-brand-pink uppercase">
                                                                        {ach.image || 'ACHIEVEMENT'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-white/40 font-medium leading-relaxed max-w-md">
                                                                    {ach.date && <span className="text-[#ff3358] font-bold mr-2">{ach.date}</span>}
                                                                    {ach.description || 'No description provided'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingAchievementIndex(index);
                                                                    setAchievementForm({
                                                                        title: ach.title || '',
                                                                        description: ach.description || '',
                                                                        image: ach.image || 'MILESTONE',
                                                                        date: ach.date || ''
                                                                    });
                                                                    setIsAddingAchievement(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteAchievement(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* TAB 6: VOICES PODCASTS */}
                                {activeTab === 'podcasts' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Mic className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">BUREAU - VOICES PODCASTS</h2>
                                            </div>
                                            {!isAddingPodcast && editingPodcastIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingPodcast(true);
                                                        setPodcastForm({ 
                                                            episodeNo: formData.podcasts.length + 1, 
                                                            title: '', 
                                                            duration: '', 
                                                            url: '', 
                                                            host: 'Sham SK' 
                                                        });
                                                    }}
                                                    className="px-4 py-2.5 bg-[#ff3358]/10 hover:bg-[#ff3358] border border-[#ff3358]/20 hover:text-white rounded-xl text-[11px] font-bold text-[#ff3358] tracking-wide uppercase transition-all"
                                                >
                                                    + Add Episode
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Podcast Form */}
                                        {(isAddingPodcast || editingPodcastIndex !== null) && (
                                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-8 space-y-6 relative animate-fade-in">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingPodcast(false);
                                                        setEditingPodcastIndex(null);
                                                    }}
                                                    className="absolute top-6 right-6 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                                >
                                                    <X size={16} />
                                                </button>

                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingPodcastIndex !== null ? 'Edit Episode Details' : 'Add New Podcast Episode'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Episode No</label>
                                                        <input
                                                            type="number"
                                                            value={podcastForm.episodeNo}
                                                            onChange={(e) => setPodcastForm({ ...podcastForm, episodeNo: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. 1"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Episode Title *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={podcastForm.title}
                                                            onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. Building Social Bureau V2"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Duration</label>
                                                        <input
                                                            type="text"
                                                            value={podcastForm.duration}
                                                            onChange={(e) => setPodcastForm({ ...podcastForm, duration: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. 45:20"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Host Name</label>
                                                        <input
                                                            type="text"
                                                            value={podcastForm.host}
                                                            onChange={(e) => setPodcastForm({ ...podcastForm, host: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. Sham SK"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Audio/Video URL</label>
                                                        <input
                                                            type="text"
                                                            value={podcastForm.url}
                                                            onChange={(e) => setPodcastForm({ ...podcastForm, url: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. https://youtube.com/... or soundcloud.com/..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingPodcast(false);
                                                            setEditingPodcastIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingPodcastIndex !== null ? handleUpdatePodcast : handleAddPodcast}
                                                        className="px-5 py-3 bg-[#ff3358] hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Podcasts List */}
                                        <div className="space-y-4">
                                            {formData.podcasts.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                    No episodes added yet. Click "+ Add Episode" to add podcasts.
                                                </div>
                                            ) : (
                                                formData.podcasts.map((pod, index) => {
                                                    // Beautiful Play Icon color rotation (Purple, Green, Red) matching visual references
                                                    const colorThemes = [
                                                        'bg-[#8e24aa] text-white hover:scale-105 transition-transform shadow-[0_5px_15px_rgba(142,36,170,0.3)]',
                                                        'bg-[#1b5e20] text-white hover:scale-105 transition-transform shadow-[0_5px_15px_rgba(27,94,32,0.3)]',
                                                        'bg-[#c62828] text-white hover:scale-105 transition-transform shadow-[0_5px_15px_rgba(198,40,40,0.3)]'
                                                    ];
                                                    const themeIndex = index % colorThemes.length;
                                                    const themeClass = colorThemes[themeIndex];

                                                    return (
                                                        <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all animate-fade-in">
                                                            <div className="flex items-center gap-5">
                                                                {/* Play Icon Box */}
                                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${themeClass}`}>
                                                                    <Play size={20} fill="currentColor" className="ml-0.5 text-white" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex flex-col gap-0.5">
                                                                        <span className="text-[9px] font-black text-brand-pink tracking-widest uppercase">
                                                                            EP {pod.episodeNo !== undefined ? String(pod.episodeNo).padStart(2, '0') : String(index + 1).padStart(2, '0')}
                                                                        </span>
                                                                        <h4 className="text-base font-bold tracking-tight text-white mb-0.5">{pod.title}</h4>
                                                                    </div>
                                                                    <p className="text-xs text-white/40 font-medium leading-relaxed max-w-md flex flex-wrap items-center gap-x-4 gap-y-1">
                                                                        {pod.duration && (
                                                                            <span className="flex items-center gap-1.5 text-white/60">
                                                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                                                                {pod.duration}
                                                                            </span>
                                                                        )}
                                                                        {pod.host && (
                                                                            <span className="text-white/40 font-bold uppercase tracking-wider text-[9px]">
                                                                                {pod.host}
                                                                            </span>
                                                                        )}
                                                                    </p>
                                                                    {pod.url && (
                                                                        <a href={pod.url} target="_blank" rel="noreferrer" className="text-[10px] text-brand-pink font-semibold hover:underline tracking-wide mt-1 block uppercase">
                                                                            Watch / Listen URL
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setEditingPodcastIndex(index);
                                                                        setPodcastForm({
                                                                            episodeNo: pod.episodeNo || (index + 1),
                                                                            title: pod.title || '',
                                                                            duration: pod.duration || '',
                                                                            url: pod.url || '',
                                                                            host: pod.host || 'Sham SK'
                                                                        });
                                                                        setIsAddingPodcast(false);
                                                                    }}
                                                                    className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                                >
                                                                    <Edit3 size={14} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeletePodcast(index)}
                                                                    className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* TAB 7: INNOVATION FEED */}
                                {activeTab === 'workShowcase' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Layout className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">WORK SHOWCASE</h2>
                                            </div>
                                            {!isAddingWorkShowcase && editingWorkShowcaseIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingWorkShowcase(true);
                                                        setWorkShowcaseForm({ 
                                                            category: '', 
                                                            title: '', 
                                                            description: '', 
                                                            images: [], 
                                                            link: ''
                                                        });
                                                    }}
                                                    className="px-4 py-2.5 bg-[#ff3358]/10 hover:bg-[#ff3358] border border-[#ff3358]/20 hover:text-white rounded-xl text-[11px] font-bold text-[#ff3358] tracking-wide uppercase transition-all"
                                                >
                                                    + Add Showcase
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Work Showcase Form */}
                                        {(isAddingWorkShowcase || editingWorkShowcaseIndex !== null) && (
                                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-8 space-y-6 relative animate-fade-in">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingWorkShowcase(false);
                                                        setEditingWorkShowcaseIndex(null);
                                                    }}
                                                    className="absolute top-6 right-6 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                                >
                                                    <X size={16} />
                                                </button>

                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingWorkShowcaseIndex !== null ? 'Edit Showcase Details' : 'Add New Showcase Item'}
                                                </h3>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Category (e.g. CONTENT CAMPAIGN, DEVELOPMENT)</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={workShowcaseForm.category}
                                                            onChange={(e) => setWorkShowcaseForm({ ...workShowcaseForm, category: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. CONTENT CAMPAIGN"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Showcase Title *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={workShowcaseForm.title}
                                                            onChange={(e) => setWorkShowcaseForm({ ...workShowcaseForm, title: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. E-Commerce Brand Growth"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Website / Live Work Link (Optional - for Developers)</label>
                                                        <input
                                                            type="text"
                                                            value={workShowcaseForm.link || ''}
                                                            onChange={(e) => setWorkShowcaseForm({ ...workShowcaseForm, link: e.target.value })}
                                                            className="w-full bg-[#110e16] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. https://myproject.com"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Content Description *</label>
                                                        <textarea
                                                            required
                                                            value={workShowcaseForm.description}
                                                            onChange={(e) => setWorkShowcaseForm({ ...workShowcaseForm, description: e.target.value })}
                                                            rows={3}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20 h-24 resize-none"
                                                            placeholder="Describe your role, strategies used, and results achieved..."
                                                        />
                                                    </div>
                                                    
                                                    {/* Upload Images (up to 3) */}
                                                    <div className="space-y-3 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">Showcase Images (Max 3, Square placeholders)</label>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {/* Render uploaded images */}
                                                            {(workShowcaseForm.images || []).map((imgUrl, i) => (
                                                                <div key={i} className="relative aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                                                                    <img src={imgUrl} className="w-full h-full object-cover" alt={`Showcase ${i+1}`} />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setWorkShowcaseForm(prev => ({
                                                                                ...prev,
                                                                                images: prev.images.filter((_, idx) => idx !== i)
                                                                            }));
                                                                        }}
                                                                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <X size={12} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            
                                                            {/* Render upload slot if less than 3 */}
                                                            {(!workShowcaseForm.images || workShowcaseForm.images.length < 3) && (
                                                                <div className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative hover:bg-white/[0.08] transition-all">
                                                                    {uploading.showcaseImage ? (
                                                                        <Loader2 className="animate-spin text-brand-pink" size={24} />
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => triggerUpload('showcaseImage')}
                                                                            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                                                                        >
                                                                            <Upload size={20} />
                                                                            <span className="text-[8px] font-black tracking-widest uppercase">Upload Square</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingWorkShowcase(false);
                                                            setEditingWorkShowcaseIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingWorkShowcaseIndex !== null ? handleUpdateWorkShowcase : handleAddWorkShowcase}
                                                        className="px-5 py-3 bg-[#ff3358] hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Showcase Items List */}
                                        <div className="space-y-4">
                                            {!formData.workShowcase || formData.workShowcase.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                    No work showcase items added yet. Click "+ Add Showcase" to add your works.
                                                </div>
                                            ) : (
                                                formData.workShowcase.map((work, index) => (
                                                    <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all animate-fade-in">
                                                        <div className="flex items-start gap-5 flex-grow">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                <Layout className="text-brand-pink" size={18} />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <h4 className="text-base font-bold tracking-tight text-white mb-0">{work.title}</h4>
                                                                    <span className="px-2 py-0.5 rounded-full text-[7px] font-bold tracking-widest border uppercase bg-brand-pink/10 border-brand-pink/20 text-brand-pink">
                                                                        {work.category || 'WORK'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-white/40 font-medium leading-relaxed max-w-xl mb-3">
                                                                    {work.description}
                                                                </p>
                                                                {work.link && (
                                                                    <a href={work.link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-pink font-semibold hover:underline tracking-wide block uppercase mb-3">
                                                                        🔗 {work.link}
                                                                    </a>
                                                                )}
                                                                {/* Render small thumbnails of showcase images */}
                                                                {work.images && work.images.length > 0 && (
                                                                    <div className="flex gap-2">
                                                                        {work.images.map((img, i) => (
                                                                            <img key={i} src={img} className="w-10 h-10 object-cover rounded-lg border border-white/10 bg-white/5" alt="" />
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 shrink-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingWorkShowcaseIndex(index);
                                                                    setWorkShowcaseForm(work);
                                                                    setIsAddingWorkShowcase(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteWorkShowcase(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === 'innovations' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="text-brand-pink" size={28} />
                                                <h2 className="text-2xl font-black tracking-tight uppercase">INNOVATION FEED</h2>
                                            </div>
                                            {!isAddingInnovation && editingInnovationIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingInnovation(true);
                                                        setInnovationForm({ 
                                                            type: 'INNOVATION', 
                                                            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
                                                            title: '', 
                                                            content: '', 
                                                            url: '', 
                                                            likes: Math.floor(Math.random() * 80) + 10, 
                                                            comments: Math.floor(Math.random() * 40) + 5
                                                        });
                                                    }}
                                                    className="px-4 py-2.5 bg-[#ff3358]/10 hover:bg-[#ff3358] border border-[#ff3358]/20 hover:text-white rounded-xl text-[11px] font-bold text-[#ff3358] tracking-wide uppercase transition-all"
                                                >
                                                    + Add Entry
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Innovation Form */}
                                        {(isAddingInnovation || editingInnovationIndex !== null) && (
                                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-8 space-y-6 relative animate-fade-in">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingInnovation(false);
                                                        setEditingInnovationIndex(null);
                                                    }}
                                                    className="absolute top-6 right-6 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                                >
                                                    <X size={16} />
                                                </button>

                                                <h3 className="text-lg font-bold tracking-tight text-brand-pink uppercase">
                                                    {editingInnovationIndex !== null ? 'Edit Innovation Details' : 'Add New Innovation Entry'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Category Type</label>
                                                        <select
                                                            value={innovationForm.type}
                                                            onChange={(e) => setInnovationForm({ ...innovationForm, type: e.target.value })}
                                                            className="w-full bg-[#110e16] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] outline-none text-sm transition-all text-white font-medium appearance-none"
                                                        >
                                                            <option value="INNOVATION">Innovation</option>
                                                            <option value="CASE STUDY">Case Study</option>
                                                            <option value="INSIGHT">Insight</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Date (e.g. May 7, 2026)</label>
                                                        <input
                                                            type="text"
                                                            value={innovationForm.date}
                                                            onChange={(e) => setInnovationForm({ ...innovationForm, date: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. May 7, 2026"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Title *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={innovationForm.title}
                                                            onChange={(e) => setInnovationForm({ ...innovationForm, title: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. API Marketing v2: E - Commerce Framework"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">External attachment URL (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={innovationForm.url || ''}
                                                            onChange={(e) => setInnovationForm({ ...innovationForm, url: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. https://github.com/... or https://example.com/project"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Content Description</label>
                                                        <textarea
                                                            value={innovationForm.content}
                                                            onChange={(e) => setInnovationForm({ ...innovationForm, content: e.target.value })}
                                                            rows={3}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20 h-24 resize-none"
                                                            placeholder="Describe your innovation, case study, or insight..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingInnovation(false);
                                                            setEditingInnovationIndex(null);
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingInnovationIndex !== null ? handleUpdateInnovation : handleAddInnovation}
                                                        className="px-5 py-3 bg-[#ff3358] hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Innovations List */}
                                        <div className="space-y-4">
                                            {!formData.innovations || formData.innovations.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                    No innovation feed entries added yet. Click "+ Add Entry" to add innovations.
                                                </div>
                                            ) : (
                                                formData.innovations.map((inn, index) => (
                                                    <div key={index} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all animate-fade-in">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                                <Sparkles className="text-brand-pink" size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-3">
                                                                    <h4 className="text-base font-bold tracking-tight text-white mb-0.5">{inn.title}</h4>
                                                                    <span className={`px-2 py-0.5 rounded-full text-[7px] font-bold tracking-widest border uppercase ${
                                                                        inn.type === 'CASE STUDY' 
                                                                            ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                                                            : inn.type === 'INSIGHT'
                                                                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                                                                                : 'bg-purple-500/10 border-purple-500/20 text-purple-500'
                                                                    }`}>
                                                                        {inn.type || 'INNOVATION'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-white/40 font-medium leading-relaxed max-w-md">
                                                                    {inn.date && <span className="text-brand-pink font-bold mr-2">{inn.date}</span>}
                                                                    {inn.content || 'No description provided'}
                                                                </p>
                                                                {inn.url && (
                                                                    <a href={inn.url} target="_blank" rel="noreferrer" className="text-[10px] text-brand-pink font-semibold hover:underline tracking-wide mt-1 block uppercase">Attachment link</a>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingInnovationIndex(index);
                                                                    setInnovationForm(inn);
                                                                    setIsAddingInnovation(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteInnovation(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}

                                {activeTab === 'blogs' && (
                                    <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-3">
                                                <BookOpen className="text-brand-pink" size={28} />
                                                <div>
                                                    <h2 className="text-2xl font-black tracking-tight uppercase">BLOG POSTS</h2>
                                                    <p className="text-xs text-white/40 font-medium mt-0.5">Link to articles you've written on the Social Bureau blog</p>
                                                </div>
                                            </div>
                                            {!isAddingBlog && editingBlogIndex === null && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsAddingBlog(true);
                                                        setBlogForm({ heading: '', link: '', image: '' });
                                                    }}
                                                    className="px-4 py-2.5 bg-[#ff3358]/10 hover:bg-[#ff3358] border border-[#ff3358]/20 hover:text-white rounded-xl text-[11px] font-bold text-[#ff3358] tracking-wide uppercase transition-all"
                                                >
                                                    + Add Blog
                                                </button>
                                            )}
                                        </div>

                                        {/* Inline Add/Edit Blog Form */}
                                        {(isAddingBlog || editingBlogIndex !== null) && (
                                            <div className="mb-8 p-6 bg-white/5 border border-[#ff3358]/20 rounded-3xl space-y-5">
                                                <h3 className="text-xs font-black tracking-widest uppercase text-brand-pink mb-4">
                                                    {editingBlogIndex !== null ? 'Edit Blog Post' : 'New Blog Post'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Blog Heading *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={blogForm.heading}
                                                            onChange={(e) => setBlogForm({ ...blogForm, heading: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="e.g. 10 Social Media Trends to Watch in 2025"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Blog Link *</label>
                                                        <input
                                                            type="url"
                                                            required
                                                            value={blogForm.link}
                                                            onChange={(e) => setBlogForm({ ...blogForm, link: e.target.value })}
                                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                            placeholder="https://socialbureau.in/blogs/your-article"
                                                        />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 mb-2 block">Cover Image URL (Optional)</label>
                                                        <div className="flex gap-3">
                                                            <input
                                                                type="url"
                                                                value={blogForm.image}
                                                                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                                                                className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-[#ff3358] focus:bg-white/[0.07] outline-none text-sm transition-all text-white font-medium placeholder-white/20"
                                                                placeholder="https://... (direct image URL)"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => { setActiveUploadField('blogImage'); fileInputRef.current?.click(); }}
                                                                className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white/60 tracking-wide uppercase transition-all whitespace-nowrap flex items-center gap-2"
                                                            >
                                                                {uploading.blogImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                                                Upload
                                                            </button>
                                                        </div>
                                                        {blogForm.image && (
                                                            <img src={blogForm.image} alt="Blog preview" className="mt-3 w-full max-w-xs h-28 object-cover rounded-2xl border border-white/10" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingBlog(false);
                                                            setEditingBlogIndex(null);
                                                            setBlogForm({ heading: '', link: '', image: '' });
                                                        }}
                                                        className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={editingBlogIndex !== null ? handleUpdateBlog : handleAddBlog}
                                                        className="px-5 py-3 bg-[#ff3358] hover:brightness-110 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Blog List */}
                                        <div className="space-y-4">
                                            {!formData.blogs || formData.blogs.length === 0 ? (
                                                <div className="text-center py-12 text-white/20 font-black tracking-wider text-xs uppercase italic">
                                                    No blog posts linked yet. Click "+ Add Blog" to add your articles.
                                                </div>
                                            ) : (
                                                formData.blogs.map((blog, index) => (
                                                    <div key={index} className="flex items-center justify-between p-5 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 transition-all animate-fade-in gap-4">
                                                        <div className="flex items-center gap-4 min-w-0">
                                                            {blog.image ? (
                                                                <img
                                                                    src={blog.image}
                                                                    alt={blog.heading}
                                                                    className="w-16 h-16 object-cover rounded-2xl border border-white/10 shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-2xl bg-[#ff3358]/10 border border-[#ff3358]/20 flex items-center justify-center shrink-0">
                                                                    <BookOpen className="text-brand-pink" size={22} />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <h4 className="text-sm font-bold tracking-tight text-white truncate">{blog.heading}</h4>
                                                                <a
                                                                    href={blog.link}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-[10px] text-brand-pink font-semibold hover:underline tracking-wide flex items-center gap-1 mt-1"
                                                                >
                                                                    <ExternalLink size={10} />
                                                                    {blog.link}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 shrink-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditingBlogIndex(index);
                                                                    setBlogForm(blog);
                                                                    setIsAddingBlog(false);
                                                                }}
                                                                className="p-3 bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteBlog(index)}
                                                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Floating Save Changes button */}
                <div className="fixed bottom-6 right-6 lg:hidden z-50">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="w-14 h-14 bg-brand-pink text-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamDashboard;
