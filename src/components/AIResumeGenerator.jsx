import React, { useState } from 'react';
import {
    Sparkles,
    FileText,
    Briefcase,
    GraduationCap,
    Code,
    Lightbulb,
    Target,
    Wand2,
    Loader2,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Tag,
    CheckCircle2
} from 'lucide-react';
import {
    generateResumeFromJob,
    generateSectionSuggestions,
    optimizeResumeForJob,
    generateExperienceDescription,
    recommendSkills,
    extractSEOKeywords,
    analyzeSEOMatch
} from '../../services/aiResumeService';

const AIResumeGenerator = ({ onResumeGenerated, currentResumeData = {} }) => {
    const [activeTab, setActiveTab] = useState('job-based');
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [userInfo, setUserInfo] = useState({
        fullName: currentResumeData.personalInfo?.fullName || '',
        email: currentResumeData.personalInfo?.email || '',
        experience: '',
        jobTitle: currentResumeData.personalInfo?.title || ''
    });
    const [sectionType, setSectionType] = useState('summary');
    const [sectionContext, setSectionContext] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [generatedResume, setGeneratedResume] = useState(null);
    const [error, setError] = useState('');
    const [seoKeywords, setSeoKeywords] = useState(null);
    const [seoMatch, setSeoMatch] = useState(null);

    const tabs = [
        { id: 'job-based', label: 'Job-Based Generation', icon: Target },
        { id: 'section-help', label: 'Section Assistant', icon: Lightbulb },
        { id: 'optimize', label: 'Job Optimization', icon: Wand2 },
        { id: 'seo-keywords', label: 'SEO Keywords', icon: Tag }
    ];

    const sectionTypes = [
        { value: 'summary', label: 'Professional Summary', icon: FileText },
        { value: 'experience', label: 'Work Experience', icon: Briefcase },
        { value: 'skills', label: 'Skills', icon: Code },
        { value: 'projects', label: 'Projects', icon: Code },
        { value: 'education', label: 'Education', icon: GraduationCap }
    ];

    const handleGenerateFromJob = async () => {
        if (!jobDescription.trim()) {
            setError('Please enter a job description');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await generateResumeFromJob(jobDescription, userInfo);
            setGeneratedResume(result);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateSuggestions = async () => {
        setLoading(true);
        setError('');

        try {
            const result = await generateSectionSuggestions(sectionType, sectionContext);
            setSuggestions(result.suggestions || []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOptimizeForJob = async () => {
        if (!jobDescription.trim()) {
            setError('Please enter a job description to optimize for');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await optimizeResumeForJob(currentResumeData, jobDescription);
            setSuggestions(result.suggestions || []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUseGeneratedResume = () => {
        if (generatedResume && onResumeGenerated) {
            onResumeGenerated(generatedResume);
        }
    };

    const handleExtractSEOKeywords = async () => {
        if (!jobDescription.trim()) {
            setError('Please enter a job description');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await extractSEOKeywords(jobDescription);
            setSeoKeywords(result);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeSEOMatch = async () => {
        if (!jobDescription.trim()) {
            setError('Please enter a job description');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await analyzeSEOMatch(currentResumeData, jobDescription);
            setSeoMatch(result);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUseSuggestion = (suggestion) => {
        // This would be handled by parent component
        if (onResumeGenerated) {
            onResumeGenerated({ suggestion, sectionType });
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">AI Resume Generator</h2>
                    <p className="text-gray-400 text-sm">Let AI help you create the perfect resume</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-800">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Job-Based Generation Tab */}
            {activeTab === 'job-based' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Description
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here... Include requirements, responsibilities, and qualifications."
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.fullName}
                                onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                                placeholder="John Doe"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                                placeholder="john@example.com"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Years of Experience
                            </label>
                            <input
                                type="text"
                                value={userInfo.experience}
                                onChange={(e) => setUserInfo({...userInfo, experience: e.target.value})}
                                placeholder="5 years"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Current/Desired Job Title
                            </label>
                            <input
                                type="text"
                                value={userInfo.jobTitle}
                                onChange={(e) => setUserInfo({...userInfo, jobTitle: e.target.value})}
                                placeholder="Software Engineer"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerateFromJob}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate AI Resume
                            </>
                        )}
                    </button>

                    {generatedResume && (
                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <h3 className="font-semibold text-green-400">Resume Generated Successfully!</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                                AI has created a complete resume tailored to the job description.
                            </p>
                            <button
                                onClick={handleUseGeneratedResume}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Use This Resume
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Section Assistant Tab */}
            {activeTab === 'section-help' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Which section do you need help with?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {sectionTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.value}
                                        onClick={() => setSectionType(type.value)}
                                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                                            sectionType === type.value
                                                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                                : 'border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{type.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {sectionType === 'experience' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={sectionContext.position || ''}
                                    onChange={(e) => setSectionContext({...sectionContext, position: e.target.value})}
                                    placeholder="Software Engineer"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={sectionContext.company || ''}
                                    onChange={(e) => setSectionContext({...sectionContext, company: e.target.value})}
                                    placeholder="Tech Corp"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    {sectionType === 'skills' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Job Title/Industry
                            </label>
                            <input
                                type="text"
                                value={sectionContext.jobTitle || ''}
                                onChange={(e) => setSectionContext({...sectionContext, jobTitle: e.target.value})}
                                placeholder="Software Engineer"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleGenerateSuggestions}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Suggestions...
                            </>
                        ) : (
                            <>
                                <Lightbulb className="w-5 h-5" />
                                Generate AI Suggestions
                            </>
                        )}
                    </button>

                    {suggestions.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-white">AI Suggestions:</h3>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className="p-4 bg-gray-800 border border-gray-700 rounded-xl">
                                    <p className="text-gray-300 text-sm mb-3">{suggestion}</p>
                                    <button
                                        onClick={() => handleUseSuggestion(suggestion)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Use This
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Job Optimization Tab */}
            {activeTab === 'optimize' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Description to Optimize For
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here to optimize your current resume..."
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <button
                        onClick={handleOptimizeForJob}
                        disabled={loading || !jobDescription.trim()}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Optimizing Resume...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" />
                                Optimize for Job
                            </>
                        )}
                    </button>

                    {suggestions.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <Target className="w-5 h-5 text-green-400" />
                                Optimization Suggestions:
                            </h3>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                    <p className="text-green-300 text-sm">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* SEO Keywords Tab */}
            {activeTab === 'seo-keywords' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Description
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description to extract SEO keywords..."
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={handleExtractSEOKeywords}
                            disabled={loading || !jobDescription.trim()}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                        >
                            {loading && activeTab === 'seo-keywords' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Extracting Keywords...
                                </>
                            ) : (
                                <>
                                    <Tag className="w-5 h-5" />
                                    Extract Keywords
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleAnalyzeSEOMatch}
                            disabled={loading || !jobDescription.trim()}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing Match...
                                </>
                            ) : (
                                <>
                                    <TrendingUp className="w-5 h-5" />
                                    Analyze Match
                                </>
                            )}
                        </button>
                    </div>

                    {/* SEO Keywords Display */}
                    {seoKeywords && (
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    Extracted Keywords ({seoKeywords.keywords?.count || 0})
                                </h3>
                                
                                {seoKeywords.keywords?.technicalSkills && seoKeywords.keywords.technicalSkills.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-2">Technical Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {seoKeywords.keywords.technicalSkills.map((skill, idx) => (
                                                <span key={idx} className="bg-blue-500/20 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-lg text-xs font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {seoKeywords.keywords?.softSkills && seoKeywords.keywords.softSkills.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-2">Soft Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {seoKeywords.keywords.softSkills.map((skill, idx) => (
                                                <span key={idx} className="bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1 rounded-lg text-xs font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {seoKeywords.keywords?.methodologies && seoKeywords.keywords.methodologies.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">Methodologies:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {seoKeywords.keywords.methodologies.map((method, idx) => (
                                                <span key={idx} className="bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1 rounded-lg text-xs font-medium">
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {seoKeywords.tips && seoKeywords.tips.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                                        SEO Optimization Tips:
                                    </h4>
                                    {seoKeywords.tips.map((tip, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border ${
                                            tip.priority === 'high' 
                                                ? 'bg-red-500/10 border-red-500/20' 
                                                : 'bg-yellow-500/10 border-yellow-500/20'
                                        }`}>
                                            <p className={`text-sm font-medium ${
                                                tip.priority === 'high' ? 'text-red-300' : 'text-yellow-300'
                                            }`}>
                                                {tip.category} - {tip.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                                            </p>
                                            <p className="text-sm text-gray-300 mt-1">{tip.tip}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* SEO Match Analysis */}
                    {seoMatch && (
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                    Keyword Match Analysis
                                </h3>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300">Match Score</span>
                                        <span className="text-2xl font-bold text-blue-400">
                                            {seoMatch.match?.matchPercentage || 0}%
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                                            style={{ width: `${seoMatch.match?.matchPercentage || 0}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {seoMatch.match?.totalMatched || 0} of {seoMatch.match?.totalJobKeywords || 0} keywords matched
                                    </p>
                                </div>

                                {seoMatch.recommendations && (
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-300 mb-2">Grade: <span className="text-blue-300 text-lg font-bold">{seoMatch.recommendations.overallGrade}</span></p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Skills to Add:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {seoMatch.recommendations.addSkills?.slice(0, 5).map((skill, idx) => (
                                                    <span key={idx} className="bg-red-500/20 border border-red-500/40 text-red-300 px-2 py-1 rounded text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Emphasis Areas:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {seoMatch.recommendations.emphasizeSkills?.slice(0, 5).map((skill, idx) => (
                                                    <span key={idx} className="bg-green-500/20 border border-green-500/40 text-green-300 px-2 py-1 rounded text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AIResumeGenerator;