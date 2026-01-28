import { useState } from "react";
import Footer from "../components/Footer";
import { jobService } from "../../services/jobService";

export default function AdminCreateJob() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    icon: "",
    department: "",
    company: "SocialBureau | TrillionEdition LLP",
    location: "",
    employment: "",
    description: "",
    about: "",
    salary: "",
    nextSteps: "",
    link: "",
    img: [""],
    roleSummary: [""],
    responsibilities: [""],
    qualifications: [""],
    experience: [""],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addField = (field) =>
    setForm({ ...form, [field]: [...form[field], ""] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await jobService.createJob(form);
      setSuccess("✅ Job created successfully");
    } catch {
      setError("❌ Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const ArrayInput = ({ label, field }) => (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">
        {label}
      </p>
      {form[field].map((val, i) => (
        <input
          key={i}
          value={val}
          onChange={(e) => handleArrayChange(field, i, e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-black px-4 py-2 text-white focus:ring-1 focus:ring-red-600"
          placeholder={`${label} ${i + 1}`}
        />
      ))}
      <button
        type="button"
        onClick={() => addField(field)}
        className="text-xs text-red-500 hover:underline"
      >
        + Add another
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#3f0000] text-white">


      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-red-500">
            Create Job Opening
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            Add a new career opportunity to the SocialBureau portal
          </p>
        </div>

        {/* STATUS */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-green-400">
            {success}
          </div>
        )}

        {/* FORM CARD */}
        <div className="rounded-2xl border border-gray-800 bg-black/60 p-8 shadow-xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC INFO */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-500">
                Job Information
              </h3>

              <input
                name="title"
                placeholder="Job Title"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
                required
              />

              <input
                name="icon"
                placeholder="FontAwesome Icon (fas fa-code)"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <input
                name="department"
                placeholder="Department"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <input
                name="employment"
                placeholder="Employment Type"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <input
                name="salary"
                placeholder="Salary"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <input
                name="link"
                placeholder="Apply Link (Google Form)"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-500">
                Job Content
              </h3>

              <textarea
                name="description"
                placeholder="Short Description"
                onChange={handleChange}
                className="h-24 w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <textarea
                name="about"
                placeholder="About the Role"
                onChange={handleChange}
                className="h-28 w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />

              <textarea
                name="nextSteps"
                placeholder="Next Steps"
                onChange={handleChange}
                className="h-24 w-full rounded-xl border border-gray-700 bg-black px-4 py-3"
              />
            </div>

            {/* ARRAYS */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-red-500">
                Structured Details
              </h3>

              <ArrayInput label="Image URLs" field="img" />
              <ArrayInput label="Role Summary" field="roleSummary" />
              <ArrayInput label="Responsibilities" field="responsibilities" />
              <ArrayInput label="Qualifications" field="qualifications" />
              <ArrayInput label="Experience" field="experience" />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Saving…" : "Create Job"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

