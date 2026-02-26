import React, { useState, useEffect, useCallback } from 'react';
import {
    Upload,
    X,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Loader2,
    Trash2,
    Copy,
    Check,
    History as HistoryIcon
} from 'lucide-react';
import { fetchHistory, analyzeResume, deleteScan } from '../../services/atsService';

const ATSChecker = () => {
    const [clientId, setClientId] = useState('');
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState(false);

    // Initial setup for clientId
    useEffect(() => {
        let id = localStorage.getItem('ats_client_id');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('ats_client_id', id);
        }
        setClientId(id);
        loadHistory(id);
    }, []);

    const loadHistory = async (id) => {
        try {
            const data = await fetchHistory(id);
            setHistory(data);
        } catch (err) {
            console.error('Error fetching history:', err);
        }
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelection(droppedFile);
    }, []);

    const handleFileSelection = (selectedFile) => {
        setError('');
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            return;
        }

        if (selectedFile.size > 4 * 1024 * 1024) {
            setError('File size must be under 4MB.');
            return;
        }

        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        if (!file || jobDescription.length < 100) return;

        setLoading(true);
        setError('');

        try {
            const data = await analyzeResume(clientId, file, jobDescription);
            setResult(data);
            loadHistory(clientId);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteScan(clientId, id);
            setHistory(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error deleting scan:', err);
        }
    };

    const copySuggestions = () => {
        if (!result?.suggestions) return;
        const text = result.suggestions.join('\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getScoreColor = (score) => {
        if (score >= 75) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
                        ATS Resume <span className="text-blue-500">Score Checker</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Optimize your resume for applicant tracking systems with our expert analysis.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Panel: Input */}
                    <div className="space-y-8">
                        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <FileText className="text-blue-500 w-5 h-5" />
                                Upload & Details
                            </h2>

                            {/* Drag & Drop Zone */}
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={onDrop}
                                onClick={() => document.getElementById('file-upload').click()}
                                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${file ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 hover:border-blue-500/50 hover:bg-gray-800'
                                    }`}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => handleFileSelection(e.target.files[0])}
                                />
                                {!file ? (
                                    <div className="flex flex-col items-center">
                                        <div className="p-4 bg-gray-800 rounded-full mb-4 group-hover:bg-gray-700 transition-colors">
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-300 font-medium tracking-wide">
                                            Drop your resume PDF here or click to browse
                                        </p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            PDF only • Max 4MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-2">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-800 rounded-lg">
                                                <FileText className="text-blue-500 w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-white truncate max-w-[200px]">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-red-500"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Job Description */}
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-400">Job Description</label>
                                    <span className="text-xs text-gray-500">{jobDescription.length} characters</span>
                                </div>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    className="w-full h-48 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                                />
                                {jobDescription.length > 0 && jobDescription.length < 100 && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Still needs {100 - jobDescription.length} more characters
                                    </p>
                                )}
                            </div>

                            {error && (
                                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !file || jobDescription.length < 100}
                                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    'Run Analysis'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Result */}
                    <div className={`${!result ? 'hidden' : 'block'}`}>
                        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl sticky top-8">
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className={`text-7xl font-black mb-2 ${getScoreColor(result?.score)}`}>
                                    {result?.score}
                                </div>
                                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">
                                    Overall Match Score
                                </div>
                            </div>

                            {/* Sub-scores */}
                            <div className="space-y-6 mb-10">
                                {result?.subScores && Object.entries(result.subScores).map(([key, val]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className="font-bold">{val}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                                                style={{ width: `${val}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Section Checklist */}
                            <div className="mb-10">
                                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Structure Check</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {result?.sectionChecklist && Object.entries(result.sectionChecklist).map(([section, found]) => (
                                        <div key={section} className="flex items-center gap-2 text-sm">
                                            {found ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            )}
                                            <span className={found ? 'text-gray-200' : 'text-gray-500 line-through'}>{section}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="mb-10">
                                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Critical Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result?.matchedKeywords?.map(kw => (
                                        <span key={kw} className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium">
                                            {kw}
                                        </span>
                                    ))}
                                    {result?.missingKeywords?.map(kw => (
                                        <span key={kw} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Skill Gaps */}
                            <div className="mb-10">
                                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider text-amber-500/80">Skill Gaps</h3>
                                <div className="flex flex-wrap gap-2">
                                    {result?.skillGaps?.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                    {(!result?.skillGaps || result.skillGaps.length === 0) && (
                                        <p className="text-xs text-gray-500 italic">No significant skill gaps detected.</p>
                                    )}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="relative p-6 bg-gray-800/50 rounded-xl border border-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-semibold text-gray-200">Improvement Steps</h3>
                                    <button
                                        onClick={copySuggestions}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                                    >
                                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                        {copied ? 'Copied!' : 'Copy All'}
                                    </button>
                                </div>
                                <ol className="space-y-3 text-sm text-gray-400">
                                    {result?.suggestions?.map((s, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <span className="text-blue-500 font-bold">{idx + 1}.</span>
                                            {s}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <HistoryIcon className="text-blue-500 w-6 h-6" />
                        <h2 className="text-2xl font-bold">Past Analysis</h2>
                    </div>

                    {history.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {history.map(item => (
                                <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`text-3xl font-black ${getScoreColor(item.score)}`}>
                                            {item.score}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-gray-600 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-white font-semibold truncate mb-1" title={item.fileName}>
                                        {item.fileName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800">
                            <HistoryIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">No past scans yet. Start by analyzing a resume!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ATSChecker;