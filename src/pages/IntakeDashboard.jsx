import { useState, useEffect, useMemo } from "react";

const MOCK = Array.from({ length: 38 }, (_, i) => {
  const names = ["Arjun Nair", "Priya Menon", "Rahul Das", "Sneha Iyer", "Kiran Pillai", "Divya Sharma", "Anil Kumar", "Meera Raj"];
  const statuses = ["pending", "reviewed", "approved"];
  const types = ["medical", "general", "dental"];
  const d = new Date(Date.now() - i * 86400000 * (Math.random() * 3 + 0.5));
  return {
    _id: `6${Math.random().toString(36).slice(2, 18)}`,
    name: names[i % names.length],
    email: names[i % names.length].toLowerCase().replace(" ", ".") + `@example.com`,
    phone: `+91 9${Math.floor(Math.random() * 900000000 + 100000000)}`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    notes: i % 3 === 0 ? "Follow-up required after initial review" : "",
    createdAt: d.toISOString(),
  };
});

const PAGE_SIZE = 15;

const STATUS_STYLES = {
  approved: { bg: "#d1fae5", color: "#065f46" },
  reviewed: { bg: "#dbeafe", color: "#1e40af" },
  pending:  { bg: "#fef3c7", color: "#92400e" },
};

function fmtKey(k) {
  return k.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function fmtDate(val) {
  const d = new Date(val);
  return isNaN(d) ? val : d.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "#f8f7f4", borderRadius: 10, padding: "14px 18px", minWidth: 120 }}>
      <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Badge({ value }) {
  const s = STATUS_STYLES[value] || { bg: "#f0f0f0", color: "#555" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}>
      {value}
    </span>
  );
}

function CellValue({ col, val }) {
  if (val === undefined || val === null || val === "")
    return <span style={{ color: "#bbb" }}>—</span>;
  if (col === "status") return <Badge value={val} />;
  if (col === "createdAt" || col === "updatedAt")
    return <span style={{ color: "#888", fontSize: 12 }}>{fmtDate(val)}</span>;
  const s = String(val);
  return <span title={s.length > 36 ? s : undefined}>{s.length > 36 ? s.slice(0, 34) + "…" : s}</span>;
}

export default function IntakeDashboard() {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/intakes")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => init(Array.isArray(d) ? d : d.data || []))
      .catch(() => init(MOCK))
      .finally(() => setLoading(false));
  };

  const init = (rows) => {
    const skip = new Set(["_id", "__v", "updatedAt"]);
    const all = new Set();
    rows.forEach((r) => Object.keys(r).forEach((k) => { if (!skip.has(k)) all.add(k); }));
    const order = ["name", "email", "phone", "type", "status", "createdAt"];
    const sorted = [...all].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
    setCols(sorted);
    setData(rows);
    setSortField(sorted.includes("createdAt") ? "createdAt" : sorted[0]);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((r) => !q || Object.values(r).some((v) => String(v).toLowerCase().includes(q)));
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortField] ?? "", bv = b[sortField] ?? "";
      if (sortField === "createdAt" || sortField === "updatedAt") {
        av = new Date(av).getTime() || 0;
        bv = new Date(bv).getTime() || 0;
      }
      return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
    });
  }, [filtered, sortField, sortDir]);

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const slice = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const visibleCols = cols.slice(0, 6);
  const extraCols = cols.slice(6);

  const today = data.filter((r) => new Date(r.createdAt).toDateString() === new Date().toDateString()).length;
  const last7 = data.filter((r) => Date.now() - new Date(r.createdAt).getTime() < 7 * 86400000).length;
  const byStatus = data.reduce((acc, r) => { if (r.status) acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
  const topStatus = Object.entries(byStatus).sort((a, b) => b[1] - a[1])[0];

  const selStyle = {
    height: 34, fontSize: 13, padding: "0 10px", borderRadius: 8,
    border: "1px solid #e5e5e5", background: "#fff", color: "#222", outline: "none", cursor: "pointer",
  };

  return (
    <div style={{ fontFamily: "'Sora', 'DM Mono', sans-serif", color: "#1a1a1a", padding: "2rem 0", maxWidth: 900, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em", marginBottom: 3 }}>Intake submissions</h1>
          <p style={{ fontSize: 12, color: "#999", fontFamily: "'DM Mono', monospace" }}>MongoDB · Intake collection</p>
        </div>
        <button
          onClick={load}
          style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, border: "1px solid #e0e0e0", borderRadius: 8, background: "#fff", cursor: "pointer", color: "#444", fontFamily: "'Sora', sans-serif" }}
        >
          ↺ Refresh
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: "1.75rem" }}>
        <StatCard label="Total" value={loading ? "…" : data.length} />
        <StatCard label="Today" value={loading ? "…" : today} />
        <StatCard label="Last 7 days" value={loading ? "…" : last7} />
        <StatCard label="Top status" value={loading ? "…" : topStatus ? topStatus[0] : "—"} sub={topStatus ? `${topStatus[1]} entries` : null} />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search any field…"
          style={{ ...selStyle, flex: 1, minWidth: 180 }}
        />
        <select value={sortField} onChange={(e) => setSortField(e.target.value)} style={selStyle}>
          {cols.map((c) => <option key={c} value={c}>{fmtKey(c)}</option>)}
        </select>
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)} style={selStyle}>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #ebebeb", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8f7f4" }}>
                {visibleCols.map((c) => (
                  <th key={c} onClick={() => { setSortField(c); setSortDir(sortField === c && sortDir === "asc" ? "desc" : "asc"); }}
                    style={{ padding: "10px 14px", textAlign: "left", fontWeight: 500, fontSize: 11, color: "#888", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", textTransform: "uppercase", borderBottom: "1px solid #ebebeb", userSelect: "none" }}>
                    {fmtKey(c)} {sortField === c ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </th>
                ))}
                {extraCols.length > 0 && <th style={{ width: 32, borderBottom: "1px solid #ebebeb" }} />}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={visibleCols.length + 1} style={{ textAlign: "center", padding: "2.5rem", color: "#aaa", fontSize: 13 }}>Loading…</td></tr>
              ) : slice.length === 0 ? (
                <tr><td colSpan={visibleCols.length + 1} style={{ textAlign: "center", padding: "2.5rem", color: "#aaa", fontSize: 13 }}>No results found</td></tr>
              ) : (
                slice.map((row, i) => (
                  <>
                    <tr key={row._id || i}
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      style={{ cursor: extraCols.length ? "pointer" : "default", borderBottom: "1px solid #f0f0f0", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                      {visibleCols.map((c) => (
                        <td key={c} style={{ padding: "10px 14px", maxWidth: 180, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                          <CellValue col={c} val={row[c]} />
                        </td>
                      ))}
                      {extraCols.length > 0 && (
                        <td style={{ padding: "10px 8px", textAlign: "center", color: "#bbb", fontSize: 14 }}>
                          {expanded === i ? "▴" : "▾"}
                        </td>
                      )}
                    </tr>
                    {expanded === i && extraCols.length > 0 && (
                      <tr key={`exp-${i}`} style={{ background: "#fafafa" }}>
                        <td colSpan={visibleCols.length + 1} style={{ padding: "10px 14px 12px", fontSize: 12, color: "#666" }}>
                          {extraCols.map((c) => (
                            <span key={c} style={{ marginRight: 20 }}>
                              <span style={{ fontFamily: "'DM Mono', monospace", color: "#aaa", marginRight: 4 }}>{fmtKey(c)}:</span>
                              {String(row[c] ?? "—")}
                            </span>
                          ))}
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center", marginTop: "1rem", fontSize: 12, color: "#999" }}>
          <span style={{ marginRight: 6 }}>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}</span>
          <button onClick={() => setPage(page - 1)} disabled={page <= 1} style={{ ...selStyle, padding: "0 10px", fontSize: 12 }}>‹</button>
          {[...new Set([1, page - 1, page, page + 1, pages])].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b).map((p, idx, arr) => (
            <>
              {idx > 0 && arr[idx - 1] < p - 1 && <span key={`dots-${p}`}>…</span>}
              <button key={p} onClick={() => setPage(p)} style={{ ...selStyle, padding: "0 10px", fontSize: 12, background: p === page ? "#1a1a1a" : "#fff", color: p === page ? "#fff" : "#444", border: p === page ? "1px solid #1a1a1a" : "1px solid #e0e0e0" }}>{p}</button>
            </>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page >= pages} style={{ ...selStyle, padding: "0 10px", fontSize: 12 }}>›</button>
        </div>
      )}
    </div>
  );
}