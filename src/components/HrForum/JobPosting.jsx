import React, { useState } from "react";
import { Link } from "react-router-dom";

// --- Step Components ---

function CreateEmployerAccount({ nextStep }) {
    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Create an employer account
                </h1>
                <a
                    href="/hr-forum"
                    className="inline-flex items-center gap-1 mt-2 text-blue-600 font-medium hover:underline"
                >
                    I'm looking for a job <span>→</span>
                </a>

                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Company name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
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
                                defaultValue="WEB ASST"
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
                                defaultValue="SocialBureau"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            How did you hear about us?
                        </label>
                        <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select an option</option>
                            <option>Search engine</option>
                            <option>Social media</option>
                            <option>Referral</option>
                            <option>Advertisement</option>
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
                                defaultValue="70122-29117"
                                className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600 leading-relaxed">
                            By clicking this box and providing your telephone or wireless
                            number, you agree to receive marketing and informational calls and
                            texts from Indeed...
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-6">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Have feedback? Tell us more.
                        </a>
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

function AddJobBasics({ nextStep, prevStep }) {
    const [jobTitle, setJobTitle] = useState("");
    const [locationType, setLocationType] = useState("In person");
    const [location, setLocation] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const hasJobTitleError = submitted && !jobTitle;
    const hasLocationError = submitted && !location;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (jobTitle && location) {
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
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className={`mt-1 w-full rounded-md px-3 py-2 border focus:outline-none focus:ring-2 ${hasJobTitleError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                        {hasJobTitleError && <p className="mt-1 text-sm text-red-600">⛔ Add a job title.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Job location type <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={locationType}
                            onChange={(e) => setLocationType(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>In person</option>
                            <option>Hybrid</option>
                            <option>Remote</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            What is the job location? <span className="text-red-500">*</span>
                        </label>
                        <input
                            placeholder="Enter a city or location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
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

function HiringGoals({ nextStep, prevStep }) {
    const [timeline, setTimeline] = useState("");
    const [count, setCount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (timeline) nextStep();
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
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an option</option>
                            <option>Urgently hiring</option>
                            <option>Hiring in 1–2 weeks</option>
                            <option>Hiring in 1 month</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">
                            Number of people to hire in the next 30 days <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 inline-flex items-center border border-gray-300 rounded-md">
                            <button type="button" onClick={() => setCount(Math.max(1, count - 1))} className="px-3 py-2 hover:bg-gray-100">−</button>
                            <span className="px-6 py-2 text-sm">{count}</span>
                            <button type="button" onClick={() => setCount(count + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
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

function AddJobDetails({ nextStep, prevStep }) {
    const JOB_TYPES = ["Full-time", "Permanent", "Fresher", "Part-time", "Internship", "Contractual / Temporary", "Freelance", "Volunteer"];
    const [selected, setSelected] = useState([]);

    const toggleType = (type) => {
        setSelected((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
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
                                className={`px-4 py-2 rounded-full border text-sm ${selected.includes(type) ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                            >
                                + {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between pt-10">
                    <button type="button" onClick={prevStep} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                    <button type="button" onClick={() => { if (selected.length > 0) nextStep(); }} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Continue →</button>
                </div>
            </div>
        </div>
    );
}

function AddPayAndBenefits({ nextStep, prevStep }) {
    const BENEFITS = ["Health insurance", "Provident Fund", "Cell phone reimbursement", "Paid sick time", "Work from home", "Paid time off", "Food provided"];
    const [minPay, setMinPay] = useState("8919.35");
    const [maxPay, setMaxPay] = useState("44819.72");
    const [benefits, setBenefits] = useState([]);

    const toggleBenefit = (b) => {
        setBenefits((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
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
                            <input value={minPay} onChange={(e) => setMinPay(e.target.value)} className="border rounded-md px-3 py-2" />
                            <input value={maxPay} onChange={(e) => setMaxPay(e.target.value)} className="border rounded-md px-3 py-2" />
                            <select className="border rounded-md px-3 py-2"><option>per month</option></select>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-medium text-gray-900 mb-2">Benefits</h2>
                        <div className="flex flex-wrap gap-2">
                            {BENEFITS.map((b) => (
                                <button
                                    key={b}
                                    onClick={() => toggleBenefit(b)}
                                    className={`px-4 py-2 rounded-full border text-sm ${benefits.includes(b) ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-100"}`}
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

function DescribeTheJob({ prevStep }) {
    const [description, setDescription] = useState("");
    const isError = description.length < 30;

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900">Describe the job</h1>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-900">
                        Job description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className={`mt-2 w-full rounded-md border px-3 py-2 focus:ring-2 ${isError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                    />
                    {isError && <p className="mt-1 text-sm text-red-600">Add a job description with a minimum of 30 characters.</p>}
                </div>
                <div className="flex justify-between items-center pt-10">
                    <button type="button" onClick={prevStep} className="border px-4 py-2 rounded-md hover:bg-gray-50">← Back</button>
                    <button type="button" disabled={isError} onClick={() => console.log("Final Submit")} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">Post Job →</button>
                </div>
            </div>
        </div>
    );
}

// --- Main JobPosting Component ---

export default function JobPosting() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

    switch (step) {
        case 0:
            return <CreateEmployerAccount nextStep={nextStep} />;
        case 1:
            return <AddJobBasics nextStep={nextStep} prevStep={prevStep} />;
        case 2:
            return <HiringGoals nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <AddJobDetails nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <AddPayAndBenefits nextStep={nextStep} prevStep={prevStep} />;
        case 5:
            return <DescribeTheJob prevStep={prevStep} />;
        default:
            return <CreateEmployerAccount nextStep={nextStep} />;
    }
}

