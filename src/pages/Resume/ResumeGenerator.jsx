import React, { useState, useEffect } from 'react';
import {
    FileUp,
    FormInput,
    Eye,
    Download,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Settings,
    RotateCcw,
    Zap,
    FileText,
    FileDown
} from 'lucide-react';
import TemplateSelector from '../../components/TemplateSelector';
import PDFExtractor from '../../components/PDFExtractor';
import ResumeForm from '../../components/ResumeForm';
import ResumePreview from '../../components/ResumePreview';

import { downloadResumeSinglePage } from "../../../utils/singlePagePdfGenerator.js";
import { getAIResumeImprovements, checkResumeQuality, generateAISuggestions } from "../../../services/aiResumeService.js";
import AIResumeGenerator from './AIResumeGenerator';
import AICompanionModal from './AICompanionModal'; // Import the new component
import { downloadResumeAsWord } from "../../../utils/wordGenerator.js";

const RESUME_TEMPLATES = {
    modern: {
        name: 'Modern',
        description: 'Clean, contemporary design - Great for tech & creative roles',
        color: 'from-blue-600 to-cyan-600'
    },
    professional: {
        name: 'Professional',
        description: 'Classic formal layout - Perfect for corporate & executive roles',
        color: 'from-slate-700 to-slate-900'
    },
    creative: {
        name: 'Creative',
        description: 'Colorful with visual elements - Ideal for designers & creatives',
        color: 'from-purple-600 to-pink-600'
    },
    minimal: {
        name: 'Minimal',
        description: 'Ultra-clean & simple - Works for any industry',
        color: 'from-gray-600 to-gray-800'
    },
    atsOptimized: {
        name: 'ATS-Optimized',
        description: 'Maximum compatibility with Applicant Tracking Systems',
        color: 'from-green-600 to-emerald-600'
    }
};

const ResumeGenerator = () => {
    const [step, setStep] = useState('method'); // method | extraction | template | input | preview
    const [method, setMethod] = useState(null); // 'pdf' | 'form' | 'fresh'
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            portfolio: '',
            title: '',
            summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pdfLoading, setPdfLoading] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [qualityScore, setQualityScore] = useState(null);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [isCompanionOpen, setIsCompanionOpen] = useState(false);
    const [companionSection, setCompanionSection] = useState(null);
    const [atsEnabled, setAtsEnabled] = useState(false);
    const [atsScore, setAtsScore] = useState(null);

    useEffect(() => {
        // Load from localStorage if exists
        const saved = localStorage.getItem('resume_draft');
        if (saved) {
            setResumeData(JSON.parse(saved));
        }
    }, []);

    const handlePdfExtracted = (data) => {
        setResumeData(data);
        setStep('template');
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setStep('input');
    };

    const handleDownloadPDF = async () => {
        if (!resumeData.personalInfo?.fullName) {
            setError('Please add your name before downloading');
            return;
        }

        setPdfLoading(true);
        try {
            const element = document.getElementById('resume-to-download');
            if (!element) {
                setError('Resume preview not found');
                return;
            }

            // Use new single-page PDF generator
            await downloadResumeSinglePage(
                element,
                resumeData.personalInfo.fullName
            );

            setError('');
        } catch (err) {
            console.error('PDF generation error:', err);
            setError(err.message || 'Failed to generate PDF. Please try again.');
        } finally {
            setPdfLoading(false);
        }
    };

    const handleOpenAICompanion = (section) => {
        setCompanionSection(section);
        setIsCompanionOpen(true);
    };

    const handleDownloadWord = () => {
        if (!resumeData.personalInfo?.fullName) {
            setError('Please add your name before downloading');
            return;
        }

        try {
            const element = document.getElementById('resume-to-download');
            if (!element) {
                setError('Resume preview not found');
                return;
            }

            downloadResumeAsWord(element, resumeData.personalInfo.fullName);
            setError('');
        } catch (err) {
            console.error('Word generation error:', err);
            setError('Failed to generate Word document. Please try again.');
        }
    };

    const handleGetAISuggestions = async () => {
        setAiLoading(true);
        try {
            const suggestions = await getAIResumeImprovements(resumeData);
            const quality = await checkResumeQuality(resumeData);
            setAiSuggestions(suggestions);
            setQualityScore(quality);
            setShowAIPanel(true);
            setError('');
        } catch (err) {
            console.error('AI error:', err);
            setError('Failed to get AI suggestions. Please try again.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleGetSuggestions = async (sectionType, currentContent) => {
        setAiLoading(true);
        try {
            const result = await generateAISuggestions(sectionType, currentContent, { jobTitle: resumeData.personalInfo.title });
            return result.suggestions;
        } catch (err) {
            console.error('AI suggestion error:', err);
            setError('Failed to get AI suggestions. Please try again.');
            return [];
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        Resume <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Generator</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Create a professional, ATS-friendly resume in minutes. Choose your method, pick a template, and stand out.
                    </p>
                </header>

                {isCompanionOpen && companionSection && (
                    <AICompanionModal
                        isOpen={isCompanionOpen}
                        onClose={() => setIsCompanionOpen(false)}
                        section={companionSection.split('.').pop()}
                        currentContent={companionSection.split('.').reduce((o, i) => o[i], resumeData)}
                        onGenerate={handleGetSuggestions}
                        onApply={(suggestion) => {
                            const keys = companionSection.split('.');
                            let updatedData = { ...resumeData };
                            let current = updatedData;
                            for (let i = 0; i < keys.length - 1; i++) {
                                current = current[keys[i]];
                            }
                            current[keys[keys.length - 1]] = suggestion;
                            setResumeData(updatedData);
                            setIsCompanionOpen(false);
                        }}
                    />
                )}

                {/* Step Indicator */}
                <div className="mb-12 flex justify-center gap-3">
                    {['Method', 'AI Generation', 'Template', 'Input', 'Preview'].map((label, idx) => (
                        <div key={label} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${(step === ['method', 'ai-generation', 'template', 'input', 'preview'][idx] ||
                                    (step === 'extraction' && idx === 1))
                                    ? 'bg-blue-600 text-white scale-110'
                                    : ['method', 'ai-generation', 'extraction', 'template', 'input', 'preview'].indexOf(step) > idx
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-800 text-gray-400'
                                }`}>
                                {['method', 'ai-generation', 'extraction', 'template', 'input', 'preview'].indexOf(step) > idx ? '✓' : idx + 1}
                            </div>
                            {idx < 4 && <div className="w-12 h-1 mx-1 bg-gray-800" />}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Steps */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">
                            {/* Step 1: Method Selection */}
                            {step === 'method' && (
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
                                    <h2 className="text-xl font-bold flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-blue-500" />
                                        How to Build?
                                    </h2>

                                    <div
                                        onClick={() => { setMethod('pdf'); setStep('extraction'); }}
                                        className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-blue-500 hover:bg-blue-500/5 rounded-xl cursor-pointer transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <FileUp className="w-5 h-5 text-blue-400 mt-1 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Extract from PDF</h3>
                                                <p className="text-xs text-gray-500 mt-1">Upload your existing resume & we'll auto-fill</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => { setMethod('form'); setStep('template'); }}
                                        className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-cyan-500 hover:bg-cyan-500/5 rounded-xl cursor-pointer transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <FormInput className="w-5 h-5 text-cyan-400 mt-1 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Fill Form</h3>
                                                <p className="text-xs text-gray-500 mt-1">Manually enter your information section by section</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => { setMethod('fresh'); setStep('template'); }}
                                        className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 hover:bg-green-500/5 rounded-xl cursor-pointer transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <RotateCcw className="w-5 h-5 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">Start Fresh</h3>
                                                <p className="text-xs text-gray-500 mt-1">Begin with a blank canvas & guided questions</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => { setMethod('ai'); setStep('ai-generation'); }}
                                        className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-500/5 rounded-xl cursor-pointer transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="w-5 h-5 text-purple-400 mt-1 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">AI Generate</h3>
                                                <p className="text-xs text-gray-500 mt-1">Let AI create your resume from job description</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'preview' && (
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        All Set!
                                    </h2>
                                    <p className="text-sm text-gray-400">Your resume is ready. Download, preview, or edit further.</p>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={handleDownloadPDF}
                                                disabled={pdfLoading}
                                                className="btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50"
                                            >
                                                {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                                PDF Format
                                            </button>
                                            <button
                                                onClick={handleDownloadWord}
                                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-medium shadow-lg hover:shadow-blue-500/20"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Word Format
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleGetAISuggestions}
                                            disabled={aiLoading}
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                            {aiLoading ? 'Analyzing...' : 'Get AI Suggestions'}
                                        </button>
                                        <button
                                            onClick={() => setStep('input')}
                                            className="w-full border border-gray-700 text-gray-400 hover:text-white py-2 rounded-lg transition-colors font-medium text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setStep('method')}
                                            className="w-full border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-400 py-2 rounded-lg transition-colors font-medium text-sm"
                                        >
                                            Start Over
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Template Selection */}
                            {step === 'template' && (
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                                    <h2 className="text-lg font-bold">Choose Template</h2>
                                    <TemplateSelector
                                        templates={RESUME_TEMPLATES}
                                        selected={selectedTemplate}
                                        onSelect={(t) => setSelectedTemplate(t)}
                                        onNext={() => setStep('input')}
                                    />
                                </div>
                            )}

                            {/* Step 3: Input Data */}
                            {step === 'input' && (
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold flex items-center gap-2">
                                            <Settings className="w-5 h-5 text-blue-400" />
                                            Settings
                                        </h2>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={atsEnabled}
                                                onChange={(e) => setAtsEnabled(e.target.checked)}
                                                className="w-4 h-4 rounded"
                                            />
                                            <span className="text-xs font-medium">ATS Mode</span>
                                        </label>
                                    </div>

                                    <button
                                        onClick={() => setStep('preview')}
                                        className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-6"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview Resume
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Dynamic Content */}
                    <div className="lg:col-span-2">
                        {/* Step: PDF Extraction */}
                        {step === 'extraction' && method === 'pdf' && (
                            <PDFExtractor
                                onDataExtracted={handlePdfExtracted}
                                onError={setError}
                            />
                        )}

                        {/* Step: Template Selection */}
                        {(step === 'template' || (step === 'extraction' && method !== 'pdf')) && (
                            <TemplateSelector
                                templates={RESUME_TEMPLATES}
                                selected={selectedTemplate}
                                onSelect={setSelectedTemplate}
                                onNext={() => {
                                    setStep('input');
                                }}
                                fullView
                            />
                        )}

                        {/* Step: AI Generation */}
                        {step === 'ai-generation' && method === 'ai' && (
                            <AIResumeGenerator
                                onResumeGenerated={(generatedData) => {
                                    setResumeData(generatedData);
                                    setStep('template');
                                }}
                                onError={setError}
                            />
                        )}

                        {/* Step: Input Data */}
                        {step === 'input' && (
                            <ResumeForm
                                data={resumeData}
                                onChange={setResumeData}
                                template={selectedTemplate}
                                onOpenAICompanion={handleOpenAICompanion}
                            />
                        )}

                        {/* Step: Preview */}
                        {step === 'preview' && (
                            <div id="resume-preview-content" className="space-y-6">
                                <ResumePreview
                                    data={resumeData}
                                    template={selectedTemplate}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeGenerator;
