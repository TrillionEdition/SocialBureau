import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PagePaymentGate from "@/components/PagePaymentGate";
import ReportRenderer from "@/components/DynamicReports/ReportRenderer";
import dynamicReportService from "@/services/dynamicReportService";
import { BASE_URL } from "@/utils/urls";
import "./admin/dynamic-reports.css";

export default function DynamicReportPage() {
  const { slug } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const reloadReport = useCallback(async () => {
    try {
      const response = await dynamicReportService.getPublic(slug);
      setReport(response.data);
    } catch (error) {
      console.error("Could not reload report after payment:", error);
    }
  }, [slug]);

  useEffect(() => {
    let active = true;
    dynamicReportService.getPublic(slug).then((response) => { if (active) setReport(response.data); })
      .catch(() => { if (active) setNotFound(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="report-state">Loading report…</div>;
  if (notFound || !report) return <div className="report-state"><FileQuestion size={30} /><h1>Report unavailable</h1><p>This report may be unpublished or the link may have changed.</p><Link to="/">Return to SocialBureau</Link></div>;
  if (Number(report.viewingPrice ?? 2) === 0) return <><Link className="report-floating-back" to="/" aria-label="Return to Social Bureau"><ArrowLeft size={17} /></Link><ReportRenderer report={report} /></>;
  const encodedSlug = encodeURIComponent(report.slug);
  return <><Link className="report-floating-back" to="/" aria-label="Return to Social Bureau"><ArrowLeft size={17} /></Link><PagePaymentGate
    pageSlug={`dynamic-report-${report.slug}`}
    amount={report.viewingPrice ?? 2}
    title={`Unlock ${report.title}`}
    description={`Pay ₹${report.viewingPrice ?? 2} once to unlock this report on your account.`}
    orderEndpoint={`${BASE_URL}/api/dynamic-reports/${encodedSlug}/payment-order`}
    verificationEndpoint={`${BASE_URL}/api/dynamic-reports/${encodedSlug}/verify-payment`}
    verificationData={{ reportSlug: report.slug }}
    onAccessGranted={reloadReport}
  ><ReportRenderer report={report} /></PagePaymentGate></>;
}