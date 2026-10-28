import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls";

const EMPTY = { name: "", description: "", badge: "", deliveryTime: "", rateNote: "", displayOrder: "0", active: true, pricingType: "fixed", views: "", durationMinutes: "", price: "", monthlyPrice: "", monthlyDays: "30", ratePer1000ViewsPerHour: "", defaultViews: "", minViews: "", maxViews: "", gstRate: "", processingFeeRate: "" };
const NUMERIC = ["displayOrder", "views", "durationMinutes", "price", "monthlyPrice", "monthlyDays", "ratePer1000ViewsPerHour", "defaultViews", "minViews", "maxViews", "gstRate", "processingFeeRate"];
const NULLABLE = ["views", "durationMinutes", "price", "monthlyPrice", "ratePer1000ViewsPerHour", "defaultViews", "minViews", "maxViews", "gstRate", "processingFeeRate"];

const toForm = (plan) => Object.fromEntries(Object.keys(EMPTY).map((key) => [key, plan[key] === null || plan[key] === undefined ? EMPTY[key] : typeof plan[key] === "number" ? String(plan[key]) : plan[key]]));
const toPayload = (form) => {
  const payload = { ...form };
  for (const key of NUMERIC) payload[key] = form[key] === "" ? (NULLABLE.includes(key) ? null : undefined) : Number(form[key]);
  return payload;
};

export default function CampaignPlansAdmin() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const request = useCallback(async (path, options) => {
    const response = await fetch(`${BASE_URL}/api/campaigns/admin/plans${path}`, { credentials: "include", headers: { "Content-Type": "application/json" }, ...options });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "Request failed.");
    return result;
  }, []);

  const load = useCallback(() => request("").then((result) => setPlans(result.plans)).catch((error) => setMessage(error.message)), [request]);
  useEffect(() => { load(); }, [load]);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await request(editingKey ? `/${encodeURIComponent(editingKey)}` : "", { method: editingKey ? "PATCH" : "POST", body: JSON.stringify(toPayload(form)) });
      setForm(null);
      setEditingKey(null);
      setMessage("Plan saved. Changes apply to new bookings only.");
      await load();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (plan) => {
    try {
      await request(`/${encodeURIComponent(plan.key)}`, { method: "PATCH", body: JSON.stringify({ active: !plan.active }) });
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const set = (name) => (event) => setForm({ ...form, [name]: event.target.type === "checkbox" ? event.target.checked : event.target.value });
  const num = (name, label, step = "1") => <label className="campaign-field">{label}<input type="number" min="0" step={step} value={form[name]} onChange={set(name)} /></label>;
  const fixed = form?.pricingType === "fixed";
  const custom = form?.pricingType === "custom";

  return <section className="campaign-section" aria-labelledby="campaign-plans-title">
    <div className="campaign-section-title"><span>PLANS</span><div><h2 id="campaign-plans-title">Campaign plans</h2><p>Plans shown on the booking page. Edits apply to new bookings only; existing bookings keep their snapshot.</p></div></div>
    <div className="campaign-table-wrap"><table className="campaign-table"><thead><tr><th>Order</th><th>Plan</th><th>Type</th><th>Price</th><th>Status</th><th /></tr></thead><tbody>{plans.map((plan) => <tr key={plan.key}>
      <td>{plan.displayOrder}</td><td><strong>{plan.name}</strong><small>{plan.badge}</small></td><td>{plan.pricingType}</td>
      <td>{plan.pricingType === "fixed" ? `₹${plan.price}${plan.monthlyPrice ? ` / ₹${plan.monthlyPrice} monthly` : ""}` : plan.pricingType === "custom" ? `₹${plan.price} flat` : `₹${plan.ratePer1000ViewsPerHour} / 1,000 views / hr`}</td>
      <td><span className={`campaign-pill ${plan.active ? "paid" : "failed"}`}>{plan.active ? "active" : "disabled"}</span></td>
      <td><button type="button" className="campaign-button campaign-button-light" onClick={() => { setForm(toForm(plan)); setEditingKey(plan.key); setMessage(""); }}>Edit</button>{" "}<button type="button" className="campaign-button campaign-button-light" onClick={() => toggle(plan)}>{plan.active ? "Disable" : "Enable"}</button></td>
    </tr>)}</tbody></table></div>
    {!form && <div className="campaign-submit-row"><span role="status">{message}</span><button type="button" className="campaign-button campaign-button-primary" onClick={() => { setForm(EMPTY); setEditingKey(null); setMessage(""); }}>New plan</button></div>}
    {form && <form onSubmit={save}>
      <div className="campaign-grid">
        <label className="campaign-field">Name<input required maxLength={80} value={form.name} onChange={set("name")} /></label>
        <label className="campaign-field">Badge<input maxLength={40} value={form.badge} onChange={set("badge")} /></label>
        <label className="campaign-field">Description<input maxLength={500} value={form.description} onChange={set("description")} /></label>
        <label className="campaign-field">Delivery time<input maxLength={100} value={form.deliveryTime} onChange={set("deliveryTime")} /></label>
        {num("displayOrder", "Display order")}
        <label className="campaign-field">Pricing type<select value={form.pricingType} onChange={set("pricingType")}><option value="fixed">Fixed price (daily / monthly)</option><option value="hourly">Custom views × hours × rate</option><option value="custom">Custom (flat price, no views)</option></select></label>
        <label className="campaign-field">Rate note (shown on plan card)<input maxLength={200} value={form.rateNote} onChange={set("rateNote")} /></label>
        {custom ? <>
          {num("price", "Flat price (INR, pre-tax)", "0.01")}
        </> : fixed ? <>
          {num("views", "Views")}{num("durationMinutes", "Duration (minutes, max 1440)")}{num("price", "Daily / one-time price (INR, pre-tax)", "0.01")}{num("monthlyPrice", "Monthly price (optional)", "0.01")}{num("monthlyDays", "Monthly days")}
        </> : <>
          {num("ratePer1000ViewsPerHour", "Rate per 1,000 views / hour (INR)", "0.01")}{num("defaultViews", "Default views")}{num("minViews", "Min views")}{num("maxViews", "Max views")}
        </>}
        {num("gstRate", "GST % (blank = system default)", "0.01")}{num("processingFeeRate", "Payment processing fee % (blank = system default)", "0.01")}
        <label className="campaign-field"><span><input type="checkbox" checked={form.active} onChange={set("active")} /> Active</span></label>
      </div>
      <div className="campaign-submit-row"><span role="status">{message}</span><span><button type="button" className="campaign-button campaign-button-light" onClick={() => { setForm(null); setEditingKey(null); }}>Cancel</button>{" "}<button type="submit" className="campaign-button campaign-button-primary" disabled={saving}>{saving ? "Saving..." : "Save plan"}</button></span></div>
    </form>}
  </section>;
}
