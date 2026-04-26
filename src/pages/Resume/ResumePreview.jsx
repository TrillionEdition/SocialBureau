import React, { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { calculateATSScore } from '@/utils/atsOptimization';

const ResumePreview = ({ data, template }) => {

    const renderModern = () => (
        <div className="bg-white text-slate-800 font-sans shadow-inner" style={{ minHeight: '1120px', padding: '60px' }}>
            {/* Elegant Header with Accent Bar */}
            <div className="relative mb-10 pb-8 border-b border-slate-200">
                <div className="absolute -left-12 top-0 h-24 w-2 bg-blue-600 rounded-r-lg"></div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2 uppercase">{data.personalInfo.fullName}</h1>
                {data.personalInfo.title && (
                    <p className="text-xl text-blue-600 font-bold tracking-widest uppercase mb-6 opacity-90">
                        {data.personalInfo.title}
                    </p>
                )}
                <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
                    {data.personalInfo.email && <span className="flex items-center gap-2">✉ {data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="flex items-center gap-2">☎ {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span className="flex items-center gap-2">📍 {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span className="flex items-center gap-2">🔗 LinkedIn</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-10">
                    {/* Professional Summary */}
                    {data.personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-black text-blue-600 mb-4 uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                Profile
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-[15px] font-light">
                                {data.personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-blue-600 mb-6 uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="relative pl-6 border-l border-slate-200 group">
                                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{exp.duration}</span>
                                        </div>
                                        <p className="text-blue-600 font-bold mb-3 text-sm italic">{exp.company}</p>
                                        <div className="text-slate-600 text-[14px] leading-relaxed whitespace-pre-wrap">
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-10">
                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-blue-600 mb-5 uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-2">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-xs font-bold hover:border-blue-300 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-blue-600 mb-5 uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-2">Education</h2>
                            <div className="space-y-5">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                                        {edu.field && <p className="text-xs text-slate-500 mb-1">{edu.field}</p>}
                                        <p className="text-xs text-blue-600 font-bold">{edu.institution}</p>
                                        <p className="text-[11px] text-slate-400 mt-1 font-bold italic">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-blue-600 mb-5 uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-2">Top Projects</h2>
                            <div className="space-y-4">
                                {data.projects.slice(0, 3).map((proj, idx) => (
                                    <div key={idx} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <h3 className="text-sm font-bold text-slate-800 mb-1">{proj.title}</h3>
                                        <p className="text-xs text-slate-600 leading-tight mb-2 line-clamp-3">{proj.description}</p>
                                        {proj.link && <p className="text-[10px] text-blue-500 font-bold truncate">{proj.link}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );

    const renderProfessional = () => (
        <div className="bg-[#fcfcfc] text-[#1a1a1a] font-serif shadow-xl" style={{ minHeight: '1120px', display: 'flex' }}>
            {/* Sidebar with Dark Accent */}
            <div className="w-[300px] bg-[#1a1a1a] text-white p-10 flex flex-col pt-16">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold leading-tight mb-4 tracking-tighter">{data.personalInfo.fullName}</h1>
                    <div className="h-1 w-12 bg-white mb-6"></div>
                    <p className="text-xs text-gray-400 font-sans tracking-[0.3em] uppercase mb-8">{data.personalInfo.title}</p>
                </div>

                <div className="space-y-8 flex-1 font-sans">
                    <section>
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Contact</h3>
                        <div className="space-y-3 text-[11px] font-light">
                            {data.personalInfo.email && <div className="break-all opacity-80">✉ {data.personalInfo.email}</div>}
                            {data.personalInfo.phone && <div className="opacity-80">☎ {data.personalInfo.phone}</div>}
                            {data.personalInfo.location && <div className="opacity-80">📍 {data.personalInfo.location}</div>}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Core Skills</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {data.skills.slice(0, 15).map((skill, idx) => (
                                <div key={idx} className="text-[11px] font-light flex items-center gap-2">
                                    <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.education && (
                        <section>
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Education</h3>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="text-[11px]">
                                        <p className="font-bold">{edu.degree}</p>
                                        <p className="opacity-70 text-[10px]">{edu.institution}</p>
                                        <p className="opacity-50 text-[9px] mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-16">
                {/* Executive Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-12">
                        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.4em] mb-6 border-b border-gray-200 pb-2">Profile</h2>
                        <p className="text-[14px] leading-relaxed text-gray-700 italic font-light">
                            "{data.personalInfo.summary}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.4em] mb-8 border-b border-gray-200 pb-2">Experience</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                        <span className="text-[10px] font-bold text-gray-400 font-sans tracking-widest">{exp.duration}</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 font-sans">{exp.company}</p>
                                    <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap pl-4 border-l border-gray-100">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.4em] mb-6 border-b border-gray-200 pb-2">Selected Projects</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data.projects.map((proj, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-bold text-gray-800 mb-1">{proj.title}</h3>
                                    <p className="text-[12px] text-gray-600 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );

    const renderCreative = () => (
        <div className="bg-white text-gray-900 font-sans p-12 overflow-hidden relative" style={{ minHeight: '1120px' }}>
            {/* Artistic Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/50 to-pink-100/50 blur-3xl -z-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/50 to-cyan-100/50 blur-3xl -z-10 rounded-full"></div>

            {/* Modern Card Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
                <div>
                    <h1 className="text-6xl font-black mb-2 tracking-tighter italic">{data.personalInfo.fullName.split(' ')[0]}<span className="text-purple-400 font-light not-italic">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span></h1>
                    <p className="text-xl font-medium text-gray-400">{data.personalInfo.title}</p>
                </div>
                <div className="text-right text-[11px] font-bold tracking-widest text-gray-400 uppercase space-y-1">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p>{data.personalInfo.location}</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12">
                    {data.personalInfo.summary && (
                        <div className="mb-12 max-w-3xl">
                            <h2 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">The Story.</h2>
                            <p className="text-xl text-gray-600 leading-normal font-light italic">"{data.personalInfo.summary}"</p>
                        </div>
                    )}
                </div>

                <div className="col-span-7 space-y-12">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-b-2 border-gray-100 pb-2 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-purple-500"></span>
                            Career Journey
                        </h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex flex-col gap-1 mb-4">
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{exp.position}</h3>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            <span>{exp.company}</span>
                                            <span>/</span>
                                            <span className="text-pink-500">{exp.duration}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-light">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-5 space-y-12">
                    <section className="bg-gray-50 p-8 rounded-3xl">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-pink-500"></span>
                            Toolkit
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="p-8">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-blue-500"></span>
                            Education
                        </h2>
                        <div className="space-y-8">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="border-l-2 border-blue-200 pl-6">
                                    <p className="text-lg font-black text-gray-900 mb-1">{edu.degree}</p>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{edu.institution}</p>
                                    <p className="text-xs text-blue-500 font-black mt-2">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

    const renderMinimal = () => (
        <div className="bg-white text-gray-800 font-sans p-16" style={{ minHeight: '1120px' }}>
            <header className="text-center mb-12">
                <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
                <p className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-4">{data.personalInfo.title}</p>
                <div className="flex justify-center gap-4 text-[11px] text-gray-400 border-t border-b border-gray-100 py-3 mt-4">
                    <span>{data.personalInfo.email}</span>
                    <span>•</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{data.personalInfo.location}</span>
                </div>
            </header>

            <div className="max-w-2xl mx-auto space-y-12">
                {data.personalInfo.summary && (
                    <section>
                        <p className="text-sm leading-relaxed text-gray-600 text-center font-light italic">
                            {data.personalInfo.summary}
                        </p>
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6 text-center">Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="text-center">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{exp.position}</h3>
                                    <p className="text-xs text-gray-500 font-medium my-1">{exp.company} | {exp.duration}</p>
                                    <p className="text-xs text-gray-600 leading-relaxed max-w-lg mx-auto mt-2">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12 pt-8">
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-4">Expertise</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-xs text-gray-600 font-medium">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-4">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <p className="text-xs font-bold text-gray-800">{edu.degree}</p>
                                        <p className="text-[11px] text-gray-500">{edu.institution}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );

    const renderATSOptimized = () => (
        <div className="bg-white text-black font-sans p-12" style={{ fontSize: '11pt', lineHeight: '1.4', minHeight: '1056px', width: '816px', margin: '0 auto' }}>
            <div className="text-center mb-8">
                <h1 className="text-[20pt] font-bold uppercase mb-1 tracking-tight">{data.personalInfo.fullName}</h1>
                <p className="text-[10pt] border-t border-b border-black py-1">
                    {[data.personalInfo.location, data.personalInfo.phone, data.personalInfo.email].filter(Boolean).join('  •  ')}
                </p>
                <div className="flex justify-center gap-4 mt-1 text-[9pt] font-semibold">
                    {data.personalInfo.linkedin && <span>LinkedIn: {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.portfolio && <span>Portfolio: {data.personalInfo.portfolio}</span>}
                </div>
            </div>

            {data.personalInfo.summary && (
                <div className="mb-6">
                    <h2 className="text-[12pt] font-bold border-b-2 border-black mb-2 uppercase tracking-wide">Professional Summary</h2>
                    <p className="text-justify">{data.personalInfo.summary}</p>
                </div>
            )}

            {data.experience && data.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-[12pt] font-bold border-b-2 border-black mb-3 uppercase tracking-wide">Work Experience</h2>
                    <div className="space-y-5">
                        {data.experience.map((exp, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between font-bold">
                                    <span>{exp.position}</span>
                                    <span>{exp.duration}</span>
                                </div>
                                <div className="italic font-semibold mb-1">{exp.company}</div>
                                <div className="pl-4">
                                    <ul className="list-disc space-y-1">
                                        {(exp.description || '').split('\n').filter(Boolean).map((bullet, bIdx) => (
                                            <li key={bIdx} className="text-justify">{bullet.replace(/^[-•\*]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-8">
                <div>
                    {data.skills && data.skills.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-[12pt] font-bold border-b-2 border-black mb-2 uppercase tracking-wide">Skills</h2>
                            <p className="font-semibold">Technical & Core Competencies:</p>
                            <p>{data.skills.join(', ')}</p>
                        </div>
                    )}
                </div>
                <div>
                    {data.education && data.education.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-[12pt] font-bold border-b-2 border-black mb-2 uppercase tracking-wide">Education</h2>
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="mb-2">
                                    <div className="font-bold">{edu.degree}</div>
                                    <div>{edu.institution}</div>
                                    <div className="italic">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


    const templateRenderers = {
        modern: renderModern,
        professional: renderProfessional,
        creative: renderCreative,
        minimal: renderMinimal,
        atsOptimized: renderATSOptimized
    };

    const renderer = templateRenderers[template] || renderModern;

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4 sticky top-0 z-10">
                <div>
                    <h3 className="font-semibold text-white mb-1">
                        {template === 'atsOptimized' ? 'ATS-Optimized' : template.charAt(0).toUpperCase() + template.slice(1)} Template
                    </h3>
                </div>
            </div>

            {/* Resume Preview */}
            <div id="resume-to-download" className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                {renderer()}
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body { background: white; }
                    #resume-to-download { box-shadow: none; border: none; }
                }
            `}</style>
        </div>
    );
};

export default ResumePreview;


