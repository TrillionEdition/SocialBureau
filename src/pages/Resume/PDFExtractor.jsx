import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle, Loader2, Sparkles, Award, Briefcase, Users } from 'lucide-react';
import { extractPdfData } from '@/services/resumeGeneratorService';

const PDFExtractor = ({ onDataExtracted, onError }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [extractedPreview, setExtractedPreview] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFileSelection(droppedFile);
    }, []);

    const handleFileSelection = (selectedFile) => {
        setError('');
        
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size must be under 5MB.');
            return;
        }

        setFile(selectedFile);
    };

    const handleExtract = async () => {
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const extractedData = await extractPdfData(file);
            setExtractedPreview(extractedData);
            
            // Call parent with extracted data after showing preview
            setTimeout(() => {
                onDataExtracted(extractedData);
            }, 800);
        } catch (err) {
            const errorMsg = err.message || 'Failed to extract PDF. Please try again or enter data manually.';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const isExpanded = (section) => expandedSections[section] ?? true;

    return (
        <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>

                {/* Drag & Drop Zone */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    onClick={() => !file && document.getElementById('pdf-upload').click()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
                        file
                            ? 'border-green-500/50 bg-green-500/5'
                            : 'border-gray-700 hover:border-blue-500/50 hover:bg-gray-800'
                    }`}
                >
                    <input
                        id="pdf-upload"
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
                            <p className="text-gray-300 font-medium tracking-wide mb-2">
                                Drop your resume PDF here or click to browse
                            </p>
                            <p className="text-gray-500 text-sm">
                                PDF only • Max 5MB • AI-powered extraction with soft skills detection
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
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFile(null);
                                    setExtractedPreview(null);
                                }}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-red-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {file && !extractedPreview && (
                    <button
                        onClick={handleExtract}
                        disabled={loading}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Extracting with AI Enhancement...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Extract Information with AI
                            </>
                        )}
                    </button>
                )}

                {extractedPreview && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <p className="text-green-400 font-semibold flex items-center gap-2 mb-3">
                            ✓ Extraction Complete!
                        </p>
                        <p className="text-sm text-gray-300">
                            We've successfully extracted your information including soft skills and achievements. Review and proceed to template selection...
                        </p>
                    </div>
                )}
            </div>

            {/* Extracted Preview */}
            {extractedPreview && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
                    <h3 className="text-xl font-bold mb-6">Extracted Information & Analysis</h3>

                    {/* Public Profile Section */}
                    <div className="space-y-4">
                        {extractedPreview.personalInfo?.fullName && (
                            <div className="border-b border-gray-800 pb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Full Name</p>
                                <p className="text-white font-semibold text-lg">{extractedPreview.personalInfo.fullName}</p>
                            </div>
                        )}

                        {extractedPreview.personalInfo?.title && (
                            <div className="border-b border-gray-800 pb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Professional Title</p>
                                <p className="text-blue-300 font-medium">{extractedPreview.personalInfo.title}</p>
                            </div>
                        )}

                        {extractedPreview.personalInfo?.email && (
                            <div className="border-b border-gray-800 pb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Contact</p>
                                <div className="space-y-1">
                                    {extractedPreview.personalInfo.email && <p className="text-blue-400 text-sm">{extractedPreview.personalInfo.email}</p>}
                                    {extractedPreview.personalInfo.phone && <p className="text-blue-400 text-sm">{extractedPreview.personalInfo.phone}</p>}
                                    {extractedPreview.personalInfo.location && <p className="text-gray-300 text-sm">{extractedPreview.personalInfo.location}</p>}
                                </div>
                            </div>
                        )}

                        {extractedPreview.personalInfo?.summary && (
                            <div className="border-b border-gray-800 pb-4">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-400" /> AI Summary
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed">{extractedPreview.personalInfo.summary}</p>
                            </div>
                        )}
                    </div>

                    {/* Soft Skills Section */}
                    {extractedPreview.softSkills && extractedPreview.softSkills.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-2"
                                onClick={() => toggleSection('softSkills')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2">
                                    <Users className="w-4 h-4 text-purple-400" /> Soft Skills ({extractedPreview.softSkills.length})
                                </p>
                                <span className="text-gray-500 text-sm">{isExpanded('softSkills') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('softSkills') && (
                                <div className="flex flex-wrap gap-2">
                                    {extractedPreview.softSkills.map((skill, idx) => (
                                        <span 
                                            key={idx} 
                                            className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Technical Skills Section */}
                    {extractedPreview.technicalSkills && extractedPreview.technicalSkills.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-2"
                                onClick={() => toggleSection('techSkills')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Technical Skills ({extractedPreview.technicalSkills.length})</p>
                                <span className="text-gray-500 text-sm">{isExpanded('techSkills') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('techSkills') && (
                                <div className="flex flex-wrap gap-2">
                                    {extractedPreview.technicalSkills.slice(0, 20).map((skill, idx) => (
                                        <span 
                                            key={idx} 
                                            className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {extractedPreview.technicalSkills.length > 20 && (
                                        <span className="px-2 py-1 text-xs text-gray-400">+{extractedPreview.technicalSkills.length - 20} more</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Hard Skills Section */}
                    {extractedPreview.skills && extractedPreview.skills.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-2"
                                onClick={() => toggleSection('skills')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Skills ({extractedPreview.skills.length})</p>
                                <span className="text-gray-500 text-sm">{isExpanded('skills') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('skills') && (
                                <div className="flex flex-wrap gap-2">
                                    {extractedPreview.skills.slice(0, 15).map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                    {extractedPreview.skills.length > 15 && (
                                        <span className="px-2 py-1 text-xs text-gray-400">+{extractedPreview.skills.length - 15} more</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Achievements Section */}
                    {extractedPreview.achievements && extractedPreview.achievements.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-2"
                                onClick={() => toggleSection('achievements')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2">
                                    <Award className="w-4 h-4 text-yellow-400" /> Key Achievements ({extractedPreview.achievements.length})
                                </p>
                                <span className="text-gray-500 text-sm">{isExpanded('achievements') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('achievements') && (
                                <div className="space-y-2">
                                    {extractedPreview.achievements.slice(0, 5).map((achievement, idx) => (
                                        <div key={idx} className="text-sm text-gray-300 flex gap-2">
                                            <span className="text-yellow-400 flex-shrink-0">★</span>
                                            <span>{achievement}</span>
                                        </div>
                                    ))}
                                    {extractedPreview.achievements.length > 5 && (
                                        <p className="text-xs text-gray-400">+{extractedPreview.achievements.length - 5} more achievements detected</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Experience Section */}
                    {extractedPreview.experience && extractedPreview.experience.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-3"
                                onClick={() => toggleSection('experience')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-green-400" /> Experience ({extractedPreview.experience.length})
                                </p>
                                <span className="text-gray-500 text-sm">{isExpanded('experience') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('experience') && (
                                <div className="space-y-3">
                                    {extractedPreview.experience.slice(0, 3).map((exp, idx) => (
                                        <div key={idx} className="text-sm">
                                            <p className="font-semibold text-white">{exp.position}</p>
                                            <p className="text-gray-400">{exp.company} {exp.duration && `• ${exp.duration}`}</p>
                                            {exp.description && <p className="text-xs text-gray-500 mt-1">{exp.description.substring(0, 150)}...</p>}
                                        </div>
                                    ))}
                                    {extractedPreview.experience.length > 3 && (
                                        <p className="text-xs text-gray-400">+{extractedPreview.experience.length - 3} more positions</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Education Section */}
                    {extractedPreview.education && extractedPreview.education.length > 0 && (
                        <div className="border-b border-gray-800 pb-4">
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-3"
                                onClick={() => toggleSection('education')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Education ({extractedPreview.education.length})</p>
                                <span className="text-gray-500 text-sm">{isExpanded('education') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('education') && (
                                <div className="space-y-3">
                                    {extractedPreview.education.slice(0, 3).map((edu, idx) => (
                                        <div key={idx} className="text-sm">
                                            <p className="font-semibold text-white">{edu.degree}</p>
                                            <p className="text-gray-400">{edu.institution} {edu.year && `• ${edu.year}`}</p>
                                        </div>
                                    ))}
                                    {extractedPreview.education.length > 3 && (
                                        <p className="text-xs text-gray-400">+{extractedPreview.education.length - 3} more</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Certifications Section */}
                    {extractedPreview.certifications && extractedPreview.certifications.length > 0 && (
                        <div>
                            <div 
                                className="cursor-pointer flex items-center justify-between mb-2"
                                onClick={() => toggleSection('certs')}
                            >
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Certifications & Credentials ({extractedPreview.certifications.length})</p>
                                <span className="text-gray-500 text-sm">{isExpanded('certs') ? '−' : '+'}</span>
                            </div>
                            {isExpanded('certs') && (
                                <div className="space-y-2">
                                    {extractedPreview.certifications.slice(0, 5).map((cert, idx) => (
                                        <p key={idx} className="text-sm text-gray-300">• {cert}</p>
                                    ))}
                                    {extractedPreview.certifications.length > 5 && (
                                        <p className="text-xs text-gray-400">+{extractedPreview.certifications.length - 5} more</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <p className="text-sm text-blue-400 font-semibold mb-3">💡 Enhanced Extraction Features</p>
                <ul className="text-xs text-gray-400 space-y-2">
                    <li>• ✓ AI-powered soft skills detection (communication, leadership, teamwork, etc.)</li>
                    <li>• ✓ Automatic technical skills extraction and categorization</li>
                    <li>• ✓ Key achievements and metrics identification</li>
                    <li>• ✓ AI-generated professional summaries</li>
                    <li>• ✓ Complete detail extraction from all sections</li>
                    <li>• ✓ Greater accuracy for various resume formats</li>
                </ul>
            </div>
        </div>
    );
};

export default PDFExtractor;


