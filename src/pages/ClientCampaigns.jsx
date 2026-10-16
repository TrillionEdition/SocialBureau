import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarClock, Eye, RefreshCw } from "lucide-react";
import { BASE_URL } from "../utils/urls";
import "../styles/campaigns.css";

const numberFormat = new Intl.NumberFormat("en-IN");
const formatIST = (value) => value
  ? new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
  : "Not scheduled";

export default function ClientCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCampaigns = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/mine`, { credentials: "include" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Your campaigns could not be loaded.");
      setCampaigns(result.campaigns || []);
    } catch (loadError) {
      setError(loadError.message || "Your campaigns could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCampaigns(); }, []);

  return <main className="campaign-shell client-campaigns-page">
    <header className="campaign-masthead">
      <div><p className="campaign-kicker">SOCIALBUREAU / CLIENT PORTAL</p><h1>Your YouTube campaigns</h1><p>View booking status and open analytics for each campaign.</p></div>
      <Link to="/youtube-campaign" className="campaign-button campaign-button-primary">Book a campaign <ArrowUpRight size={16} /></Link>
    </header>

    {error && <div className="campaign-error" role="alert"><span>{error}</span><button type="button" onClick={loadCampaigns}>Try again</button></div>}
    {loading ? <section className="client-campaigns-state" aria-live="polite"><RefreshCw className="spin" size={20} /><p>Loading your campaigns…</p></section>
      : !error && !campaigns.length ? <section className="client-campaigns-state"><p>You have no campaigns yet.</p><Link to="/youtube-campaign" className="campaign-button campaign-button-primary">Book a campaign <ArrowUpRight size={16} /></Link></section>
        : !error && <section className="client-campaigns-list" aria-label="Your campaigns">
          {campaigns.map((campaign) => <article className="client-campaign-card" key={campaign._id}>
            <div className="client-campaign-card-title">
              <div><span className="campaign-kicker">{campaign.bookingId}</span><h2>{campaign.videoTitle || campaign.channelName}</h2><p>{campaign.channelName} · {campaign.campaignType}</p></div>
              <span className={`client-campaign-status ${String(campaign.campaignStatus).toLowerCase().replaceAll(" ", "-")}`}>{campaign.campaignStatus}</span>
            </div>
            <div className="client-campaign-facts">
              <span><Eye size={15} /> {numberFormat.format(campaign.requestedViews)} requested views</span>
              <span><CalendarClock size={15} /> Starts {formatIST(campaign.campaignStartAt)} IST</span>
            </div>
            <Link to={`/client/campaigns/${encodeURIComponent(campaign._id)}/analytics`} className="campaign-button campaign-button-light">View analytics <ArrowUpRight size={16} /></Link>
          </article>)}
        </section>}
  </main>;
}