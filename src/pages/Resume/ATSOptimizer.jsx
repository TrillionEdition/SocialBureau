import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { getATSSuggestions, calculateATSScore } from '@/utils/atsOptimization';

const ATSOptimizer = ({ resumeData, onUpdate }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [scoreData, setScoreData] = useState(null);

    useEffect(() => {
        const sug = getATSSuggestions(resumeData);
        setSuggestions(sug);
        
        const score = calculateATSScore(resumeData);
        setScoreData(typeof score === 'number' ? { overall: score } : score);
    }, [resumeData]);

    const handleApplyFix = (suggestion) => {
        if (suggestion.action) {
            suggestion.action(resumeData, onUpdate);
        }
    };

    const getSuggestionIcon = (priority) => {
        switch (priority) {
            case 'critical':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'high':
                return <Zap className="w-5 h-5 text-amber-500" />;
            case 'medium':
                return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
            default:
                return <BookOpen className="w-5 h-5 text-green-500" />;
        }
    };

    const criticalSuggestions = suggestions.filter(s => s.priority === 'critical');
    const highSuggestions = suggestions.filter(s => s.priority === 'high');
    const mediumSuggestions = suggestions.filter(s => s.priority === 'medium');
    const lowSuggestions = suggestions.filter(s => s.priority === 'low');

    const getScoreColor = (score) => {
        if (score >= 85) return 'text-green-500';
        if (score >= 70) return 'text-blue-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreBgColor = (score) => {
        if (score >= 85) return 'from-green-500/20 to-green-400/5 border-green-500/30';
        if (score >= 70) return 'from-blue-500/20 to-blue-400/5 border-blue-500/30';
        if (score >= 50) return 'from-yellow-500/20 to-yellow-400/5 border-yellow-500/30';
        return 'from-red-500/20 to-red-400/5 border-red-500/30';
    };

    const getScoreLabel = (score) => {
        if (score >= 85) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 50) return 'Fair';
        return 'Needs Work';
    };

    const overallScore = scoreData?.overall || 0;

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            {/* ATS Score Header */}
            <div className={`bg-gradient-to-br ${getScoreBgColor(overallScore)} border rounded-2xl p-8 mb-8`}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-blue-500" />
                            ATS Score Analysis
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Your resume's readability score for Applicant Tracking Systems
                        </p>
                    </div>
                    <div className={`text-right rounded-xl p-6 bg-gray-800/50`}>
                        <div className={`text-5xl font-black ${getScoreColor(overallScore)}`}>
                            {Math.round(overallScore)}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{getScoreLabel(overallScore)}</div>
                    </div>
                </div>

                {/* Score Breakdown Bars */}
                {scoreData?.breakdown && (
                    <div className="mt-8 space-y-4">
                        <h4 className="text-sm font-semibold text-white mb-4">Score Breakdown</h4>
                        {Object.entries(scoreData.breakdown).map(([category, score]) => {
                            const maxScores = {
                                contact: 10,
                                summary: 8,
                                experience: 20,
                                education: 12,
                                skills: 12,
                                keywords: 15,
                                formatting: 10,
                                links: 5,
                                projects: 8
                            };
                            const maxScore = maxScores[category] || 10;
                            const percentage = (score / maxScore) * 100;
                            const categoryLabel = category
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())
                                .trim();

                            return (
                                <div key={category}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-gray-300">{categoryLabel}</span>
                                        <span className="text-xs font-bold text-gray-400">{score}/{maxScore}</span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Insights */}
                {scoreData?.details && (
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                            <div className="text-2xl font-bold text-cyan-400">{scoreData.details.actionVerbs}</div>
                            <div className="text-xs text-gray-400 mt-1">Action Verbs</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                            <div className="text-2xl font-bold text-cyan-400">{scoreData.details.keywords}</div>
                            <div className="text-xs text-gray-400 mt-1">Keywords Found</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                            <div className="text-2xl font-bold text-cyan-400">{scoreData.details.experienceQuality}</div>
                            <div className="text-xs text-gray-400 mt-1">Detailed Roles</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestions */}
            {suggestions.length === 0 && (
                <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-semibold">Perfect Resume!</p>
                    <p className="text-gray-500 text-sm mt-2">Your resume is optimized for ATS systems.</p>
                </div>
            )}

            {/* Critical Issues */}
            {criticalSuggestions.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Critical Issues ({criticalSuggestions.length})
                    </h3>
                    <div className="space-y-4">
                        {criticalSuggestions.map((sug, idx) => (
                            <SuggestionCard
                                key={idx}
                                suggestion={sug}
                                onApply={() => handleApplyFix(sug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* High Priority */}
            {highSuggestions.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Important Improvements ({highSuggestions.length})
                    </h3>
                    <div className="space-y-4">
                        {highSuggestions.map((sug, idx) => (
                            <SuggestionCard
                                key={idx}
                                suggestion={sug}
                                onApply={() => handleApplyFix(sug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Medium Priority */}
            {mediumSuggestions.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-blue-500 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Recommended Enhancements ({mediumSuggestions.length})
                    </h3>
                    <div className="space-y-4">
                        {mediumSuggestions.map((sug, idx) => (
                            <SuggestionCard
                                key={idx}
                                suggestion={sug}
                                onApply={() => handleApplyFix(sug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Low Priority */}
            {lowSuggestions.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Nice to Have ({lowSuggestions.length})
                    </h3>
                    <div className="space-y-4">
                        {lowSuggestions.map((sug, idx) => (
                            <SuggestionCard
                                key={idx}
                                suggestion={sug}
                                onApply={() => handleApplyFix(sug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ATS Tips Section */}
            <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    ATS-Friendly Best Practices
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Use standard fonts (Arial, Calibri, Times New Roman)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Avoid tables, images, and complex formatting</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Use standard section headings (Education, Experience, Skills)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Include relevant keywords from job descriptions</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Start bullet points with action verbs (Achieved, Developed, Led)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Quantify achievements with metrics (increased 40%, saved $5M)</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const SuggestionCard = ({ suggestion, onApply }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-500/10 border-red-500/20 text-red-300';
            case 'high':
                return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
            case 'medium':
                return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
            default:
                return 'bg-green-500/10 border-green-500/20 text-green-300';
        }
    };

    const getPriorityLabel = (priority) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1);
    };

    return (
        <div className={`p-4 border rounded-lg ${getPriorityColor(suggestion.priority)}`}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-semibold text-white mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-gray-400">{suggestion.description}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ml-3 ${
                    suggestion.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    suggestion.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                    suggestion.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                }`}>
                    {getPriorityLabel(suggestion.priority)}
                </span>
            </div>

            {suggestion.example && (
                <div className="bg-gray-800/50 rounded p-2 mb-3 text-xs text-gray-300 border border-gray-700">
                    <strong>Example:</strong> {suggestion.example}
                </div>
            )}

            {suggestion.action && (
                <button
                    onClick={onApply}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                    Apply Fix
                </button>
            )}
        </div>
    );
};

export default ATSOptimizer;


