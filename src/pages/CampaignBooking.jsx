import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/urls";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Clock3, CreditCard, LoaderCircle, ShieldCheck } from "lucide-react";
import "../styles/campaigns.css";

const initialForm = {
  channelName: "", channelId: "", channelUrl: "", campaignStartAt: "", durationHours: "1", durationMinutes: "0",
  requestedViews: "10000", campaignType: "Basic", videoTitle: "", seoKeywords: "", videoTags: "", videoDescription: "", t1: "", t2: "", t3: "", clientNotes: "",
};
const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

function getEstimate(views, type, config) {
  const baseAmount = Number(views) / 1000 * config.rates[type];
  const campaignGst = Math.round(baseAmount * config.gstRate) / 100;
  const subtotal = baseAmount + campaignGst;
  const estimatedRazorpayFee = Math.round(subtotal * config.razorpayFeeRate) / 100;
  const estimatedRazorpayFeeGst = Math.round(estimatedRazorpayFee * config.gstRate) / 100;
  return { baseAmount, campaignGst, subtotal, estimatedRazorpayFee, estimatedRazorpayFeeGst, total: subtotal + estimatedRazorpayFee + estimatedRazorpayFeeGst };
}

async function loadCheckout() {
  if (window.Razorpay) return;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Payment checkout could not be loaded. Check your connection and retry."));
    document.body.appendChild(script);
  });
}

function Field({ label, children, hint, required }) {
  return <label className="campaign-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export default function CampaignBooking() {
  const idempotencyKey = useRef(crypto.randomUUID());
  const [form, setForm] = useState(initialForm);
  const [review, setReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [booking, setBooking] = useState(null);
  const [pricingConfig, setPricingConfig] = useState(null);
  const [pricingError, setPricingError] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/api/campaigns/pricing`).then(async (response) => {
      const config = await response.json();
      if (!response.ok) throw new Error(config.message || "Pricing is unavailable.");
      setPricingConfig(config);
    }).catch((error) => setPricingError(error.message));
  }, []);
  const pricing = pricingConfig ? getEstimate(form.requestedViews, form.campaignType, pricingConfig) : null;
  const minStart = new Date(Date.now() + 30 * 60 * 1000);
  minStart.setMinutes(minStart.getMinutes() - minStart.getTimezoneOffset());
  const localStart = form.campaignStartAt ? new Date(form.campaignStartAt).toLocaleString() : "Not selected";

  const update = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const validate = () => {
    const channelUrl = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/|embed\/)|youtu\.be\/)[\w-]{6,}/i;
    if (!form.channelName.trim() || !form.channelId.trim() || !form.channelUrl.trim() || !form.campaignStartAt) return "Complete each required campaign detail.";
    if (!channelUrl.test(form.channelUrl.trim())) return "Enter a valid YouTube video or live URL.";
    if (new Date(form.campaignStartAt).getTime() < Date.now() + 30 * 60 * 1000) return "Choose a start time at least 30 minutes from now.";
    const duration = Number(form.durationHours) * 60 + Number(form.durationMinutes);
    if (duration < 1 || duration > 1440 || Number(form.durationMinutes) > 59) return "Campaign duration must be between one minute and 24 hours.";
    return "";
  };

  const openPayment = async (existingBooking = booking) => {
    if (!existingBooking) return;
    setBusy(true);
    setMessage("");
    try {
      const orderResponse = await fetch(`${BASE_URL}/api/payments/create-order`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: existingBooking.bookingId, accessToken: existingBooking.accessToken }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.message || "Unable to start payment.");
      await loadCheckout();
      const checkout = new window.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: "SocialBureau", description: `YouTube campaign ${existingBooking.bookingId}`,
        prefill: {}, theme: { color: "#d8fb56" },
        handler: async (paymentResponse) => {
          setBusy(true);
          try {
            const verifyResponse = await fetch(`${BASE_URL}/api/payments/verify`, {
              method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...paymentResponse, bookingId: existingBooking.bookingId, accessToken: existingBooking.accessToken }),
            });
            const verified = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(verified.message || "Payment is awaiting verification.");
            setResult({ kind: "success", campaign: verified.campaign });
            setBooking(null);
          } catch (error) {
            setResult({ kind: "pending", campaign: existingBooking.campaign });
            setMessage(error.message);
          } finally { setBusy(false); }
        },
        modal: { ondismiss: () => { setBusy(false); setResult({ kind: "failure", campaign: existingBooking.campaign }); } },
      });
      checkout.on("payment.failed", (response) => {
        setBusy(false);
        setResult({ kind: "failure", campaign: existingBooking.campaign });
        setMessage(response.error?.description || "Payment did not complete. You can retry this booking.");
      });
      checkout.open();
    } catch (error) {
      setBusy(false);
      setMessage(error.message);
      setResult({ kind: "failure", campaign: existingBooking.campaign });
    }
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) { setMessage(validationError); return; }
    if (booking) { await openPayment(); return; }
    if (!review) { setReview(true); setMessage(""); return; }
    setBusy(true);
    setMessage("");
    try {
      const payload = {
        ...form,
        campaignStartAt: new Date(form.campaignStartAt).toISOString(),
        durationMinutes: Number(form.durationHours) * 60 + Number(form.durationMinutes),
        requestedViews: Number(form.requestedViews),
      };
      delete payload.durationHours;
      const response = await fetch(`${BASE_URL}/api/campaigns`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey.current },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create your booking.");
      const nextBooking = { bookingId: data.campaign.bookingId, accessToken: data.accessToken, campaign: data.campaign };
      setBooking(nextBooking);
      await openPayment(nextBooking);
    } catch (error) {
      setBusy(false);
      setMessage(error.message);
    }
  };

  if (result?.kind === "success") return <main className="campaign-shell"><section className="campaign-result campaign-success"><Check /><p className="campaign-kicker">PAYMENT VERIFIED</p><h1>Your campaign is booked.</h1><p>Booking {result.campaign?.bookingId} is paid and awaiting SocialBureau's campaign review before scheduling.</p><span className="campaign-status">Paid · Pending review</span></section></main>;

  return <main className="campaign-shell">
    <header className="campaign-masthead"><div><p className="campaign-kicker">SOCIALBUREAU / YOUTUBE</p><h1>Campaign booking</h1><p>Plan a paid YouTube promotion campaign. All bookings are reviewed before scheduling.</p></div><div className="campaign-secure"><ShieldCheck size={18} /> Secure checkout <span>INR</span></div></header>
    {result && <section className={`campaign-notice ${result.kind}`} role="status"><CircleAlert size={18} /><div><strong>{result.kind === "pending" ? "Payment verification pending" : "Payment not completed"}</strong><p>{message || (result.kind === "pending" ? "Your booking is saved. Check again or retry payment." : "Your booking is saved and no payment was recorded.")}</p>{booking && <button type="button" className="campaign-button campaign-button-primary" onClick={() => openPayment()} disabled={busy}>{busy ? <LoaderCircle className="spin" /> : <CreditCard size={16} />} Retry payment</button>}</div></section>}
    <div className="campaign-layout">
      <form className="campaign-form" onSubmit={submitBooking}>
        {review && <div className="campaign-review-bar"><span><Check size={16} /> Review your details and total before checkout.</span>{!booking && <button type="button" onClick={() => setReview(false)}><ArrowLeft size={15} /> Edit booking</button>}</div>}
        <fieldset disabled={review || busy || Boolean(booking)}>
          <section className="campaign-section"><div className="campaign-section-title"><span>01</span><div><h2>Campaign details</h2><p>Tell us what to promote and when.</p></div></div>
            <div className="campaign-grid">
              <Field label="YouTube channel name" required><input name="channelName" value={form.channelName} onChange={update} required maxLength={160} /></Field>
              <Field label="YouTube channel ID" required><input name="channelId" value={form.channelId} onChange={update} required maxLength={100} /></Field>
              <Field label="Channel live or video URL" required><input name="channelUrl" type="url" placeholder="https://www.youtube.com/watch?v=..." value={form.channelUrl} onChange={update} required /></Field>
              <Field label="Campaign start (your local time)" required hint={<>Times are saved in UTC. Earliest start: {minStart.toLocaleString()}</>}><input type="datetime-local" name="campaignStartAt" min={minStart.toISOString().slice(0, 16)} value={form.campaignStartAt} onChange={update} required /></Field>
              <Field label="Duration"><div className="campaign-duration"><input aria-label="Hours" type="number" min="0" max="24" value={form.durationHours} onChange={(event) => setForm({ ...form, durationHours: event.target.value })} /><span>hours</span><input aria-label="Minutes" type="number" min="0" max="59" value={form.durationMinutes} onChange={(event) => setForm({ ...form, durationMinutes: event.target.value })} /><span>minutes</span></div></Field>
              <Field label="Requested views"><select name="requestedViews" value={form.requestedViews} onChange={update}>{Array.from({ length: 10 }, (_, index) => (index + 1) * 10000).map((views) => <option key={views} value={views}>{views.toLocaleString("en-IN")} views</option>)}</select></Field>
              <Field label="Campaign type"><select name="campaignType" value={form.campaignType} onChange={update}><option>Basic</option><option>Age-Restricted</option></select></Field>
              <div className="campaign-policy"><Clock3 size={17} /><span>Bookings require at least 30 minutes' notice. Campaigns are subject to policy review; views and rankings are not guaranteed.</span></div>
            </div>
          </section>
          <section className="campaign-section"><div className="campaign-section-title"><span>02</span><div><h2>Video SEO details</h2><p>These are campaign metadata, not a ranking guarantee.</p></div></div>
            <div className="campaign-grid">
              <Field label="Video title"><input name="videoTitle" value={form.videoTitle} onChange={update} maxLength={500} /></Field>
              <Field label="SEO keywords"><textarea name="seoKeywords" value={form.seoKeywords} onChange={update} rows="3" maxLength={5000} placeholder="Enter keywords as you want them preserved" /></Field>
              <Field label="Video tags"><textarea name="videoTags" value={form.videoTags} onChange={update} rows="3" maxLength={5000} /></Field>
              <Field label="Video description"><textarea name="videoDescription" value={form.videoDescription} onChange={update} rows="4" maxLength={10000} /></Field>
              <Field label="T1"><input name="t1" value={form.t1} onChange={update} maxLength={2000} /></Field>
              <Field label="T2"><input name="t2" value={form.t2} onChange={update} maxLength={2000} /></Field>
              <Field label="T3"><input name="t3" value={form.t3} onChange={update} maxLength={2000} /></Field>
              <Field label="Additional campaign notes"><textarea name="clientNotes" value={form.clientNotes} onChange={update} rows="4" maxLength={5000} /></Field>
            </div>
          </section>
        </fieldset>
        {review && <section className="campaign-review-details"><h2>Booking review</h2><dl><dt>Channel</dt><dd>{form.channelName} · {form.channelId}</dd><dt>Video / live URL</dt><dd>{form.channelUrl}</dd><dt>Start</dt><dd>{localStart} (local time)</dd><dt>Duration</dt><dd>{form.durationHours}h {form.durationMinutes}m</dd><dt>Views / type</dt><dd>{Number(form.requestedViews).toLocaleString("en-IN")} · {form.campaignType}</dd></dl></section>}
        {message && !result && <p className="campaign-error" role="alert"><CircleAlert size={16} /> {message}</p>}
        <div className="campaign-submit-row"><span><CreditCard size={16} /> Full payment upfront · no partial payments</span><button className="campaign-button campaign-button-primary" type="submit" disabled={busy || !pricing}>{busy ? <LoaderCircle className="spin" /> : review || booking ? <><CreditCard size={16} /> Proceed to payment</> : <>Review booking <ArrowRight size={16} /></>}</button></div>
      </form>
      <aside className="campaign-price-panel"><div className="price-panel-heading"><span>ESTIMATED TOTAL</span><b>{pricing ? money(pricing.total) : "Loading"}</b><p>INR · full payment upfront</p></div>{pricing ? <div className="price-panel-body"><div><span>{Number(form.requestedViews).toLocaleString("en-IN")} views × {money(pricingConfig.rates[form.campaignType])} / 1,000</span><b>{money(pricing.baseAmount)}</b></div><div><span>Campaign GST ({pricingConfig.gstRate}%)</span><b>{money(pricing.campaignGst)}</b></div><div className="price-subtotal"><span>Subtotal</span><b>{money(pricing.subtotal)}</b></div><div><span>Estimated payment processing ({pricingConfig.razorpayFeeRate}%)</span><b>{money(pricing.estimatedRazorpayFee)}</b></div><div><span>GST on processing fee ({pricingConfig.gstRate}%)</span><b>{money(pricing.estimatedRazorpayFeeGst)}</b></div></div> : <div className="price-panel-body">{pricingError || "Loading current campaign rates..."}</div>}<div className="price-panel-foot"><ShieldCheck size={17} /><p>Processing charges are estimated. Final order amount is calculated and confirmed by our server.</p></div></aside>
    </div>
    <footer className="campaign-footer-note">Age-Restricted is an internal campaign category and does not imply YouTube advertising policy approval.</footer>
  </main>;
}