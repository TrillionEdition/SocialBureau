import React, { useRef } from 'react';
import {
    X, Download, Mail, Phone, Linkedin, Globe,
    Briefcase, GraduationCap, Star, FolderOpen,
    Award, Languages, User, Sparkles, Github, MapPin
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Premium ResumeModal
   ──────────────────────────────────────────────────────────────────────────── */
const ResumeModal = ({ data, onClose }) => {
    const resumeRef = useRef(null);

    const handleDownloadPDF = () => {
        // We use native print. The browser's "Save as PDF" will preserve clickable links and selectable text perfectly.
        window.print();
    };



    if (!data) return null;

    const {
        personalInfo = {},
        summary,
        skills = [],
        experience = [],
        education = [],
        projects = [],
        certifications = [],
        languages = [],
        suggestedSkills = [],
        softSkills = [],
        jdRole = '',
    } = data;

    const { name, email, phone, linkedin, github, location, title } = personalInfo;

    // Merge suggested skills into main skills
    const allSkills = [...new Set([...skills, ...suggestedSkills])];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                @media print {
                    body > *:not(#resume-print-root) { display: none !important; }
                    #resume-print-root { display: block !important; position: static !important; padding: 0 !important; margin: 0 !important; background: white !important; }
                    .no-print { display: none !important; }
                    .resume-page {
                        box-shadow: none !important;
                        border: none !important;
                        border-radius: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    @page { margin: 0; size: A4; }
                }
                .font-inter { font-family: 'Inter', sans-serif; }
            `}</style>

            <div
                id="resume-print-root"
                className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-4 font-inter"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                {/* Action Buttons */}
                <div className="no-print fixed top-6 right-8 flex gap-3 z-[60]">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/25 transition-all outline-none"
                        title="Click to print or save as PDF (preserves links!)"
                    >
                        <Download className="w-5 h-5" />
                        Save as PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* ── Resume Paper ─────────────────────────────────────────── */}
                <div
                    ref={resumeRef}
                    className="resume-page bg-white text-slate-800 w-full max-w-[820px] shadow-2xl overflow-hidden print:w-[210mm] print:min-h-[297mm] mx-auto"
                >
                    {/* ── Premium Header ───────────────────────────────────── */}
                    <header className="px-12 pt-14 pb-8 border-b-[6px] border-slate-900">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2 uppercase">
                                {name || 'Your Name'}
                            </h1>
                            {(title || jdRole) && (
                                <p className="text-lg text-indigo-700 font-semibold tracking-widest uppercase mb-5">
                                    {title || jdRole}
                                </p>
                            )}

                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium w-full max-w-2xl">
                                {email && (
                                    <a href={`mailto:${email}`} className="flex items-center gap-1.5 shrink-0 text-indigo-600 hover:underline">
                                        <Mail className="w-4 h-4 text-indigo-500" />
                                        {email}
                                    </a>
                                )}
                                {phone && (
                                    <a href={`tel:${phone}`} className="flex items-center gap-1.5 shrink-0 text-indigo-600 hover:underline">
                                        <Phone className="w-4 h-4 text-indigo-500" />
                                        {phone}
                                    </a>
                                )}
                                {location && (
                                    <span className="flex items-center gap-1.5 shrink-0">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {location}
                                    </span>
                                )}
                                {linkedin && (
                                    <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 shrink-0 text-indigo-600 hover:underline">
                                        <Linkedin className="w-4 h-4 text-indigo-500" />
                                        {linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                                    </a>
                                )}
                                {github && (
                                    <a href={github.startsWith('http') ? github : `https://${github}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 shrink-0 text-indigo-600 hover:underline">
                                        <Github className="w-4 h-4 text-indigo-500" />
                                        {github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                    </a>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* ── Body ─────────────────────────────────────────────── */}
                    <div className="px-12 py-10 space-y-8">

                        {/* ── JD Suggested Skills Banner ───────────────── */}
                        {suggestedSkills.length > 0 && (
                            <div className="no-print p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                    <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                                        Skills injected for ATS optimization
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedSkills.map((s, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-white text-indigo-700 text-xs rounded-md border border-indigo-200 font-medium shadow-sm">
                                            + {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Summary ──────────────────────────────────────── */}
                        {summary && (
                            <Section title="Professional Summary">
                                <p className="text-[14.5px] leading-relaxed text-slate-700 font-medium">
                                    {summary}
                                </p>
                            </Section>
                        )}

                        {/* ── Experience ───────────────────────────────────── */}
                        {experience.length > 0 && (
                            <Section title="Experience">
                                <div className="space-y-6">
                                    {experience.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1.5 gap-1">
                                                <h3 className="text-[17px] font-bold text-slate-900 uppercase">
                                                    {exp.company || 'Company Name'} {exp.location ? `- ${exp.location}` : ''}
                                                </h3>
                                                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide shrink-0 bg-indigo-50 px-3 py-1 rounded-full">
                                                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''} {exp.duration ? `(${exp.duration})` : ''}
                                                </span>
                                            </div>
                                            {exp.jobTitle && (
                                                <p className="text-[15px] font-bold text-slate-700 mb-2.5 tracking-wide">
                                                    {exp.jobTitle}
                                                </p>
                                            )}
                                            {exp.description && exp.description.length > 0 && (
                                                <ul className="space-y-1.5">
                                                    {exp.description.map((b, j) => (
                                                        <li key={j} className="text-[14.5px] text-slate-700 leading-relaxed flex items-start gap-3">
                                                            <span className="text-indigo-400 text-lg leading-none mt-0.5">•</span>
                                                            <span className="flex-1">{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* ── Projects ─────────────────────────────────────── */}
                        {projects.length > 0 && (
                            <Section title="Key Projects">
                                <div className="space-y-5">
                                    {projects.map((proj, i) => (
                                        <div key={i}>
                                            <h3 className="text-[15.5px] font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                                                <FolderOpen className="w-4 h-4 text-indigo-500" />
                                                {proj.title}
                                                {proj.liveLink && (
                                                    <a href={proj.liveLink.startsWith('http') ? proj.liveLink : `https://${proj.liveLink}`} target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-700 hover:underline ml-2 flex items-center gap-1 text-[13px] font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                                                        <Globe className="w-3.5 h-3.5" /> View Project
                                                    </a>
                                                )}
                                                {proj.github && (
                                                    <a href={proj.github.startsWith('http') ? proj.github : `https://${proj.github}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-800 hover:underline ml-1 flex items-center gap-1 text-[13px] font-semibold bg-slate-100 px-2 py-0.5 rounded">
                                                        <Github className="w-3.5 h-3.5" /> Source
                                                    </a>
                                                )}
                                            </h3>
                                            {proj.technologies && proj.technologies.length > 0 && (
                                                <p className="text-[13px] font-semibold text-indigo-600 mb-2">
                                                    {proj.technologies.join(', ')}
                                                </p>
                                            )}
                                            {proj.description && (
                                                <p className="text-[14px] text-slate-700 leading-relaxed">
                                                    {proj.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* ── Education & Certs (2 Column) ────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {education.length > 0 && (
                                <Section title="Education">
                                    <div className="space-y-4">
                                        {education.map((edu, i) => (
                                            <div key={i}>
                                                <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{edu.degree}</h3>
                                                {edu.institution && (
                                                    <p className="text-[14px] font-semibold text-indigo-600 mt-0.5">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</p>
                                                )}
                                                <p className="text-[13px] font-medium text-slate-500 mt-0.5 uppercase tracking-wider">
                                                    {edu.startYear} {edu.endYear ? `- ${edu.endYear}` : ''}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {certifications.length > 0 && (
                                <Section title="Certifications">
                                    <ul className="space-y-2">
                                        {certifications.map((cert, i) => (
                                            <li key={i} className="text-[14px] text-slate-700 leading-snug flex items-start gap-2.5">
                                                <Award className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                                                <span className="flex-1 font-medium">{cert}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
                            )}
                        </div>

                        {/* ── Skills & Soft Skills (Grid) ───────────────────────────────────────── */}
                        {(allSkills.length > 0 || softSkills.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {allSkills.length > 0 && (
                                    <Section title="Technical Skills">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                            {allSkills.map((skill, i) => {
                                                const isSuggested = suggestedSkills.includes(skill) && !skills.includes(skill);
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`text-[13.5px] font-semibold flex items-center gap-2 ${isSuggested ? 'text-indigo-600' : 'text-slate-700'}`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isSuggested ? 'bg-indigo-500' : 'bg-slate-400'}`} />
                                                        {skill} {isSuggested && <Sparkles className="w-3 h-3 ml-1" />}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Section>
                                )}

                                {softSkills.length > 0 && (
                                    <Section title="Soft Skills">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                            {softSkills.map((skill, i) => (
                                                <span key={i} className="text-[13.5px] font-semibold text-slate-700 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Section>
                                )}
                            </div>
                        )}

                        {/* ── Languages ────────────────────────────────────── */}
                        {languages.length > 0 && (
                            <Section title="Languages">
                                <div className="flex flex-wrap gap-4">
                                    {languages.map((lang, i) => (
                                        <span key={i} className="text-[14.5px] font-medium text-slate-700 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}

                    </div>

                    {/* ── Footer ───────────────────────────────────────────── */}
                    <footer className="px-12 pb-8 pt-4">
                        <div className="border-t-[3px] border-slate-100 pt-4 flex justify-between items-center text-slate-400">
                            <p className="text-[10px] font-bold uppercase tracking-widest shrink-0">
                                ATS-Optimized Format
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

/* ── Premium Section Component ────────────────────────────────────────────── */
const Section = ({ title, children }) => (
    <section>
        <h2 className="text-[18px] font-extrabold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200 uppercase tracking-widest flex items-center gap-3">
            {title}
        </h2>
        <div>{children}</div>
    </section>
);

export default ResumeModal;
