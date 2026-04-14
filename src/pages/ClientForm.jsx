import { useState, useEffect } from "react";
import clientService from "../../services/clientService";
import { createClickUpTask } from "../../services/clickupServices";
import Confetti from "react-confetti";

export default function ClientForm() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialInput, setSocialInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  // Remove auto-hide timer for the modal so the user can interact with it
  useEffect(() => {
    // If showConfetti becomes true, it stays true until the user closes it manually
  }, [showConfetti]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    industry: "",
    website_url: "",
    current_marketing_description: "",
    monthly_budget_range: "",
    timeline_to_start: "",
    channels: [],
    goals: []
  });

  const addSocialLink = () => {
    if (!socialInput.startsWith("http")) {
      setMessage({ type: "error", text: "Enter a valid URL" });
      return;
    }
    setSocialLinks([
      ...socialLinks,
      { link_type: "social", url: socialInput, verified: false }
    ]);
    setSocialInput("");
  };

  const removeSocialLink = (i) => {
    setSocialLinks(socialLinks.filter((_, index) => index !== i));
  };

  const handleCheckbox = (field, value) => {
    const exists = form[field].includes(value);
    setForm({
      ...form,
      [field]: exists
        ? form[field].filter((v) => v !== value)
        : [...form[field], value]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const submitData = {
        ...form,
        social_links: socialLinks
      };

      await clientService.createClient(submitData);

      // Automatically create ClickUp task
      try {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30); // Default 30 days

        const taskData = {
          clientName: `${form.first_name} ${form.last_name} is on Intake`,
          clientCompany: form.company_name || 'Unknown',
          status: 'intake',
          dueDate: dueDate.toISOString(),
          priority: 2 // Default priority
        };
        await createClickUpTask(taskData);
      } catch (clickupError) {
        console.error("ClickUp creation failed:", clickupError);
        // We don't block the UI for ClickUp failure if the main client creation succeeded
      }

      setShowConfetti(true);
      setMessage({
        type: "success",
        text: "✓ Your request submitted successfully! We'll contact you soon."
      });

      // Reset form
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name: "",
        industry: "",
        website_url: "",
        current_marketing_description: "",
        monthly_budget_range: "",
        timeline_to_start: "",
        channels: [],
        goals: []
      });
      setSocialLinks([]);
    } catch (error) {
      const errorMsg =
        error.message === "Email already exists"
          ? "This email is already registered. Please use a different one."
          : error.message || "Failed to submit form. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffffff] py-16 sm:py-24 text-[#F5F5F7] font-sans selection:bg-[#E8001A] selection:text-white">
      {/* SUCCESS MODAL & CONFETTI */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="fixed inset-0 pointer-events-none z-50">
            <Confetti recycle={false} numberOfPieces={800} gravity={0.12} colors={['#E8001A', '#FF5C35', '#FF1493', '#FFFFFF', '#000000']} style={{ width: '100%', height: '100%' }} />
          </div>
          
          <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 sm:p-12 text-center max-w-lg w-full relative z-50 shadow-2xl shadow-[#E8001A]/20 transform transition-all">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#E8001A] to-[#FF1493] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#E8001A]/40">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white italic mb-4 tracking-tighter">
              Join Social Bureau.
            </h2>
            <p className="text-[#6E6E73] text-base sm:text-lg font-light mb-8 italic">
              Your request is secured. We will contact you shortly with a ruthless growth strategy.
            </p>
            <button 
              onClick={() => setShowConfetti(false)}
              className="w-full py-4 rounded-full bg-white text-[#0A0A0A] font-black uppercase tracking-widest hover:bg-[#E8001A] hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        {/* PROGRESS (Subtle gradient line) */}
        <div className="w-full h-[2px] bg-white/10 rounded-full mb-12 sm:mb-16 overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-[#E8001A] via-[#FF5C35] to-[#FF1493]"></div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[12px] sm:text-[14px] font-black text-[#E8001A] uppercase tracking-[0.3em] mb-4 block italic">Let's Scale</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tighter mb-4 italic">
            Propose a Project
          </h1>
          <p className="text-[#6E6E73] text-lg sm:text-xl font-light italic max-w-2xl mx-auto">
            Tell us about your ambitions. Our team responds with a ruthless growth strategy.
          </p>
        </div>

        {/* MESSAGE BANNER */}
        {message.text && (
          <div
            className={`mb-8 p-4 sm:p-5 rounded-2xl text-sm sm:text-base font-medium ${message.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-[#E8001A]/10 text-[#FF8A80] border border-[#E8001A]/20"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CONTACT INFORMATION */}
          <Section title="Contact Information">
            <Grid>
              <Input
                label="First Name *"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                required
              />
              <Input
                label="Last Name *"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                full
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                full
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                label="Company Name *"
                full
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                required
              />
              <Input
                label="Industry *"
                full
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                required
              />
            </Grid>
          </Section>

          {/* DIGITAL PRESENCE */}
          <Section title="Your Digital Presence">
            <Input
              label="Website URL"
              full
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />

            <div className="mt-4">
              <Label>Social Media Profiles</Label>
              <div className="flex gap-2">
                <input
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                  placeholder="https://..."
                  value={socialInput}
                  onChange={(e) => setSocialInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>

              <div className="mt-2 space-y-2">
                {socialLinks.map((link, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-100 px-3 py-2 rounded text-sm text-gray-800"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline truncate">
                      {link.url}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* MARKETING EFFORTS */}
          <Section title="Current Marketing Efforts">
            <Textarea
              label="What are you currently doing for marketing?"
              value={form.current_marketing_description}
              onChange={(e) =>
                setForm({ ...form, current_marketing_description: e.target.value })
              }
            />

            <div className="mt-4">
              <CheckboxGroup
                title="Select Your Current Channels"
                items={[
                  ["social_media", "Social Media Management"],
                  ["email_marketing", "Email Marketing"],
                  ["paid_ads", "Paid Advertising"],
                  ["content_marketing", "Content Marketing"],
                  ["influencer", "Influencer Partnerships"],
                  ["none", "None"]
                ]}
                field="channels"
                form={form}
                handleCheckbox={handleCheckbox}
              />
            </div>
          </Section>

          {/* GOALS */}
          <Section title="What are your main goals?">
            <CheckboxGroup
              title="Select Your Goals"
              items={[
                ["brand_awareness", "Increase Brand Awareness"],
                ["lead_generation", "Lead Generation"],
                ["sales", "Increase Sales"],
                ["engagement", "Improve Engagement"],
                ["reputation", "Build Reputation"],
                ["other", "Other"]
              ]}
              field="goals"
              form={form}
              handleCheckbox={handleCheckbox}
            />
          </Section>

          {/* BUDGET & TIMELINE */}
          <Section title="Budget & Timeline">
            <Grid>
              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  style={{
                    width: "80px",
                    padding: "6px",
                    fontSize: "14px"
                  }}
                  value={form.currency}
                  onChange={(e) =>
                    setForm({ ...form, currency: e.target.value })
                  }
                >
                  <option value="INR">₹</option>
                  <option value="USD">$</option>
                </select>

                <Input
                  label="Monthly Budget Range"
                  value={form.monthly_budget_range}
                  onChange={(e) =>
                    setForm({ ...form, monthly_budget_range: e.target.value })
                  }
                />
              </div>

              <Input
                label="Timeline to Start"
                type="datetime-local"
                value={form.timeline_to_start}
                onChange={(e) =>
                  setForm({ ...form, timeline_to_start: e.target.value })
                }
              />
            </Grid>
          </Section>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit & Get Proposal →"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* COMPONENTS */

const Section = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h2 className="text-sm font-medium text-gray-800 mb-4 border-l-4 border-indigo-500 pl-2">
      {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label, full, ...props }) => (
  <div className={full ? "col-span-2" : ""}>
    <Label>{label}</Label>
    <input
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      {...props}
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <textarea
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 h-24"
      {...props}
    />
  </div>
);

const Label = ({ children }) => (
  <label className="text-xs text-gray-600 mb-1 block uppercase tracking-wide">
    {children}
  </label>
);

const CheckboxGroup = ({ title, items, field, form, handleCheckbox }) => (
  <div>
    <Label>{title}</Label>
    <div className="space-y-2 mt-2">
      {items.map(([value, label]) => (
        <label
          key={value}
          className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-sm text-gray-800 cursor-pointer"
        >
          <input
            type="checkbox"
            className="accent-indigo-500"
            checked={form[field].includes(value)}
            onChange={() => handleCheckbox(field, value)}
          />
          {label}
        </label>
      ))}
    </div>
  </div>
);