// import React, { useState, useEffect } from 'react';
// import {
//     FileUp,
//     FormInput,
//     Eye,
//     Download,
//     Sparkles,
//     CheckCircle2,
//     AlertCircle,
//     Loader2,
//     Settings,
//     RotateCcw,
//     Zap
// } from 'lucide-react';
// import TemplateSelector from '../components/TemplateSelector';
// import PDFExtractor from '../components/PDFExtractor';
// import ResumeForm from '../components/ResumeForm';
// import ResumePreview from '../components/ResumePreview';
// import ATSOptimizer from '../components/ATSOptimizer';
// import { downloadResumeSinglePage } from "../../utils/singlePagePdfGenerator.js";
// import { getAIResumeImprovements, checkResumeQuality } from "../../services/aiResumeService.js";
// import AIResumeGenerator from '../components/AIResumeGenerator';

// const RESUME_TEMPLATES = {
//     modern: {
//         name: 'Modern',
//         description: 'Clean, contemporary design - Great for tech & creative roles',
//         color: 'from-blue-600 to-cyan-600'
//     },
//     professional: {
//         name: 'Professional',
//         description: 'Classic formal layout - Perfect for corporate & executive roles',
//         color: 'from-slate-700 to-slate-900'
//     },
//     creative: {
//         name: 'Creative',
//         description: 'Colorful with visual elements - Ideal for designers & creatives',
//         color: 'from-purple-600 to-pink-600'
//     },
//     minimal: {
//         name: 'Minimal',
//         description: 'Ultra-clean & simple - Works for any industry',
//         color: 'from-gray-600 to-gray-800'
//     },
//     atsOptimized: {
//         name: 'ATS-Optimized',
//         description: 'Maximum compatibility with Applicant Tracking Systems',
//         color: 'from-green-600 to-emerald-600'
//     }
// };

// const ResumeGenerator = () => {
//     const [step, setStep] = useState('method'); // method | extraction | template | input | preview
//     const [method, setMethod] = useState(null); // 'pdf' | 'form' | 'fresh'
//     const [selectedTemplate, setSelectedTemplate] = useState('modern');
//     const [resumeData, setResumeData] = useState({
//         personalInfo: {
//             fullName: '',
//             email: '',
//             phone: '',
//             location: '',
//             linkedin: '',
//             portfolio: '',
//             summary: '',
//             title: ''
//         },
//         experience: [],
//         education: [],
//         skills: [],
//         projects: [],
//         certifications: [],
//         languages: []
//     });
//     const [atsScore, setAtsScore] = useState(null);
//     const [atsEnabled, setAtsEnabled] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [pdfLoading, setPdfLoading] = useState(false);
//     const [aiSuggestions, setAiSuggestions] = useState(null);
//     const [aiLoading, setAiLoading] = useState(false);
//     const [qualityScore, setQualityScore] = useState(null);
//     const [showAIPanel, setShowAIPanel] = useState(false);

//     useEffect(() => {
//         // Load from localStorage if exists
//         const saved = localStorage.getItem('resume_draft');
//         if (saved) {
//             setResumeData(JSON.parse(saved));
//         }
//     }, []);

//     const handlePdfExtracted = (data) => {
//         setResumeData(data);
//         setStep('template');
//     };

//     const handleTemplateSelect = (template) => {
//         setSelectedTemplate(template);
//         setStep('input');
//     };

//     const handleDownloadPDF = async () => {
//         if (!resumeData.personalInfo?.fullName) {
//             setError('Please add your name before downloading');
//             return;
//         }

//         setPdfLoading(true);
//         try {
//             const element = document.getElementById('resume-preview-content');
//             if (!element) {
//                 setError('Resume preview not found');
//                 return;
//             }

//             // Use new single-page PDF generator
//             await downloadResumeSinglePage(
//                 element,
//                 resumeData.personalInfo.fullName
//             );
            
//             setError('');
//         } catch (err) {
//             console.error('PDF generation error:', err);
//             setError(err.message || 'Failed to generate PDF. Please try again.');
//         } finally {
//             setPdfLoading(false);
//         }
//     };

//     const handleGetAISuggestions = async () => {
//         setAiLoading(true);
//         try {
//             const suggestions = await getAIResumeImprovements(resumeData);
//             const quality = await checkResumeQuality(resumeData);
//             setAiSuggestions(suggestions);
//             setQualityScore(quality);
//             setShowAIPanel(true);
//             setError('');
//         } catch (err) {
//             console.error('AI error:', err);
//             setError('Failed to get AI suggestions. Please try again.');
//         } finally {
//             setAiLoading(false);
//         }
//     };

//     const applyAISuggestion = (suggestion) => {
//         if (suggestion.type === 'summary' && suggestion.examples) {
//             setResumeData(prev => ({
//                 ...prev,
//                 personalInfo: {
//                     ...prev.personalInfo,
//                     summary: suggestion.examples[0]
//                 }
//             }));
//         }
//         setError('');
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-12 px-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <header className="text-center mb-12">
//                     <h1 className="text-5xl font-extrabold tracking-tight mb-4">
//                         Resume <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Generator</span>
//                     </h1>
//                     <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//                         Create a professional, ATS-friendly resume in minutes. Choose your method, pick a template, and stand out.
//                     </p>
//                 </header>

//                 {/* Step Indicator */}
//                 <div className="mb-12 flex justify-center gap-3">
//                     {['Method', 'AI Generation', 'Template', 'Input', 'Preview'].map((label, idx) => (
//                         <div key={label} className="flex items-center">
//                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
//                                 (step === ['method', 'ai-generation', 'template', 'input', 'preview'][idx] || 
//                                  (step === 'extraction' && idx === 1))
//                                     ? 'bg-blue-600 text-white scale-110'
//                                     : ['method', 'ai-generation', 'extraction', 'template', 'input', 'preview'].indexOf(step) > idx
//                                     ? 'bg-green-600 text-white'
//                                     : 'bg-gray-800 text-gray-400'
//                             }`}>
//                                 {['method', 'ai-generation', 'extraction', 'template', 'input', 'preview'].indexOf(step) > idx ? '✓' : idx + 1}
//                             </div>
//                             {idx < 4 && <div className="w-12 h-1 mx-1 bg-gray-800" />}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Panel: Steps */}
//                     <div className="lg:col-span-1">
//                         <div className="sticky top-8 space-y-4">
//                             {/* Step 1: Method Selection */}
//                             {step === 'method' && (
//                                 <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
//                                     <h2 className="text-xl font-bold flex items-center gap-3">
//                                         <Sparkles className="w-5 h-5 text-blue-500" />
//                                         How to Build?
//                                     </h2>

//                                     <div
//                                         onClick={() => { setMethod('pdf'); setStep('extraction'); }}
//                                         className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-blue-500 hover:bg-blue-500/5 rounded-xl cursor-pointer transition-all group"
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <FileUp className="w-5 h-5 text-blue-400 mt-1 group-hover:scale-110 transition-transform" />
//                                             <div>
//                                                 <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Extract from PDF</h3>
//                                                 <p className="text-xs text-gray-500 mt-1">Upload your existing resume & we'll auto-fill</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div
//                                         onClick={() => { setMethod('form'); setStep('template'); }}
//                                         className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-cyan-500 hover:bg-cyan-500/5 rounded-xl cursor-pointer transition-all group"
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <FormInput className="w-5 h-5 text-cyan-400 mt-1 group-hover:scale-110 transition-transform" />
//                                             <div>
//                                                 <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Fill Form</h3>
//                                                 <p className="text-xs text-gray-500 mt-1">Manually enter your information section by section</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div
//                                         onClick={() => { setMethod('fresh'); setStep('template'); }}
//                                         className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-green-500 hover:bg-green-500/5 rounded-xl cursor-pointer transition-all group"
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <RotateCcw className="w-5 h-5 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
//                                             <div>
//                                                 <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">Start Fresh</h3>
//                                                 <p className="text-xs text-gray-500 mt-1">Begin with a blank canvas & guided questions</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div
//                                         onClick={() => { setMethod('ai'); setStep('ai-generation'); }}
//                                         className="p-4 bg-gray-800/50 border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-500/5 rounded-xl cursor-pointer transition-all group"
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <Sparkles className="w-5 h-5 text-purple-400 mt-1 group-hover:scale-110 transition-transform" />
//                                             <div>
//                                                 <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">AI Generate</h3>
//                                                 <p className="text-xs text-gray-500 mt-1">Let AI create your resume from job description</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {step === 'preview' && (
//                                         <div className="pt-4 border-t border-gray-700 space-y-3">
//                                             <button
//                                                 onClick={handleDownloadPDF}
//                                                 disabled={pdfLoading}
//                                                 className="w-full btn-primary flex items-center justify-center gap-2 py-2 disabled:opacity-50"
//                                             >
//                                                 {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
//                                                 {pdfLoading ? 'Generating...' : 'Download PDF (Single Page)'}
//                                             </button>
//                                             <button
//                                                 onClick={handleGetAISuggestions}
//                                                 disabled={aiLoading}
//                                                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
//                                             >
//                                                 {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
//                                                 {aiLoading ? 'Analyzing...' : 'Get AI Suggestions'}
//                                             </button>
//                                             <button
//                                                 onClick={() => setStep('method')}
//                                                 className="w-full border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-400 py-2 rounded-lg transition-colors font-medium text-sm"
//                                             >
//                                                 Start Over
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Step 2: Template Selection */}
//                             {step === 'template' && (
//                                 <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
//                                     <h2 className="text-lg font-bold">Choose Template</h2>
//                                     <TemplateSelector
//                                         templates={RESUME_TEMPLATES}
//                                         selected={selectedTemplate}
//                                         onSelect={(t) => setSelectedTemplate(t)}
//                                         onNext={() => setStep('input')}
//                                     />
//                                 </div>
//                             )}

//                             {/* Step 3: Input Data */}
//                             {step === 'input' && (
//                                 <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
//                                     <div className="flex items-center justify-between">
//                                         <h2 className="text-lg font-bold flex items-center gap-2">
//                                             <Settings className="w-5 h-5 text-blue-400" />
//                                             Settings
//                                         </h2>
//                                         <label className="flex items-center gap-2 cursor-pointer">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={atsEnabled}
//                                                 onChange={(e) => setAtsEnabled(e.target.checked)}
//                                                 className="w-4 h-4 rounded"
//                                             />
//                                             <span className="text-xs font-medium">ATS Mode</span>
//                                         </label>
//                                     </div>

//                                     {atsEnabled && atsScore !== null && (
//                                         <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-green-400">ATS Score</span>
//                                                 <span className="text-2xl font-bold text-green-400">{atsScore}%</span>
//                                             </div>
//                                             <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
//                                                 <div className="h-full bg-green-500 transition-all" style={{ width: `${atsScore}%` }} />
//                                             </div>
//                                         </div>
//                                     )}

//                                     <button
//                                         onClick={() => setStep('preview')}
//                                         className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-6"
//                                     >
//                                         <Eye className="w-4 h-4" />
//                                         Preview Resume
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Step 4: Export */}
//                             {step === 'preview' && (
//                                 <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
//                                     <h2 className="text-lg font-bold flex items-center gap-2">
//                                         <CheckCircle2 className="w-5 h-5 text-green-500" />
//                                         All Set!
//                                     </h2>
//                                     <p className="text-sm text-gray-400">Your resume is ready. Download, preview, or edit further.</p>

//                                     <div className="space-y-3">
//                                         <button
//                                             onClick={handleDownloadPDF}
//                                             className="w-full btn-primary flex items-center justify-center gap-2 py-3"
//                                         >
//                                             <Download className="w-4 h-4" />
//                                             Download PDF
//                                         </button>
//                                         <button
//                                             onClick={() => setStep('input')}
//                                             className="w-full border border-gray-700 text-gray-400 hover:text-white py-2 rounded-lg transition-colors font-medium text-sm"
//                                         >
//                                             Edit
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Right Panel: Dynamic Content */}
//                     <div className="lg:col-span-2">
//                         {/* Step: PDF Extraction */}
//                         {step === 'extraction' && method === 'pdf' && (
//                             <PDFExtractor
//                                 onDataExtracted={handlePdfExtracted}
//                                 onError={setError}
//                             />
//                         )}

//                         {/* Step: Template Selection */}
//                         {(step === 'template' || (step === 'extraction' && method !== 'pdf')) && (
//                             <TemplateSelector
//                                 templates={RESUME_TEMPLATES}
//                                 selected={selectedTemplate}
//                                 onSelect={setSelectedTemplate}
//                                 onNext={() => {
//                                     setSelectedTemplate(selectedTemplate);
//                                     setStep('input');
//                                 }}
//                                 fullView
//                             />
//                         )}

//                         {/* Step: AI Generation */}
//                         {step === 'ai-generation' && method === 'ai' && (
//                             <AIResumeGenerator
//                                 onResumeGenerated={(generatedData) => {
//                                     setResumeData(generatedData);
//                                     setStep('template');
//                                 }}
//                                 onError={setError}
//                             />
//                         )}

//                         {/* Step: Input Data */}
//                         {step === 'input' && (
//                             <ResumeForm
//                                 data={resumeData}
//                                 onChange={setResumeData}
//                                 template={selectedTemplate}
//                             />
//                         )}

//                         {/* Step: Preview */}
//                         {step === 'preview' && (
//                             <div id="resume-preview-content" className="space-y-6">
//                                 <ResumePreview
//                                     data={resumeData}
//                                     template={selectedTemplate}
//                                     onATSScoreChange={setAtsScore}
//                                 />
//                                 {atsEnabled && (
//                                     <ATSOptimizer
//                                         resumeData={resumeData}
//                                         onUpdate={setResumeData}
//                                     />
//                                 )}

//                                 {/* AI Suggestions Panel */}
//                                 {showAIPanel && aiSuggestions && (
//                                     <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6 space-y-4 mt-8">
//                                         <div className="flex items-center justify-between">
//                                             <h3 className="text-xl font-bold flex items-center gap-2">
//                                                 <Zap className="w-5 h-5 text-purple-400" />
//                                                 AI Improvement Suggestions
//                                             </h3>
//                                             <button
//                                                 onClick={() => setShowAIPanel(false)}
//                                                 className="text-gray-400 hover:text-white text-2xl"
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>

//                                         {qualityScore && (
//                                             <div className="bg-gray-800/50 rounded-lg p-4">
//                                                 <div className="flex justify-between items-center mb-2">
//                                                     <span className="text-sm font-semibold">Resume Quality Score</span>
//                                                     <span className={`text-2xl font-bold ${
//                                                         qualityScore.overallScore >= 80 ? 'text-green-400' :
//                                                         qualityScore.overallScore >= 60 ? 'text-yellow-400' :
//                                                         'text-red-400'
//                                                     }`}>
//                                                         {Math.round(qualityScore.overallScore)}/100
//                                                     </span>
//                                                 </div>
//                                                 <div className="w-full bg-gray-700 rounded-full h-2">
//                                                     <div
//                                                         className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
//                                                         style={{ width: `${Math.min(qualityScore.overallScore, 100)}%` }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}

//                                         <div className="space-y-3">
//                                             <h4 className="text-sm font-bold text-purple-300">Suggestions:</h4>
//                                             {aiSuggestions.improvements?.map((suggestion, idx) => (
//                                                 <div key={idx} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
//                                                     <div className="flex items-start gap-3">
//                                                         <AlertCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
//                                                         <div className="flex-1">
//                                                             <p className="font-semibold text-sm text-white mb-1">{suggestion.title}</p>
//                                                             <p className="text-xs text-gray-400 mb-2">{suggestion.description}</p>
//                                                             {suggestion.examples && suggestion.examples.length > 0 && (
//                                                                 <button
//                                                                     onClick={() => applyAISuggestion(suggestion)}
//                                                                     className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded transition-colors"
//                                                                 >
//                                                                     Apply Suggestion
//                                                                 </button>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                         {aiSuggestions.strengths && aiSuggestions.strengths.length > 0 && (
//                                             <div className="space-y-2 pt-4 border-t border-gray-700">
//                                                 <h4 className="text-sm font-bold text-green-300">Strengths:</h4>
//                                                 {aiSuggestions.strengths.map((strength, idx) => (
//                                                     <div key={idx} className="flex items-center gap-2 text-xs text-green-300">
//                                                         <CheckCircle2 className="w-4 h-4" />
//                                                         {strength}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Custom CSS */}
//             <style jsx>{`
//                 .btn-primary {
//                     @apply bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105;
//                 }
//                 .btn-secondary {
//                     @apply border border-blue-600 text-blue-400 hover:bg-blue-600/10 rounded-lg font-semibold transition-all duration-300;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ResumeGenerator;
