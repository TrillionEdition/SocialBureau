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
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-xl"
                >
                    <div className="w-20 h-20 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full flex items-center justify-center mx-auto mb-8">
                        <i className="fas fa-check text-[#C5A059] text-3xl"></i>
                    </div>
                    <h1 className="text-4xl font-light text-white mb-4 tracking-tighter">Transmission <span className="italic text-[#C5A059]">Complete</span></h1>
                    <p className="text-white/40 leading-relaxed italic mb-8 font-sans">
                        Your strategic intelligence has been encrypted and relayed to our growth architects.
                        A customized roadmap is currently being formulated.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-10 py-4 bg-[#C5A059] text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all"
                    >
                        Return to Hub
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-20 px-4 relative overflow-hidden font-sans">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#C5A059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="mb-20 text-center md:text-left">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        Strategic <span className="italic text-[#C5A059]">Intake</span>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-8 text-white/40 text-[12px] uppercase tracking-widest font-black">
                        <div className="flex items-center gap-3">
                            <i className="far fa-clock text-[#C5A059]"></i>
                            <span>Takes ~5–7 minutes to complete</span>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-40">

                    {/* SECTION 1 */}
                    <FormSection title="SECTION 1: Business Snapshot" index="01">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
                            <Input label="Principal Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                        </div>
                        <div className="space-y-20">
                            <Input
                                label="1. Briefly describe your business, key services, and what you are known for."
                                name="businessDescription"
                                value={formData.businessDescription}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="(Helps us understand your positioning and strengths)"
                            />
                            <Input
                                label="2. What are your top 3 priority services/programs you want to grow right now?"
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
                    <FormSection title="SECTION 2: Goals & Growth Direction" index="02">
                        <CheckboxGroup
                            label="3. What are your main goals from digital marketing?"
                            options={["Leads", "Revenue", "Brand awareness", "Expansion into new locations", "Others"]}
                            selected={formData.goals}
                            onToggle={(val) => handleCheckbox("goals", val)}
                            otherValue={formData.goalsOther}
                            onOtherChange={(val) => setFormData(p => ({ ...p, goalsOther: val }))}
                        />
                        <div className="mt-20 space-y-20">
                            <Input
                                label="4. Which locations are you currently operating in, and where do you want to expand next?"
                                name="expansionPlans"
                                value={formData.expansionPlans}
                                onChange={handleChange}
                                required
                                placeholder="Locations & expansion..."
                            />
                            <Input
                                label="5. What does success look like for you in the next 6 months?"
                                name="successVision"
                                value={formData.successVision}
                                onChange={handleChange}
                                textarea
                                required
                                placeholder="(Leads, admissions, revenue, brand presence, etc.)"
                            />
                        </div>
                    </FormSection>

                    {/* SECTION 3 */}
                    <FormSection title="SECTION 3: Target Audience" index="03">
                        <Input
                            label="6. Who is your ideal customer and what is their main goal?"
                            name="targetAudience"
                            value={formData.targetAudience}
                            onChange={handleChange}
                            textarea
                            required
                            placeholder="(Example: students aiming to study/work abroad, nurses preparing for OET, etc.)"
                        />
                    </FormSection>

                    {/* SECTION 4 */}
                    <FormSection title="SECTION 4: Current Marketing & Performance" index="04">
                        <CheckboxGroup
                            label="7. What marketing activities are you currently doing?"
                            options={["Social media", "Paid ads (Meta / Google)", "SEO", "Offline marketing", "Others"]}
                            selected={formData.currentActivities}
                            onToggle={(val) => handleCheckbox("currentActivities", val)}
                            otherValue={formData.currentActivitiesOther}
                            onOtherChange={(val) => setFormData(p => ({ ...p, currentActivitiesOther: val }))}
                        />
                        <div className="mt-20">
                            <Input
                                label="8. What has worked well so far, and what has not worked?"
                                name="performanceHistory"
                                value={formData.performanceHistory}
                                onChange={handleChange}
                                textarea
                                required
                            />
                        </div>
                    </FormSection>

                    {/* SECTION 5 */}
                    <FormSection title="SECTION 5: Sales & Conversion" index="05">
                        <Input
                            label="9. How do you currently handle leads after they come in?"
                            name="leadHandling"
                            value={formData.leadHandling}
                            onChange={handleChange}
                            textarea
                            required
                            placeholder="(Briefly explain your process)"
                        />
                    </FormSection>

                    {/* SECTION 6 */}
                    <FormSection title="SECTION 6: Brand & Competition" index="06">
                        <Input
                            label="10. Who are your main competitors, and what do they do better or differently?"
                            name="competitors"
                            value={formData.competitors}
                            onChange={handleChange}
                            textarea
                            placeholder="(Optional question)"
                        />
                    </FormSection>

                    {/* SECTION 7 */}
                    <FormSection title="SECTION 7: Challenges & Expectations" index="07">
                        <Input
                            label="11. What are the biggest challenges you are facing in marketing or growth right now?"
                            name="challenges"
                            value={formData.challenges}
                            onChange={handleChange}
                            textarea
                            required
                        />
                    </FormSection>

                    {/* SECTION 8 */}
                    <FormSection title="SECTION 8: Budget & Collaboration" index="08">
                        <RadioGroup
                            label="12. What is your approximate monthly marketing budget?"
                            options={["₹50K–₹1L", "₹1L–₹3L", "₹3L+"]}
                            selected={formData.budget}
                            onSelect={(val) => setFormData(prev => ({ ...prev, budget: val }))}
                        />
                    </FormSection>

                    {/* SECTION 9 */}
                    <FormSection title="SECTION 9: Additional Inputs" index="09">
                        <Input
                            label="13. Anything else you would like us to know (ideas, expectations, concerns)?"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            textarea
                            required
                        />
                    </FormSection>

                    <div className="pt-12 border-t border-white/5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C5A059] text-black py-8 rounded-none font-black uppercase text-[16px] tracking-[0.5em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-6"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Transmit Strategy Dossier</span>
                                    <i className="fas fa-arrow-right group-hover:translate-x-3 transition-transform"></i>
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

const FormSection = ({ title, index, children }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-8 mb-16">
            <span className="text-[#C5A059] font-black text-xl tracking-tighter opacity-50">{index}</span>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-[#C5A059]">{title}</h2>
            <div className="flex-1 h-px bg-white/10"></div>
        </div>
        <div className="space-y-20 pl-4 md:pl-16 border-l-2 border-[#C5A059]/10">{children}</div>
    </motion.div>
);

const Input = ({ label, name, value, onChange, placeholder, type = "text", textarea = false, required = false }) => (
    <div className="relative group">
        <label className="block text-xl md:text-2xl font-bold text-white mb-8 leading-tight group-hover:text-[#C5A059] transition-colors">
            {label}
        </label>
        {textarea ? (
            <textarea name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows="6"
                className="w-full bg-white/5 border-2 border-white/10 rounded-none p-8 text-lg md:text-xl focus:outline-none focus:border-[#C5A059] transition-all placeholder:text-white/10 text-white" />
        ) : (
            <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
                className="w-full bg-white/5 border-2 border-white/10 rounded-none px-8 py-6 text-lg md:text-xl focus:outline-none focus:border-[#C5A059] transition-all placeholder:text-white/10 text-white" />
        )}
    </div>
);

const CheckboxGroup = ({ label, options, selected, onToggle, otherValue, onOtherChange }) => (
    <div>
        <p className="text-xl md:text-2xl font-bold text-white mb-10 leading-tight">{label}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {options.map((opt, i) => (
                <button key={i} type="button" onClick={() => onToggle(opt)}
                    className={`text-left p-8 border-2 transition-all flex items-center justify-between group ${selected.includes(opt) ? "bg-[#C5A059] border-[#C5A059] text-black" : "bg-white/5 border-white/10 text-white hover:border-[#C5A059]/50"}`}>
                    <span className="text-lg font-bold uppercase">{opt}</span>
                    <div className={`w-6 h-6 border-2 flex items-center justify-center ${selected.includes(opt) ? "border-black" : "border-white/30"}`}>
                        {selected.includes(opt) && <i className="fas fa-check text-[14px]"></i>}
                    </div>
                </button>
            ))}
        </div>
        {selected.includes("Others") && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <input
                    type="text"
                    placeholder="Please specify..."
                    value={otherValue}
                    onChange={(e) => onOtherChange(e.target.value)}
                    required
                    className="w-full bg-white/5 border-2 border-[#C5A059] rounded-none px-8 py-4 text-lg focus:outline-none text-white"
                />
            </motion.div>
        )}
    </div>
);

const RadioGroup = ({ label, options, selected, onSelect }) => (
    <div>
        <p className="text-xl md:text-2xl font-bold text-white mb-10 leading-tight">{label}</p>
        <div className="flex flex-wrap gap-6">
            {options.map((opt, i) => (
                <button key={i} type="button" onClick={() => onSelect(opt)}
                    className={`px-12 py-5 border-2 transition-all text-lg font-bold uppercase ${selected === opt ? "bg-[#C5A059] border-[#C5A059] text-black" : "bg-white/5 border-white/10 text-white hover:border-[#C5A059]/50"}`}>
                    {opt}
                </button>
            ))}
        </div>
    </div>
);