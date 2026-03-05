import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/urls";

const API_BASE_URL = `${BASE_URL}/hr-jobs` // Update this if needed

// --- Step Components ---

function CreateEmployerAccount({ formData, updateFormData, nextStep }) {
    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Create an employer account
                </h1>
                <Link
                    to="/hr-forum"
                    className="inline-flex items-center gap-1 mt-2 text-blue-600 font-medium hover:underline"
                >
                    I'm looking for a job <span>→</span>
                </Link>

                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Company name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={(e) => updateFormData({ companyName: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Company website <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://www.example.com"
                            value={formData.companyWebsite}
                            onChange={(e) => updateFormData({ companyWebsite: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Company Logo URL <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://.../logo.png"
                            value={formData.companyLogo}
                            onChange={(e) => updateFormData({ companyLogo: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Application link <span className="text-gray-500">(for external redirects like Indeed, LinkedIn)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://www.indeed.com/job/..."
                            value={formData.applicationLink}
                            onChange={(e) => updateFormData({ applicationLink: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                First name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.employerFirstName}
                                onChange={(e) => updateFormData({ employerFirstName: e.target.value })}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900">
                                Last name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.employerLastName}
                                onChange={(e) => updateFormData({ employerLastName: e.target.value })}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            How did you hear about us?
                        </label>
                        <select
                            value={formData.source}
                            onChange={(e) => updateFormData({ source: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an option</option>
                            <option value="Search engine">Search engine</option>
                            <option value="Social media">Social media</option>
                            <option value="Referral">Referral</option>
                            <option value="Advertisement">Advertisement</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Phone number
                        </label>
                        <p className="text-sm text-gray-500 mb-1">
                            For account management communication. Not visible to jobseekers.
                        </p>
                        <div className="flex">
                            <div className="flex items-center gap-1 px-3 border border-gray-300 rounded-l-md bg-gray-50 text-sm">
                                🇮🇳 <span>+91</span>
                            </div>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                                className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-6">
                        <button type="button" className="text-sm text-blue-600 hover:underline">
                            Have feedback? Tell us more.
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Continue →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function AddJobBasics({ formData, updateFormData, nextStep, prevStep }) {
    const [submitted, setSubmitted] = useState(false);

    const hasJobTitleError = submitted && !formData.jobTitle;
    const hasLocationError = submitted && !formData.location;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (formData.jobTitle && formData.location) {
            nextStep();
        }
    };

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Add job basics</h1>
                <p className="mt-2 text-sm text-gray-600">
                    The job post will be in <strong>English</strong> in <strong>India</strong>
                </p>
                <hr className="my-6" />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Job title <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={formData.jobTitle}
                            onChange={(e) => updateFormData({ jobTitle: e.target.value })}
                            className={`mt-1 w-full rounded-md px-3 py-2 border focus:outline-none focus:ring-2 ${hasJobTitleError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                        {hasJobTitleError && <p className="mt-1 text-sm text-red-600">⛔ Add a job title.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Job location type <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.locationType}
                            onChange={(e) => updateFormData({ locationType: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="In person">In person</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            What is the job location? <span className="text-red-500">*</span>
                        </label>
                        <input
                            placeholder="Enter a city or location"
                            value={formData.location}
                            onChange={(e) => updateFormData({ location: e.target.value })}
                            className={`mt-1 w-full rounded-md px-3 py-2 border focus:outline-none focus:ring-2 ${hasLocationError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                    </div>
                    {(hasJobTitleError || hasLocationError) && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-4">
                            <p className="text-red-700 font-medium">⛔ These items need your attention before you can continue.</p>
                            <ul className="mt-2 ml-6 list-disc text-sm text-red-700">
                                {hasJobTitleError && <li>Job title</li>}
                                {hasLocationError && <li>Job location</li>}
                            </ul>
                        </div>
                    )}
                    <div className="flex items-center justify-between pt-6">
                        <button type="button" onClick={prevStep} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Continue →</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function HiringGoals({ formData, updateFormData, nextStep, prevStep }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.recruitmentTimeline) nextStep();
    };

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Hiring goals</h1>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Recruitment timeline for this job <span className="text-red-500">*</span>
                        </label>
                        <select
                            required
                            value={formData.recruitmentTimeline}
                            onChange={(e) => updateFormData({ recruitmentTimeline: e.target.value })}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an option</option>
                            <option value="Urgently hiring">Urgently hiring</option>
                            <option value="Hiring in 1–2 weeks">Hiring in 1–2 weeks</option>
                            <option value="Hiring in 1 month">Hiring in 1 month</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Number of people to hire for this job <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 inline-flex items-center border border-gray-300 rounded-md">
                            <button type="button" onClick={() => updateFormData({ hiringCount: Math.max(1, formData.hiringCount - 1) })} className="px-3 py-2 hover:bg-gray-100">−</button>
                            <span className="px-6 py-2 text-sm">{formData.hiringCount}</span>
                            <button type="button" onClick={() => updateFormData({ hiringCount: formData.hiringCount + 1 })} className="px-3 py-2 hover:bg-gray-100">+</button>
                        </div>
                    </div>
                    <div className="flex justify-between pt-6">
                        <button type="button" onClick={prevStep} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Continue →</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function AddJobDetails({ formData, updateFormData, nextStep, prevStep }) {
    const JOB_TYPES = ["Full-time", "Permanent", "Fresher", "Part-time", "Internship", "Contractual / Temporary", "Freelance", "Volunteer"];

    const toggleType = (type) => {
        const selected = formData.jobTypes.includes(type)
            ? formData.jobTypes.filter((t) => t !== type)
            : [...formData.jobTypes, type];
        updateFormData({ jobTypes: selected });
    };

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Add job details</h1>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Job type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {JOB_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => toggleType(type)}
                                className={`px-4 py-2 rounded-full border text-sm ${formData.jobTypes.includes(type) ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                            >
                                + {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between pt-10">
                    <button type="button" onClick={prevStep} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                    <button type="button" onClick={() => { if (formData.jobTypes.length > 0) nextStep(); }} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Continue →</button>
                </div>
            </div>
        </div>
    );
}

function AddPayAndBenefits({ formData, updateFormData, nextStep, prevStep }) {
    const BENEFITS = ["Health insurance", "Provident Fund", "Cell phone reimbursement", "Paid sick time", "Work from home", "Paid time off", "Food provided"];

    const toggleBenefit = (b) => {
        const selected = formData.benefits.includes(b)
            ? formData.benefits.filter((x) => x !== b)
            : [...formData.benefits, b];
        updateFormData({ benefits: selected });
    };

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Add pay and benefits</h1>
                <div className="mt-8 space-y-6">
                    <div>
                        <h2 className="font-medium text-gray-900">Pay</h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <select className="border rounded-md px-3 py-2"><option>Range</option></select>
                            <input
                                value={formData.payRange.min}
                                onChange={(e) => updateFormData({ payRange: { ...formData.payRange, min: e.target.value } })}
                                placeholder="Min"
                                className="border rounded-md px-3 py-2"
                            />
                            <input
                                value={formData.payRange.max}
                                onChange={(e) => updateFormData({ payRange: { ...formData.payRange, max: e.target.value } })}
                                placeholder="Max"
                                className="border rounded-md px-3 py-2"
                            />
                            <select
                                value={formData.payRange.period}
                                onChange={(e) => updateFormData({ payRange: { ...formData.payRange, period: e.target.value } })}
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="per month">per month</option>
                                <option value="per year">per year</option>
                                <option value="per week">per week</option>
                                <option value="per hour">per hour</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-medium text-gray-900 mb-2">Benefits</h2>
                        <div className="flex flex-wrap gap-2">
                            {BENEFITS.map((b) => (
                                <button
                                    key={b}
                                    onClick={() => toggleBenefit(b)}
                                    className={`px-4 py-2 rounded-full border text-sm ${formData.benefits.includes(b) ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-100"}`}
                                >
                                    + {b}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between pt-10">
                    <button type="button" onClick={prevStep} className="border px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                    <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Continue →</button>
                </div>
            </div>
        </div>
    );
}

function DescribeTheJob({ formData, updateFormData, prevStep, submitForm }) {
    const isError = formData.description.length < 30;

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Describe the job</h1>
                <p className="text-sm text-gray-500 mt-2 mb-8">
                    Pro-tip: Use terms like <strong>"must have"</strong> or <strong>"required"</strong> to help the ATS identify essential skills.
                </p>

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                            About the company/role
                        </label>
                        <textarea
                            value={formData.about}
                            onChange={(e) => updateFormData({ about: e.target.value })}
                            rows={3}
                            placeholder="e.g. Join our award-winning creative team..."
                            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Role Summary (One per line)
                        </label>
                        <textarea
                            value={formData.roleSummary}
                            onChange={(e) => updateFormData({ roleSummary: e.target.value })}
                            rows={4}
                            placeholder="Design high-quality assets&#10;Collaborate with marketing teams"
                            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Key Responsibilities & Requirements (One per line)
                        </label>
                        <textarea
                            value={formData.responsibilities}
                            onChange={(e) => updateFormData({ responsibilities: e.target.value })}
                            rows={6}
                            placeholder="Must have 3+ years in Figma&#10;Proficiency in Adobe Suite"
                            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Full Job description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => updateFormData({ description: e.target.value })}
                            rows={6}
                            placeholder="Detailed description of the daily routine and expectations..."
                            className={`mt-2 w-full rounded-md border px-3 py-2 focus:ring-2 ${isError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                        {isError && <p className="mt-1 text-sm text-red-600">Add a job description with a minimum of 30 characters.</p>}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-10 border-t mt-12">
                    <button type="button" onClick={prevStep} className="border px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                    <button
                        type="button"
                        disabled={isError}
                        onClick={submitForm}
                        className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 disabled:opacity-50 shadow-lg transition-all active:scale-95"
                    >
                        Post Job ✨
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Main JobPosting Component ---

export default function JobPosting() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsite: "",
        applicationLink: "",
        employerFirstName: "WEB ASST",
        employerLastName: "SocialBureau",
        source: "",
        phoneNumber: "70122-29117",
        jobTitle: "",
        locationType: "In person",
        location: "",
        recruitmentTimeline: "",
        hiringCount: 1,
        jobTypes: [],
        payRange: {
            min: "8919.35",
            max: "44819.72",
            period: "per month"
        },
        benefits: [],
        about: "",
        roleSummary: "",
        responsibilities: "",
        description: ""
    });

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

    const submitForm = async () => {
        setLoading(true);
        // Clean up textareas into arrays if needed
        const processedData = {
            ...formData,
            roleSummary: formData.roleSummary.split('\n').filter(s => s.trim()),
            responsibilities: formData.responsibilities.split('\n').filter(s => s.trim())
        };
        try {
            const response = await axios.post(API_BASE_URL, processedData);
            alert("Job posted successfully!");
            navigate("/hr-forum");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to post job. Please check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-xl font-medium">Posting your job...</p>
            </div>
        );
    }

    const stepProps = { formData, updateFormData, nextStep, prevStep };

    switch (step) {
        case 0:
            return <CreateEmployerAccount {...stepProps} />;
        case 1:
            return <AddJobBasics {...stepProps} />;
        case 2:
            return <HiringGoals {...stepProps} />;
        case 3:
            return <AddJobDetails {...stepProps} />;
        case 4:
            return <AddPayAndBenefits {...stepProps} />;
        case 5:
            return <DescribeTheJob {...stepProps} submitForm={submitForm} />;
        default:
            return <CreateEmployerAccount {...stepProps} />;
    }
}

