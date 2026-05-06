// import React, { useState, useEffect } from 'react';
// import { TrendingUp, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
// import { checkResumeQuality } from '@/services/aiResumeService';

// /**
//  * AI Quality Score Display Component
//  */
// const AIQualityScore = ({ resumeData, compact = false, autoLoad = true }) => {
//   const [quality, setQuality] = useState(null);
//   const [loading, setLoading] = useState(autoLoad);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (autoLoad && resumeData) {
//       loadQuality();
//     }
//   }, [resumeData, autoLoad]);

//   const loadQuality = async () => {
//     try {
//       setLoading(true);
//       const data = await checkResumeQuality(resumeData);
//       setQuality(data);
//       setError(null);
//     } catch (err) {
//       console.error('Quality check error:', err);
//       setError('Could not check quality');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!quality && !loading) {
//     return (
//       <button
//         onClick={loadQuality}
//         className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
//       >
//         <TrendingUp className="w-4 h-4" />
//         Check Quality
//       </button>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="bg-gray-800/50 rounded-lg p-4 animate-pulse">
//         <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
//         <div className="h-2 bg-gray-700 rounded w-full" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-300 flex items-center gap-2">
//         <AlertCircle className="w-4 h-4 flex-shrink-0" />
//         {error}
//       </div>
//     );
//   }

//   const getScoreColor = (score) => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-yellow-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 80) return 'Excellent';
//     if (score >= 60) return 'Good';
//     if (score >= 40) return 'Fair';
//     return 'Needs Work';
//   };

//   if (compact) {
//     return (
//       <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-1.5">
//         <span className="text-xs font-semibold text-gray-300">Quality:</span>
//         <div className="flex items-center gap-1">
//           <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
//             {Math.round(quality.overallScore)}
//           </div>
//           <span className="text-xs text-gray-400">{getScoreLabel(quality.overallScore)}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-slate-900/50 px-5 py-4 border-b border-slate-700/50">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-bold text-white flex items-center gap-2">
//             <BarChart3 className="w-5 h-5 text-blue-400" />
//             Resume Quality Analysis
//           </h3>
//           <span className={`text-2xl font-bold ${quality.overallScore >= 80 ? 'text-green-400' :
//               quality.overallScore >= 60 ? 'text-yellow-400' :
//                 quality.overallScore >= 40 ? 'text-orange-400' :
//                   'text-red-400'
//             }`}>
//             {Math.round(quality.overallScore)}
//           </span>
//         </div>
//         <div className="w-full bg-slate-700 rounded-full h-2">
//           <div
//             className={`${getScoreColor(quality.overallScore)} h-2 rounded-full transition-all duration-500`}
//             style={{ width: `${Math.min(quality.overallScore, 100)}%` }}
//           />
//         </div>
//       </div>

//       {/* Category Breakdown */}
//       <div className="p-5 space-y-3">
//         {Object.entries(quality.categories).map(([category, score]) => (
//           <div key={category}>
//             <div className="flex justify-between items-center mb-2">
//               <label className="text-sm font-semibold text-gray-300 capitalize">
//                 {category.replace(/([A-Z])/g, ' $1').trim()}
//               </label>
//               <span className="text-sm font-bold text-gray-200">{Math.round(score)}%</span>
//             </div>
//             <div className="w-full bg-slate-700 rounded-full h-1.5">
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all"
//                 style={{ width: `${Math.min(score, 100)}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Feedback */}
//       {quality.feedback && quality.feedback.length > 0 && (
//         <div className="border-t border-slate-700/50 px-5 py-4 space-y-2">
//           <h4 className="text-sm font-semibold text-gray-300">Feedback:</h4>
//           {quality.feedback.map((item, idx) => (
//             <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
//               <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
//               <span>{item}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Recommendations */}
//       {quality.recommendations && quality.recommendations.length > 0 && (
//         <div className="border-t border-slate-700/50 px-5 py-4 space-y-2 bg-blue-900/10">
//           <h4 className="text-sm font-semibold text-blue-300">Recommendations:</h4>
//           {quality.recommendations.map((item, idx) => (
//             <div key={idx} className="flex items-start gap-2 text-sm text-blue-200">
//               <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
//               <span>{item}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Action Button */}
//       <div className="border-t border-slate-700/50 px-5 py-3">
//         <button
//           onClick={loadQuality}
//           className="w-full text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 py-2 rounded transition-colors font-medium"
//         >
//           Refresh Analysis
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AIQualityScore;



import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { checkResumeQuality } from '@/services/aiResumeService';

/**
 * AI Quality Score Display Component
 */
const AIQualityScore = ({ resumeData, compact = false, autoLoad = true }) => {
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (autoLoad && resumeData) {
      loadQuality();
    }
  }, [resumeData, autoLoad]);

  const loadQuality = async () => {
    try {
      setLoading(true);
      const data = await checkResumeQuality(resumeData);
      setQuality(data);
      setError(null);
    } catch (err) {
      console.error('Quality check error:', err);
      setError('Could not check quality');
    } finally {
      setLoading(false);
    }
  };

  if (!quality && !loading) {
    return (
      <button
        onClick={loadQuality}
        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Check Quality
      </button>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
        <div className="h-2 bg-gray-700 rounded w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-300 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {error}
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-1.5">
        <span className="text-xs font-semibold text-gray-300">Quality:</span>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
            {Math.round(quality.overallScore)}
          </div>
          <span className="text-xs text-gray-400">{getScoreLabel(quality.overallScore)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900/50 px-5 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Resume Quality Analysis
          </h3>
          <span className={`text-2xl font-bold ${quality.overallScore >= 80 ? 'text-green-400' :
            quality.overallScore >= 60 ? 'text-yellow-400' :
              quality.overallScore >= 40 ? 'text-orange-400' :
                'text-red-400'
            }`}>
            {Math.round(quality.overallScore)}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className={`${getScoreColor(quality.overallScore)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(quality.overallScore, 100)}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-5 space-y-3">
        {Object.entries(quality.categories).map(([category, score]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-300 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <span className="text-sm font-bold text-gray-200">{Math.round(score)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {quality.feedback && quality.feedback.length > 0 && (
        <div className="border-t border-slate-700/50 px-5 py-4 space-y-2">
          <h4 className="text-sm font-semibold text-gray-300">Feedback:</h4>
          {quality.feedback.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {quality.recommendations && quality.recommendations.length > 0 && (
        <div className="border-t border-slate-700/50 px-5 py-4 space-y-2 bg-blue-900/10">
          <h4 className="text-sm font-semibold text-blue-300">Recommendations:</h4>
          {quality.recommendations.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-blue-200">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <div className="border-t border-slate-700/50 px-5 py-3">
        <button
          onClick={loadQuality}
          className="w-full text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 py-2 rounded transition-colors font-medium"
        >
          Refresh Analysis
        </button>
      </div>
    </div>
  );
};

export default AIQualityScore;


