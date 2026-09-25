import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getResumeListingBasicAPI,
  unlockResumeAPI,
} from "@/services/resumeMarketplaceService";

export default function ResumeDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  const fetchBasic = async () => {
    setLoading(true);
    try {
      const res = await getResumeListingBasicAPI(id);
      setListing(res.data);
    } catch (err) {
      toast.error(err.message || "Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

 const [unlockError, setUnlockError] = useState("");

const handleUnlock = async () => {
  setUnlocking(true);
  setUnlockError("");

  try {
    const res = await unlockResumeAPI(id);

    if (res.success) {
      setListing(res.data);
      setUnlocked(true);
      toast.success("Resume unlocked!");
    } else {
      setUnlockError(res.message || "Failed to unlock resume");
    }
  } catch (err) {
    setUnlockError(
      err.message || "No downloads remaining. Please purchase a package."
    );
  } finally {
    setUnlocking(false);
  }
};

  const expLabel = (min, max) => {
    if (!min && !max) return "Fresher";
    if (min === max) return `${min} years`;
    return `${min} - ${max} years`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/40" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#08080c] text-white flex items-center justify-center">
        <p className="text-white/60">Resume listing not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-white pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/resume-marketplace" className="text-sm text-white/50 hover:text-white">
          ← Back to marketplace
        </Link>

        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-1">
            {unlocked ? listing.candidateName : listing.jobTitle}
          </h1>
          <p className="text-white/60 mb-6">{listing.jobTitle} • {listing.category}</p>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="text-white/40">Experience</p>
              <p className="font-medium">{expLabel(listing.experienceMin, listing.experienceMax)}</p>
            </div>
            <div>
              <p className="text-white/40">Location</p>
              <p className="font-medium">{listing.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-white/40 text-sm mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {(listing.skills || []).map((s, i) => (
                <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-xs">
                  {s}
                </span>
              ))}
              {!listing.skills?.length && listing.skillsSummary && (
                <p className="text-sm text-white/60">{listing.skillsSummary}</p>
              )}
            </div>
          </div>

          {!unlocked ? (
  <div className="border-t border-white/10 pt-6 mt-6">
    <p className="text-white/60 mb-4">
      Candidate name, contact details, full profile and resume download are hidden until unlocked.
    </p>

    <button
      onClick={handleUnlock}
      disabled={unlocking}
      className="px-6 py-3 rounded-xl bg-[#E31E24] hover:bg-[#c40016] transition font-medium disabled:opacity-50"
    >
      {unlocking ? "Unlocking..." : "Unlock Full Profile (1 download)"}
    </button>

    {unlockError && (
      <span className="block mt-3 text-sm text-red-400">
        {unlockError}
      </span>
    )}
  </div>
) :  (
            <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
              {(listing.candidateEmail || listing.candidatePhone) && (
                <div>
                  <p className="text-white/40 text-sm mb-1">Contact</p>
                  <p className="font-medium">{listing.candidateEmail}</p>
                  <p className="font-medium">{listing.candidatePhone}</p>
                </div>
              )}

              {listing.fullProfileSummary && (
                <div>
                  <p className="text-white/40 text-sm mb-1">Profile Summary</p>
                  <p className="text-white/80 whitespace-pre-line">{listing.fullProfileSummary}</p>
                </div>
              )}

              {!!listing.education?.length && (
                <div>
                  <p className="text-white/40 text-sm mb-1">Education</p>
                  {listing.education.map((e, i) => (
                    <p key={i} className="text-white/80 text-sm">
                      {e.degree} — {e.institution} ({e.year})
                    </p>
                  ))}
                </div>
              )}

              <a
                href={listing.resumeFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-3 rounded-xl bg-[#E31E24] hover:bg-[#c40016] transition font-medium"
              >
                Download Resume ({listing.resumeFileName})
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
