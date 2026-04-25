import React, { useState } from "react";
import { motion } from "framer-motion";
import ajnoraService from "../../services/ajnoraService";
import { toast } from "react-toastify";

export default function AjinorahForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        businessDescription: "",
        priorityServices: "",
        project: "",
        goals: [],
        goalsOther: "",
        expansionPlans: "",
        successVision: "",
        targetAudience: "",
        currentActivities: [],
        currentActivitiesOther: "",
        performanceHistory: "",
        leadHandling: "",
        competitors: "",
        challenges: "",
        budget: "",
        notes: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (type, value) => {
        setFormData(prev => {
            const list = prev[type] || [];
            if (list.includes(value)) {
                return { ...prev, [type]: list.filter(i => i !== value) };
            } else {
                return { ...prev, [type]: [...list, value] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation for 'Others'
        const finalData = { ...formData };
        if (formData.goals.includes("Others") && !formData.goalsOther) {
            toast.error("Please specify 'Other' goals.");
            return;
        }
        if (formData.currentActivities.includes("Others") && !formData.currentActivitiesOther) {
            toast.error("Please specify 'Other' marketing activities.");
            return;
        }

        setLoading(true);
        try {
            await ajnoraService.createEntry(finalData);
            setSubmitted(true);
            toast.success("Intelligence received. Strategy formulation in progress.");
        } catch (error) {
            toast.error(error.message || "Transmission failed.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-check text-[#ff0000] text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-black mb-2 tracking-tight">Transmission <span className="italic text-[#ff0000]">Complete</span></h1>
                    <p className="text-gray-500 text-sm italic mb-6 font-roboto">
                        Your strategic intelligence has been received.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-[#ff0000] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-all"
                    >
                        Return to Hub
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50 py-6 px-4 md:px-8 font-roboto min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 shadow-2xl shadow-black/5 relative z-10 border border-gray-100 rounded-3xl">
                <header className="mb-8 border-b border-gray-100 pb-4">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase">
                        Client Requirement <span className="italic text-[#ff0000]">Form</span>
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* SECTION 1 */}
                    <FormSection title="01: Business Snapshot">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <Input label="Principal Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                            <Input
                                label="1. Briefly describe your business."
                                name="businessDescription"
                                value={formData.businessDescription}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="Key services and strengths..."
                            />
                            <Input
                                label="2. Top 3 priority services to grow."
                                name="priorityServices"
                                value={formData.priorityServices}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="List your priorities..."
                            />
                        </div>
                    </FormSection>

                    {/* SECTION 2 */}
                    <FormSection title="02: Goals & Growth">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
                            <CheckboxGroup
                                label="3. Main marketing goals?"
                                options={["Leads", "Revenue", "Brand awareness", "Expansion", "Others"]}
                                selected={formData.goals}
                                onToggle={(val) => handleCheckbox("goals", val)}
                                otherValue={formData.goalsOther}
                                onOtherChange={(val) => setFormData(p => ({ ...p, goalsOther: val }))}
                            />
                            <Input
                                label="4. Target locations."
                                name="expansionPlans"
                                value={formData.expansionPlans}
                                onChange={handleChange}
                                required
                                placeholder="Where do you want to expand?"
                            />
                            <Input
                                label="5. Success in 6 months?"
                                name="successVision"
                                value={formData.successVision}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="What does success look like?"
                            />
                            <Input
                                label="6. Ideal customer and their goal?"
                                name="targetAudience"
                                value={formData.targetAudience}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="Describe your target audience..."
                            />
                        </div>
                    </FormSection>

                    {/* SECTION 3 */}
                    <FormSection title="03: Current Performance & Sales">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
                            <CheckboxGroup
                                label="7. Current activities?"
                                options={["Social media", "Ads", "SEO", "Offline", "Others"]}
                                selected={formData.currentActivities}
                                onToggle={(val) => handleCheckbox("currentActivities", val)}
                                otherValue={formData.currentActivitiesOther}
                                onOtherChange={(val) => setFormData(p => ({ ...p, currentActivitiesOther: val }))}
                            />
                            <Input
                                label="8. What worked/not worked?"
                                name="performanceHistory"
                                value={formData.performanceHistory}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="Performance history..."
                            />
                            <Input
                                label="9. Lead handling process?"
                                name="leadHandling"
                                value={formData.leadHandling}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="How do you handle leads?"
                            />
                            <Input
                                label="10. Main competitors?"
                                name="competitors"
                                value={formData.competitors}
                                onChange={handleChange}
                                textarea
                                placeholder="(Optional)"
                            />
                        </div>
                    </FormSection>

                    {/* SECTION 4 */}
                    <FormSection title="04: Challenges & Strategy">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
                            <Input
                                label="11. Biggest growth challenges?"
                                name="challenges"
                                value={formData.challenges}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="What's stopping your growth?"
                            />
                            <RadioGroup
                                label="12. Monthly budget?"
                                options={["₹50K–₹1L", "₹1L–₹3L", "₹3L+"]}
                                selected={formData.budget}
                                onSelect={(val) => setFormData(prev => ({ ...prev, budget: val }))}
                            />
                            <Input
                                label="13. Other expectations?"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="Additional notes..."
                            />
                        </div>
                    </FormSection>

                    <div className="pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full max-w-sm bg-[#ff0000] text-white py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Submit Strategy Dossier</span>
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* UI COMPONENTS */

const FormSection = ({ title, children }) => (
    <div className="border-l-2 border-red-500/10 pl-4">
        <h2 className="text-md font-black uppercase tracking-widest text-[#ff0000] mb-4">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const Input = ({ label, name, value, onChange, placeholder, type = "text", textarea = false, required = false, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-bold text-black uppercase tracking-tight">
            {label}
        </label>
        {textarea ? (
            <textarea name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows="3"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#ff0000] transition-all placeholder:text-gray-300 text-black rounded-2xl" />
        ) : (
            <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff0000] transition-all placeholder:text-gray-300 text-black rounded-full" />
        )}
    </div>
);

const CheckboxGroup = ({ label, options, selected, onToggle, otherValue, onOtherChange }) => (
    <div className="space-y-3">
        <p className="text-sm font-bold text-black uppercase tracking-tight">{label}</p>
        <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
                <button key={i} type="button" onClick={() => onToggle(opt)}
                    className={`text-center py-2 px-4 border transition-all text-[10px] font-bold uppercase rounded-full ${selected.includes(opt) ? "bg-[#ff0000] border-[#ff0000] text-white" : "bg-white border-gray-200 text-black hover:border-red-200"}`}>
                    {opt}
                </button>
            ))}
        </div>
        {selected.includes("Others") && (
            <input
                type="text"
                placeholder="Specify..."
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                required
                className="w-full max-w-xs bg-white border border-[#ff0000] px-4 py-2 text-xs focus:outline-none text-black mt-2 rounded-full"
            />
        )}
    </div>
);

const RadioGroup = ({ label, options, selected, onSelect }) => (
    <div className="space-y-3">
        <p className="text-sm font-bold text-black uppercase tracking-tight">{label}</p>
        <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
                <button key={i} type="button" onClick={() => onSelect(opt)}
                    className={`px-5 py-2 border transition-all text-[10px] font-bold uppercase rounded-full ${selected === opt ? "bg-[#ff0000] border-[#ff0000] text-white" : "bg-white border-gray-200 text-black hover:border-red-200"}`}>
                    {opt}
                </button>
            ))}
        </div>
    </div>
);