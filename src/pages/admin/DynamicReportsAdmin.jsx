import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Copy, Eye, FilePlus2, ImagePlus, LoaderCircle, Plus, Save, Trash2, Upload } from "lucide-react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import ReportRenderer from "@/components/DynamicReports/ReportRenderer";
import dynamicReportService from "@/services/dynamicReportService";
import "./dynamic-reports.css";

const createEmptyReport = () => ({ title: "", subtitle: "", coverImageUrl: "", sections: [], status: "draft" });
const BLOCKS = [
  ["text", "Rich text"], ["kpi", "KPI metrics"], ["table", "Data table"],
  ["chart", "Chart"], ["image", "Image"], ["pdf", "PDF document"],
];

function defaultSection(type) {
  const defaults = {
    text: { title: "Overview", content: "<p>Write your report narrative here.</p>", data: {} },
    kpi: { title: "Key metrics", content: "", data: { metrics: [{ label: "Revenue", value: "$1.2M", change: "+14%" }, { label: "Conversion", value: "4.8%", change: "+0.6 pts" }] } },
    table: { title: "Performance breakdown", content: "", data: { columns: ["Metric", "Current", "Previous"], rows: [["Revenue", "$1.2M", "$1.05M"]] } },
    chart: { title: "Performance trend", content: "", data: { chartType: "bar", data: [{ label: "Q1", value: 32 }, { label: "Q2", value: 47 }, { label: "Q3", value: 41 }] } },
    image: { title: "Visual", content: "", data: { url: "", alt: "", caption: "" } },
    pdf: { title: "Supporting document", content: "", data: { url: "", fileName: "" } },
  };
  return { ...defaults[type], type, order: 0, clientKey: crypto.randomUUID() };
}

function SectionDataEditor({ section, onChange }) {
  const [value, setValue] = useState(JSON.stringify(section.data || {}, null, 2));
  const [invalidJson, setInvalidJson] = useState(false);
  useEffect(() => setValue(JSON.stringify(section.data || {}, null, 2)), [section.data]);
  return (
    <label className="dynamic-field">
      <span>{section.type === "kpi" ? "Metrics JSON" : section.type === "table" ? "Table JSON" : "Chart data JSON"}</span>
      <textarea rows={7} value={value} onChange={(event) => setValue(event.target.value)} onBlur={() => {
        try { onChange(JSON.parse(value)); setInvalidJson(false); } catch { setInvalidJson(true); }
      }} spellCheck="false" />
      {invalidJson && <small className="dynamic-error">Enter valid JSON before saving.</small>}
    </label>
  );
}

export default function DynamicReportsAdmin() {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState(null);
  const [previewReport, setPreviewReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const coverInput = useRef(null);

  const loadReports = async () => {
    try {
      const response = await dynamicReportService.list();
      setReports(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load reports.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadReports(); }, []);

  const openReport = async (item) => {
    setPreviewReport(null);
    if (!item) { setReport(createEmptyReport()); return; }
    try {
      const response = await dynamicReportService.get(item._id);
      setReport(response.data);
    } catch (error) { toast.error(error.response?.data?.message || "Could not open report."); }
  };

  const patchReport = (patch) => setReport((current) => ({ ...current, ...patch }));
  const patchSection = (index, patch) => setReport((current) => ({ ...current, sections: current.sections.map((section, itemIndex) => itemIndex === index ? { ...section, ...patch } : section) }));
  const uploadFile = async (file, done) => {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$|^application\/pdf$/.test(file.type) || file.size > 10 * 1024 * 1024) {
      toast.error("Choose a JPG, PNG, WEBP or PDF under 10 MB."); return;
    }
    try {
      setUploading(true);
      const response = await dynamicReportService.upload(file);
      done(response.data);
      toast.success("Upload complete.");
    } catch (error) { toast.error(error.response?.data?.message || "Upload failed."); }
    finally { setUploading(false); }
  };

  const saveReport = async (status = report.status) => {
    if (!report.title.trim()) { toast.error("Add a report title first."); return null; }
    try {
      setSaving(true);
      const payload = { title: report.title, subtitle: report.subtitle, coverImageUrl: report.coverImageUrl, sections: report.sections, status };
      const response = report._id ? await dynamicReportService.update(report._id, payload) : await dynamicReportService.create(payload);
      setReport(response.data);
      await loadReports();
      toast.success(status === "published" ? "Report published." : "Draft saved.");
      return response.data;
    } catch (error) { toast.error(error.response?.data?.message || "Could not save report."); return null; }
    finally { setSaving(false); }
  };

  const preview = async () => {
    const saved = await saveReport(report.status);
    if (saved) setPreviewReport(saved);
  };

  const removeReport = async (item) => {
    if (!window.confirm(`Delete “${item.title}”? This also removes its uploaded files.`)) return;
    try { await dynamicReportService.remove(item._id); toast.success("Report deleted."); await loadReports(); }
    catch (error) { toast.error(error.response?.data?.message || "Could not delete report."); }
  };

  const copyLink = async (slug) => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/reports/${slug}`); toast.success("Public link copied."); }
    catch { toast.error("Could not copy link."); }
  };

  if (previewReport) return <div className="report-preview-shell"><button className="report-back-button" onClick={() => setPreviewReport(null)}><ArrowLeft size={16} /> Back to editor</button><ReportRenderer report={previewReport} preview /></div>;

  return (
    <div className="dynamic-admin">
      <header className="dynamic-admin-header"><div><p className="dynamic-admin-kicker">PUBLISHING STUDIO</p><h1>Dynamic reports</h1><p>Build and share client-ready reports with live data blocks.</p></div>{report && <button className="dynamic-button dynamic-button-quiet" onClick={() => setReport(null)}><ArrowLeft size={16} /> All reports</button>}</header>
      {!report ? (
        <main className="dynamic-admin-main">
          <div className="dynamic-list-toolbar"><div><h2>Your reports</h2><span>{reports.length} total</span></div><button className="dynamic-button dynamic-button-primary" onClick={() => openReport(null)}><Plus size={17} /> New report</button></div>
          {loading ? <div className="dynamic-loading"><LoaderCircle className="spin" /> Loading reports</div> : reports.length ? <div className="dynamic-report-list">{reports.map((item) => <article className="dynamic-report-row" key={item._id}><button className="dynamic-report-open" onClick={() => openReport(item)}><span className="dynamic-report-icon"><FilePlus2 size={20} /></span><span className="dynamic-report-details"><strong>{item.title}</strong><small>/reports/{item.slug}</small></span><span className={`dynamic-status ${item.status}`}>{item.status}</span></button><div className="dynamic-row-actions">{item.status === "published" && <button title="Copy public link" onClick={() => copyLink(item.slug)}><Copy size={16} /></button>}<button title="Delete report" onClick={() => removeReport(item)}><Trash2 size={16} /></button></div></article>)}</div> : <div className="dynamic-empty"><span className="dynamic-report-icon"><FilePlus2 size={24} /></span><h2>No reports yet</h2><p>Create a report and compose it from reusable content blocks.</p><button className="dynamic-button dynamic-button-primary" onClick={() => openReport(null)}><Plus size={17} /> Create first report</button></div>}
        </main>
      ) : (
        <main className="dynamic-editor-layout">
          <div className="dynamic-editor-main">
            <div className="dynamic-editor-title-row"><div><p className="dynamic-admin-kicker">{report._id ? "EDIT REPORT" : "NEW REPORT"}</p><h2>{report.title || "Untitled report"}</h2></div><span className={`dynamic-status ${report.status}`}>{report.status}</span></div>
            <div className="dynamic-editor-fields">
              <label className="dynamic-field"><span>Report title</span><input value={report.title} onChange={(event) => patchReport({ title: event.target.value })} placeholder="Q3 growth and performance" maxLength={180} /></label>
              <label className="dynamic-field"><span>Subtitle</span><input value={report.subtitle || ""} onChange={(event) => patchReport({ subtitle: event.target.value })} placeholder="A concise description for your client" maxLength={300} /></label>
              <div className="dynamic-cover-control"><div><strong>Cover image</strong><small>Landscape image · up to 10 MB</small></div><button className="dynamic-button dynamic-button-quiet" disabled={uploading} onClick={() => coverInput.current?.click()}><ImagePlus size={16} /> {report.coverImageUrl ? "Replace image" : "Upload image"}</button><input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(event) => uploadFile(event.target.files?.[0], (file) => patchReport({ coverImageUrl: file.url }))} />{report.coverImageUrl && <button className="dynamic-icon-button" title="Remove cover" onClick={() => patchReport({ coverImageUrl: "" })}><Trash2 size={16} /></button>}</div>
              {report.sections.map((section, index) => <article className="dynamic-section-editor" key={section._id || section.clientKey || index}>
                <div className="dynamic-section-heading"><div><span className="dynamic-section-index">{String(index + 1).padStart(2, "0")}</span><span className="dynamic-block-type">{BLOCKS.find(([type]) => type === section.type)?.[1]}</span></div><div className="dynamic-row-actions"><button disabled={index === 0} title="Move up" onClick={() => { const sections = [...report.sections]; [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]]; patchReport({ sections }); }}><ArrowUp size={16} /></button><button disabled={index === report.sections.length - 1} title="Move down" onClick={() => { const sections = [...report.sections]; [sections[index + 1], sections[index]] = [sections[index], sections[index + 1]]; patchReport({ sections }); }}><ArrowDown size={16} /></button><button title="Remove section" onClick={() => patchReport({ sections: report.sections.filter((_, sectionIndex) => sectionIndex !== index) })}><Trash2 size={16} /></button></div></div>
                <label className="dynamic-field"><span>Section heading</span><input value={section.title || ""} onChange={(event) => patchSection(index, { title: event.target.value })} placeholder="Section title" maxLength={160} /></label>
                {section.type === "text" && <label className="dynamic-field"><span>Rich text</span><JoditEditor value={section.content || ""} onBlur={(content) => patchSection(index, { content })} config={{ height: 250, toolbarAdaptive: false, buttons: ["bold", "italic", "underline", "|", "ul", "ol", "|", "paragraph", "|", "link", "|", "undo", "redo"], askBeforePasteHTML: false, askBeforePasteFromWord: false }} /></label>}
                {["kpi", "table", "chart"].includes(section.type) && <SectionDataEditor key={section._id || section.clientKey || index} section={section} onChange={(data) => patchSection(index, { data })} />}
                {["image", "pdf"].includes(section.type) && <div className="dynamic-file-block"><button className="dynamic-button dynamic-button-quiet" disabled={uploading} onClick={() => document.getElementById(`report-file-${index}`)?.click()}><Upload size={16} /> {section.data?.url ? "Replace file" : `Upload ${section.type}`}</button><input id={`report-file-${index}`} hidden type="file" accept={section.type === "pdf" ? "application/pdf" : "image/jpeg,image/png,image/webp"} onChange={(event) => uploadFile(event.target.files?.[0], (file) => patchSection(index, { data: { ...section.data, url: file.url, fileName: file.fileName } }))} />{section.data?.url && <span>{section.data.fileName || "File uploaded"}</span>}{section.type === "image" && <><label className="dynamic-field"><span>Alt text</span><input value={section.data?.alt || ""} onChange={(event) => patchSection(index, { data: { ...section.data, alt: event.target.value } })} /></label><label className="dynamic-field"><span>Caption</span><input value={section.data?.caption || ""} onChange={(event) => patchSection(index, { data: { ...section.data, caption: event.target.value } })} /></label></>}</div>}
              </article>)}
              <div className="dynamic-add-section"><span>Add a section</span><div>{BLOCKS.map(([type, label]) => <button key={type} onClick={() => patchReport({ sections: [...report.sections, defaultSection(type)] })}><Plus size={14} /> {label}</button>)}</div></div>
            </div>
          </div>
          <aside className="dynamic-editor-sidebar"><div className="dynamic-sticky-actions"><p className="dynamic-admin-kicker">REPORT ACTIONS</p><button className="dynamic-button dynamic-button-quiet dynamic-button-full" disabled={saving} onClick={preview}><Eye size={16} /> Preview</button><button className="dynamic-button dynamic-button-quiet dynamic-button-full" disabled={saving} onClick={() => saveReport("draft")}><Save size={16} /> Save draft</button><button className="dynamic-button dynamic-button-primary dynamic-button-full" disabled={saving} onClick={() => saveReport("published")}><Save size={16} /> {saving ? "Saving…" : report.status === "published" ? "Update published report" : "Publish report"}</button>{report._id && report.status === "published" && <><div className="dynamic-public-url"><small>PUBLIC URL</small><a href={`/reports/${report.slug}`} target="_blank" rel="noreferrer">/reports/{report.slug}</a></div><button className="dynamic-button dynamic-button-quiet dynamic-button-full" onClick={() => copyLink(report.slug)}><Copy size={16} /> Copy client link</button></>}</div></aside>
        </main>
      )}
    </div>
  );
}