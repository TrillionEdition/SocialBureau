import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, CheckCircle, AlertCircle, X } from 'lucide-react';
import { getResumeTips } from '../../../services/aiResumeService';

/**
 * AI Tips Component - Displays personalized resume tips
 */
const AITipsPanel = ({ jobTitle = 'Professional', skills = [], onClose }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const fetchedTips = await getResumeTips(jobTitle, skills || []);
        setTips(Array.isArray(fetchedTips) ? fetchedTips : [fetchedTips]);
        setError(null);
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError('Could not load tips. Please try again.');
        // Fallback tips
        setTips([
          {
            tip: 'Customize for each role',
            explanation: 'Tailor your resume to match the specific job description'
          },
          {
            tip: 'Use action verbs',
            explanation: 'Start bullet points with strong verbs like "Led", "Developed", "Managed"'
          },
          {
            tip: 'Include metrics',
            explanation: 'Add numbers and percentages to demonstrate impact'
          },
          {
            tip: 'Keep it concise',
            explanation: 'Limit to one page and use scannable formatting'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (jobTitle || (skills && skills.length > 0)) {
      fetchTips();
    }
  }, [jobTitle, skills]);

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Pro Tips
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-700/30 h-16 rounded animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-sm text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      ) : (
        <div className="space-y-2">
          {tips.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-3 border border-gray-700/30 hover:border-blue-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5 group-hover:animate-bounce" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-white group-hover:text-yellow-300 transition-colors">
                    {item.tip}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{item.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AITipsPanel;
