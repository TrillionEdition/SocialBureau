import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Activity, CalendarClock, ExternalLink, Eye, Heart, Link2, MessageCircle, RefreshCw, Unplug, Users } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BASE_URL } from "../utils/urls";
import "../styles/clientCampaignAnalytics.css";

const numberFormat = new Intl.NumberFormat("en-IN");
const formatDate = (value) => value
  ? new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
  : "Not scheduled";
const statLabel = (value) => value === null || value === undefined ? "Unavailable" : numberFormat.format(value);

export default function ClientCampaignAnalytics() {
  const { campaignId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [privateAnalytics, setPrivateAnalytics] = useState(null);
  const [privateError, setPrivateError] = useState("");
  const [connectionMessage, setConnectionMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [disconnecting, setDisconnecting] = useState(false);
  const activeDateRange = useRef({ campaignId: "", startDate: "", endDate: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPrivate = useCallback(async (id, from, to, forceRefresh = false) => {
    setPrivateError("");
    const query = new URLSearchParams({ startDate: from, endDate: to });
    if (forceRefresh) query.set("refresh", "1");
    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/${encodeURIComponent(id)}/youtube/analytics?${query}`, { credentials: "include" });
      const result = await response.json();
      setPrivateAnalytics(result);
      if (!response.ok) setPrivateError(result.message || "Private analytics could not be loaded.");
    } catch (loadError) {
      setPrivateError(loadError.message || "Private analytics could not be loaded.");
    }
  }, []);

  const load = useCallback(async (forceRefresh = false) => {
    setError("");
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const listResponse = await fetch(`${BASE_URL}/api/campaigns/mine`, { credentials: "include" });
      const listResult = await listResponse.json();
      if (!listResponse.ok) throw new Error(listResult.message || "Your campaigns could not be loaded.");
      setCampaigns(listResult.campaigns || []);

      const query = forceRefresh ? "?refresh=1" : "";
      const analyticsResponse = await fetch(`${BASE_URL}/api/campaigns/${encodeURIComponent(campaignId)}/analytics${query}`, { credentials: "include" });
      const analyticsResult = await analyticsResponse.json();
      if (!analyticsResponse.ok) throw new Error(analyticsResult.message || "Campaign analytics could not be loaded.");
      setCampaign(analyticsResult.campaign);
      setAnalytics(analyticsResult.analytics);

      const currentCampaign = analyticsResult.campaign;
      const campaignStart = new Date(currentCampaign.campaignStartAt).toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);
      const earliestDate = new Date();
      earliestDate.setUTCDate(earliestDate.getUTCDate() - 365);
      const defaultStart = campaignStart > earliestDate.toISOString().slice(0, 10) ? campaignStart : earliestDate.toISOString().slice(0, 10);
      const nextStart = activeDateRange.current.campaignId === currentCampaign._id && activeDateRange.current.startDate ? activeDateRange.current.startDate : defaultStart;
      const nextEnd = activeDateRange.current.campaignId === currentCampaign._id && activeDateRange.current.endDate ? activeDateRange.current.endDate : today;
      setStartDate(nextStart);
      setEndDate(nextEnd);
      activeDateRange.current = { campaignId: currentCampaign._id, startDate: nextStart, endDate: nextEnd };
      await loadPrivate(currentCampaign._id, nextStart, nextEnd, forceRefresh);
    } catch (loadError) {
      setError(loadError.message || "Campaign analytics could not be loaded.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [campaignId, loadPrivate]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const result = searchParams.get("youtube");
    if (!result) return;
    const messages = {
      connected: "YouTube channel connected. Private analytics are loading.",
      invalid_state: "The Google authorization expired or could not be verified. Start the connection again.",
      authorization_denied: "Google authorization was cancelled.",
      campaign_unavailable: "The campaign is no longer available to this account.",
      channel_mismatch: "The authorized Google account does not have access to this campaign's YouTube channel.",
      video_mismatch: "The campaign video does not belong to the authorized YouTube channel.",
      scope_missing: "Google did not grant all required read-only permissions.",
      refresh_token_missing: "Google did not provide offline access. Disconnect the app from your Google account and try again.",
      configuration: "YouTube OAuth is not configured on the server.",
      connection_failed: "YouTube could not be connected. Please try again.",
    };
    if (result === "connected") {
      setConnectionMessage(messages[result]);
      setPrivateError("");
    } else {
      setConnectionMessage("");
      setPrivateError(messages[result] || "YouTube connection status could not be verified.");
    }
    searchParams.delete("youtube");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const applyDateRange = () => {
    if (!campaign) return;
    activeDateRange.current = { campaignId: campaign._id, startDate, endDate };
    loadPrivate(campaign._id, startDate, endDate);
  };
  const disconnectChannel = async () => {
    if (!campaign) return;
    setDisconnecting(true);
    setPrivateError("");
    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/${encodeURIComponent(campaign._id)}/youtube/disconnect`, { method: "POST", credentials: "include" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "YouTube could not be disconnected.");
      await loadPrivate(campaign._id, startDate, endDate);
    } catch (disconnectError) {
      setPrivateError(disconnectError.message || "YouTube could not be disconnected.");
    } finally {
      setDisconnecting(false);
    }
  };

  const chartData = (analytics?.history || []).map((point) => ({
    ...point,
    label: new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(point.capturedAt)),
  }));
  const stats = [
    { label: "Actual views", value: statLabel(analytics?.actualViews), icon: Eye, note: "Public YouTube count" },
    { label: "Likes", value: statLabel(analytics?.likes), icon: Heart, note: "Public video metric" },
    { label: "Comments", value: statLabel(analytics?.comments), icon: MessageCircle, note: "Public video metric" },
    { label: "Subscribers gained", value: "Unavailable", icon: Users, note: "Requires channel-owner analytics access" },
  ];

  return <main className="client-campaign-analytics">
    <header className="cca-header">
      <div><p className="cca-eyebrow">SOCIALBUREAU / CLIENT ANALYTICS</p><h1>Campaign performance</h1><p>Public YouTube video statistics for your booked campaigns.</p></div>
      <button type="button" className="cca-refresh" onClick={() => load(true)} disabled={loading || refreshing} aria-label="Refresh analytics">
        <RefreshCw size={16} className={refreshing ? "cca-spinning" : ""} /> <span>{refreshing ? "Refreshing" : "Refresh"}</span>
      </button>
    </header>

    {error && <div className="cca-error" role="alert"><span>{error}</span><button type="button" onClick={() => load()}>Try again</button></div>}
    {campaigns.length > 1 && <nav className="cca-campaign-list" aria-label="Your campaigns">
      <span className="cca-section-label">YOUR BOOKINGS</span>
      <div>{campaigns.map((item) => <Link key={item._id} to={`/client/campaigns/${encodeURIComponent(item._id)}/analytics`} className={item._id === campaign?._id ? "cca-campaign-link is-active" : "cca-campaign-link"}>
        <span>{item.videoTitle || item.channelName}</span><small>{item.campaignStatus} · {numberFormat.format(item.requestedViews)} requested</small>
      </Link>)}</div>
    </nav>}

    {loading ? <section className="cca-loading" aria-live="polite"><span className="cca-loader" /><p>Loading campaign analytics…</p></section> : campaign && <>
      <section className="cca-campaign-summary">
        <div className="cca-title-row"><div><p className="cca-section-label">{campaign.bookingId}</p><h2>{campaign.videoTitle || campaign.channelName}</h2><p className="cca-channel">{campaign.channelName} <span>·</span> {campaign.campaignType}</p></div><span className={`cca-status cca-status-${String(campaign.campaignStatus).toLowerCase().replaceAll(" ", "-")}`}>{campaign.campaignStatus}</span></div>
        <div className="cca-details-grid">
          <div><span>YouTube channel</span><strong>{campaign.channelName}</strong></div>
          <div><span>Video</span><a href={campaign.channelUrl} target="_blank" rel="noreferrer">Open video <ExternalLink size={14} /></a></div>
          <div><span>Campaign type</span><strong>{campaign.campaignType}</strong></div>
          <div><span>Start time</span><strong>{formatDate(campaign.campaignStartAt)}</strong></div>
          <div><span>End time</span><strong>{formatDate(campaign.campaignEndAt)}</strong></div>
          <div><span>Duration</span><strong>{campaign.durationMinutes} minutes</strong></div>
          <div><span>Campaign status</span><strong>{campaign.campaignStatus}</strong></div>
          <div><span>Requested views</span><strong>{numberFormat.format(campaign.requestedViews)}</strong></div>
        </div>
      </section>

      {analytics?.message && <div className="cca-notice"><Activity size={17} /><p>{analytics.message}{analytics.status === "stale" ? " Showing the last available snapshot." : ""}</p></div>}
      <section className="cca-stats" aria-label="Video statistics">
        {stats.map(({ label, value, icon, note }) => <article className="cca-stat" key={label}>
          <div className="cca-stat-head"><span>{label}</span>{createElement(icon, { size: 17 })}</div><strong>{analytics?.status === "unavailable" && label !== "Subscribers gained" ? "Unavailable" : value}</strong><small>{note}</small>
        </article>)}
      </section>

      <div className="cca-comparison"><div><span>Requested views</span><strong>{numberFormat.format(campaign.requestedViews)}</strong></div><div className="cca-comparison-rule" /><div><span>Actual views</span><strong>{statLabel(analytics?.actualViews)}</strong></div><p>Requested campaign views and the video's lifetime public view count are different measures, so progress is not calculated.</p></div>

      <section className="cca-chart-section">
        <div className="cca-chart-heading"><div><span className="cca-section-label">HISTORY</span><h2>Views over time</h2></div><span><CalendarClock size={15} /> {analytics?.lastUpdatedAt ? `Updated ${formatDate(analytics.lastUpdatedAt)}` : "No update yet"}</span></div>
        {chartData.length > 1 ? <div className="cca-chart" role="img" aria-label="YouTube video views over time">
          <ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="rgba(230,238,222,.1)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#9da49a", fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={24} />
            <YAxis tick={{ fill: "#9da49a", fontSize: 11 }} axisLine={false} tickLine={false} width={55} tickFormatter={(value) => numberFormat.format(value)} />
            <Tooltip contentStyle={{ background: "#171d17", border: "1px solid #3b4638", borderRadius: 3, color: "#f2f4ed" }} labelStyle={{ color: "#b7c1b0" }} formatter={(value) => [numberFormat.format(value), "Views"]} />
            <Line type="monotone" dataKey="views" stroke="#d8fb56" strokeWidth={2} dot={{ r: 3, fill: "#d8fb56", strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </LineChart></ResponsiveContainer>
        </div> : <div className="cca-empty-chart"><Activity size={20} /><p>Views history will appear after real snapshots have been collected.</p><small>Historical YouTube data is not available for earlier dates.</small></div>}
      </section>

      <section className="cca-private-section" aria-label="Private YouTube Analytics">
        <header className="cca-private-head">
          <div><span className="cca-section-label">CHANNEL OWNER ANALYTICS</span><h2>Private performance</h2><p>Read-only metrics shared by the Google account with access to this channel.</p></div>
          {privateAnalytics?.connected
            ? <button type="button" className="cca-secondary-button" onClick={disconnectChannel} disabled={disconnecting}><Unplug size={15} /> {disconnecting ? "Disconnecting" : "Disconnect channel"}</button>
            : <a className="cca-connect-button" href={`${BASE_URL}/api/campaigns/${encodeURIComponent(campaign._id)}/youtube/connect`}><Link2 size={16} /> Connect YouTube channel</a>}
        </header>
        {privateAnalytics?.connected && new Date(campaign.campaignStartAt) <= new Date() && <div className="cca-private-filters">
          <label>From <input type="date" value={startDate} min={new Date(campaign.campaignStartAt).toISOString().slice(0, 10)} max={endDate || undefined} onChange={(event) => { activeDateRange.current = { campaignId: campaign._id, startDate: event.target.value, endDate }; setStartDate(event.target.value); }} /></label>
          <label>To <input type="date" value={endDate} min={startDate || new Date(campaign.campaignStartAt).toISOString().slice(0, 10)} max={new Date().toISOString().slice(0, 10)} onChange={(event) => { activeDateRange.current = { campaignId: campaign._id, startDate, endDate: event.target.value }; setEndDate(event.target.value); }} /></label>
          <button type="button" className="cca-secondary-button" onClick={applyDateRange}>Apply dates</button>
        </div>}
        {privateError && <p className="cca-private-message" role="status">{privateError}</p>}
        {connectionMessage && <p className="cca-private-success" role="status">{connectionMessage}</p>}
        {privateAnalytics?.message && <p className="cca-private-message" role="status">{privateAnalytics.message}</p>}
        {privateAnalytics?.connected && <>
          <p className="cca-private-channel">Connected channel: <strong>{privateAnalytics.channelName || campaign.channelName}</strong>{privateAnalytics.lastUpdatedAt && <span>Updated {formatDate(privateAnalytics.lastUpdatedAt)}</span>}</p>
          <div className="cca-stats cca-private-stats">
            {[
              ["Views", privateAnalytics.metrics?.views, Eye],
              ["Watch time", privateAnalytics.metrics?.estimatedMinutesWatched === null ? null : `${numberFormat.format(Math.round(privateAnalytics.metrics.estimatedMinutesWatched))} min`, Activity],
              ["Average view duration", privateAnalytics.metrics?.averageViewDuration === null ? null : `${Math.floor(privateAnalytics.metrics.averageViewDuration / 60)}m ${Math.round(privateAnalytics.metrics.averageViewDuration % 60)}s`, CalendarClock],
              ["Subscribers gained", privateAnalytics.metrics?.subscribersGained, Users],
              ["Subscribers lost", privateAnalytics.metrics?.subscribersLost, Users],
            ].map(([label, value, icon]) => <article className="cca-stat" key={label}><div className="cca-stat-head"><span>{label}</span>{createElement(icon, { size: 17 })}</div><strong>{value === null || value === undefined ? "Unavailable" : typeof value === "number" ? numberFormat.format(value) : value}</strong><small>Selected date range</small></article>)}
          </div>
        </>}
      </section>
    </>}
    {!loading && !error && !campaign && <section className="cca-empty-chart"><p>No campaign was found for this account.</p><Link to="/client-dashboard">Go to your dashboard</Link></section>}
  </main>;
}