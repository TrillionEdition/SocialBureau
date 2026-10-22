import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/urls";
import "./digitalCard.css";
import { Globe, Phone } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";

const INTERESTS = [
  "API Marketing",
  "Digital Marketing",
  "YouTube Campaign Optimisation",
  "SEO / AEO / GEO",
  "Marketing Automation",
  "Business Partnership",
  "Other",
];

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  designation: "",
  interest: "",
  message: "",
  consent: false,
  website: "",
};

function getIdempotencyKey() {
  const storageKey = "sb-card-lead-idempotency";
  let key = sessionStorage.getItem(storageKey);
  if (!key) {
    key = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(storageKey, key);
  }
  return key;
}

export default function DigitalBusinessCard() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(sessionStorage.getItem("sb-card-lead-saved") === "true");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formOpen, setFormOpen] = useState(false);

  const update = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (saving || saved) return;
    setSaving(true);
    setError("");
    setFieldErrors({});
    try {
      const { data } = await axios.post(`${BASE_URL}/api/digital-card/leads`, form, {
        headers: { "Idempotency-Key": getIdempotencyKey() },
      });
      if (!data.success) throw new Error("The server could not confirm your submission.");
      sessionStorage.setItem("sb-card-lead-saved", "true");
      setSaved(true);
    } catch (submissionError) {
      const response = submissionError.response;
      if (response?.data?.errors) setFieldErrors(response.data.errors);
      setError(response?.data?.message || "We could not save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="sb-card-page">
      <section className="sb-card-shell" aria-label="Sham SK digital business card">
        <div className="sb-card-welcome">
          <img src="https://www.socialbureau.in/assets/socialbureau.png" alt="SocialBureau" className="sb-card-mark" />
          <p>Welcome to SocialBureau</p>
        </div>
        <div className="sb-card-profile"><div className="flex items-center justify-center">
  <img
    src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/DSC01171_hsyqoo.jpg"
    alt="SocialBureau"
    className="w-80 h-auto object-contain rounded-10"
  />
</div>
          <p className="sb-card-eyebrow pt-5">SocialBureau · Founder</p>
          <h1>Sham SK</h1>
          
<p className="sb-card-role">
  CEO &amp; Founder,{" "}
  <a
    href="https://trillionedition.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    TrillionEdition LLP
  </a>{" "}
  &amp; Sk-Way
</p>
<p className="sb-card-pitch">The World’s First API Marketing Company</p>
          <button className="sb-card-primary" onClick={() => { setFormOpen(true); document.getElementById("sb-connect")?.scrollIntoView({ behavior: "smooth" }); }}>
            Connect With Me
          </button>
          <div className="sb-card-actions">
            <a href="tel:+917907761121"><div className="flex items-center justify-center rounded-full bg-black p-3">
  <Phone className="h-5 w-5 text-white" />
</div></a>
            <a href="mailto:ceo@socialbureau.in"><div className="flex items-center justify-center rounded-full bg-black p-3">
  <FaEnvelope className="h-5 w-5 text-white" />
</div></a>
            <a href="https://socialbureau.in" target="_blank" rel="noreferrer"><div className="flex items-center justify-center rounded-full bg-black p-3">
  <Globe className="h-5 w-5 text-white" />
</div></a>
          </div>
        </div>
        <section id="sb-connect" className="sb-card-form-section">
          <h2>Let&apos;s Connect</h2>
          <p>Share your details to connect with Sham SK and SocialBureau.</p>
          {saved ? (
            <div className="sb-card-success" role="status">
              <strong>Thank you for connecting with SocialBureau.</strong>
              <span>Your details have been saved. Sham&apos;s team will follow up with you.</span>
            </div>
          ) : (
            <>
              {!formOpen && <button className="sb-card-secondary" onClick={() => setFormOpen(true)}>Open contact form</button>}
              {formOpen && <form onSubmit={submit}>
                <label htmlFor="sb-full-name">Full Name <span aria-hidden="true">*</span></label>
                <input id="sb-full-name" name="fullName" autoComplete="name" maxLength="120" required value={form.fullName} onChange={update} />
                {fieldErrors.fullName && <span className="sb-card-field-error">{fieldErrors.fullName}</span>}

                <label htmlFor="sb-phone">Mobile Number, including country code <span aria-hidden="true">*</span></label>
                <input id="sb-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" maxLength="24" required value={form.phone} onChange={update} />
                {fieldErrors.phone && <span className="sb-card-field-error">{fieldErrors.phone}</span>}

                <label htmlFor="sb-email">Work Email <span className="sb-card-optional">Optional</span></label>
                <input id="sb-email" name="email" type="email" autoComplete="email" maxLength="254" value={form.email} onChange={update} />
                {fieldErrors.email && <span className="sb-card-field-error">{fieldErrors.email}</span>}

                <label htmlFor="sb-company">Company / Organisation <span className="sb-card-optional">Optional</span></label>
                <input id="sb-company" name="company" autoComplete="organization" maxLength="160" value={form.company} onChange={update} />

                <label htmlFor="sb-designation">Designation <span className="sb-card-optional">Optional</span></label>
                <input id="sb-designation" name="designation" autoComplete="organization-title" maxLength="120" value={form.designation} onChange={update} />

                <label htmlFor="sb-interest">Business Interest <span className="sb-card-optional">Optional</span></label>
                <select id="sb-interest" name="interest" value={form.interest} onChange={update}>
                  <option value="">Select an interest</option>
                  {INTERESTS.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
                </select>
                {fieldErrors.interest && <span className="sb-card-field-error">{fieldErrors.interest}</span>}

                <label htmlFor="sb-message">Message <span className="sb-card-optional">Optional</span></label>
                <textarea id="sb-message" name="message" rows="3" maxLength="2000" value={form.message} onChange={update} />

                <div className="sb-card-honeypot" aria-hidden="true">
                  <label htmlFor="sb-website">Website</label>
                  <input id="sb-website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={update} />
                </div>
                <label className="sb-card-consent">
                  <input type="checkbox" name="consent" required checked={form.consent} onChange={update} />
                  <span>I agree that SocialBureau may use these details to respond to my enquiry and manage business follow-up. I have read the <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>. <span aria-hidden="true">*</span></span>
                </label>
                {fieldErrors.consent && <span className="sb-card-field-error">{fieldErrors.consent}</span>}
                <p className="sb-card-privacy">Your information is collected by SocialBureau only to respond to your enquiry and manage business follow-up. You will not be subscribed to marketing messages.</p>
                {error && <p className="sb-card-error" role="alert">{error}</p>}
                <button className="sb-card-primary" type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save My Contact Details"}
                </button>
              </form>}
            </>
          )}
        </section>
        <footer className="sb-card-footer">Marketing. Technology. Growth. · <a href="/privacy-policy">Privacy</a></footer>
      </section>
    </main>
  );
}
