import React, { useEffect, useState } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ReportRenderer from "@/components/DynamicReports/ReportRenderer";
import dynamicReportService from "@/services/dynamicReportService";
import "./admin/dynamic-reports.css";

export default function DynamicReportPage() {
  const { slug } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    let active = true;
    dynamicReportService.getPublic(slug).then((response) => { if (active) setReport(response.data); })
      .catch(() => { if (active) setNotFound(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="report-state">Loading report…</div>;
  if (notFound || !report) return <div className="report-state"><FileQuestion size={30} /><h1>Report unavailable</h1><p>This report may be unpublished or the link may have changed.</p><Link to="/">Return to Social Bureau</Link></div>;
  return <><Link className="report-floating-back" to="/" aria-label="Return to Social Bureau"><ArrowLeft size={17} /><span>Social Bureau</span></Link><ReportRenderer report={report} /></>;
}