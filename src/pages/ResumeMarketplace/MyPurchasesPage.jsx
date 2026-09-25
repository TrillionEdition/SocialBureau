import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getMyResumePurchasesAPI,
  getMyResumeDownloadsAPI,
} from "@/services/resumeMarketplaceService";

export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [purchaseRes, downloadRes] = await Promise.all([
          getMyResumePurchasesAPI(),
          getMyResumeDownloadsAPI(),
        ]);
        setPurchases(purchaseRes.data || []);
        setRemaining(purchaseRes.remainingDownloads || 0);
        setDownloads(downloadRes.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/resume-marketplace" className="text-sm text-white/50 hover:text-white">
          ← Back to marketplace
        </Link>

        <h1 className="text-3xl font-semibold mt-6 mb-2">Purchase &amp; Download History</h1>
        <p className="text-white/60 mb-8">Remaining downloads: <span className="font-bold">{remaining}</span></p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Purchases</h2>
          {purchases.length === 0 ? (
            <p className="text-white/50">No purchases yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-white/40 text-left border-b border-white/10">
                  <tr>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Downloads</th>
                    <th className="py-2 pr-4">Used</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p) => (
                    <tr key={p._id} className="border-b border-white/5">
                      <td className="py-2 pr-4">{new Date(p.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-4">₹{p.amount}</td>
                      <td className="py-2 pr-4">{p.downloadsPurchased}</td>
                      <td className="py-2 pr-4">{p.downloadsUsed}</td>
                      <td className="py-2 pr-4 capitalize">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Downloads</h2>
          {downloads.length === 0 ? (
            <p className="text-white/50">No resumes downloaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-white/40 text-left border-b border-white/10">
                  <tr>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Candidate</th>
                    <th className="py-2 pr-4">Job Title</th>
                    <th className="py-2 pr-4">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((d) => (
                    <tr key={d._id} className="border-b border-white/5">
                      <td className="py-2 pr-4">{new Date(d.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-4">{d.resumeId?.candidateName || "—"}</td>
                      <td className="py-2 pr-4">{d.resumeId?.jobTitle || "—"}</td>
                      <td className="py-2 pr-4">{d.resumeId?.category || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
