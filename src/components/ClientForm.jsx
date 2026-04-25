import React from "react";

export default function AjinorahForm() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                <h1 className="text-2xl font-bold mb-2">
                    AJINORAH – CLIENT REQUIREMENT FORM
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Takes ~5–7 minutes to complete
                </p>
                <p className="text-sm bg-gray-100 p-3 rounded mb-8">
                    This form helps us build a customized growth strategy for Ajinorah’s
                    brand, expansion, and revenue goals. Please answer as accurately as possible.
                </p>

                <form className="space-y-8">

                    {/* Section 1 */}
                    <Section title="SECTION 1: Business Snapshot">
                        <Input label="1. Describe your business, key services, and strengths" textarea />
                        <Input label="2. Top 3 priority services/programs" textarea />
                    </Section>

                    {/* Section 2 */}
                    <Section title="SECTION 2: Goals & Growth Direction">
                        <CheckboxGroup
                            label="3. Main goals from digital marketing"
                            options={[
                                "Leads",
                                "Revenue",
                                "Brand Awareness",
                                "Expansion into New Locations",
                                "Others",
                            ]}
                        />
                        <Input label="4. Current locations & expansion plans" />
                        <Input label="5. What does success look like in 6 months?" textarea />
                    </Section>

                    {/* Section 3 */}
                    <Section title="SECTION 3: Target Audience">
                        <Input label="6. Ideal customer and their main goal" textarea />
                    </Section>

                    {/* Section 4 */}
                    <Section title="SECTION 4: Marketing & Performance">
                        <CheckboxGroup
                            label="7. Current marketing activities"
                            options={[
                                "Social Media",
                                "Paid Ads (Meta / Google)",
                                "SEO",
                                "Offline Marketing",
                                "Others",
                            ]}
                        />
                        <Input label="8. What has worked / not worked?" textarea />
                    </Section>

                    {/* Section 5 */}
                    <Section title="SECTION 5: Sales & Conversion">
                        <Input label="9. Lead handling process" textarea />
                    </Section>

                    {/* Section 6 */}
                    <Section title="SECTION 6: Brand & Competition">
                        <Input label="10. Competitors & differences" textarea />
                    </Section>

                    {/* Section 7 */}
                    <Section title="SECTION 7: Challenges">
                        <Input label="11. Biggest challenges" textarea />
                    </Section>

                    {/* Section 8 */}
                    <Section title="SECTION 8: Budget">
                        <RadioGroup
                            label="12. Monthly marketing budget"
                            options={["₹50K–₹1L", "₹1L–₹3L", "₹3L+"]}
                        />
                    </Section>

                    {/* Section 9 */}
                    <Section title="SECTION 9: Additional Inputs">
                        <Input label="13. Anything else we should know?" textarea />
                    </Section>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        Submit Form
                    </button>
                </form>
            </div>
        </div>
    );
}

/* Reusable Components */

const Section = ({ title, children }) => (
    <div>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const Input = ({ label, textarea = false }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        {textarea ? (
            <textarea
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
                rows="3"
            />
        ) : (
            <input
                type="text"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            />
        )}
    </div>
);

const CheckboxGroup = ({ label, options }) => (
    <div>
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="space-y-2">
            {options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" className="accent-black" />
                    {opt}
                </label>
            ))}
        </div>
    </div>
);

const RadioGroup = ({ label, options }) => (
    <div>
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="space-y-2">
            {options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                    <input type="radio" name="budget" className="accent-black" />
                    {opt}
                </label>
            ))}
        </div>
    </div>
);