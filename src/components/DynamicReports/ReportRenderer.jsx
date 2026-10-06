import React from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const CHART_COLORS = ["#b8422f", "#337a70", "#d6a346", "#51618c", "#78a09a", "#b56b7a"];

function ChartBlock({ data = {} }) {
  const rows = Array.isArray(data.data) ? data.data : [];
  const chartType = ["bar", "line", "pie", "doughnut"].includes(data.chartType) ? data.chartType : "bar";
  if (!rows.length) return <div className="report-empty-chart">Add data points to display this chart.</div>;

  return (
    <div className="report-chart" role="img" aria-label={`${chartType} chart`}>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "pie" || chartType === "doughnut" ? (
          <PieChart>
            <Pie data={rows} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={chartType === "doughnut" ? 68 : 0} outerRadius={110} paddingAngle={3}>
              {rows.map((entry, index) => <Cell key={`${entry.label}-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : chartType === "line" ? (
          <LineChart data={rows} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="#e7e6e2" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        ) : (
          <BarChart data={rows} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="#e7e6e2" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={56} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function ReportSection({ section }) {
  const data = section.data || {};
  const sectionId = section._id || `section-${section.order}`;
  return (
    <section className={`report-section report-section-${section.type}`} id={sectionId}>
      {section.title && <h2 className="report-section-title">{section.title}</h2>}
      {section.type === "text" && (
        <div className="report-richtext" dangerouslySetInnerHTML={{ __html: section.content || "" }} />
      )}
      {section.type === "kpi" && (
        <div className="report-kpis">
          {(Array.isArray(data.metrics) ? data.metrics : []).map((metric, index) => (
            <article className="report-kpi" key={`${metric.label}-${index}`}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              {metric.change && <small>{metric.change}</small>}
            </article>
          ))}
        </div>
      )}
      {section.type === "table" && (
        <div className="report-table-wrap">
          <table className="report-table">
            <thead><tr>{(Array.isArray(data.columns) ? data.columns : []).map((column, index) => <th key={`${column}-${index}`}>{column}</th>)}</tr></thead>
            <tbody>
              {(Array.isArray(data.rows) ? data.rows : []).map((row, rowIndex) => (
                <tr key={rowIndex}>{(Array.isArray(row) ? row : Object.values(row || {})).map((cell, cellIndex) => <td key={cellIndex}>{String(cell ?? "")}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.type === "chart" && <ChartBlock data={data} />}
      {section.type === "image" && data.url && <figure className="report-image"><img src={data.url} alt={data.alt || section.title || "Report visual"} loading="lazy" />{data.caption && <figcaption>{data.caption}</figcaption>}</figure>}
      {section.type === "pdf" && data.url && (
        <div className="report-pdf">
          <div className="report-pdf-heading"><span>{data.fileName || "Attached report document"}</span><a href={data.url} target="_blank" rel="noreferrer">Open PDF</a></div>
          <iframe src={data.url} title={data.fileName || section.title || "Report PDF"} loading="lazy" />
        </div>
      )}
    </section>
  );
}

export default function ReportRenderer({ report, preview = false }) {
  const sections = [...(report.sections || [])].sort((first, second) => first.order - second.order);
  const titledSections = sections.filter((section) => section.title);
  const date = report.updatedAt ? new Date(report.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
  return (
    <div className="dynamic-report">
      <header className={`report-cover ${report.coverImageUrl ? "has-cover-image" : ""}`} style={report.coverImageUrl ? { "--report-cover": `url("${report.coverImageUrl}")` } : undefined}>
        <div className="report-cover-inner">
          <div className="report-brand"><span className="report-brand-mark">SB</span><span>SOCIAL BUREAU <i>/</i> INSIGHTS</span></div>
          {preview && <span className="report-preview-label">PREVIEW</span>}
          <div className="report-cover-copy">
            <p className="report-eyebrow">{date || "STRATEGY & PERFORMANCE"}</p>
            <h1>{report.title}</h1>
            {report.subtitle && <p className="report-subtitle">{report.subtitle}</p>}
          </div>
          <div className="report-cover-foot"><span>Prepared by {report.createdBy || "Social Bureau"}</span><span>CONFIDENTIAL · CLIENT EDITION</span></div>
        </div>
      </header>
      <div className="report-layout">
        {titledSections.length > 0 && <aside className="report-toc"><p>IN THIS REPORT</p><nav>{titledSections.map((section) => <a key={section._id || section.order} href={`#${section._id || `section-${section.order}`}`}>{section.title}</a>)}</nav></aside>}
        <main className="report-content">
          {sections.length ? sections.map((section) => <ReportSection key={section._id || section.order} section={section} />) : <p className="report-empty">This report has no sections yet.</p>}
          <footer className="report-footer"><span>Social Bureau</span><span>Confidential · Prepared for your team</span></footer>
        </main>
      </div>
    </div>
  );
}