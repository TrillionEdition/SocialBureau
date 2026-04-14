import { useState } from "react";
import clientService from "../../services/clientService";
import { createClickUpTask } from "../../services/clickupServices";
import Confetti from "react-confetti";

export default function ClientForm() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialInput, setSocialInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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
    <div className="min-h-screen bg-[#f5f6f8] py-10 text-gray-900">
      <div className="max-w-3xl mx-auto px-6">

        {/* PROGRESS */}
        <div className="w-full h-1 bg-gray-200 rounded mb-8">
          <div className="h-1 w-2/3 bg-indigo-500"></div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Tell Us About Your Business
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Help us understand your marketing goals and current digital presence.
          </p>
        </div>

        {/* MESSAGE BANNER */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
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