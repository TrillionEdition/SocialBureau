import React from 'react';
import { Wand, Check } from 'lucide-react';

const AISuggestions = ({ suggestions, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center">
          <Wand className="animate-spin text-blue-500 mr-3" size={20} />
          <p className="text-gray-600 font-semibold">Generating AI suggestions...</p>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 flex items-center">
        <Wand className="text-blue-500 mr-3" size={20} />
        AI Suggestions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <p className="text-gray-700 text-sm mb-4">{suggestion}</p>
            <button
              onClick={() => onSelect(suggestion)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
            >
              <Check size={16} />
              Use this suggestion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
