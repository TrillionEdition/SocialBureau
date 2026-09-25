import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/utils/authUtils";
import loadRazorpay from "@/utils/loadRazorpay";
import {
  getResumeListingsAPI,
  createResumePurchaseOrderAPI,
  verifyResumePurchasePaymentAPI,
  getMyResumePurchasesAPI,
} from "@/services/resumeMarketplaceService";

const PACKAGE_PRICE = 199;
// const PACKAGE_PRICE = 2;
const PACKAGE_DOWNLOADS = 10;

export default function ResumeMarketplacePage() {
  const { currentUser } = useAuth();

  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [remainingDownloads, setRemainingDownloads] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    skill: "",
    minExp: "",
    maxExp: "",
  });

  const fetchListings = async (page = 1) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries({ ...filters, page, limit: 12 }).filter(([, v]) => v !== "")
      );
      const res = await getResumeListingsAPI(params);
      setListings(res.data || []);
      setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      toast.error(err.message || "Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const fetchRemaining = async () => {
    try {
      const res = await getMyResumePurchasesAPI();
      setRemainingDownloads(res.remainingDownloads || 0);
    } catch {
      // silently ignore — not critical for browsing
    }
  };

  useEffect(() => {
    fetchListings(1);
    fetchRemaining();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchListings(1);
  };

  const handleBuyPackage = async () => {
    try {
      setProcessing(true);
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load Razorpay checkout");

      const orderRes = await createResumePurchaseOrderAPI();
      if (!orderRes.success || !orderRes.order) {
        throw new Error(orderRes.message || "Failed to create order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.order.amount,
        currency: orderRes.order.currency,
        order_id: orderRes.order.id,
        name: "Social Bureau",
        description: `${PACKAGE_DOWNLOADS} Resume Downloads`,
        prefill: { name: currentUser?.name, email: currentUser?.email },
        theme: { color: "#E31E24" },
        handler: async (response) => {
          try {
            const verifyRes = await verifyResumePurchasePaymentAPI(response);
            if (verifyRes.success) {
              toast.success(`${PACKAGE_DOWNLOADS} downloads added to your account!`);
              fetchRemaining();
            } else {
              toast.error(verifyRes.message || "Payment verification failed");
            }
          } catch (err) {
            toast.error(err.message || "Payment verification error");
          } finally {
            setProcessing(false);
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Failed to start payment");
      setProcessing(false);
    }
  };

  const expLabel = (min, max) => {
    if (!min && !max) return "Fresher";
    if (min === max) return `${min} yrs`;
    return `${min} - ${max} yrs`;
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              Resume Marketplace
            </h1>
            <p className="text-white/60">
              Browse verified candidate resumes. Unlock full profiles &amp; downloads with a resume package.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <div>
              <p className="text-sm text-white/50">Remaining downloads</p>
              <p className="text-2xl font-bold">{remainingDownloads}</p>
            </div>
            <button
              onClick={handleBuyPackage}
              disabled={processing}
              className="px-5 py-3 rounded-xl bg-[#E31E24] hover:bg-[#c40016] transition font-medium disabled:opacity-50"
            >
              {processing ? "Processing..." : `Buy ${PACKAGE_DOWNLOADS} for ₹${PACKAGE_PRICE}`}
            </button>
            <Link
              to="/resume-marketplace/my-purchases"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              History
            </Link>
          </div>
        </div>

        {/* Filters */}
        <form
          onSubmit={handleFilterSubmit}
          className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-10 bg-white/5 border border-white/10 rounded-2xl p-5"
        >
          <input
            className="col-span-2 md:col-span-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Search title, skill, category..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
          <input
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Category"
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          />
          <input
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          />
          <input
            type="number"
            min="0"
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Min exp (yrs)"
            value={filters.minExp}
            onChange={(e) => setFilters((f) => ({ ...f, minExp: e.target.value }))}
          />
          <input
            type="number"
            min="0"
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Max exp (yrs)"
            value={filters.maxExp}
            onChange={(e) => setFilters((f) => ({ ...f, maxExp: e.target.value }))}
          />
          <button
            type="submit"
            className="col-span-2 md:col-span-1 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm font-medium transition"
          >
            Search
          </button>
        </form>

        {/* Listings */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/40" />
          </div>
        ) : listings.length === 0 ? (
          <p className="text-center text-white/50 py-20">No resumes match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((r) => (
              <Link
                key={r._id}
                to={`/resume-marketplace/${r._id}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#E31E24]/50 hover:bg-white/[0.07] transition flex flex-col gap-3"
              >
                <h3 className="text-lg font-semibold">{r.jobTitle}</h3>
                <p className="text-sm text-white/60">{r.category}</p>
                <div className="flex flex-wrap gap-2 text-xs text-white/50">
                  <span className="bg-white/10 px-2 py-1 rounded-full">
                    {expLabel(r.experienceMin, r.experienceMax)}
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded-full">{r.location}</span>
                </div>
                {r.skillsSummary && (
                  <p className="text-sm text-white/50 line-clamp-2">{r.skillsSummary}</p>
                )}
                <span className="mt-auto text-sm text-[#E31E24] font-medium">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchListings(p)}
                className={`w-9 h-9 rounded-lg text-sm ${
                  p === pagination.page ? "bg-[#E31E24]" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
