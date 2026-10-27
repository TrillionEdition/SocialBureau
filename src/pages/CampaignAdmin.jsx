import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls";
import { Download, ExternalLink, Search, X } from "lucide-react";
import "../styles/campaigns.css";
import CampaignPlansAdmin from "./CampaignPlansAdmin";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);
const formatIST = (value) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
const summaryLabels = [
  ["totalCampaigns", "Total campaigns"], ["pendingPayments", "Pending payment"], ["paidCampaigns", "Paid"], ["scheduledCampaigns", "Scheduled"],
  ["inProgressCampaigns", "In progress"], ["completedCampaigns", "Completed"], ["cancelledCampaigns", "Cancelled"], ["totalRevenue", "Verified revenue"],
  ["basicCampaigns", "Basic"], ["ageRestrictedCampaigns", "Age-Restricted"],
];

export default function CampaignAdmin() {
  const [data, setData] = useState({ campaigns: [], summary: {}, page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ search: "", paymentStatus: "", campaignStatus: "", campaignType: "", from: "", to: "" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [rates, setRates] = useState({ Basic: "", "Age-Restricted": "" });
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesSaving, setRatesSaving] = useState(false);
  const [ratesMessage, setRatesMessage] = useState("");

  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams({ page, limit: 25, ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)) });
      const response = await fetch(`${BASE_URL}/api/campaigns/admin?${params}`, { credentials: "include" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not load campaigns.");
      setData(result);
    } catch (loadError) { setError(loadError.message); }
    finally { setBusy(false); }
  }, [filters, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/campaigns/admin/pricing`, { credentials: "include" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load campaign rates.");
        setRates({ Basic: result.rates.Basic, "Age-Restricted": result.rates["Age-Restricted"] });
      })
      .catch((loadError) => setRatesMessage(loadError.message))
      .finally(() => setRatesLoading(false));
  }, []);

  const updateRates = async (event) => {
    event.preventDefault();
    setRatesSaving(true);
    setRatesMessage("");
    try {
      const response = await fetch(`${BASE_URL}/api/campaigns/admin/pricing`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rates: { Basic: Number(rates.Basic), "Age-Restricted": Number(rates["Age-Restricted"]) } }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not update campaign rates.");
      setRates(result.rates);
      setRatesMessage("Campaign rates saved.");
    } catch (updateError) {
      setRatesMessage(updateError.message);
    } finally {
      setRatesSaving(false);
    }
  };

  const updateCampaign = async (bookingId, update) => {
    const response = await fetch(`${BASE_URL}/api/campaigns/admin/${encodeURIComponent(bookingId)}`, {
      method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(update),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Could not update campaign.");
    setSelected(result.campaign);
    await load();
  };

  const exportCsv = async () => {
    const response = await fetch(`${BASE_URL}/api/campaigns/admin/export`, { credentials: "include" });
    if (!response.ok) { setError("Could not export campaigns."); return; }
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a"); link.href = url; link.download = "campaigns.csv"; link.click(); URL.revokeObjectURL(url);
  };

  return <main className="campaign-admin">
    <header className="campaign-admin-head"><div><p className="campaign-kicker">SOCIALBUREAU / OPERATIONS</p><h1>YouTube campaigns</h1><p>Review payments, approve eligible bookings, and manage delivery status.</p></div><button type="button" className="campaign-button campaign-button-light" onClick={exportCsv}><Download size={16} /> Export CSV</button></header>
    <section className="campaign-metrics">{summaryLabels.map(([key, label]) => <div className="campaign-metric" key={key}><span>{label}</span><strong>{key === "totalRevenue" ? money(data.summary[key]) : (data.summary[key] || 0).toLocaleString("en-IN")}</strong></div>)}</section>
    <section className="campaign-section" aria-labelledby="campaign-rates-title">
      <div className="campaign-section-title"><span>RATES</span><div><h2 id="campaign-rates-title">Campaign hourly rates</h2><p>Rate per 1,000 views. Updates apply to new bookings.</p></div></div>
      <form onSubmit={updateRates}>
        <div className="campaign-grid">
          <label className="campaign-field">Basic (INR / hour)<input aria-label="Basic campaign hourly rate" type="number" min="0" step="0.01" required disabled={ratesLoading || ratesSaving} value={rates.Basic} onChange={(event) => setRates({ ...rates, Basic: event.target.value })} /></label>
          <label className="campaign-field">Age-Restricted (INR / hour)<input aria-label="Age-Restricted campaign hourly rate" type="number" min="0" step="0.01" required disabled={ratesLoading || ratesSaving} value={rates["Age-Restricted"]} onChange={(event) => setRates({ ...rates, "Age-Restricted": event.target.value })} /></label>
        </div>
        <div className="campaign-submit-row"><span role="status">{ratesMessage}</span><button type="submit" className="campaign-button campaign-button-primary" disabled={ratesLoading || ratesSaving}>{ratesSaving ? "Saving..." : "Save rates"}</button></div>
      </form>
    </section>
    <CampaignPlansAdmin />
    <section className="campaign-admin-workspace">
      <div className="campaign-list-pane">
        <div className="campaign-filters">
          <label className="campaign-search"><Search size={16} /><input aria-label="Search campaigns" placeholder="Booking ID, client, channel, URL" value={filters.search} onChange={(event) => { setPage(1); setFilters({ ...filters, search: event.target.value }); }} /></label>
          <select aria-label="Payment status" value={filters.paymentStatus} onChange={(event) => { setPage(1); setFilters({ ...filters, paymentStatus: event.target.value }); }}><option value="">All payments</option><option value="pending">Pending</option><option value="paid">Paid</option><option value="failed">Failed</option></select>
          <select aria-label="Campaign status" value={filters.campaignStatus} onChange={(event) => { setPage(1); setFilters({ ...filters, campaignStatus: event.target.value }); }}><option value="">All statuses</option>{["Pending Payment", "Paid", "Scheduled", "In Progress", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}</select>
          <select aria-label="Campaign type" value={filters.campaignType} onChange={(event) => { setPage(1); setFilters({ ...filters, campaignType: event.target.value }); }}><option value="">All types</option><option>Basic</option><option>Age-Restricted</option></select>
          <label className="campaign-date-filter">From <input type="date" value={filters.from} onChange={(event) => { setPage(1); setFilters({ ...filters, from: event.target.value }); }} /></label>
          <label className="campaign-date-filter">To <input type="date" value={filters.to} onChange={(event) => { setPage(1); setFilters({ ...filters, to: event.target.value }); }} /></label>
        </div>
        {error && <p className="campaign-error"><span>{error}</span><button type="button" onClick={() => load()}>Retry</button></p>}
        <div className="campaign-table-wrap"><table className="campaign-table"><thead><tr><th>Booking</th><th>Channel</th><th>Views / type</th><th>Start time (IST)</th><th>Amount</th><th>Payment</th><th>Campaign</th></tr></thead><tbody>{data.campaigns.map((campaign) => <tr key={campaign.bookingId} onClick={() => setSelected(campaign)} className={selected?.bookingId === campaign.bookingId ? "is-selected" : ""}><td><strong>{campaign.bookingId}</strong><small>{formatIST(campaign.createdAt)}</small></td><td>{campaign.channelName}<small>{campaign.clientName || campaign.channelId}</small></td><td>{campaign.requestedViews.toLocaleString("en-IN")}<small>{campaign.campaignType}</small></td><td>{formatIST(campaign.campaignStartAt)}</td><td>{money(campaign.pricingBreakdown.total)}</td><td><span className={`campaign-pill ${campaign.paymentStatus}`}>{campaign.paymentStatus}</span></td><td>{campaign.campaignStatus}</td></tr>)}</tbody></table>{!busy && !data.campaigns.length && <p className="campaign-empty">No campaigns match these filters.</p>}</div>
        <div className="campaign-pagination"><span>{data.total} bookings</span><div><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {data.page || page} of {data.pages || 1}</span><button disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button></div></div>
      </div>
      {selected && <aside className="campaign-detail-pane"><div className="campaign-detail-head"><div><span>BOOKING DETAIL</span><h2>{selected.bookingId}</h2></div><button aria-label="Close booking details" onClick={() => setSelected(null)}><X size={18} /></button></div>
        <dl className="campaign-detail-list"><dt>Client</dt><dd>{selected.clientName || "—"} · {selected.clientEmail || "—"}</dd><dt>Channel</dt><dd>{selected.channelName} · {selected.channelId}</dd><dt>URL</dt><dd><a href={selected.channelUrl} target="_blank" rel="noreferrer">Open YouTube link <ExternalLink size={13} /></a></dd><dt>Start / end / duration (IST)</dt><dd>{formatIST(selected.campaignStartAt)} → {formatIST(selected.campaignEndAt || new Date(new Date(selected.campaignStartAt).getTime() + selected.durationMinutes * 60000))} · {selected.durationMinutes} min</dd><dt>Views / category</dt><dd>{selected.requestedViews.toLocaleString("en-IN")} · {selected.campaignType}</dd><dt>Video title</dt><dd>{selected.videoTitle || "—"}</dd><dt>SEO keywords</dt><dd className="preserve-text">{selected.seoKeywords || "—"}</dd><dt>Video tags</dt><dd className="preserve-text">{selected.videoTags || "—"}</dd><dt>Description</dt><dd className="preserve-text">{selected.videoDescription || "—"}</dd><dt>T1 / T2 / T3</dt><dd className="preserve-text">{[selected.t1, selected.t2, selected.t3].join("\n") || "—"}</dd><dt>Client notes</dt><dd className="preserve-text">{selected.clientNotes || "—"}</dd><dt>Payment transaction</dt><dd className="preserve-text">Status: {selected.paymentStatus}<br />Order: {selected.razorpayOrderId || "—"}<br />Payment: {selected.razorpayPaymentId || "—"}<br />Paid at: {selected.paidAt ? formatIST(selected.paidAt) : "—"}</dd><dt>Price breakdown</dt><dd className="preserve-text">Base {money(selected.pricingBreakdown.baseAmount)}<br />GST {money(selected.pricingBreakdown.campaignGst)}<br />Estimated fee {money(selected.pricingBreakdown.estimatedRazorpayFee)}<br />Fee GST {money(selected.pricingBreakdown.estimatedRazorpayFeeGst)}<br /><strong>Total {money(selected.pricingBreakdown.total)}</strong></dd></dl>
        <label className="campaign-field campaign-admin-status">Campaign status<select value={selected.campaignStatus} onChange={(event) => updateCampaign(selected.bookingId, { campaignStatus: event.target.value }).catch((updateError) => setError(updateError.message))}>{["Pending Payment", "Paid", "Scheduled", "In Progress", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}</select></label>
        <label className="campaign-field campaign-admin-notes">Internal admin notes<textarea key={selected.bookingId} defaultValue={selected.internalAdminNotes} rows="4" maxLength="10000" onBlur={(event) => event.target.value !== selected.internalAdminNotes && updateCampaign(selected.bookingId, { internalAdminNotes: event.target.value }).catch((updateError) => setError(updateError.message))} /></label>
        <div className="campaign-history"><strong>Status history</strong>{selected.statusHistory?.length ? selected.statusHistory.map((entry, index) => <p key={`${entry.changedAt}-${index}`}>{entry.status} · {entry.adminName || "Admin"} · {formatIST(entry.changedAt)} IST</p>) : <p>No status changes recorded.</p>}</div>
      </aside>}
    </section>
  </main>;
}