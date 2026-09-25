import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "react-toastify";
import { Plus, Edit3, Trash2, Eye, EyeOff, X, Search } from "lucide-react";
import {
  getAdminResumeListingsAPI,
  createResumeListingAPI,
  updateResumeListingAPI,
  toggleResumeListingPublishAPI,
  deleteResumeListingAPI,
} from "@/services/resumeMarketplaceService";

const emptyForm = {
  candidateName: "",
  candidateEmail: "",
  candidatePhone: "",
  jobTitle: "",
  category: "",
  experienceMin: "",
  experienceMax: "",
  location: "",
  skills: "",
  skillsSummary: "",
  fullProfileSummary: "",
  isPublished: true,
};

const ResumeMarketplaceAdmin = () => {
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async (page = 1, searchTerm = search) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (searchTerm) params.search = searchTerm;
      const res = await getAdminResumeListingsAPI(params);
      setListings(res.data || []);
      setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      toast.error(err.message || "Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setModalOpen(true);
  };

  const openEdit = (listing) => {
    setEditingId(listing._id);
    setForm({
      candidateName: listing.candidateName || "",
      candidateEmail: listing.candidateEmail || "",
      candidatePhone: listing.candidatePhone || "",
      jobTitle: listing.jobTitle || "",
      category: listing.category || "",
      experienceMin: listing.experienceMin ?? "",
      experienceMax: listing.experienceMax ?? "",
      location: listing.location || "",
      skills: (listing.skills || []).join(", "),
      skillsSummary: listing.skillsSummary || "",
      fullProfileSummary: listing.fullProfileSummary || "",
      isPublished: listing.isPublished,
    });
    setFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("resumeFile", file);

      if (editingId) {
        await updateResumeListingAPI(editingId, fd);
        toast.success("Resume listing updated");
      } else {
        if (!file) throw { message: "Resume file (PDF/DOC/DOCX) is required" };
        await createResumeListingAPI(fd);
        toast.success("Resume listing created");
      }
      setModalOpen(false);
      load(pagination.page);
    } catch (err) {
      toast.error(err.message || "Failed to save resume listing");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await toggleResumeListingPublishAPI(id);
      load(pagination.page);
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume listing permanently?")) return;
    try {
      await deleteResumeListingAPI(id);
      toast.success("Resume listing deleted");
      load(pagination.page);
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Resume Management</h1>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            <Plus size={18} /> Upload Resume
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(1);
          }}
          className="flex gap-3 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm"
              placeholder="Search by title, category, skill, candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium">
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-gray-400 py-10 text-center">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-400 py-10 text-center">No resume listings yet.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Job Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Downloads</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l._id} className="border-t border-gray-100">
                    <td className="p-4 font-medium">{l.candidateName}</td>
                    <td className="p-4">{l.jobTitle}</td>
                    <td className="p-4">{l.category}</td>
                    <td className="p-4">{l.experienceMin}-{l.experienceMax} yrs</td>
                    <td className="p-4">{l.location}</td>
                    <td className="p-4">{l.downloadCount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          l.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {l.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(l)} title="Edit" className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleTogglePublish(l._id)}
                          title={l.isPublished ? "Unpublish" : "Publish"}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          {l.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(l._id)}
                          title="Delete"
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => load(p)}
                className={`w-9 h-9 rounded-lg text-sm ${
                  p === pagination.page ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-black rounded-2xl max-w-2xl w-full p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Resume Listing" : "Upload New Resume"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form
  onSubmit={handleSubmit}
  className="grid grid-cols-2 gap-4 [&_input::placeholder]:text-white [&_textarea::placeholder]:text-gray-600 bg-black"
> <input
  required
  className="col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white"
  placeholder="Candidate Name *"
  value={form.candidateName}
  onChange={(e) =>
    setForm((f) => ({ ...f, candidateName: e.target.value }))
  }
/>
              <input
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Candidate Email"
                value={form.candidateEmail}
                onChange={(e) => setForm((f) => ({ ...f, candidateEmail: e.target.value }))}
              />
              <input
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Candidate Phone"
                value={form.candidatePhone}
                onChange={(e) => setForm((f) => ({ ...f, candidatePhone: e.target.value }))}
              />
              <input
                required
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Job Title *"
                value={form.jobTitle}
                onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
              />
              <input
                required
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Category *"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
              <input
                type="number"
                min="0"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Min Experience (yrs)"
                value={form.experienceMin}
                onChange={(e) => setForm((f) => ({ ...f, experienceMin: e.target.value }))}
              />
              <input
                type="number"
                min="0"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Max Experience (yrs)"
                value={form.experienceMax}
                onChange={(e) => setForm((f) => ({ ...f, experienceMax: e.target.value }))}
              />
              <input
                required
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Location *"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
              <input
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Skills (comma separated)"
                value={form.skills}
                onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              />
              <input
                className="col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-white"
                placeholder="Skills Summary (shown before payment)"
                value={form.skillsSummary}
                onChange={(e) => setForm((f) => ({ ...f, skillsSummary: e.target.value }))}
              />
              <textarea
                className="col-span-2 border text-white border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                placeholder="Full Profile Summary (shown after payment)"
                rows={3}
                value={form.fullProfileSummary}
                onChange={(e) => setForm((f) => ({ ...f, fullProfileSummary: e.target.value }))}
              />

              <div className="col-span-2">
                <label className="block text-sm text-gray-500 mb-1">
                  Resume File (PDF/DOC/DOCX) {editingId ? "— leave empty to keep existing" : "*"}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-white"
                />
              </div>

              <label className="col-span-2 flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                />
                Published (visible to companies)
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="col-span-2 bg-black text-white rounded-xl py-3 font-medium disabled:opacity-50 border border-gray-200"
              >
                {submitting ? "Saving..." : editingId ? "Save Changes" : "Create Listing"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMarketplaceAdmin;
