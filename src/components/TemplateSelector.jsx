import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const TemplateSelector = ({ templates, selected, onSelect, onNext, fullView = false }) => {
    return (
        <div className={fullView ? 'bg-gray-900 border border-gray-800 rounded-2xl p-8' : ''}>
            <div className={fullView ? 'mb-8' : 'mb-4'}>
                <h2 className={fullView ? 'text-2xl font-bold mb-2' : 'text-lg font-bold mb-3'}>
                    Choose Your Template
                </h2>
                {fullView && <p className="text-gray-400">Select a design that matches your professional style</p>}
            </div>

            <div className={`grid ${fullView ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {Object.entries(templates).map(([key, template]) => (
                    <div
                        key={key}
                        onClick={() => onSelect(key)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group ${
                            selected === key
                                ? 'ring-2 ring-blue-500 scale-105 shadow-lg shadow-blue-500/30'
                                : 'hover:ring-1 hover:ring-gray-600 hover:scale-102'
                        }`}
                    >
                        {/* Template Preview */}
                        <div className={`bg-gradient-to-br ${template.color} p-8 h-48 flex flex-col justify-between relative overflow-hidden`}>
                            <div className="absolute inset-0 opacity-10 bg-pattern" />
                            
                            {/* Mock Resume Content */}
                            <div className="relative z-10">
                                <div className="h-2 bg-white/30 rounded w-1/3 mb-3" />
                                <div className="space-y-1.5">
                                    <div className="h-1.5 bg-white/40 rounded w-full" />
                                    <div className="h-1.5 bg-white/40 rounded w-4/5" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-1.5">
                                <div className="h-1 bg-white/30 rounded w-1/2" />
                                <div className="h-1 bg-white/30 rounded w-2/3" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="bg-gray-800/50 p-4 group-hover:bg-gray-800 transition-colors">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="font-semibold text-white">{template.name}</h3>
                                {selected === key && (
                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-400">{template.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {fullView && (
                <button
                    onClick={onNext}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                    Continue <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default TemplateSelector;
