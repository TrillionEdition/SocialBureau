import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, Sparkles } from 'lucide-react';

const ResumeForm = ({ data, onChange, template, onGetSuggestions }) => {
    const [expandedSection, setExpandedSection] = useState('personalInfo');

    const handlePersonalInfoChange = (field, value) => {
        onChange({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [field]: value
            }
        });
    };

    const handleAddExperience = () => {
        onChange({
            ...data,
            experience: [
                ...data.experience,
                { position: '', company: '', duration: '', description: '' }
            ]
        });
    };

    const handleExperienceChange = (idx, field, value) => {
        const updated = [...data.experience];
        updated[idx] = { ...updated[idx], [field]: value };
        onChange({ ...data, experience: updated });
    };

    const handleRemoveExperience = (idx) => {
        onChange({
            ...data,
            experience: data.experience.filter((_, i) => i !== idx)
        });
    };

    const handleAddEducation = () => {
        onChange({
            ...data,
            education: [
                ...data.education,
                { degree: '', institution: '', field: '', year: '' }
            ]
        });
    };

    const handleEducationChange = (idx, field, value) => {
        const updated = [...data.education];
        updated[idx] = { ...updated[idx], [field]: value };
        onChange({ ...data, education: updated });
    };

    const handleRemoveEducation = (idx) => {
        onChange({
            ...data,
            education: data.education.filter((_, i) => i !== idx)
        });
    };

    const handleSkillsChange = (value) => {
        onChange({
            ...data,
            skills: value.split('\n').filter(s => s.trim())
        });
    };

    const handleAddProject = () => {
        onChange({
            ...data,
            projects: [
                ...data.projects,
                { title: '', description: '', link: '' }
            ]
        });
    };

    const handleProjectChange = (idx, field, value) => {
        const updated = [...data.projects];
        updated[idx] = { ...updated[idx], [field]: value };
        onChange({ ...data, projects: updated });
    };

    const handleRemoveProject = (idx) => {
        onChange({
            ...data,
            projects: data.projects.filter((_, i) => i !== idx)
        });
    };

    const FormSection = ({ title, icon, id, children }) => (
        <div className="border-b border-gray-800 last:border-b-0">
            <button
                onClick={() => setExpandedSection(expandedSection === id ? null : id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === id ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === id && <div className="px-4 pb-4 space-y-4">{children}</div>}
        </div>
    );

    const InputField = ({ label, value, onChange, type = 'text', placeholder = '', suggestionsPath = null }) => (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {label}
                </label>
                {suggestionsPath && (
                    <button
                        onClick={() => onGetSuggestions(suggestionsPath, value)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                        <Sparkles size={14} />
                        Get AI Suggestions
                    </button>
                )}
            </div>
            {type === 'textarea' ? (
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
            ) : (
                <input
                    type={type}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                />
            )}
        </div>
    );

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Personal Info Section */}
            <FormSection
                title="Personal Information"
                icon="👤"
                id="personalInfo"
            >
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Full Name"
                        value={data.personalInfo.fullName}
                        onChange={(v) => handlePersonalInfoChange('fullName', v)}
                        placeholder="John Doe"
                    />
                    <InputField
                        label="Professional Title"
                        value={data.personalInfo.title}
                        onChange={(v) => handlePersonalInfoChange('title', v)}
                        placeholder="Senior Designer"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Email"
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(v) => handlePersonalInfoChange('email', v)}
                        placeholder="john@example.com"
                    />
                    <InputField
                        label="Phone"
                        type="tel"
                        value={data.personalInfo.phone}
                        onChange={(v) => handlePersonalInfoChange('phone', v)}
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Location"
                        value={data.personalInfo.location}
                        onChange={(v) => handlePersonalInfoChange('location', v)}
                        placeholder="San Francisco, CA"
                    />
                    <InputField
                        label="LinkedIn"
                        type="url"
                        value={data.personalInfo.linkedin}
                        onChange={(v) => handlePersonalInfoChange('linkedin', v)}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <InputField
                    label="Portfolio/Website"
                    type="url"
                    value={data.personalInfo.portfolio}
                    onChange={(v) => handlePersonalInfoChange('portfolio', v)}
                    placeholder="johndoe.com"
                />
                <InputField
                    label="Professional Summary"
                    type="textarea"
                    value={data.personalInfo.summary}
                    onChange={(v) => handlePersonalInfoChange('summary', v)}
                    placeholder="Brief overview of your professional background and goals..."
                    suggestionsPath="personalInfo.summary"
                />
            </FormSection>

            {/* Experience Section */}
            <FormSection title="Work Experience" icon="💼" id="experience">
                <div className="space-y-6">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm font-semibold text-gray-400">Entry #{idx + 1}</span>
                                <button
                                    onClick={() => handleRemoveExperience(idx)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <InputField
                                    label="Position"
                                    value={exp.position}
                                    onChange={(v) => handleExperienceChange(idx, 'position', v)}
                                    placeholder="Product Designer"
                                />
                                <InputField
                                    label="Company"
                                    value={exp.company}
                                    onChange={(v) => handleExperienceChange(idx, 'company', v)}
                                    placeholder="Google"
                                />
                            </div>
                            <InputField
                                label="Duration (e.g., Jan 2021 - Dec 2022)"
                                value={exp.duration}
                                onChange={(v) => handleExperienceChange(idx, 'duration', v)}
                                placeholder="Jan 2021 - Present"
                            />
                            <InputField
                                label="Description"
                                type="textarea"
                                value={exp.description}
                                onChange={(v) => handleExperienceChange(idx, 'description', v)}
                                placeholder="Describe your responsibilities and achievements..."
                                suggestionsPath={`experience.${idx}.description`}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddExperience}
                    className="mt-4 w-full py-2 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Experience
                </button>
            </FormSection>

            {/* Education Section */}
            <FormSection title="Education" icon="🎓" id="education">
                <div className="space-y-6">
                    {data.education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm font-semibold text-gray-400">Entry #{idx + 1}</span>
                                <button
                                    onClick={() => handleRemoveEducation(idx)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <InputField
                                    label="Degree"
                                    value={edu.degree}
                                    onChange={(v) => handleEducationChange(idx, 'degree', v)}
                                    placeholder="Bachelor of Science"
                                />
                                <InputField
                                    label="Field of Study"
                                    value={edu.field}
                                    onChange={(v) => handleEducationChange(idx, 'field', v)}
                                    placeholder="Computer Science"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Institution"
                                    value={edu.institution}
                                    onChange={(v) => handleEducationChange(idx, 'institution', v)}
                                    placeholder="MIT"
                                />
                                <InputField
                                    label="Year Graduated"
                                    value={edu.year}
                                    onChange={(v) => handleEducationChange(idx, 'year', v)}
                                    placeholder="2022"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddEducation}
                    className="mt-4 w-full py-2 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Education
                </button>
            </FormSection>

            {/* Skills Section */}
            <FormSection title="Skills" icon="⚡" id="skills">
                <InputField
                    label="Enter skills (one per line)"
                    type="textarea"
                    value={data.skills.join('\n')}
                    onChange={handleSkillsChange}
                    placeholder="JavaScript&#10;React&#10;UI Design&#10;Figma"
                />
                {data.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </FormSection>

            {/* Projects Section */}
            <FormSection title="Projects" icon="🎯" id="projects">
                <div className="space-y-6">
                    {data.projects.map((proj, idx) => (
                        <div key={idx} className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm font-semibold text-gray-400">Project #{idx + 1}</span>
                                <button
                                    onClick={() => handleRemoveProject(idx)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <InputField
                                label="Project Title"
                                value={proj.title}
                                onChange={(v) => handleProjectChange(idx, 'title', v)}
                                placeholder="E-commerce Platform Redesign"
                            />
                            <InputField
                                label="Description"
                                type="textarea"
                                value={proj.description}
                                onChange={(v) => handleProjectChange(idx, 'description', v)}
                                placeholder="Brief description of the project..."
                            />
                            <InputField
                                label="Project Link (Optional)"
                                type="url"
                                value={proj.link}
                                onChange={(v) => handleProjectChange(idx, 'link', v)}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddProject}
                    className="mt-4 w-full py-2 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </FormSection>
        </div>
    );
};

export default ResumeForm;
