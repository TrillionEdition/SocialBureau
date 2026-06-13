import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, Trash2, Edit3, Image as ImageIcon,
  CheckCircle, X, Eye, EyeOff, UploadCloud, ChevronRight, Smartphone, Monitor
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import { 
  getAllPostersAPI, 
  addPosterAPI, 
  updatePosterAPI, 
  deletePosterAPI 
} from "@/services/posterService";

const AdminPostersDashboard = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoster, setEditingPoster] = useState(null);
  
  const [cardPreviews, setCardPreviews] = useState({});

  // Form State (Only Title is required as metadata)
  const [title, setTitle] = useState("");
  
  // Desktop Image Upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Mobile Image Upload
  const [mobileImageFile, setMobileImageFile] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState("");
  const [mobileDragActive, setMobileDragActive] = useState(false);
  const mobileFileInputRef = useRef(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  // Load all posters
  const loadPosters = async () => {
    try {
      setLoading(true);
      const res = await getAllPostersAPI();
      if (res.success) {
        setPosters(res.data);
      }
    } catch (err) {
      toast.error(err.message || "Failed to load posters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosters();
  }, []);

  // Desktop Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error("Please drop an image file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Mobile Drag and Drop Handlers
  const handleMobileDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setMobileDragActive(true);
    } else if (e.type === "dragleave") {
      setMobileDragActive(false);
    }
  };

  const handleMobileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setMobileImageFile(file);
        setMobileImagePreview(URL.createObjectURL(file));
      } else {
        toast.error("Please drop an image file");
      }
    }
  };

  const handleMobileFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMobileImageFile(file);
      setMobileImagePreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingPoster(null);
    setTitle("");
    setImageFile(null);
    setImagePreview("");
    setMobileImageFile(null);
    setMobileImagePreview("");
    setIsModalOpen(true);
  };

  const openEditModal = (poster) => {
    setEditingPoster(poster);
    setTitle(poster.title);
    setImageFile(null);
    setImagePreview(poster.image);
    setMobileImageFile(null);
    setMobileImagePreview(poster.mobileImage || "");
    setIsModalOpen(true);
  };

  // Submit Add or Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.warning("Title is required");
      return;
    }

    if (!editingPoster && !imageFile) {
      toast.warning("Desktop poster image file is required");
      return;
    }

    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (mobileImageFile) {
      formData.append("mobileImage", mobileImageFile);
    }

    try {
      if (editingPoster) {
        const res = await updatePosterAPI(editingPoster._id, formData);
        if (res.success) {
          toast.success("Poster updated successfully!");
          setIsModalOpen(false);
          loadPosters();
        }
      } else {
        const res = await addPosterAPI(formData);
        if (res.success) {
          toast.success("New poster published successfully!");
          setIsModalOpen(false);
          loadPosters();
        }
      }
    } catch (err) {
      toast.error(err.message || "Failed to save poster");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Toggle Poster Active State
  const handleToggleActive = async (poster) => {
    try {
      const formData = new FormData();
      formData.append("isActive", !poster.isActive);

      const res = await updatePosterAPI(poster._id, formData);
      if (res.success) {
        toast.success(`Poster ${!poster.isActive ? "activated" : "deactivated"} successfully!`);
        setPosters(posters.map(p => p._id === poster._id ? { ...p, isActive: !p.isActive } : p));
      }
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  // Delete Poster
  const handleDeletePoster = async (id) => {
    if (!window.confirm("Are you sure you want to delete this poster? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await deletePosterAPI(id);
      if (res.success) {
        toast.success("Poster deleted successfully!");
        setPosters(posters.filter(p => p._id !== id));
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete poster");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans antialiased">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Apple-Style Heading Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-3 tracking-wider uppercase">
              <span>Admin Module</span>
              <ChevronRight className="w-3 h-3" />
              <span>Posters</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-black">
              Posters Control Room.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium mt-2 max-w-xl">
              Upload and manage your stunning desktop and mobile posters for special days and festivals.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="mt-6 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-[18px] transition-all transform active:scale-95 shadow-md shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>Publish Poster</span>
          </button>
        </header>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : posters.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-[32px] p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center max-w-2xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-full text-blue-600 mb-6">
              <ImageIcon className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">No Posters Found</h3>
            <p className="text-gray-500 font-medium max-w-sm mb-8">
              Get started by creating your first special days poster. Click the button below to upload one.
            </p>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-black text-white font-semibold py-4 px-6 rounded-[18px] transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Publish First Poster</span>
            </button>
          </div>
        ) : (
          /* Bento Grid of Posters */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posters.map((poster) => {
              const hasMobile = !!poster.mobileImage;
              const previewType = cardPreviews[poster._id] || "desktop";
              const activeImg = previewType === "mobile" && hasMobile ? poster.mobileImage : poster.image;

              return (
                <div
                  key={poster._id}
                  className={`bg-white border rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between ${
                    poster.isActive ? "border-gray-100" : "border-gray-300 opacity-75"
                  }`}
                >
                  {/* Poster Image Container */}
                  <div className="relative group overflow-hidden h-[240px] bg-gray-900 border-b border-gray-100 flex items-center justify-center">
                    <img
                      src={activeImg}
                      alt={poster.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Active overlay status - Hidden badge only */}
                    {!poster.isActive && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white border border-red-400 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1.5">
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </span>
                      </div>
                    )}

                    {/* Interactive Preview Switcher (Right) */}
                    {hasMobile && (
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md border border-gray-200/50 p-1 rounded-xl shadow-lg flex gap-1 z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCardPreviews(prev => ({ ...prev, [poster._id]: "desktop" }));
                          }}
                          className={`p-1.5 rounded-lg transition-all ${
                            previewType === "desktop"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-gray-500 hover:text-black hover:bg-gray-100"
                          }`}
                          title="Preview Desktop Layout"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCardPreviews(prev => ({ ...prev, [poster._id]: "mobile" }));
                          }}
                          className={`p-1.5 rounded-lg transition-all ${
                            previewType === "mobile"
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-gray-500 hover:text-black hover:bg-gray-100"
                          }`}
                          title="Preview Mobile Layout"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Poster Content details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold tracking-tight leading-snug text-black">
                        {poster.title}
                      </h3>
                    </div>

                    {/* Actions layer */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                      {/* Active toggle button */}
                      <button
                        onClick={() => handleToggleActive(poster)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          poster.isActive 
                            ? "bg-green-50 text-green-700 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title={poster.isActive ? "Deactivate Poster" : "Activate Poster"}
                      >
                        {poster.isActive ? (
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

                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditModal(poster)}
                          className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#e8e8ed] hover:text-black transition-colors"
                          title="Edit Details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeletePoster(poster._id)}
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Poster"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stunning Full Drawer / Modal form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
              onClick={() => !submitLoading && setIsModalOpen(false)}
            />

            {/* Modal Body */}
            <div className="relative bg-white rounded-[32px] max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 transform scale-100 transition-all duration-300 z-10">
              <header className="bg-[#f5f5f7] border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-black">
                    {editingPoster ? "Update Poster." : "Publish Poster."}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {editingPoster ? "Edit existing special poster images" : "Create and distribute a new responsive campaign card"}
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
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-[#f5f5f7] border border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none transition-all font-medium"
                    placeholder="e.g., Independence Day Greeting"
                  />
                </div>

                {/* Image Drag and Drop Upload Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Desktop Upload */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>{editingPoster ? "Replace Desktop Image (Optional)" : "Desktop Poster (Landscape)"}</span>
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                        dragActive 
                          ? "border-blue-500 bg-blue-50/50" 
                          : "border-gray-200 hover:border-blue-500 bg-[#f5f5f7] hover:bg-white"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {imagePreview ? (
                        <div className="relative group w-full h-[100px] rounded-xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-gray-50">
                          <img 
                            src={imagePreview} 
                            alt="Desktop Preview" 
                            className="max-h-full max-w-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <UploadCloud className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-7 h-7 text-gray-400 mb-2" />
                          <p className="text-xs font-semibold text-[#1d1d1f]">
                            Drop desktop image, or <span className="text-blue-600">browse</span>
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            Landscape (Max 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile Upload */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{editingPoster ? "Replace Mobile Image (Optional)" : "Mobile Poster (Portrait/Square)"}</span>
                    </label>
                    
                    <div
                      onDragEnter={handleMobileDrag}
                      onDragLeave={handleMobileDrag}
                      onDragOver={handleMobileDrag}
                      onDrop={handleMobileDrop}
                      onClick={() => mobileFileInputRef.current?.click()}
                      className={`w-full border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                        mobileDragActive 
                          ? "border-blue-500 bg-blue-50/50" 
                          : "border-gray-200 hover:border-blue-500 bg-[#f5f5f7] hover:bg-white"
                      }`}
                    >
                      <input
                        ref={mobileFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleMobileFileChange}
                        className="hidden"
                      />

                      {mobileImagePreview ? (
                        <div className="relative group w-full h-[100px] rounded-xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-gray-50">
                          <img 
                            src={mobileImagePreview} 
                            alt="Mobile Preview" 
                            className="max-h-full max-w-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <UploadCloud className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-7 h-7 text-gray-400 mb-2" />
                          <p className="text-xs font-semibold text-[#1d1d1f]">
                            Drop mobile image, or <span className="text-blue-600">browse</span>
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            Portrait / Square (Max 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Footer Buttons */}
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transform"
                  >
                    {submitLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4.5 w-4.5 border-t-2 border-b-2 border-white"></div>
                        <span>Uploading files...</span>
                      </>
                    ) : (
                      <span>{editingPoster ? "Save Changes" : "Publish Poster"}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostersDashboard;
