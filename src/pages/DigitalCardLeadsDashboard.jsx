import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/urls";
import "./digitalCard.css";

const statuses = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["follow_up", "Follow-up"],
  ["converted", "Converted"],
  ["closed", "Closed"],
];
const interests = [
  "API Marketing",
  "Digital Marketing",
  "YouTube Campaign Optimisation",
  "SEO / AEO / GEO",
  "Marketing Automation",
  "Business Partnership",
  "Other",
];
const utcDate = (value) => new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
}).format(new Date(value)) + " UTC";

function whatsappUrl(lead) {
  const digits = String(lead.phone || "").replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "";
  const greeting = `Hi ${lead.fullName}, this is Sham from SocialBureau. It was great connecting with you. I'd be happy to discuss your business requirements.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(greeting)}`;
}

export default function DigitalCardLeadsDashboard() {
  const [filters, setFilters] = useState({ q: "", status: "", interest: "", from: "", to: "" });
  const [result, setResult] = useState({ leads: [], overview: { total: 0, new: 0, contacted: 0, followUp: 0 } });
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  const loadLeads = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/digital-card/leads`, { params: filters });
      setResult(data);
      setError("");
      setSelected((current) => current ? data.leads.find((lead) => lead._id === current._id) || null : null);
    } catch (loadError) {
      setError(loadError.response?.status === 401 || loadError.response?.status === 403
        ? "Your staff session is not authorised. Please sign in with an administrator or partner account."
        : "Could not load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadLeads();
    const interval = window.setInterval(loadLeads, 15000);
    return () => window.clearInterval(interval);
  }, [loadLeads, refresh]);

  const updateFilter = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));

  const changeStatus = async (status) => {
    if (!selected) return;
    try {
      await axios.patch(`${BASE_URL}/api/digital-card/leads/${selected._id}`, { status });
      setRefresh((current) => current + 1);
    } catch (updateError) {
      setError(updateError.response?.data?.message || "Unable to update this lead.");
    }
  };

  const addNote = async (event) => {
    event.preventDefault();
    if (!selected || !note.trim()) return;
    try {
      await axios.post(`${BASE_URL}/api/digital-card/leads/${selected._id}/notes`, { body: note });
      setNote("");
      setRefresh((current) => current + 1);
    } catch (noteError) {
      setError(noteError.response?.data?.message || "Unable to save the note.");
    }
  };

  const exportCsv = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/digital-card/leads/export.csv`, { responseType: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = "socialbureau-leads.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (exportError) {
      setError(exportError.response?.status === 401 || exportError.response?.status === 403
        ? "You are not authorised to export lead records."
        : "The lead export could not be generated.");
    }
  };

  const deleteLead = async () => {
    if (!selected || !window.confirm(`Delete the lead record for ${selected.fullName}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${BASE_URL}/api/digital-card/leads/${selected._id}`);
      setSelected(null);
      setRefresh((current) => current + 1);
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || "Unable to delete this lead.");
    }
  };

  return (
    <main className="sb-crm-page">
      <header className="sb-crm-header">
        <div><p className="sb-crm-eyebrow">SocialBureau · Lead capture</p><h1>Lead Dashboard</h1><p>New submissions sync automatically every 15 seconds.</p></div>
        <button className="sb-crm-export" onClick={exportCsv}>Export CSV</button>
      </header>
      {error && <div className="sb-crm-error" role="alert">{error}</div>}
      <section className="sb-crm-kpis" aria-label="Lead overview">
        {[["Total leads", result.overview.total], ["New leads", result.overview.new], ["Contacted", result.overview.contacted], ["Follow-up required", result.overview.followUp]].map(([label, value]) => (
          <article key={label}><span>{label}</span><strong>{value}</strong></article>
        ))}
      </section>
      <section className="sb-crm-panel">
        <div className="sb-crm-filters">
          <input name="q" placeholder="Search name, phone, email or company" aria-label="Search leads" value={filters.q} onChange={updateFilter} />
          <select name="interest" aria-label="Filter by interest" value={filters.interest} onChange={updateFilter}>
            <option value="">All interests</option>{interests.map((interest) => <option key={interest}>{interest}</option>)}
          </select>
          <select name="status" aria-label="Filter by status" value={filters.status} onChange={updateFilter}>
            <option value="">All statuses</option>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <label>From <input name="from" type="date" value={filters.from} onChange={updateFilter} /></label>
          <label>To <input name="to" type="date" value={filters.to} onChange={updateFilter} /></label>
        </div>
        <div className="sb-crm-table-wrap">
          <table className="sb-crm-table">
            <thead><tr><th>Received (UTC)</th><th>Name</th><th>Mobile</th><th>Email</th><th>Company</th><th>Designation</th><th>Interest</th><th>Consent</th><th>Status</th><th>WhatsApp</th></tr></thead>
            <tbody>
              {result.leads.map((lead) => <tr key={lead._id} onClick={() => setSelected(lead)}>
                <td>{utcDate(lead.createdAt)}</td><td><button className="sb-crm-name" onClick={(event) => { event.stopPropagation(); setSelected(lead); }}>{lead.fullName}</button></td>
                <td>{lead.phone}</td><td>{lead.email || "—"}</td><td>{lead.company || "—"}</td><td>{lead.designation || "—"}</td><td>{lead.interest || "—"}</td>
                <td>{lead.consent?.given ? "Given" : "—"}</td><td><span className={`sb-crm-status sb-crm-status-${lead.status}`}>{statuses.find(([value]) => value === lead.status)?.[1] || lead.status}</span></td>
                <td>{whatsappUrl(lead) ? <a className="sb-crm-whatsapp" href={whatsappUrl(lead)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Chat on WhatsApp</a> : "Invalid number"}</td>
              </tr>)}
            </tbody>
          </table>
          {!loading && !result.leads.length && <p className="sb-crm-empty">No leads match these filters.</p>}
          {loading && <p className="sb-crm-empty">Loading leads…</p>}
        </div>
      </section>
      {selected && <section className="sb-crm-detail" aria-label="Lead details">
        <div className="sb-crm-detail-header"><div><p className="sb-crm-eyebrow">Lead details</p><h2>{selected.fullName}</h2></div><button className="sb-crm-close" onClick={() => setSelected(null)} aria-label="Close lead details">×</button></div>
        <dl>
          <dt>Mobile</dt><dd>{selected.phone}</dd><dt>Email</dt><dd>{selected.email || "—"}</dd>
          <dt>Company</dt><dd>{selected.company || "—"}</dd><dt>Designation</dt><dd>{selected.designation || "—"}</dd>
          <dt>Business interest</dt><dd>{selected.interest || "—"}</dd><dt>Message</dt><dd>{selected.message || "—"}</dd>
          <dt>Consent</dt><dd>{selected.consent?.given ? `Given · ${utcDate(selected.consent.consentedAt)} · policy ${selected.consent.policyVersion}` : "—"}</dd>
          <dt>Received</dt><dd>{utcDate(selected.createdAt)}</dd>
        </dl>
        <label className="sb-crm-control-label" htmlFor="sb-lead-status">Lead status</label>
        <select id="sb-lead-status" value={selected.status} onChange={(event) => changeStatus(event.target.value)}>
          {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <h3>Internal follow-up notes</h3>
        <div className="sb-crm-notes">{selected.notes?.length ? selected.notes.map((item, index) => <article key={`${item.createdAt}-${index}`}><p>{item.body}</p><small>{item.authorName} · {utcDate(item.createdAt)}</small></article>) : <p>No notes yet.</p>}</div>
        <form className="sb-crm-note-form" onSubmit={addNote}><textarea value={note} onChange={(event) => setNote(event.target.value)} rows="3" maxLength="2000" placeholder="Add an internal note…" aria-label="Add an internal note" /><button type="submit" disabled={!note.trim()}>Save note</button></form>
        {whatsappUrl(selected) && <a className="sb-crm-whatsapp sb-crm-whatsapp-detail" href={whatsappUrl(selected)} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}
        <button className="sb-crm-delete" onClick={deleteLead}>Delete lead record</button>
      </section>}
      <p className="sb-crm-footnote">All timestamps are shown in UTC. Lead details are visible only to authorised SocialBureau staff.</p>
    </main>
  );
}
