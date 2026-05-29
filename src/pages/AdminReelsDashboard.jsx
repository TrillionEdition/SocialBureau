import React, { useState, useEffect } from "react";
import {
  Plus, Trash2, Edit3, Film,
  ChevronRight, Eye, EyeOff, X, ExternalLink,
  ArrowUp, ArrowDown, CheckCircle, Instagram
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import {
  getAllReelsAPI,
  addReelAPI,
  updateReelAPI,
  deleteReelAPI,
} from "@/services/reelService";

const AdminReelsDashboard = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form state
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [order, setOrder] = useState(0);

  const loadReels = async () => {
    try {
      setLoading(true);
      const res = await getAllReelsAPI();
      if (res.success) setReels(res.data);
    } catch (err) {
      toast.error(err.message || "Failed to load reels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReels();
  }, []);

  const openAddModal = () => {
    setEditingReel(null);
    setUrl("");
    setCaption("");
    setOrder(reels.length);
    setIsModalOpen(true);
  };

  const openEditModal = (reel) => {
    setEditingReel(reel);
    setUrl(reel.url);
    setCaption(reel.caption || "");
    setOrder(reel.order || 0);
    setIsModalOpen(true);
  };

  // Extract the short code / reel ID from URL for display
  const getReelId = (reelUrl) => {
    try {
      const parts = reelUrl.replace(/\/$/, "").split("/");
      return parts[parts.length - 1];
    } catch {
      return reelUrl;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.warning("Instagram Reel URL is required");
      return;
    }
    // Basic URL validation
    if (!url.includes("instagram.com")) {
      toast.warning("Please enter a valid Instagram URL");
      return;
    }

    setSubmitLoading(true);
    try {
      const payload = { url: url.trim(), caption: caption.trim(), order: Number(order) };
      if (editingReel) {
        const res = await updateReelAPI(editingReel._id, payload);
        if (res.success) {
          toast.success("Reel updated successfully!");
          setIsModalOpen(false);
          loadReels();
        }
      } else {
        const res = await addReelAPI(payload);
        if (res.success) {
          toast.success("Reel added successfully!");
          setIsModalOpen(false);
          loadReels();
        }
      }
    } catch (err) {
      toast.error(err.message || "Failed to save reel");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleActive = async (reel) => {
    try {
      const res = await updateReelAPI(reel._id, { isActive: !reel.isActive });
      if (res.success) {
        toast.success(`Reel ${!reel.isActive ? "activated" : "deactivated"} successfully!`);
        setReels(reels.map((r) => (r._id === reel._id ? { ...r, isActive: !reel.isActive } : r)));
      }
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDeleteReel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reel?")) return;
    try {
      const res = await deleteReelAPI(id);
      if (res.success) {
        toast.success("Reel deleted successfully!");
        setReels(reels.filter((r) => r._id !== id));
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete reel");
    }
  };

  const handleMoveOrder = async (reel, direction) => {
    const newOrder = direction === "up" ? reel.order - 1 : reel.order + 1;
    try {
      await updateReelAPI(reel._id, { order: newOrder });
      loadReels();
    } catch (err) {
      toast.error("Failed to reorder");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans antialiased">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-pink-600 mb-3 tracking-wider uppercase">
              <span>Admin Module</span>
              <ChevronRight className="w-3 h-3" />
              <span>Reels</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-black">
              Reels Control Room.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium mt-2 max-w-xl">
              Manage the Instagram Reels displayed on the homepage below the Founder section.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-6 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-[18px] transition-all transform active:scale-95 shadow-md shadow-pink-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>Add Reel</span>
          </button>
        </header>

        {/* How it works info */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-[24px] p-6 mb-10 flex gap-4 items-start">
          <Instagram className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#1d1d1f] text-sm">How to add a reel</p>
            <p className="text-gray-500 text-sm mt-1">
              Open any Instagram Reel in your browser and copy the URL from the address bar (e.g.{" "}
              <code className="bg-white px-1.5 py-0.5 rounded text-pink-700 font-mono text-xs">
                https://www.instagram.com/reel/DXV3lbVCb77/
              </code>
              ). Paste it below. The reel will automatically appear embedded on the homepage.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600" />
          </div>
        ) : reels.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-[32px] p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center max-w-2xl mx-auto">
            <div className="bg-pink-50 p-6 rounded-full text-pink-600 mb-6">
              <Film className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">No Reels Added Yet</h3>
            <p className="text-gray-500 font-medium max-w-sm mb-8">
              Add your first Instagram Reel URL to display it on the homepage below the Founder section.
            </p>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-black text-white font-semibold py-4 px-6 rounded-[18px] transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Reel</span>
            </button>
          </div>
        ) : (
          /* Reels Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reels.map((reel) => (
              <div
                key={reel._id}
                className={`bg-white border rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col ${
                  reel.isActive ? "border-gray-100" : "border-gray-300 opacity-70"
                }`}
              >
                {/* Reel Embed Preview */}
                <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-b border-gray-100 flex flex-col items-center justify-center p-6 min-h-[200px] gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Reel ID</p>
                    <code className="text-sm font-mono font-bold text-[#1d1d1f] bg-white px-3 py-1.5 rounded-lg border border-gray-100 block max-w-[180px] truncate">
                      {getReelId(reel.url)}
                    </code>
                  </div>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View on Instagram
                  </a>

                  {/* Hidden badge */}
                  {!reel.isActive && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1.5">
                        <EyeOff className="w-3 h-3" />
                        Hidden
                      </span>
                    </div>
                  )}

                  {/* Order badge */}
                  <div className="absolute top-4 right-4 bg-white border border-gray-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-500">
                    #{reel.order + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 font-medium truncate" title={reel.url}>
                      {reel.url}
                    </p>
                    {reel.caption && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{reel.caption}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    {/* Active toggle */}
                    <button
                      onClick={() => handleToggleActive(reel)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        reel.isActive
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {reel.isActive ? (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Move up */}
                      <button
                        onClick={() => handleMoveOrder(reel, "up")}
                        disabled={reel.order === 0}
                        className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      {/* Move down */}
                      <button
                        onClick={() => handleMoveOrder(reel, "down")}
                        className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(reel)}
                        className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#e8e8ed] hover:text-black transition-colors"
                        title="Edit Reel"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteReel(reel._id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Reel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            onClick={() => !submitLoading && setIsModalOpen(false)}
          />

          {/* Modal Body */}
          <div className="relative bg-white rounded-[32px] max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 z-10">
            <header className="bg-[#f5f5f7] border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-black">
                  {editingReel ? "Edit Reel." : "Add Reel."}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {editingReel ? "Update the Instagram Reel details" : "Paste an Instagram Reel URL to embed it on the homepage"}
                </p>
              </div>
              <button
                disabled={submitLoading}
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* URL Field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Instagram Reel URL *
                </label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-all font-medium shadow-sm"
                    placeholder="https://www.instagram.com/reel/ABC123/"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Copy the URL directly from Instagram in your browser's address bar.
                </p>
              </div>

              {/* Order Field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-all font-medium shadow-sm"
                  placeholder="0"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">Lower number = appears first on the homepage.</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  disabled={submitLoading}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-[#e8e8ed] hover:bg-gray-200 text-black font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transform"
                >
                  {submitLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>{editingReel ? "Save Changes" : "Add Reel"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReelsDashboard;
