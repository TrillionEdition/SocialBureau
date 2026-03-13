import React, { useState, useEffect } from 'react';
import { Wand, Check, Loader, X } from 'lucide-react';

const AICompanionModal = ({ isOpen, onClose, section, currentContent, onApply, onGenerate }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await onGenerate(section, currentContent);
      setSuggestions(result || []);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Wand className="text-purple-400" />
            AI Companion
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Current {section}</h3>
            <p className="text-sm bg-gray-900 p-3 rounded-lg border border-gray-700">{currentContent}</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="animate-spin text-purple-400 mr-3" />
              <span className="text-gray-300">Generating suggestions...</span>
            </div>
          ) : error ? (
            <div className="text-red-400 bg-red-500/10 p-4 rounded-lg">{error}</div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-purple-500 transition-all">
                  <p className="text-sm text-gray-200 mb-3">{suggestion}</p>
                  <button
                    onClick={() => onApply(suggestion)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Check size={16} />
                    Apply this Suggestion
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICompanionModal;
