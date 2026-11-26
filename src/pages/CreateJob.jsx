import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { jobService } from "@/services/jobService";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaBriefcase, FaImage } from "react-icons/fa";

function ArrayInput({ label, field, values, onChange, onAdd }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">
        {label}
      </p>
      {values.map((val, i) => (
        <input
          key={i}
          value={val}
          onChange={(e) => onChange(field, i, e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-black px-4 py-2 text-white focus:ring-1 focus:ring-red-600"
          placeholder={`${label} ${i + 1}`}
        />
      ))}
      <button
        type="button"
        onClick={() => onAdd(field)}
        className="text-xs text-red-500 hover:underline"
      >
        + Add another
      </button>
    </div>
  );
}

export default function AdminCreateJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const editJob = location.state?.editJob;
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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
    postDate: new Date().toISOString().split('T')[0],
    expireDate: "",
    isActive: true,
    isTrending: false,
    img: [""],
    roleSummary: [""],
    responsibilities: [""],
    qualifications: [""],
    experience: [""],
  });

  useEffect(() => {
    if (editJob) {
      setForm({
        ...editJob,
        img: editJob.img?.length ? editJob.img : [""],
        roleSummary: editJob.roleSummary?.length ? editJob.roleSummary : [""],
        responsibilities: editJob.responsibilities?.length ? editJob.responsibilities : [""],
        qualifications: editJob.qualifications?.length ? editJob.qualifications : [""],
        experience: editJob.experience?.length ? editJob.experience : [""],
      });
      if (editJob.img && editJob.img[0]) {
        setImagePreview(editJob.img[0]);
      }
    }
  }, [editJob]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addField = (field) =>
    setForm({ ...form, [field]: [...form[field], ""] });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setForm(prev => ({ ...prev, img: [""] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      
      // Append basic fields
      Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
          // Filter out empty strings from arrays
          const filtered = form[key].filter(val => val && val.trim() !== "");
          if (filtered.length > 0) {
            formData.append(key, JSON.stringify(filtered));
          }
        } else {
          formData.append(key, form[key]);
        }
      });

      // Append image if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (editJob?._id) {
        await jobService.updateJob(editJob._id, formData);
        setSuccess("✅ Job updated successfully");
      } else {
        await jobService.createJob(formData);
        setSuccess("✅ Job created successfully");
      }
      setSaved(true);
      setTimeout(() => navigate("/careers"), 2000);
    } catch (err) {
      console.error("❌ FULL ERROR OBJECT:", err);
      if (err.response) {
        console.error("❌ SERVER DATA:", err.response.data);
        console.error("❌ SERVER STATUS:", err.response.status);
      }
      
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Operation failed";
      setError(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a0000] text-white">
      <style>{`@keyframes job-check-draw { to { stroke-dashoffset: 0; } }`}</style>
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 mb-6">
            <FaBriefcase className="text-3xl text-red-600" />
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
            {editJob ? "Update Job" : "New Career"}
          </h1>
          <p className="mt-4 text-gray-400 text-lg font-light max-w-md mx-auto">
            {editJob ? `Modifying posting for ${editJob.title}` : "Expand the SocialBureau team with a new role"}
          </p>
        </div>

        {/* STATUS */}
        {(error || success) && (
          <div className={`mb-8 rounded-2xl border p-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
            error ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-green-500/30 bg-green-500/10 text-green-400"
          }`}>
            {error || success}
          </div>
        )}

        {/* FORM CARD */}
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* IMAGE UPLOAD SECTION */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaImage className="text-red-600" />
                Job Poster / Header
              </h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-3xl transition-all duration-500 overflow-hidden ${
                  imagePreview ? "border-red-600/50 aspect-video" : "border-white/10 hover:border-red-600/40 h-48"
                }`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold flex items-center gap-2">
                        <FaCloudUploadAlt /> Change Image
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaCloudUploadAlt className="text-3xl text-gray-500 group-hover:text-red-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">Click to upload poster</p>
                      <p className="text-gray-500 text-sm mt-1">SVG, PNG, JPG or WEBP (Max. 5MB)</p>
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  placeholder="e.g. Senior Creative Director"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  name="department"
                  value={form.department}
                  placeholder="e.g. Design"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  value={form.location}
                  placeholder="e.g. Kochi / Remote"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <input
                  name="employment"
                  value={form.employment}
                  placeholder="e.g. Full-Time"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Salary Range</label>
                <input
                  name="salary"
                  value={form.salary}
                  placeholder="e.g. 10L - 15L PA"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Post Date</label>
                <input
                  type="date"
                  name="postDate"
                  value={form.postDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Expire Date</label>
                <input
                  type="date"
                  name="expireDate"
                  value={form.expireDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors"
                  placeholder="Optional - leave blank for no expiration"
                />
              </div>
            </div>

            {/* VISIBILITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={!!form.isTrending}
                  onChange={handleChange}
                  className="h-5 w-5 accent-red-600"
                />
                <span>
                  <span className="block font-semibold text-white">Trending / Currently hiring</span>
                  <span className="block text-xs text-gray-400">Highlight this role on the Careers page</span>
                </span>
              </label>
              <label className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive === false}
                  onChange={(e) => setForm({ ...form, isActive: !e.target.checked })}
                  className="h-5 w-5 accent-red-600"
                />
                <span>
                  <span className="block font-semibold text-white">Hide this job post</span>
                  <span className="block text-xs text-gray-400">Hidden posts are not visible to the public</span>
                </span>
              </label>
            </div>

            {/* CONTENT */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="High-level overview of the role..."
                  onChange={handleChange}
                  className="h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">About the Role</label>
                <textarea
                  name="about"
                  value={form.about}
                  placeholder="Detailed mission and culture fit..."
                  onChange={handleChange}
                  className="h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white focus:border-red-600/50 outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* ARRAYS */}
            <div className="space-y-8 pt-6 border-t border-white/5">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Structured Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ArrayInput label="Responsibilities" field="responsibilities" values={form.responsibilities} onChange={handleArrayChange} onAdd={addField} />
                <ArrayInput label="Qualifications" field="qualifications" values={form.qualifications} onChange={handleArrayChange} onAdd={addField} />
                <ArrayInput label="Experience" field="experience" values={form.experience} onChange={handleArrayChange} onAdd={addField} />
                <ArrayInput label="Role Summary" field="roleSummary" values={form.roleSummary} onChange={handleArrayChange} onAdd={addField} />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading || saved}
                className={`w-full h-16 rounded-2xl text-white font-bold text-lg uppercase tracking-widest transition-all duration-500 shadow-xl active:scale-[0.98] disabled:cursor-not-allowed ${
                  saved ? "bg-green-600 shadow-green-600/30 scale-[1.02]" : "bg-red-600 hover:bg-red-700 shadow-red-600/20 disabled:opacity-50"
                }`}
              >
                {saved ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" className="opacity-40" />
                      <path
                        d="M7 12.5l3.5 3.5L17 9"
                        strokeDasharray="24"
                        strokeDashoffset="24"
                        style={{ animation: "job-check-draw .6s ease forwards" }}
                      />
                    </svg>
                    {editJob ? "Updated!" : "Published!"}
                  </span>
                ) : loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (editJob ? "Update Posting" : "Publish Job Opening")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



