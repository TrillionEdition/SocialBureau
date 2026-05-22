import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  Sparkles,
  Image as ImageIcon,
  Check,
  X,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Users,
  Layout,
  CreditCard,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

const InfluencerDataForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "influencer";
  const targetId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    param: "",
    email: "",
    subtitle: "",
    image: "",
    templateId: templateId,
    details: {
      bio: "",
      heroDescription: "",
      aboutImage: "",
      experienceBadge: "5+",
      experienceLabel: "Years Experience",
      narrativeHeading: "Crafting Digital Narratives",
      socialLinks: [
        { platform: "Instagram", url: "", followers: "" },
        { platform: "YouTube", url: "", followers: "" },
      ],
      services: [
        { title: "Brand Collaboration", description: "" },
        { title: "Content Creation", description: "" },
      ],
      projects: [{ title: "", description: "", image: "" }],
      blogPosts: [
        { title: "", description: "", image: "", date: "", category: "" },
      ],
      testimonials: [{ quote: "", author: "" }],
      ctaTitle: "Ready to Scale Your Brand?",
      ctaSubtitle: "Let's create viral content together.",
      stats: {
        followers: "100K+",
        engagement: "5.2%",
      },
      styles: {
        archiveColumns: "3",
        archiveAspect: "3/4",
        archiveHover: "zoom",
        archiveStyle: "clean",
        archiveRadius: "40",
        archiveOverlay: "0.9",
      },
    },
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/partners/register");
      return;
    }

    const user = JSON.parse(userStr || "{}");
    const isAdmin = user.role === "admin";

    // If Admin, bypass payment check entirely
    if (isAdmin) {
      setPaymentVerified(true);
      setShowPayment(false);
    }
    // If creating new and not admin, check if user has already paid in the past
    else if (!targetId) {
      const fetchUserStatus = async () => {
        try {
          const response = await fetch(`${BASE_URL}/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const userData = await response.json();
          if (userData && userData.hasPaidInfluencer) {
            setPaymentVerified(true);
            setShowPayment(false);
          } else {
            setShowPayment(true);
          }
        } catch (err) {
          console.error("Error fetching user status:", err);
          setShowPayment(true);
        }
      };
      fetchUserStatus();
    }

    if (targetId) {
      const fetchExistingData = async () => {
        setFetchingData(true);
        try {
          const user = JSON.parse(userStr || "{}");
          const isAdmin = user.role === "admin";
          const endpoint = isAdmin
            ? `${BASE_URL}/partners/admin/${targetId}`
            : `${BASE_URL}/partners/my-partnership`;

          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          if (data.success && data.data) {
            setFormData((prev) => ({
              ...prev,
              ...data.data,
              details: { ...prev.details, ...(data.data.details || {}) },
            }));
            // If data exists, they've already "paid" or are editing
            setPaymentVerified(true);
            setShowPayment(false);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          toast.error("Failed to load portfolio data");
        } finally {
          setFetchingData(false);
        }
      };
      fetchExistingData();
    } else {
      const user = JSON.parse(userStr || "{}");
      setFormData((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [navigate, targetId]);

  const [fetchingData, setFetchingData] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null);
  const [paramError, setParamError] = useState("");

  const checkSlugAvailability = async (slug) => {
    if (window.slugCheckTimeout) clearTimeout(window.slugCheckTimeout);

    window.slugCheckTimeout = setTimeout(async () => {
      setCheckingSlug(true);
      try {
        const response = await fetch(`${BASE_URL}/partners/p/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setSlugAvailable(false);
          setParamError("This URL is already taken. Please try another one.");
        } else {
          setSlugAvailable(true);
          setParamError("");
        }
      } catch (err) {
        console.error("Error checking slug:", err);
      } finally {
        setCheckingSlug(false);
      }
    }, 600);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "param") {
      const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (sanitized.length > 2) {
        checkSlugAvailability(sanitized);
      } else {
        setSlugAvailable(null);
        setParamError(sanitized.length > 0 ? "URL is too short" : "");
      }
    }
  };

  const handleDetailsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const handleArrayChange = (arrayField, index, field, value) => {
    const newArray = [...formData.details[arrayField]];
    newArray[index] = { ...newArray[index], [field]: value };
    handleDetailsChange(arrayField, newArray);
  };

  const addArrayItem = (arrayField, emptyItem) => {
    handleDetailsChange(arrayField, [
      ...formData.details[arrayField],
      emptyItem,
    ]);
  };

  const removeArrayItem = (arrayField, index) => {
    const newArray = formData.details[arrayField].filter((_, i) => i !== index);
    handleDetailsChange(arrayField, newArray);
  };

  const handleFileUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
      const res = await response.json();
      if (res.success) {
        if (type === "hero") {
          handleInputChange("image", res.url);
        } else if (type === "about") {
          handleDetailsChange("aboutImage", res.url);
        } else if (type === "project") {
          handleArrayChange("projects", index, "image", res.url);
        } else if (type === "blog") {
          handleArrayChange("blogPosts", index, "image", res.url);
        }
        toast.success("Image uploaded!");
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.param) {
      toast.error("Name and URL are required");
      return;
    }

    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr || "{}");
    const isAdmin = user.role === "admin";
    const isEdit = !!targetId;

    // Fix: Only use the specific ID route if user is admin.
    // Regular users always use /my-partnership for both create and update.
    const endpoint =
      isAdmin && isEdit
        ? `${BASE_URL}/partners/${targetId}`
        : `${BASE_URL}/partners/my-partnership`;
    const method = isAdmin && isEdit ? "PUT" : "POST";

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          category: "influencer",
          hasPaid: paymentVerified
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(
          isEdit
            ? "Portfolio updated successfully!"
            : "Portfolio created successfully!",
        );
        navigate(`/partnership/${formData.param}`);
      } else {
        toast.error(data.message || "Failed to save portfolio");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const response = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: 99, // Live Price ₹299 to test card limits
          currency: "INR",
        }),
      });

      const data = await response.json();
      if (!data.success) {
        // This will now show the actual error from the backend (e.g., "Invalid API Keys")
        throw new Error(data.message || "Failed to create payment order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SocialBureau",
        description: "Influencer Portfolio Activation",
        image: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1715012345/logo_social_bureau.png", // Use a public HTTPS URL
        order_id: data.order.id,
        handler: async (response) => {
          // 3. Verify payment on backend
          setLoading(true);
          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentVerified(true);
              setShowPayment(false);
              toast.success("Identity Activated Successfully!");
            } else {
              toast.error(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Failed to verify payment");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#EAB308",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error(err.message || "Could not start payment process");
      setLoading(false);
    }
  };

  if (showPayment && !paymentVerified) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-8 relative overflow-x-hidden overflow-y-auto font-sans">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full z-10 my-auto"
        >
          <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 sm:space-y-10 relative overflow-hidden">
            {/* Decorative Background Text - Hidden on very small screens */}
            <div className="absolute top-10 right-[-50px] text-[80px] sm:text-[120px] font-black text-white/[0.02] pointer-events-none select-none italic rotate-12 hidden xs:block">
              PAID
            </div>

            <div className="space-y-4 text-center">

              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
                Secure Your <br />
                <span className="text-yellow-500">Digital Identity.</span>
              </h2>
              <p className="text-zinc-500 text-[12px] sm:text-sm font-medium italic">
                Unlock the award-winning architecture for your lifetime
                portfolio.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Layout,
                  t: "Award-Winning Templates",
                  d: "Access the 'Influencer Cover' editorial architecture.",
                },
                {
                  icon: Globe,
                  t: "Custom Permanent URL",
                  d: "Claim your unique identity on socialbureau.com.",
                },
                {
                  icon: ShieldCheck,
                  t: "Lifetime Maintenance",
                  d: "No monthly fees. One-time investment for forever access.",
                },
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-yellow-500 shrink-0">
                    <feat.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-[12px] sm:text-sm font-black uppercase tracking-widest italic">
                      {feat.t}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium leading-relaxed">
                      {feat.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/5 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-2 sm:px-4 text-center sm:text-left">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600 block">
                    Professional Plan
                  </span>
                  <span className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase">
                    Lifetime Access
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600 block line-through">
                    ₹1000.00
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-yellow-500 tracking-tighter italic leading-none">
                    ₹99.00
                  </span>
                </div>
              </div>

              <button
                onClick={initiatePayment}
                disabled={loading}
                className="w-full py-5 sm:py-6 bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-full hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-xl shadow-yellow-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <LoadingSpinner size="xs" />
                ) : (
                  <>
                    Secure Activation <ArrowRight size={18} />
                  </>
                )}
              </button>


            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              ← Cancel & Return
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-yellow-500 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 sm:gap-0 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 sm:p-3 bg-zinc-900 rounded-xl sm:rounded-2xl hover:bg-zinc-800 transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter">
                Creator Studio
              </h1>
              <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                Influencer Digital Architecture
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-xl sm:rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-yellow-500/20 disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="xs" />
            ) : (
              <>
                <Save size={16} /> Deploy Portfolio
              </>
            )}
          </button>
        </header>

        <form className="space-y-24 pb-24">
          {/* Identity Section */}
          <section className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                    01. Identity
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none">
                  Who Are You?
                </h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. Lara Elizabeth"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-bold italic text-lg transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Portfolio URL Identifier
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 font-bold italic pointer-events-none select-none z-10 text-xs sm:text-base hidden xs:block">
                      socialbureau.com/p/
                    </span>
                    <input
                      type="text"
                      value={formData.param}
                      onChange={(e) =>
                        handleInputChange(
                          "param",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, ""),
                        )
                      }
                      placeholder="lara-official"
                      className={`w-full bg-zinc-900 border ${paramError ? "border-red-500/50" : slugAvailable ? "border-green-500/50" : "border-zinc-800"} rounded-2xl px-6 sm:pl-[170px] pr-12 py-5 text-white focus:border-yellow-500 outline-none font-bold italic transition-all`}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center z-10">
                      {checkingSlug && (
                        <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                      )}
                      {!checkingSlug && slugAvailable && (
                        <Check size={16} className="text-green-500" />
                      )}
                      {!checkingSlug && slugAvailable === false && (
                        <X size={16} className="text-red-500" />
                      )}
                    </div>
                  </div>
                  {paramError && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1 mt-1">
                      {paramError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Headline / Primary Role
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                    placeholder="Web Designer & Developer"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                      CTA Headline (Bottom Section)
                    </label>
                    <input
                      type="text"
                      value={formData.details.ctaTitle}
                      onChange={(e) =>
                        handleDetailsChange("ctaTitle", e.target.value)
                      }
                      placeholder="Ready to Scale Your Brand?"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                      CTA Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.details.ctaSubtitle}
                      onChange={(e) =>
                        handleDetailsChange("ctaSubtitle", e.target.value)
                      }
                      placeholder="Let's create viral content together."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] bg-zinc-900 rounded-[40px] overflow-hidden border-4 border-zinc-800 relative shadow-2xl transition-all group-hover:border-yellow-500/50">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-700">
                    <ImageIcon size={64} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Identity Visual
                    </span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2">
                  <Upload size={32} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">
                    Change Portrait
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "hero")}
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 rounded-3xl flex items-center justify-center text-black shadow-2xl z-20 group-hover:scale-110 transition-transform">
                <Sparkles size={40} />
              </div>
            </div>
          </section>

          {/* Narrative Section */}
          <section className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative group order-2 lg:order-1">
              <div className="aspect-square bg-zinc-900 rounded-[40px] overflow-hidden border-4 border-zinc-800 relative shadow-2xl transition-all group-hover:border-yellow-500/50">
                {formData.details.aboutImage ? (
                  <img
                    src={formData.details.aboutImage}
                    alt="Narrative Visual"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-700">
                    <ImageIcon size={64} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center px-6">
                      Narrative Visual (About Section)
                    </span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2">
                  <Upload size={32} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">
                    Upload Narrative Portrait
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "about")}
                    accept="image/*"
                  />
                </label>
              </div>

              {/* Experience Badge Control Overlay */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow-500 rounded-[40px] p-6 flex flex-col justify-center items-center text-black shadow-2xl z-20 group-hover:scale-105 transition-transform border-8 border-[#0A0A0A]">
                <input
                  type="text"
                  value={formData.details.experienceBadge}
                  onChange={(e) => handleDetailsChange("experienceBadge", e.target.value)}
                  className="bg-transparent border-none text-4xl font-black italic text-center w-full outline-none placeholder:text-black/20"
                  placeholder="5+"
                />
                <input
                  type="text"
                  value={formData.details.experienceLabel}
                  onChange={(e) => handleDetailsChange("experienceLabel", e.target.value)}
                  className="bg-transparent border-none text-[8px] font-black uppercase tracking-widest text-center w-full outline-none mt-1 placeholder:text-black/20"
                  placeholder="YEARS EXPERIENCE"
                />
              </div>
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                    02. Narrative
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none">
                  Craft Your Story
                </h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Narrative Heading
                  </label>
                  <input
                    type="text"
                    value={formData.details.narrativeHeading}
                    onChange={(e) => handleDetailsChange("narrativeHeading", e.target.value)}
                    placeholder="e.g. Crafting Digital Narratives"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-bold italic text-lg transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Biography (The About Text)
                  </label>
                  <textarea
                    value={formData.details.bio}
                    onChange={(e) => handleDetailsChange("bio", e.target.value)}
                    rows={6}
                    placeholder="Tell your audience about your journey, mission, and what makes your digital presence unique..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Social Presence Section */}
          <section className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-yellow-500" />
              <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                03. Digital Footprint
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {formData.details.socialLinks.map((link, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] space-y-4 sm:space-y-6 relative group transition-all hover:border-yellow-500/30"
                >
                  <button
                    onClick={() => removeArrayItem("socialLinks", i)}
                    className="absolute top-4 right-4 text-zinc-700 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    {link.platform === "Instagram" ? (
                      <Instagram size={24} />
                    ) : link.platform === "YouTube" ? (
                      <Youtube size={24} />
                    ) : link.platform === "Twitter" ? (
                      <Twitter size={24} />
                    ) : (
                      <Globe size={24} />
                    )}
                  </div>
                  <div className="space-y-4">
                    <select
                      value={link.platform}
                      onChange={(e) =>
                        handleArrayChange(
                          "socialLinks",
                          i,
                          "platform",
                          e.target.value,
                        )
                      }
                      className="w-full bg-transparent border-b border-zinc-800 pb-2 text-xs font-black uppercase tracking-widest focus:border-yellow-500 outline-none"
                    >
                      <option className="bg-zinc-900">Instagram</option>
                      <option className="bg-zinc-900">YouTube</option>
                      <option className="bg-zinc-900">Twitter</option>
                      <option className="bg-zinc-900">LinkedIn</option>
                      <option className="bg-zinc-900">TikTok</option>
                    </select>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        handleArrayChange(
                          "socialLinks",
                          i,
                          "url",
                          e.target.value,
                        )
                      }
                      placeholder="Profile URL"
                      className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-zinc-700"
                    />
                    <input
                      type="text"
                      value={link.followers}
                      onChange={(e) =>
                        handleArrayChange(
                          "socialLinks",
                          i,
                          "followers",
                          e.target.value,
                        )
                      }
                      placeholder="Followers (e.g. 100K)"
                      className="w-full bg-transparent text-xl font-black italic outline-none text-yellow-500"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("socialLinks", {
                    platform: "Instagram",
                    url: "",
                    followers: "",
                  })
                }
                className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:border-yellow-500/50 hover:bg-zinc-900 transition-all group p-8"
              >
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-yellow-500 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-zinc-400">
                  Add Platform
                </span>
              </button>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                    04. Visual Narrative
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none">
                  The Gallery
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("projects", {
                    title: "",
                    description: "",
                    image: "",
                  })
                }
                className="w-full sm:w-auto px-6 py-3 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Artifact
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {formData.details.projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 relative transition-all hover:border-yellow-500/20 group"
                >
                  <button
                    onClick={() => removeArrayItem("projects", i)}
                    className="absolute top-6 right-6 text-zinc-700 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="w-full md:w-1/3 aspect-square bg-black rounded-3xl overflow-hidden relative border border-zinc-800 group-hover:border-yellow-500/30">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={20} />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "project", i)}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="flex-1 space-y-4 pt-4">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          i,
                          "title",
                          e.target.value,
                        )
                      }
                      placeholder="Artifact Title"
                      className="w-full bg-transparent text-xl font-black italic uppercase tracking-tight outline-none focus:text-yellow-500 transition-colors"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          i,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Brief narrative of this project..."
                      className="w-full bg-transparent text-xs text-zinc-500 h-24 outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Section */}
          <section className="space-y-12 bg-zinc-950 p-6 sm:p-12 rounded-[32px] sm:rounded-[50px] border border-zinc-900">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                    04. Insights
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none text-zinc-200">
                  The Feed
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("blogPosts", {
                    title: "",
                    description: "",
                    image: "",
                    date: "",
                    category: "",
                  })
                }
                className="w-full sm:w-auto px-6 py-3 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-2 border border-zinc-800"
              >
                <Plus size={14} /> New Post
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {formData.details.blogPosts.map((post, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 hover:border-yellow-500/20 transition-all group"
                >
                  <div className="aspect-video bg-black relative">
                    {post.image ? (
                      <img
                        src={post.image}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={20} />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "blog", i)}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) =>
                          handleArrayChange(
                            "blogPosts",
                            i,
                            "category",
                            e.target.value,
                          )
                        }
                        placeholder="Category"
                        className="bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-yellow-500 outline-none w-1/2"
                      />
                      <input
                        type="text"
                        value={post.date}
                        onChange={(e) =>
                          handleArrayChange(
                            "blogPosts",
                            i,
                            "date",
                            e.target.value,
                          )
                        }
                        placeholder="Date"
                        className="bg-transparent text-[8px] font-black uppercase tracking-widest text-zinc-600 outline-none text-right w-1/2"
                      />
                    </div>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        handleArrayChange(
                          "blogPosts",
                          i,
                          "title",
                          e.target.value,
                        )
                      }
                      placeholder="Post Headline"
                      className="w-full bg-transparent text-lg font-black italic tracking-tighter outline-none focus:text-white transition-colors"
                    />
                    <textarea
                      value={post.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "blogPosts",
                          i,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Post excerpt..."
                      className="w-full bg-transparent text-[10px] text-zinc-500 h-20 outline-none resize-none leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("blogPosts", i)}
                      className="text-[8px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials & Services */}
          <section className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-yellow-500" />
                    <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                      05. Authority
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">Services</h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("services", {
                      title: "New Service",
                      description: "",
                    })
                  }
                  className="px-4 py-2 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  <Plus size={12} /> Add Service
                </button>
              </div>
              <div className="space-y-8">
                {formData.details.services.map((service, i) => (
                  <div
                    key={i}
                    className="flex gap-6 items-start relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeArrayItem("services", i)}
                      className="absolute -top-2 -right-2 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-yellow-500 shrink-0 italic font-black group-hover:bg-yellow-500 group-hover:text-black transition-all">
                      S{i + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) =>
                          handleArrayChange(
                            "services",
                            i,
                            "title",
                            e.target.value,
                          )
                        }
                        className="bg-transparent text-xl font-black italic uppercase tracking-tight outline-none focus:text-yellow-500 w-full"
                      />
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "services",
                            i,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Brief description of this service"
                        className="bg-transparent text-xs text-zinc-500 outline-none w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-yellow-500" />
                    <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">
                      06. Proof
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">Feedback</h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("testimonials", { quote: "", author: "" })
                  }
                  className="px-4 py-2 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  <Plus size={12} /> Add Proof
                </button>
              </div>
              <div className="space-y-6">
                {formData.details.testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] space-y-4 relative group border border-transparent hover:border-yellow-500/10 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => removeArrayItem("testimonials", i)}
                      className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    <textarea
                      value={t.quote}
                      onChange={(e) =>
                        handleArrayChange(
                          "testimonials",
                          i,
                          "quote",
                          e.target.value,
                        )
                      }
                      placeholder="Greatest feedback ever received..."
                      className="w-full bg-transparent text-sm italic text-zinc-400 outline-none h-24 resize-none"
                    />
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) =>
                        handleArrayChange(
                          "testimonials",
                          i,
                          "author",
                          e.target.value,
                        )
                      }
                      placeholder="Author Name"
                      className="bg-transparent text-[10px] font-black uppercase tracking-widest text-yellow-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </form>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder {
          color: #27272a;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default InfluencerDataForm;
