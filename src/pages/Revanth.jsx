import { useState, useEffect, useRef } from "react";

// Google Fonts loader
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Tailwind-compatible inline style tokens ─── */
const T = {
  red: "#B8001E",
  redMid: "#D4102A",
  redSoft: "rgba(184,0,30,0.07)",
  redBorder: "rgba(184,0,30,0.22)",
  gold: "#9A7B2C",
  goldLight: "#C4A44A",
  goldBg: "rgba(154,123,44,0.07)",
  ink: "#0F0C0A",
  ink2: "#2A2520",
  ink3: "#4A4540",
  cream: "#FAF8F4",
  parchment: "#F2EEE7",
  parchment2: "#E8E3D9",
  border: "#D8D3CA",
  borderLight: "#EAE6DF",
  success: "#0A5C2E",
  successBg: "rgba(10,92,46,0.07)",
  warn: "#7A4A00",
  warnBg: "rgba(122,74,0,0.07)",
  orangeBg: "rgba(220,100,0,0.07)",
  orange: "#7A3800",
};

const serif = "'Cormorant Garamond', serif";
const sans = "'DM Sans', sans-serif";

/* ─── Small helpers ─── */
function ConfBadge({ children }) {
  return (
    <span style={{
      fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
      color: T.redMid, border: `1px solid rgba(212,16,42,0.35)`,
      padding: "3px 10px", borderRadius: 2, display: "inline-block",
      marginBottom: 14, fontFamily: sans
    }}>{children}</span>
  );
}

function CoverMeta({ label, value }) {
  return (
    <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)" }}>
      <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 3, fontFamily: sans }}>{label}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", fontWeight: 500, fontFamily: sans }}>{value}</div>
    </div>
  );
}

function StatCard({ label, value, sub, tag, tagUp }) {
  return (
    <div style={{ background: "#fff", padding: "1rem 1.25rem" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, marginBottom: 4, fontFamily: sans }}>{label}</div>
      <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: T.red, lineHeight: 1, marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: T.ink3, lineHeight: 1.4, fontFamily: sans }}>{sub}</div>
      {tag && (
        <span style={{
          fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 10, display: "inline-block", marginTop: 4,
          background: tagUp ? T.successBg : T.redSoft,
          color: tagUp ? T.success : T.red, fontFamily: sans
        }}>{tag}</span>
      )}
    </div>
  );
}

function InsightBox({ children, variant = "red" }) {
  const bg = variant === "gold" ? T.goldBg : variant === "green" ? T.successBg : T.redSoft;
  const border = variant === "gold" ? T.goldLight : variant === "green" ? T.success : T.red;
  const strongColor = variant === "gold" ? T.gold : variant === "green" ? T.success : T.red;
  return (
    <div style={{
      background: bg, borderLeft: `2px solid ${border}`, padding: "12px 14px",
      borderRadius: "0 4px 4px 0", margin: "1rem 0", fontSize: 12, lineHeight: 1.65,
      color: T.ink2, fontFamily: sans
    }}>
      {typeof children === "string"
        ? <span dangerouslySetInnerHTML={{ __html: children.replace(/<strong>(.*?)<\/strong>/g, `<strong style="color:${strongColor};font-weight:600">$1</strong>`) }} />
        : children}
    </div>
  );
}

function BarRow({ name, width, color, value, nameStyle = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
      <div style={{ fontSize: 11, color: T.ink2, minWidth: 130, flexShrink: 0, fontFamily: sans, ...nameStyle }}>{name}</div>
      <div style={{ flex: 1, height: 5, background: T.parchment2, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 3, background: color, width }} />
      </div>
      <div style={{ fontSize: 10.5, color: T.ink3, minWidth: 52, textAlign: "right", flexShrink: 0, fontFamily: sans, ...nameStyle }}>{value}</div>
    </div>
  );
}

function BenefitCard({ title, body }) {
  return (
    <div style={{ background: T.parchment, border: `0.5px solid ${T.border}`, borderRadius: 4, padding: 13 }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, marginBottom: 5, fontFamily: sans }}>{title}</div>
      <div style={{ fontSize: 11.5, color: T.ink3, lineHeight: 1.55, fontFamily: sans }}>{body}</div>
    </div>
  );
}

function PTag({ type, children }) {
  const styles = {
    brs: { background: T.orangeBg, color: T.orange },
    bjp: { background: "rgba(255,153,0,0.1)", color: "#7A5500" },
    aim: { background: "rgba(0,100,200,0.1)", color: "#004080" },
    rr: { background: T.redSoft, color: T.red },
  };
  return (
    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "0.04em", padding: "2px 7px", borderRadius: 2, fontFamily: sans, ...styles[type] }}>{children}</span>
  );
}

function Dot({ level }) {
  const bg = level === "hi" ? T.red : level === "md" ? T.goldLight : "#4A7A4A";
  return <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", marginRight: 4, background: bg }} />;
}

/* ─── Form Primitives ─── */
function QNum({ n }) {
  return <div style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: T.red, fontWeight: 600, marginBottom: 4, fontFamily: sans }}>{n}</div>;
}
function QLabel({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 4, lineHeight: 1.4, fontFamily: sans }}>{children}</div>;
}
function QHint({ children }) {
  return <div style={{ fontSize: 11.5, color: T.ink3, marginBottom: 10, lineHeight: 1.55, fontStyle: "italic", fontFamily: sans }}>{children}</div>;
}

const inputStyle = {
  width: "100%", background: T.parchment, border: `0.5px solid ${T.border}`, borderRadius: 3,
  color: T.ink, fontFamily: sans, fontSize: 13, padding: "9px 13px",
  outline: "none", boxSizing: "border-box",
};

function TInput({ placeholder, style = {}, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type="text" placeholder={placeholder}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{ ...inputStyle, ...(focus ? { borderColor: T.red, boxShadow: `0 0 0 3px ${T.redSoft}`, background: "#fff" } : {}), ...style }}
    />
  );
}
function EInput({ placeholder, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <input type="email" placeholder={placeholder} onChange={onChange}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ ...inputStyle, ...(focus ? { borderColor: T.red, boxShadow: `0 0 0 3px ${T.redSoft}`, background: "#fff" } : {}) }}
    />
  );
}
function PhoneInput({ placeholder, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <input type="tel" placeholder={placeholder} onChange={onChange}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ ...inputStyle, ...(focus ? { borderColor: T.red, boxShadow: `0 0 0 3px ${T.redSoft}`, background: "#fff" } : {}) }}
    />
  );
}
function TArea({ placeholder, minHeight = 80, style = {}, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea placeholder={placeholder} onChange={onChange}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        ...inputStyle, resize: "vertical", minHeight, lineHeight: 1.6,
        ...(focus ? { borderColor: T.red, boxShadow: `0 0 0 3px ${T.redSoft}`, background: "#fff" } : {}),
        ...style
      }}
    />
  );
}

function RadioOpt({ children, name, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <input
        type="radio"
        name={name}
        onChange={onChange}
      />

      <span>{children}</span>
    </label>
  );
}
function CheckOpt({ children, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        padding: "7px 10px",
        border: "0.5px solid transparent",
        borderRadius: 3,
        cursor: "pointer",
        fontFamily: sans,
      }}
    >
      <input
        type="checkbox"
        onChange={onChange}
        style={{
          marginTop: 2,
          accentColor: T.red,
          flexShrink: 0,
          width: 14,
          height: 14,
          cursor: "pointer",
        }}
      />

      <span
        style={{
          fontSize: 12.5,
          color: T.ink2,
          lineHeight: 1.45,
        }}
      >
        {children}
      </span>
    </label>
  );
}

function PriorityCard({ title, desc, redNote, onToggle }) {
  const [sel, setSel] = useState(false);
  return (
    <div onClick={() => { setSel(!sel); onToggle && onToggle(!sel); }}
      style={{
        padding: "10px 12px", border: `0.5px solid ${sel ? T.red : T.border}`, borderRadius: 3,
        cursor: "pointer", background: sel ? T.redSoft : T.parchment, transition: "all 0.15s"
      }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: sel ? T.red : T.ink, marginBottom: 2, fontFamily: sans }}>{title}</div>
      <div style={{ fontSize: 11, color: T.ink3, lineHeight: 1.35, fontFamily: sans }}
        dangerouslySetInnerHTML={{ __html: redNote ? desc.replace(redNote, `<span style="color:${T.red};font-size:10px">${redNote}</span>`) : desc }} />
    </div>
  );
}

function ScaleBar({ id, onSelect }) {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 2 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => { setSel(n); onSelect && onSelect(n); }}
            style={{
              flex: 1, padding: "8px 4px", textAlign: "center", fontSize: 13,
              color: sel === n ? "#fff" : T.ink3, border: `0.5px solid ${sel === n ? T.red : T.border}`,
              borderRadius: 3, cursor: "pointer", fontFamily: sans, fontWeight: sel === n ? 600 : 400,
              background: sel === n ? T.red : T.parchment, transition: "all 0.15s"
            }}>{n}</button>
        ))}
      </div>
    </div>
  );
}

function QBlock({ children, last = false }) {
  return (
    <div style={{ padding: "14px 0", borderBottom: last ? "none" : `0.5px solid ${T.borderLight}`, paddingBottom: last ? 0 : undefined }}>
      {children}
    </div>
  );
}

/* ─── Accordion Section ─── */
function FormSection({ num, title, badge, children, defaultOpen = false, onToggle }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${T.border}`, borderRadius: 4, marginBottom: "1.25rem", overflow: "hidden" }}>
      <div onClick={() => { setOpen(!open); onToggle && onToggle(!open); }}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 20px", background: T.parchment, borderBottom: open ? `0.5px solid ${T.borderLight}` : "none", cursor: "pointer", userSelect: "none" }}>
        <div style={{ width: 27, height: 27, borderRadius: "50%", background: T.red, color: "#fff", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: serif }}>{num}</div>
        <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: T.ink, flex: 1 }}>{title}</div>
        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 12, background: T.redSoft, color: T.red, fontWeight: 600, flexShrink: 0, fontFamily: sans }}>{badge}</span>
        <span style={{ fontSize: 10, color: T.ink3, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▼</span>
      </div>
      {open && <div style={{ padding: "0 20px 20px" }}>{children}</div>}
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "2rem 0 1.25rem" }}>
      <div style={{ flex: 1, height: 0.5, background: T.borderLight }} />
      <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.ink3, whiteSpace: "nowrap", fontFamily: sans }}>{label}</div>
      <div style={{ flex: 1, height: 0.5, background: T.borderLight }} />
    </div>
  );
}

/* ─── TABLE ─── */
function CompTable() {
  const rows = [
    { leader: "⭐ Telangana CM\nRevanth Reddy (INC)", ig: "1.2M", fb: "1.5M", x: "623.5K", yt: "2.45L subs", handles: "@revanthofficial\n@revanth_anumula", threat: "Current CM", igClass: "mid", fbClass: "mid", xClass: "mid", ytClass: "mid", threatEl: <span style={{ color: T.success, fontWeight: 600 }}>Current CM</span>, isRR: true },
    { leader: "KTR\n(K T Rama Rao)", tag: "brs", ig: "2M ⚠", fb: "High", x: "4.6M ⚠", yt: "Active", handles: "@ktrtrs (IG)\n@KTRBRS (X)", igClass: "hi", fbClass: "mid", xClass: "hi", ytClass: "mid", threatEl: <><Dot level="hi" /><strong>Critical</strong></> },
    { leader: "KCR\n(K Chandrashekar Rao)", tag: "brs", ig: "Very low", fb: "~880K", x: "43.5K", yt: "Inactive", handles: "@KCRBRSPresident (X)\nNo active IG", xSub: "(new handle, inactive)", igClass: "lo", fbClass: "mid", xClass: "lo", ytClass: "lo", threatEl: <><Dot level="md" />Low-medium</> },
    { leader: "Owaisi\n(Asaduddin Owaisi)", tag: "aim", ig: "12M ⚠", fb: "6.5M ⚠", x: "3.2M", yt: "High", handles: "@asadowaisiofficial (IG)\n@asadowaisi (X)", igClass: "hiAlert", fbClass: "hiAlert", xClass: "warnHi", ytClass: "mid", threatEl: <><Dot level="hi" /><strong>Very High (IG)</strong></> },
    { leader: "G Kishan Reddy\nBJP Telangana", tag: "bjp", ig: "256K (personal)\n374K (BJP TS page)", fb: "Moderate", x: "396.6K", yt: "Low", handles: "@gkishanreddyofficial\n@kishanreddybjp (X)", igClass: "lo", fbClass: "mid", xClass: "lo", ytClass: "lo", threatEl: <><Dot level="md" />Medium (BJP IT cell)</> },
  ];
  const colorClass = (c) => {
    if (c === "hi" || c === "hiAlert") return { color: T.red, fontWeight: 600 };
    if (c === "warnHi") return { color: T.warn, fontWeight: 600 };
    if (c === "lo") return { color: T.red };
    return { color: T.warn };
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {["Leader / Party", "Instagram", "Facebook", "X / Twitter", "YouTube", "Handles", "Digital threat"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, background: T.parchment2, borderBottom: `0.5px solid ${T.border}`, fontWeight: 600, fontFamily: sans }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={r.isRR ? { background: "rgba(184,0,30,0.04)" } : {}}>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, color: T.ink, fontWeight: 500, verticalAlign: "top", fontFamily: sans, fontSize: 11.5 }}>
                {r.tag && <><PTag type={r.tag}>{r.tag.toUpperCase()}</PTag>{" "}</>}
                {r.leader.split("\n").map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}
              </td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, ...colorClass(r.igClass) }}>{r.ig.split("\n").map((l, j) => <span key={j}>{l}{j < r.ig.split("\n").length - 1 && <br />}</span>)}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, ...colorClass(r.fbClass) }}>{r.fb}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, ...colorClass(r.xClass) }}>
                {r.x}{r.xSub && <><br /><span style={{ fontSize: 10 }}>{r.xSub}</span></>}
              </td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, ...colorClass(r.ytClass) }}>{r.yt}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 10.5, color: T.ink3 }}>{r.handles.split("\n").map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink2 }}>{r.threatEl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OppTable() {
  const rows = [
    { party: "brs", name: "KTR", attack: "CM uses abusive language; governance failures; dynasty Congress", platforms: "X/Twitter (4.6M), IG (2M), WhatsApp", threat: <><Dot level="hi" /><strong>Critical</strong></>, vuln: "Dynasty tag — KTR inherited power; 0 LS seats in 2024" },
    { party: "brs", name: "KCR", attack: "Absent leader of opposition; CM is anti-Telangana pride", platforms: "Facebook (~880K), declining reach", threat: <><Dot level="md" />Low-Medium</>, vuln: "KCR is digitally dead; 43.5K Twitter — easily countered" },
    { party: "bjp", name: "G Kishan Reddy", attack: "Congress = Owaisi appeasement; anti-Hindu; Delhi puppet", platforms: "National TV + BJP IT cell WhatsApp", threat: <><Dot level="hi" />High — National backing</>, vuln: "No authentic Telugu-first content; local disconnection" },
    { party: "aim", name: "Owaisi", attack: "Congress ignores Old City Hyderabad; broken minority promises", platforms: "IG (12M!), FB (6.5M), X (3.2M)", threat: <><Dot level="hi" />Very High on Instagram</>, vuln: "Old City development content neutralises AIMIM narrative" },
    { party: null, name: "Anonymous trolls / fake accounts", attack: "Morphed images, fabricated quotes, WhatsApp misinformation", platforms: "WhatsApp, anonymous YouTube, X", threat: <><Dot level="hi" />Ongoing daily threat</>, vuln: "Rapid response protocol eliminates within 30 minutes" },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {["Party / Leader", "Primary attack against CM Revanth Reddy", "Active platforms", "Threat level", "Key vulnerability SocialBureau exploits"].map(h => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, background: T.parchment2, borderBottom: `0.5px solid ${T.border}`, fontWeight: 600, fontFamily: sans }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink, fontWeight: 500 }}>
                {r.party && <><PTag type={r.party}>{r.party.toUpperCase()}</PTag>{" "}</>}{r.name}
              </td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink2 }}>{r.attack}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink2 }}>{r.platforms}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink2 }}>{r.threat}</td>
              <td style={{ padding: "9px 10px", borderBottom: `0.5px solid ${T.borderLight}`, verticalAlign: "top", fontFamily: sans, fontSize: 11.5, color: T.ink2 }}>{r.vuln}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Revanth() {
  const [progress, setProgress] = useState(0);
  const [sectionsOpen, setSectionsOpen] = useState(1); // S1 open by default
  const formRef = useRef(null);

  const recalc = () => {
  if (!formRef.current) return;
  const tx = formRef.current.querySelectorAll("input[type=text], input[type=email], input[type=tel], textarea");
  const ra = formRef.current.querySelectorAll("input[type=radio]:checked");
  const cb = formRef.current.querySelectorAll("input[type=checkbox]:checked");
  const raAll = formRef.current.querySelectorAll("input[type=radio]");
  const cbAll = formRef.current.querySelectorAll("input[type=checkbox]");

  let f = 0, t = 0;

  // Text fields
  tx.forEach(i => { t += 3; if (i.value.trim().length > 4) f += 3; });

  // Radio groups (count unique names as 1 question each)
  const radioNames = new Set([...raAll].map(r => r.name));
  t += radioNames.size * 2;
  f += ra.length * 2;

  // Checkboxes (each group worth up to 4 points total)
  t += cbAll.length;
  f += cb.length;

  const p = Math.min(Math.round((f / t) * 100), 100);
  setProgress(p);
};

  const handleSubmit = async () => {
  
  // Collect all form values
  const formData = {};
  if (!formRef.current) return;

  formRef.current.querySelectorAll("input[type=text], input[type=email], input[type=tel], textarea").forEach(el => {
    if (el.placeholder) formData[el.placeholder.slice(0, 40)] = el.value;
  });
  formRef.current.querySelectorAll("input[type=radio]:checked").forEach(el => {
    formData[`radio_${el.name}`] = el.closest("label")?.innerText?.trim();
  });
  formRef.current.querySelectorAll("input[type=checkbox]:checked").forEach(el => {
    const key = `check_${el.closest("label")?.innerText?.trim()?.slice(0, 40)}`;
    formData[key] = true;
  });

  try {
    const res = await fetch("/api/submit-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project: "PRR-2026", submittedAt: new Date(), ...formData }),
    });
    if (res.ok) {
      alert("Thank you — intake received by SocialBureau.\n\nWe will respond within 72 hours.");
    } else {
      alert("Submission failed. Please try again or email sham@socialbureau.in");
    }
  } catch (err) {
    alert("Network error. Please email sham@socialbureau.in directly.");
  }
};

  return (
    <div style={{ fontFamily: sans, background: T.cream, color: T.ink, fontSize: 14, lineHeight: 1.6, minHeight: "100vh", position: "relative" }}>
      {/* Watermark */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%) rotate(-35deg)",
        fontSize: 13, letterSpacing: "0.14em", fontWeight: 600,
        color: "rgba(184,0,30,0.035)", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 0,
        width: "200%", textAlign: "center", fontFamily: sans
      }}>
        CONFIDENTIAL · SOCIALBUREAU · PROJECT REVANTH RISING · CONFIDENTIAL · SOCIALBUREAU · PROJECT REVANTH RISING
      </div>

      <div
  ref={formRef}
  onChange={recalc}
  className="relative z-[1] max-w-5xl mx-auto px-6 py-10"
>

        {/* COVER */}
        <div style={{ background: T.ink, borderRadius: 4, padding: "3rem 2.5rem 2.5rem", marginBottom: "2.5rem", position: "relative", overflow: "hidden" }}>
          <ConfBadge>■ Strictly Confidential · Not for Distribution ■</ConfBadge>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Project <em style={{ color: T.redMid, fontStyle: "normal" }}>Revanth Rising</em><br />Strategic Intelligence Intake
          </h1>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", marginBottom: "2rem", fontFamily: sans }}>SocialBureau API Marketing · Political PR Division · Telangana CM Revanth Reddy</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 1, background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
            <CoverMeta label="Prepared by" value="SocialBureau" />
            <CoverMeta label="Classification" value="Eyes Only · PRR-2026" />
            <CoverMeta label="Subject" value="Telangana CM Revanth Reddy" />
            <CoverMeta label="Sections" value="12 · ~35 minutes" />
          </div>
        </div>

        {/* DATA PANEL 1 */}
        <div style={{ background: "#fff", border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "1.25rem", borderBottom: `0.5px solid ${T.borderLight}`, marginBottom: "1.25rem" }}>
            <div style={{ width: 30, height: 30, borderRadius: 3, background: T.redSoft, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>▲</div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: T.ink }}>Political Digital Research — Why This Project Cannot Wait</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 2, fontFamily: sans }}>Live data on how digital PR wins elections in India and Telangana's current competitive landscape</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))", gap: 1, background: T.borderLight, border: `0.5px solid ${T.border}`, borderRadius: 4, overflow: "hidden", marginBottom: "1rem" }}>
            <StatCard label="Indian voters on social media" value="640M+" sub="Across Instagram, Facebook, WhatsApp, YouTube" tag="↑ 34% since 2022" tagUp />
            <StatCard label="WhatsApp political reach" value="500M" sub="Indians on WhatsApp — highest-trust political channel available" tag="↑ Primary news source for 58% rural voters" tagUp />
            <StatCard label="Telangana internet penetration" value="71%" sub="Of Telangana adults online — every vote is digitally reachable" tag="↑ 19% in 4 years" tagUp />
            <StatCard label="BJP WhatsApp groups (benchmark)" value="5M+" sub="Groups run for election messaging — SocialBureau replicates this for Telangana CM" tag="RR's current: unstructured" tagUp={false} />
          </div>
          <InsightBox><strong>The defining data point:</strong> Oxford Internet Institute researchers called the 2024 Lok Sabha election "a Modi-centric election defined by strategic use of social media." No policy won it — narrative dominance did. SocialBureau's API Marketing (Attract · Pull · Influence) is engineered to build this same dominance for Telangana CM Revanth Reddy across Telangana and all of India.</InsightBox>
        </div>

        {/* DATA PANEL 2 — Social Comparison */}
        <div style={{ background: "#fff", border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "1.25rem", borderBottom: `0.5px solid ${T.borderLight}`, marginBottom: "1.25rem" }}>
            <div style={{ width: 30, height: 30, borderRadius: 3, background: T.redSoft, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>◎</div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: T.ink }}>Verified Social Media Numbers — Telangana CM Revanth Reddy vs All Opposition Leaders</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 2, fontFamily: sans }}>All figures verified from official social profiles. Data as of May 2026.</div>
            </div>
          </div>
          <CompTable />
          <InsightBox><strong>The three urgent gaps to close:</strong> (1) KTR's 4.6M Twitter and 2M Instagram vs Telangana CM Revanth Reddy's 623.5K and 1.2M — a 7x and 1.7x gap respectively. (2) Owaisi's 12M Instagram is massive and largely unchallenged by INC content in Hyderabad. (3) Telangana CM Revanth Reddy's YouTube at only 2.45 lakh subscribers is critically underserved — YouTube is the TV of rural Telangana.</InsightBox>

          <div style={{ marginTop: "0.75rem" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, marginBottom: 8, fontFamily: sans }}>Twitter/X follower comparison — verified May 2026</div>
            <BarRow name="KTR (BRS)" width="100%" color="#9A4A00" value="4.6M" />
            <BarRow name="Owaisi (AIMIM)" width="69%" color="#666" value="3.2M" />
            <BarRow name="G Kishan Reddy (BJP)" width="8.6%" color="#888" value="396.6K" />
            <BarRow name="CM Revanth Reddy" width="13.5%" color={T.red} value="623.5K" nameStyle={{ color: T.red, fontWeight: 600 }} />
            <BarRow name="KCR (BRS)" width="0.9%" color="#AAA" value="43.5K" />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, marginBottom: 8, fontFamily: sans }}>Instagram follower comparison — verified May 2026</div>
            <BarRow name="Owaisi (AIMIM)" width="100%" color="#666" value="12M" />
            <BarRow name="KTR (BRS)" width="16.7%" color="#9A4A00" value="2M" />
            <BarRow name="CM Revanth Reddy" width="10%" color={T.red} value="1.2M" nameStyle={{ color: T.red, fontWeight: 600 }} />
            <BarRow name="BJP Telangana" width="3.1%" color="#888" value="374K" />
            <BarRow name="KCR (BRS)" width="0.1%" color="#AAA" value="Minimal" />
          </div>

          <InsightBox variant="green"><strong>The opportunity hiding in plain sight:</strong> KCR's digital presence has collapsed — only 43.5K Twitter followers on his new handle and virtually no Instagram. The BRS "leader" is digitally dead. Telangana CM Revanth Reddy has already surpassed KCR on every platform. The real battle is closing the gap with KTR and countering Owaisi's massive Instagram reach.</InsightBox>
        </div>

        {/* DATA PANEL 3 — SocialBureau Benefits */}
        <div style={{ background: "#fff", border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "1.25rem", borderBottom: `0.5px solid ${T.borderLight}`, marginBottom: "1.25rem" }}>
            <div style={{ width: 30, height: 30, borderRadius: 3, background: T.redSoft, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>◆</div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: T.ink }}>Why SocialBureau API Marketing — Exclusive Benefits for Telangana CM Revanth Reddy</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 2, fontFamily: sans }}>What no other PR or digital agency in Telangana can deliver</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
            <BenefitCard title="Attract — Algorithm-First Content" body="Content engineered for Instagram, YouTube and Facebook algorithms — not just designed to look good. Every post optimised for maximum organic reach before any paid spend." />
            <BenefitCard title="Pull — Emotional Narrative Building" body="We don't post updates. We tell stories that make citizens feel something. Emotionally connected citizens vote AND bring five others with them." />
            <BenefitCard title="Influence — Volunteer Amplification" body="A trained network of digital volunteers across all 33 districts amplifying every post within minutes. The same infrastructure that gives BJP its WhatsApp dominance — rebuilt for Telangana." />
            <BenefitCard title="AEO — Answer Engine Optimisation" body="When anyone searches 'Telangana CM' on Google, ChatGPT or Perplexity — Telangana CM Revanth Reddy's official narrative appears first. SocialBureau controls what AI says about him." />
            <BenefitCard title="GEO — Generative Engine Optimisation" body="Structured content training AI systems to describe Telangana CM Revanth Reddy accurately and favourably. The next generation searches on AI — his brand must be AI-native." />
            <BenefitCard title="Reputation Shield 24/7" body="30-minute rapid counter-narrative system. When BRS or BJP posts an attack, SocialBureau's response is live before the story can trend — 365 days a year, no exceptions." />
          </div>
          <InsightBox variant="gold" style={{ marginTop: "1rem" }}><strong>The unfair advantage:</strong> SocialBureau holds verified official partnerships with Google, Meta, YouTube, and Instagram — as Kerala's first and India's only API Marketing agency. Telangana CM Revanth Reddy's campaign gets platform-level support and data access that no opposition campaign in Telangana can match. This is the asymmetric advantage that makes this project unbeatable.</InsightBox>
        </div>

        {/* DATA PANEL 4 — Opposition Monitor */}
        <div style={{ background: "#fff", border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "1.25rem", borderBottom: `0.5px solid ${T.borderLight}`, marginBottom: "1.25rem" }}>
            <div style={{ width: 30, height: 30, borderRadius: 3, background: T.redSoft, border: `0.5px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>■</div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: T.ink }}>Opposition Intelligence Monitor — What SocialBureau Tracks Daily</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 2, fontFamily: sans }}>Every competing party's live digital activity, attack narratives, and threat level — monitored and countered in real time</div>
            </div>
          </div>
          <OppTable />
        </div>

        {/* FORM SECTIONS */}
        <SectionDivider label="Client intake questionnaire — 12 sections — ~35 minutes" />

        {/* S1 */}
        <FormSection num="1" title="Project basics & access details" badge="Foundation" defaultOpen={true} onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 1.1</QNum>
            <QLabel>Who is the primary decision-maker and day-to-day liaison for this project on Telangana CM Revanth Reddy's team?</QLabel>
            <QHint>Name, designation, secure phone number, and email. SocialBureau communicates exclusively through this contact for all confidential strategy materials.</QHint>
            <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  }}
>
  <TInput
    placeholder="Full name & official designation"
    onChange={recalc}
  />
  <PhoneInput
    placeholder="Secure mobile number"
    onChange={recalc}
  />
</div>

<EInput
  placeholder="Email address"
  onChange={recalc}
/>
          </QBlock>
          <QBlock>
            <QNum>Q 1.2</QNum>
            <QLabel>What is the primary political milestone SocialBureau must deliver results by?</QLabel>
            <QHint>Next Telangana Assembly election expected ~2028. List any earlier milestones — GHMC, by-polls, Lok Sabha 2029 — that require a pre-campaign digital build-up.</QHint>
            <TInput placeholder="Primary target: e.g. Telangana Assembly 2028 · Intermediate: GHMC 2026 · National: LS 2029" onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 1.3</QNum>
            <QLabel>What is the monthly project investment range?</QLabel>
            <QHint>Determines influencer tier, production scale, paid boost allocation, and dedicated SocialBureau team size for this project.</QHint>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="budget" onChange={recalc}><strong>Tier 1 — Under ₹5 lakh/month:</strong> Core content creation + WhatsApp community only</RadioOpt>
              <RadioOpt name="budget" onChange={recalc}><strong>Tier 2 — ₹5–15 lakh/month:</strong> Full 5-platform management + micro-influencer network</RadioOpt>
              <RadioOpt name="budget" onChange={recalc}><strong>Tier 3 — ₹15–40 lakh/month:</strong> Full video production + macro influencers + paid reach + district coordinators</RadioOpt>
              <RadioOpt name="budget" onChange={recalc}><strong>Tier 4 — ₹40 lakh–₹1 crore/month:</strong> State-scale war room with full production and celebrity partnerships</RadioOpt>
              <RadioOpt name="budget" onChange={recalc}><strong>Tier 5 — ₹1 crore+/month:</strong> Election-grade full-spectrum campaign — TV, OTT, digital, events</RadioOpt>
              <RadioOpt name="budget" onChange={recalc}>Prefer to discuss directly in a confidential call with SocialBureau</RadioOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 1.4</QNum>
            <QLabel>What level of access will SocialBureau have to Telangana CM Revanth Reddy's official social profiles?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="access" onChange={recalc}><strong>Full admin access:</strong> SocialBureau posts directly — fastest execution, maximum impact</RadioOpt>
              <RadioOpt name="access" onChange={recalc}><strong>Editor access with 4-hour approval window:</strong> SocialBureau creates, team approves via WhatsApp, then posts</RadioOpt>
              <RadioOpt name="access" onChange={recalc}><strong>Content delivery only:</strong> SocialBureau delivers daily content kits; RR's in-house team publishes</RadioOpt>
            </div>
          </QBlock>
          <QBlock last>
            <QNum>Q 1.5</QNum>
            <QLabel>Are there any other agencies or consultants currently working on Telangana CM Revanth Reddy's digital presence?</QLabel>
            <TArea placeholder="Names, roles, and what they currently manage — SocialBureau needs to understand the existing ecosystem to avoid duplication..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S2 */}
        <FormSection num="2" title="Governance achievements & proof points" badge="Positive Story" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 2.1</QNum>
            <QLabel>What are Telangana CM Revanth Reddy's 10 biggest governance achievements since December 2023?</QLabel>
            <QHint>Scheme name, districts covered, beneficiary numbers, funds allocated. These become the "Built for Telangana" content backbone — the most powerful trust-building content in political social media.</QHint>
            <TArea placeholder={"1. Women Digital Family Card — X lakh families, women as household head\n2. DSC 2024 — X thousand teacher appointments\n3. [Infrastructure] — district, scale, beneficiaries\n4. \n5. \n6. \n7. \n8. \n9. \n10."} minHeight={150} onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 2.2</QNum>
            <QLabel>Key welfare schemes targeting women, farmers, and youth — the three most critical voter segments?</QLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <TArea placeholder="Women — scheme name, beneficiary numbers, real stories" minHeight={100} onChange={recalc} />
              <TArea placeholder="Farmers — Rythu Bandhu, MSP, debt relief, numbers" minHeight={100} onChange={recalc} />
            </div>
            <TArea placeholder="Youth — jobs created, DSC, education, startups, sports..." style={{ marginTop: 8 }} onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 2.3</QNum>
            <QLabel>Has Telangana received national rankings, awards, or major investment commitments under Telangana CM Revanth Reddy?</QLabel>
            <QHint>Ease of doing business ranking, Telangana Rising 2047 summit investment figures, central scheme awards, national media coverage. Critical for national-positioning content.</QHint>
            <TArea placeholder="Award / ranking / recognition / ₹ investment committed — source and date..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 2.4</QNum>
            <QLabel>Infrastructure recently completed — roads, hospitals, schools, flyovers, water projects?</QLabel>
            <QHint>Project name, district, scale, completion date, and whether before/after photo or video documentation is available. Before/after content is SocialBureau's highest-performing Reels format.</QHint>
            <TArea placeholder="Project — District — Scale — Completion date — Documentation available (Y/N)..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 2.5</QNum>
            <QLabel>Which 8–10 districts have the most visible, photographable development work happening right now?</QLabel>
            <QHint>These become the first "RR in Your District" hyper-local content — targeted posts making each constituency's voters feel personally included.</QHint>
            <TInput placeholder="e.g. Nalgonda, Khammam, Nizamabad, Mahboobnagar, Warangal, Siddipet, Rangareddy..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S3 */}
        <FormSection num="3" title="Personal brand, personality & human storytelling" badge="Human Story" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 3.1</QNum>
            <QLabel>Describe Telangana CM Revanth Reddy in 5 authentic words — the real human being, not the political persona.</QLabel>
            <QHint>Trump won on personality, not policy. Modi's "tea seller son" story won hearts. What is Telangana CM Revanth Reddy's equivalent — the authentic human qualities that make people love him? This defines every creative decision SocialBureau makes.</QHint>
            <TInput placeholder="e.g. Fearless, passionate, direct, relentless, warm — in your own words..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 3.2</QNum>
            <QLabel>What are Telangana CM Revanth Reddy's genuine personal interests, habits, and passions outside politics?</QLabel>
            <QHint>Football and movies are publicly known. Morning routine? Favourite Telugu dish? Places in Telangana that personally moved him? Family moments he's willing to share? These create the most-shared "human CM" content.</QHint>
            <TArea placeholder="Sports, food, places, family, hobbies, cultural interests, morning habits, things he does off-camera..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 3.3</QNum>
            <QLabel>Are there powerful personal stories from Telangana CM Revanth Reddy's life he's comfortable making public?</QLabel>
            <QHint>His Nagarkurnool village childhood. First political win as an independent (2006). The 2018 Kodangal defeat and comeback to CM. A citizen who personally moved him. A moment of doubt that he overcame. These create lifelong voters.</QHint>
            <TArea placeholder="Stories from his background or political journey that have resonated with audiences in speeches or private conversations..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 3.4</QNum>
            <QLabel>What is the single belief Telangana CM Revanth Reddy wants every Telangana citizen to hold about him?</QLabel>
            <QHint>This becomes the north star — every piece of content must reinforce this belief. In one sentence.</QHint>
            <TInput placeholder="e.g. 'He fights for ordinary people.' or 'He always delivers.' or 'He is Telangana.' — one sentence..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 3.5</QNum>
            <QLabel>What content format is Telangana CM Revanth Reddy most comfortable and natural in?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}>Unscripted direct-to-camera — raw, honest, no teleprompter</CheckOpt>
              <CheckOpt onChange={recalc}>Interview format — responding to questions from a host</CheckOpt>
              <CheckOpt onChange={recalc}>On-site field visits — speaking while walking through projects or meeting citizens</CheckOpt>
              <CheckOpt onChange={recalc}>Rally energy — most powerful with a live audience</CheckOpt>
              <CheckOpt onChange={recalc}>Scripted prepared address — comfortable with teleprompter</CheckOpt>
              <CheckOpt onChange={recalc}>Candid moments captured by a dedicated content team following him</CheckOpt>
            </div>
          </QBlock>
        </FormSection>

        {/* S4 */}
        <FormSection num="4" title="Platform strategy, third-party channels & content priorities" badge="Channels" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 4.1</QNum>
            <QLabel>Which platforms are most urgent to dominate first? Click all that apply.</QLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(138px,1fr))", gap: 7, marginTop: 8 }}>
              {[
                { title: "Instagram", desc: "Reels, Stories — 18–40 urban voters", note: "Current: 1.2M" },
                { title: "Facebook", desc: "Posts, Groups — 35+ rural voters", note: "Current: 1.5M" },
                { title: "WhatsApp", desc: "Broadcast community — highest trust channel" },
                { title: "YouTube", desc: "Long-form + Shorts — CM Speaks series", note: "Current: 2.45L subs — urgent growth" },
                { title: "X / Twitter", desc: "National media, real-time response", note: "Current: 623.5K" },
                { title: "Telegram", desc: "Secure broadcast for party workers" },
                { title: "Threads", desc: "Instagram's Twitter — fast-growing" },
                { title: "Google Search", desc: "SEO + Google News dominance" },
                { title: "ShareChat", desc: "Telugu vernacular — rural reach" },
                { title: "Moj / Josh", desc: "Short-video — 18–30 rural youth" },
                { title: "LinkedIn", desc: "Business community + NRI + national elite" },
                { title: "AI Engines", desc: "ChatGPT, Perplexity — AEO/GEO presence" },
              ].map((p, i) => {
                const desc = p.note
                  ? `${p.desc}<br/><span style="color:${T.red};font-size:10px">${p.note}</span>`
                  : p.desc;
                return <PriorityCard key={i} title={p.title} desc={desc} onToggle={recalc} />;
              })}
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 4.2</QNum>
            <QLabel>Third-party media ecosystems and platforms — which should SocialBureau penetrate to amplify Telangana CM Revanth Reddy?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Telugu news YouTube channels</strong> — TV9 Telugu, ABN Andhra Jyothi, NTV, Sakshi TV, 10TV digital arms</CheckOpt>
              <CheckOpt onChange={recalc}><strong>National English media digital</strong> — The Hindu, NDTV, India Today, The Wire online editions</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Political news portals</strong> — The Print, Newslaundry, The Wire, Quint — for national credibility</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Telugu digital-native portals</strong> — Sakshi, Eenadu online, Prajasakti digital editions</CheckOpt>
              <CheckOpt onChange={recalc}><strong>AI Answer Engines</strong> — Google AI Overview, ChatGPT, Perplexity — AEO and GEO positioning</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Wikipedia maintenance</strong> — Telangana CM Revanth Reddy's Wikipedia must be accurate, comprehensive, and sourced</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Reddit India / Quora</strong> — organic narrative building among educated, influential audiences</CheckOpt>
              <CheckOpt onChange={recalc}><strong>NRI diaspora platforms</strong> — NRI Facebook groups, diaspora YouTube communities, LinkedIn NRI networks</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Podcast platforms</strong> — Spotify, JioSaavn, Google Podcasts — audio presence for Telangana CM Revanth Reddy</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Google Business & Maps</strong> — CM's office and constituency presence verified and optimised for local search</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 4.3</QNum>
            <QLabel>How often can Telangana CM Revanth Reddy realistically appear on camera each week?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="cam" onChange={recalc}><strong>Daily (7x/week)</strong> — fully comfortable on camera every day</RadioOpt>
              <RadioOpt name="cam" onChange={recalc}><strong>High frequency (4–5x/week)</strong> — most days, some off-camera production days</RadioOpt>
              <RadioOpt name="cam" onChange={recalc}><strong>Moderate (2–3x/week)</strong> — quality over quantity, reserved for key content moments</RadioOpt>
              <RadioOpt name="cam" onChange={recalc}><strong>Low (once a week)</strong> — tight schedule; primarily governance and behind-the-scenes content otherwise</RadioOpt>
            </div>
          </QBlock>
          <QBlock last>
            <QNum>Q 4.4</QNum>
            <QLabel>Content language strategy — select all required.</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Telugu (Primary)</strong> — all Telangana-facing content, WhatsApp, Facebook, local YouTube</CheckOpt>
              <CheckOpt onChange={recalc}><strong>English</strong> — Twitter, LinkedIn, national media, Hyderabad tech and business community</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Hindi</strong> — national BJP counter-narrative, UP/Bihar diaspora in Hyderabad, national visibility</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Urdu</strong> — Old Hyderabad, minority community trust-building, counter to AIMIM/BJP communal framing</CheckOpt>
            </div>
          </QBlock>
        </FormSection>

        {/* S5 */}
        <FormSection num="5" title="Local MLA, party member & community mobilisation" badge="Ground Network" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 5.1</QNum>
            <QLabel>Which Congress MLAs are digitally active and willing to cross-amplify Telangana CM Revanth Reddy's content?</QLabel>
            <QHint>SocialBureau builds a cross-amplification network — when Telangana CM Revanth Reddy posts, all allied MLAs reshare simultaneously. This is exactly how BJP's WhatsApp cabinet coordination works. Names, handles, and current social media reach needed.</QHint>
            <TArea placeholder="MLA name — constituency — Twitter handle — Instagram handle — estimated reach — willing to participate (Y/N)..." minHeight={100} onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 5.2</QNum>
            <QLabel>Who are the most locally influential Congress leaders in each district who could become "Revanth Reddy Digital Ambassadors"?</QLabel>
            <QHint>These are district-level faces who post local content, run WhatsApp groups, and make Telangana CM Revanth Reddy synonymous with local development. Credibility within the district matters more than follower count.</QHint>
            <TArea placeholder="District — Name — Role (MLA/ZPTC/MPP/Party worker) — Local community reach — Current social activity..." minHeight={100} onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 5.3</QNum>
            <QLabel>Which party wings can be activated as digital amplifiers?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>NSUI</strong> — National Students' Union of India, student mobilisation across Telangana colleges</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Mahila Congress</strong> — women's wing with district-level presence across Telangana</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Youth Congress</strong> — 18–35 youth ground network for digital activation</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Seva Dal</strong> — Congress social service volunteers</CheckOpt>
              <CheckOpt onChange={recalc}><strong>DCC social media cells</strong> — District Congress Committee digital teams, currently uncoordinated</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 5.4</QNum>
            <QLabel>How organised is the existing WhatsApp group infrastructure?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="wa" onChange={recalc}><strong>Highly organised:</strong> state → district → mandal → booth hierarchy with coordinators at each level</RadioOpt>
              <RadioOpt name="wa" onChange={recalc}><strong>Partially organised:</strong> district-level groups exist but coordination is inconsistent</RadioOpt>
              <RadioOpt name="wa" onChange={recalc}><strong>Informal:</strong> groups exist organically but are not centrally managed or content-fed</RadioOpt>
              <RadioOpt name="wa" onChange={recalc}><strong>Needs to be built from scratch:</strong> SocialBureau to design the complete architecture</RadioOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 5.5</QNum>
            <QLabel>How many total supporters could be enrolled in the "Revanth Reddy Digital Sena" volunteer amplification army?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="sena" onChange={recalc}>Under 5,000 currently reachable</RadioOpt>
              <RadioOpt name="sena" onChange={recalc}>5,000 – 25,000 — district-level coverage</RadioOpt>
              <RadioOpt name="sena" onChange={recalc}>25,000 – 1 lakh — mandal-level coverage</RadioOpt>
              <RadioOpt name="sena" onChange={recalc}>1 lakh – 5 lakh — booth-level coverage across Telangana</RadioOpt>
              <RadioOpt name="sena" onChange={recalc}>5 lakh+ — full state-scale digital ground army</RadioOpt>
            </div>
          </QBlock>
          <QBlock last>
            <QNum>Q 5.6</QNum>
            <QLabel>Are there local community leaders — panchayat heads, religious leaders, teachers, doctors — in key constituencies who respect Telangana CM Revanth Reddy and could be informal digital ambassadors?</QLabel>
            <QHint>These trusted local voices carry more credibility than any paid influencer in rural Telangana. A local doctor or schoolteacher sharing Revanth Reddy's content in their village WhatsApp group is worth 10,000 platform followers.</QHint>
            <TArea placeholder="District — Community type — Leader name — Local influence level — Existing relationship with Telangana CM Revanth Reddy's office..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S6 */}
        <FormSection num="6" title="NRI & global diaspora community strategy" badge="Global Reach" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 6.1</QNum>
            <QLabel>Does Telangana CM Revanth Reddy have existing relationships with NRI/diaspora Telangana communities abroad?</QLabel>
            <QHint>Telugu NRI communities in USA (Silicon Valley, Dallas, New Jersey), UK, Australia, Gulf countries, and Canada are among India's most politically engaged diaspora. They vote in Indian elections, send remittances home, and have massive WhatsApp reach back to their home districts.</QHint>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="nri" onChange={recalc}><strong>Strong existing ties</strong> — visited NRI events abroad, known contacts in diaspora organisations</RadioOpt>
              <RadioOpt name="nri" onChange={recalc}><strong>Moderate</strong> — some connections, occasional interactions, no structured outreach</RadioOpt>
              <RadioOpt name="nri" onChange={recalc}><strong>Minimal</strong> — NRI outreach is an untapped opportunity SocialBureau should build from scratch</RadioOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 6.2</QNum>
            <QLabel>Which NRI community hubs should SocialBureau prioritise for digital outreach?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>USA — Silicon Valley / Bay Area:</strong> Largest Telugu NRI tech community; highly influential on LinkedIn and Twitter</CheckOpt>
              <CheckOpt onChange={recalc}><strong>USA — Dallas / Houston / New Jersey:</strong> Second largest Telugu NRI concentration; strong WhatsApp political groups</CheckOpt>
              <CheckOpt onChange={recalc}><strong>UK — London / Birmingham:</strong> Telangana diaspora with direct family voting connections back home</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Australia — Sydney / Melbourne:</strong> Growing Telugu community, highly active on Facebook and YouTube</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Gulf — UAE / Saudi / Kuwait / Qatar:</strong> Large Telangana working-class diaspora; strongest WhatsApp political sentiment</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Canada — Toronto / Vancouver:</strong> Growing Telugu student and professional community</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Singapore / Malaysia:</strong> South Indian diaspora with Telangana political awareness</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 6.3</QNum>
            <QLabel>What type of NRI content and engagement should SocialBureau prioritise?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Investment and economic content</strong> — Telangana's business climate, startup ecosystem, Hyderabad as global destination</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Home district development" updates</strong> — targeted content showing development in each NRI's specific home district</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Telangana CM Revanth Reddy virtual town halls with NRI communities</strong> — monthly YouTube/Zoom interactions</CheckOpt>
              <CheckOpt onChange={recalc}><strong>NRI community recognition content</strong> — spotlighting successful Telangana NRIs and their connection to home</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Telangana pride cultural content</strong> — festivals, heritage, culture to keep diaspora emotionally connected</CheckOpt>
              <CheckOpt onChange={recalc}><strong>LinkedIn English content</strong> — for NRI professionals who follow Indian politics through English-language media</CheckOpt>
            </div>
          </QBlock>
          <QBlock last>
            <QNum>Q 6.4</QNum>
            <QLabel>Are there prominent Telugu NRIs — business leaders, tech executives, academics — who could publicly endorse Telangana CM Revanth Reddy's development vision?</QLabel>
            <QHint>A LinkedIn post from a Silicon Valley CEO praising Telangana's governance reaches hundreds of thousands of educated voters more credibly than any paid ad. List any NRI personalities who have positive relationships with Telangana CM Revanth Reddy.</QHint>
            <TArea placeholder="Name — location — profession — relationship with Telangana CM Revanth Reddy — estimated LinkedIn/Twitter influence..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S7 */}
        <FormSection num="7" title="Influencer, media & podcast partnership strategy" badge="Amplification" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 7.1</QNum>
            <QLabel>Is Telangana CM Revanth Reddy open to appearing on Telugu YouTube channels and podcasts?</QLabel>
            <QHint>Trump won the 2024 youth vote through unscripted podcasts. Rahul Gandhi's Bharat Jodo reach exploded through YouTube conversations. This is the highest-trust, highest-engagement format available. SocialBureau has a ready shortlist of recommended Telugu channels.</QHint>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="pod" onChange={recalc}><strong>Yes — fully open:</strong> bring SocialBureau's shortlist for immediate scheduling</RadioOpt>
              <RadioOpt name="pod" onChange={recalc}><strong>Yes but selective:</strong> only channels with 500K+ subscribers and credible, non-partisan reputation</RadioOpt>
              <RadioOpt name="pod" onChange={recalc}><strong>Needs discussion:</strong> concerns about editorial control — let's align on boundaries first</RadioOpt>
              <RadioOpt name="pod" onChange={recalc}><strong>Not yet:</strong> prefers controlled interview settings; reassess in 6 months</RadioOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 7.2</QNum>
            <QLabel>Which influencer categories should SocialBureau activate for Telangana CM Revanth Reddy?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Telugu cinema personalities</strong> — actors, directors with political consciousness and state-wide reach</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Telugu YouTube news & political analysis channels</strong> — creators with 100K–5M subscribers</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Women Telugu influencers</strong> — lifestyle, education, health creators who reach women voters authentically</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Farmers and agriculture influencers</strong> — rural YouTubers trusted by farming communities in all 33 districts</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Hyderabad tech and startup community</strong> — founders and professionals on LinkedIn and Twitter</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Sports personalities</strong> — Telangana athletes, coaches, IPL and sports community figures</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Religious and community leaders</strong> — trusted voices across all communities with ground-level respect</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Student leaders and campus influencers</strong> — Osmania, HCU, JNTU, and major university leaders</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 7.3</QNum>
            <QLabel>Are there specific influencers or media personalities Telangana CM Revanth Reddy has existing positive relationships with?</QLabel>
            <TArea placeholder="Name — platform — follower count — nature of existing relationship..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 7.4</QNum>
            <QLabel>Are there journalists, editors, or media organisations SocialBureau should include in the relationship-building programme?</QLabel>
            <TArea placeholder="Telugu and national media contacts — name, outlet, beat (politics/development/economy)..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S8 */}
        <FormSection num="8" title="Voter audience targeting & community priorities" badge="Targeting" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 8.1</QNum>
            <QLabel>Which voter segments are most critical to win or retain for the next election?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Rural farming communities</strong> — highest population segment; WhatsApp and Facebook-first</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Urban youth / first-time voters (18–28)</strong> — Instagram and YouTube-native; currently disengaged</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Women voters (all age groups)</strong> — most under-served by political social media; highest conversion potential</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Hyderabad urban middle class & tech workers</strong> — Twitter/LinkedIn; swing voters with high cultural influence</CheckOpt>
              <CheckOpt onChange={recalc}><strong>OBC communities</strong> — BC welfare schemes must be visible and personal for these voters</CheckOpt>
              <CheckOpt onChange={recalc}><strong>SC/ST communities</strong> — Dalit welfare, reservations protection, social justice content</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Minority communities (Muslim, Christian)</strong> — inclusive governance; counter BJP/AIMIM polarisation framing</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Business community & industry leaders</strong> — LinkedIn, economic content, investment climate</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Congress grassroots party workers</strong> — volunteer training, party pride, Revanth Reddy Digital Sena mobilisation</CheckOpt>
              <CheckOpt onChange={recalc}><strong>NRI / Telugu diaspora globally</strong> — LinkedIn, English YouTube, diaspora Facebook groups</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 8.2</QNum>
            <QLabel>Which districts are currently weak for Congress and need the most digital outreach investment?</QLabel>
            <TInput placeholder="e.g. Nizamabad, Adilabad, Karimnagar, Peddapally — and why each is challenging..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 8.3</QNum>
            <QLabel>Are there specific communities requiring a customised content approach?</QLabel>
            <TArea placeholder="Community — current relationship with Telangana CM Revanth Reddy — content sensitivity needed — specific issues important to this group..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S9 */}
        <FormSection num="9" title="Opposition monitoring & reputation defence" badge="Shield" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 9.1</QNum>
            <QLabel>What are the top 5 attack narratives being run against Telangana CM Revanth Reddy right now?</QLabel>
            <QHint>The exact phrases, hashtags, or WhatsApp messages circulating. SocialBureau pre-builds a counter-content bank for each narrative before it goes viral.</QHint>
            <TArea placeholder={"1. BRS narrative: exact claim + platforms + estimated reach\n2. BJP narrative: exact claim + context\n3. AIMIM narrative:\n4. WhatsApp misinformation circulating:\n5. Any past controversy being revived:"} minHeight={110} onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 9.2</QNum>
            <QLabel>Are there past legal cases, statements, or events that opposition regularly weaponises against Telangana CM Revanth Reddy?</QLabel>
            <QHint>For defensive planning only — strictly confidential, never for public content. Knowing what exists allows pre-built counter-narratives before attacks happen. Information stays within SocialBureau's dedicated project team only.</QHint>
            <TArea placeholder="Cases, statements, or events — and the factual context that counters the opposition narrative..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 9.3</QNum>
            <QLabel>What is the current rapid-response infrastructure when a false story breaks?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="resp" onChange={recalc}><strong>Structured war room:</strong> dedicated team, 24/7 monitoring, 30-minute counter protocol already active</RadioOpt>
              <RadioOpt name="resp" onChange={recalc}><strong>Informal coordination:</strong> some party staff respond but no defined system or SLAs</RadioOpt>
              <RadioOpt name="resp" onChange={recalc}><strong>Fully reactive:</strong> responses happen hours or days later — this is the gap SocialBureau fills immediately</RadioOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 9.4</QNum>
            <QLabel>Which social media accounts, YouTube channels, or WhatsApp groups are primary vectors for anti-Telangana CM Revanth Reddy content?</QLabel>
            <TArea placeholder="Account handles, channel names, or group identifiers known to regularly post anti-CM content..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 9.5</QNum>
            <QLabel>Is there an active attack campaign right now that needs SocialBureau's immediate counter-strategy?</QLabel>
            <TArea placeholder="Describe the narrative, platforms it's active on, estimated spread, and how long it has been circulating..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S10 */}
        <FormSection num="10" title="SocialBureau API Marketing service configuration" badge="Execution" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 10.1</QNum>
            <QLabel>Which SocialBureau API Marketing services are highest priority for Phase 1 of this project?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>Attract — Content Production Engine:</strong> daily multi-platform content — graphics, Reels scripts, captions, WhatsApp cards</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Pull — Video Production & Storytelling:</strong> full video production — CM Speaks, development documentaries, Reels</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Influence — Community Management:</strong> WhatsApp broadcast, Facebook group management, volunteer coordination</CheckOpt>
              <CheckOpt onChange={recalc}><strong>AEO (Answer Engine Optimisation):</strong> Google, ChatGPT, Perplexity — control what AI says about Telangana CM Revanth Reddy</CheckOpt>
              <CheckOpt onChange={recalc}><strong>GEO (Generative Engine Optimisation):</strong> structured content training AI systems on the accurate brand narrative</CheckOpt>
              <CheckOpt onChange={recalc}><strong>SEO & Google News dominance:</strong> "Telangana CM" and "Revanth Reddy" keyword ownership on Google Search</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Reputation Shield Protocol:</strong> 24/7 monitoring + 30-minute rapid counter-narrative response system</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Influencer Ecosystem Management:</strong> Telugu influencer network activation and ongoing relationship management</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Paid Media Strategy:</strong> Meta Ads, YouTube Ads, Google Ads — precision-targeted to Telangana voter segments</CheckOpt>
              <CheckOpt onChange={recalc}><strong>NRI Digital Outreach:</strong> diaspora community management, LinkedIn strategy, NRI WhatsApp network</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Monthly Analytics & Reporting:</strong> performance dashboards, sentiment tracking, competitor monitoring reports</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Opposition Research & Intelligence:</strong> continuous monitoring of BRS, BJP, AIMIM digital activity and narrative tracking</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 10.2</QNum>
            <QLabel>What monthly analytics and reporting does Telangana CM Revanth Reddy's team want from SocialBureau?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}>Platform-by-platform growth metrics — followers, reach, engagement rate by channel</CheckOpt>
              <CheckOpt onChange={recalc}>Competitor monthly scorecard — Telangana CM Revanth Reddy vs KTR/KCR/BJP/AIMIM</CheckOpt>
              <CheckOpt onChange={recalc}>Sentiment analysis — how Telangana social media feels about Telangana CM Revanth Reddy each month</CheckOpt>
              <CheckOpt onChange={recalc}>WhatsApp community health — subscriber growth, forward rates, engagement levels</CheckOpt>
              <CheckOpt onChange={recalc}>Google search ranking — position for "Telangana CM" and all key political search terms</CheckOpt>
              <CheckOpt onChange={recalc}>Crisis and reputation incidents log — attacks detected, responses deployed, outcomes</CheckOpt>
              <CheckOpt onChange={recalc}>NRI and diaspora engagement metrics by geography</CheckOpt>
              <CheckOpt onChange={recalc}>Top-performing content analysis — what worked and why, with actionable recommendations</CheckOpt>
            </div>
          </QBlock>
          <QBlock last>
            <QNum>Q 10.3</QNum>
            <QLabel>How frequently should SocialBureau present strategy reviews to Telangana CM Revanth Reddy's team?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <RadioOpt name="review" onChange={recalc}><strong>Weekly briefings</strong> — fast-moving political environment requires weekly strategy alignment</RadioOpt>
              <RadioOpt name="review" onChange={recalc}><strong>Bi-weekly</strong> — every 2 weeks for strategy check-ins, monthly for full performance review</RadioOpt>
              <RadioOpt name="review" onChange={recalc}><strong>Monthly</strong> — comprehensive monthly review with following month's plan included</RadioOpt>
            </div>
          </QBlock>
        </FormSection>

        {/* S11 */}
        <FormSection num="11" title="Marketing ideas, innovation & campaign concepts" badge="Creativity" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 11.1</QNum>
            <QLabel>Which SocialBureau campaign concepts is the team most excited to activate?</QLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <CheckOpt onChange={recalc}><strong>"CM Speaks"</strong> — monthly unscripted YouTube + Facebook Live — Telangana CM Revanth Reddy addresses Telangana directly for 15 minutes</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Revanth Reddy Responds"</strong> — weekly citizen problem resolved live on social media — visible governance builds trust</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Telangana Rising"</strong> — district-by-district weekly development story in Reels + Facebook + WhatsApp</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"A Day With CM"</strong> — raw 24-hour behind-the-scenes documentary Reel series — unfiltered, human, shareable</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"CM on Podcasts"</strong> — appearances on major Telugu and national channels — unscripted, long-form, trust-building</CheckOpt>
              <CheckOpt onChange={recalc}><strong>WhatsApp Broadcast Community</strong> — daily morning message from Telangana CM Revanth Reddy to all Telangana subscribers</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Revanth Reddy Digital Sena"</strong> — trained volunteer digital army in all 33 districts + NRI chapters globally</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Fact vs Fiction"</strong> — real-time branded graphic series countering BRS/BJP misinformation with verified data</CheckOpt>
              <CheckOpt onChange={recalc}><strong>Signature hashtag campaign</strong> — one unifying Telangana identity (#TelanganaRising / #RevanthDelivers)</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Women of Telangana"</strong> — dedicated women empowerment Instagram series with real beneficiary stories</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"NRI for Telangana"</strong> — diaspora engagement series with virtual town halls and investment pride content</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"365 Days of Telangana Rising"</strong> — election-year daily recap showing what each day of governance delivered</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"MLA Spotlight"</strong> — weekly feature on a Congress MLA's local constituency work — amplifying ground team</CheckOpt>
              <CheckOpt onChange={recalc}><strong>"Telangana vs 9 Years"</strong> — before/after series comparing specific indicators under BRS vs under Telangana CM Revanth Reddy</CheckOpt>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 11.2</QNum>
            <QLabel>How open is the team to formats never done before in Telangana political media?</QLabel>
            <ScaleBar onSelect={recalc} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.ink3, marginTop: 5, fontFamily: sans }}>
              <span>Very conservative — proven formats only</span>
              <span>Fully open — break every norm in Telangana politics</span>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 11.3</QNum>
            <QLabel>Has the team seen any Indian or global political campaign that inspired them?</QLabel>
            <QHint>Modi's Maan Ki Baat. Rahul Gandhi's Bharat Jodo digital content. Trump's podcast strategy. Kejriwal's transparency content. Obama's community organising model. What felt powerful?</QHint>
            <TArea placeholder="Campaigns, formats, or specific content pieces the team found impressive and would want adapted for Telangana..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 11.4</QNum>
            <QLabel>Are there campaign ideas Telangana CM Revanth Reddy or his team has already discussed internally?</QLabel>
            <TArea placeholder="Ideas, slogans, concepts, formats — however rough or early-stage — that have come up internally..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* S12 */}
        <FormSection num="12" title="Vision, success definition & absolute boundaries" badge="Goals" onToggle={(o) => setSectionsOpen(s => o ? s + 1 : s - 1)}>
          <QBlock>
            <QNum>Q 12.1</QNum>
            <QLabel>What does success look like 12 months from now — in Telangana CM Revanth Reddy's team's own words?</QLabel>
            <QHint>Not metrics — the feeling and reality. What should ordinary Telangana people say about Telangana CM Revanth Reddy? What should happen when a citizen in Nizamabad picks up their phone in the morning?</QHint>
            <TArea placeholder="Describe the ideal state — the feeling, the conversations, the digital landscape — 12 months from today..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 12.2</QNum>
            <QLabel>How important is national-level visibility compared to deep Telangana penetration?</QLabel>
            <ScaleBar onSelect={recalc} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.ink3, marginTop: 5, fontFamily: sans }}>
              <span>100% Telangana-focused only</span>
              <span>Strong national ambition equally important</span>
            </div>
          </QBlock>
          <QBlock>
            <QNum>Q 12.3</QNum>
            <QLabel>What are the absolute red lines — things SocialBureau must never do on this project?</QLabel>
            <QHint>Content categories that are off-limits, political lines not to cross, specific opposition leaders who must not be addressed in certain ways, platforms to avoid, topics personally sensitive for Telangana CM Revanth Reddy. These are non-negotiable and define operating boundaries.</QHint>
            <TArea placeholder="Absolute content restrictions, political boundaries, personal topics to avoid, platform exclusions, messaging never to use..." onChange={recalc} />
          </QBlock>
          <QBlock>
            <QNum>Q 12.4</QNum>
            <QLabel>Is there contextual information — political relationships, upcoming events, alliance sensitivities — that SocialBureau must know to avoid strategic errors?</QLabel>
            <TArea placeholder="Political relationships (positive and complex), upcoming state or national events, coalition considerations, timing factors..." onChange={recalc} />
          </QBlock>
          <QBlock last>
            <QNum>Q 12.5</QNum>
            <QLabel>Any final information, special requests, or anything not covered above?</QLabel>
            <TArea placeholder="Anything else SocialBureau needs to know — stories, context, specific asks, or concerns about this project..." onChange={recalc} />
          </QBlock>
        </FormSection>

        {/* SUBMIT */}
        <div style={{ background: T.ink, borderRadius: 4, padding: "2rem 2.5rem", marginTop: "2rem" }}>
          <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Ready to launch Project Revanth Rising?</div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.5rem", fontFamily: sans }}>
            Upon receipt of this completed intake, SocialBureau's strategy team will deliver within 72 hours: a customised Phase 1 execution plan, 30-day content calendar draft, influencer partnership shortlist (Telugu + NRI), WhatsApp community architecture, MLA amplification network design, NRI outreach blueprint, and a district-priority content map — all tailored precisely to the intelligence provided here.<br /><br />
            This document and all information within it is governed by SocialBureau's project confidentiality protocol. It is never shared outside the dedicated project team assigned exclusively to this engagement.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={handleSubmit}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: T.redMid, color: "#fff", border: "none", borderRadius: 3, fontSize: 13, fontWeight: 600, fontFamily: sans, cursor: "pointer" }}>
              Submit to SocialBureau →
            </button>
            <button onClick={() => window.print()}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "transparent", color: "rgba(255,255,255,0.55)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 3, fontSize: 13, fontFamily: sans, cursor: "pointer" }}>
              🖨 Print / Save PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}