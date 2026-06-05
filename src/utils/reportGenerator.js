import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* -------------------------------- */
/* DOWNLOAD COMPLETE PDF */
/* -------------------------------- */

export async function exportBlueprintPDF(
  blueprint,
  companyName
) {
  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  let y = 20;

  // Defensive defaults in case blueprint is missing fields
  const bp = blueprint || {};
  const summaryText = String(bp.summary || "");
  const priorities = bp.priorities || [];
  const team = bp.team || [];
  const kpis = bp.kpis || [];
  const platforms = bp.platforms || [];
  const tools = bp.tools || [];
  const roadmap = bp.roadmap || [];
  const risks = bp.risks || [];
  const recommendationText = String(bp.recommendation || "");
  companyName = companyName || "Company";

  /* COVER PAGE */

  pdf.setFontSize(28);

  pdf.text(
    "DIGITAL WORKFLOW",
    20,
    y
  );

  y += 12;

  pdf.setTextColor(
    232,
    25,
    44
  );

  pdf.text(
    "BLUEPRINT",
    20,
    y
  );

  pdf.setTextColor(
    0,
    0,
    0
  );

  y += 25;

  pdf.setFontSize(18);

  pdf.text(
    companyName,
    20,
    y
  );

  y += 15;

  pdf.setFontSize(11);

  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    20,
    y
  );

  /* NEW PAGE */

  pdf.addPage();

  /* SUMMARY */

  pdf.setFontSize(20);

  pdf.text(
    "Executive Summary",
    15,
    20
  );

  pdf.setFontSize(11);

  const summaryLines = pdf.splitTextToSize(summaryText, 170);

  pdf.text(
    summaryLines,
    15,
    35
  );

  /* PRIORITIES */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Strategic Priorities",
    15,
    20
  );

  priorities.forEach((priority, index) => {
    pdf.text(`${index + 1}. ${priority}`, 20, 40 + index * 12);
  });

  /* TEAM */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Recommended Team Structure",
    15,
    20
  );

  autoTable(pdf, {
    startY: 35,

    head: [
      [
        "Role",
        "Type",
        "Model",
      ],
    ],

    body: team.map((role) => [role.title, role.type, role.model]),
  });

  /* KPI */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "KPI Framework",
    15,
    20
  );

  autoTable(pdf, {
    startY: 35,

    head: [
      [
        "KPI",
        "Current",
        "Target",
        "Owner",
      ],
    ],

    body: kpis.map((kpi) => [kpi.name, kpi.current, kpi.target, kpi.owner]),
  });

  /* PLATFORMS */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Platform Strategy",
    15,
    20
  );

  autoTable(pdf, {
    startY: 35,

    head: [
      [
        "Platform",
        "Priority",
        "Frequency",
      ],
    ],

    body: platforms.map((platform) => [platform.name, platform.priority, platform.frequency]),
  });

  /* TOOLS */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Recommended Tools",
    15,
    20
  );

  autoTable(pdf, {
    startY: 35,

    head: [
      [
        "Tool",
        "Category",
        "Purpose",
      ],
    ],

    body: tools.map((tool) => [tool.name, tool.category, tool.purpose]),
  });

  /* ROADMAP */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "90 Day Roadmap",
    15,
    20
  );

  autoTable(pdf, {
    startY: 35,

    head: [
      [
        "Phase",
        "Duration",
        "Focus",
      ],
    ],

    body: roadmap.map((phase) => [phase.phase, phase.duration, phase.focus]),
  });

  /* RISKS */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Risk Assessment",
    15,
    20
  );

  let riskY = 40;

  risks.forEach((risk) => {
    pdf.text(`• ${risk}`, 20, riskY);
    riskY += 12;
  });

  /* FINAL */

  pdf.addPage();

  pdf.setFontSize(20);

  pdf.text(
    "Executive Recommendation",
    15,
    20
  );

  const recommendationLines = pdf.splitTextToSize(recommendationText, 170);
  pdf.text(recommendationLines, 15, 40);

  pdf.save(
    `${companyName
      .replaceAll(
        " ",
        "-"
      )
      .toLowerCase()}-workflow-blueprint.pdf`
  );
}

/* -------------------------------- */
/* PRINT BLUEPRINT */
/* -------------------------------- */

export function printBlueprint() {
  window.print();
}

/* -------------------------------- */
/* DOWNLOAD HTML AS PDF */
/* -------------------------------- */

export async function exportFromElement(
  elementId,
  filename = "blueprint.pdf"
) {
  const html2canvas =
    (
      await import(
        "html2canvas"
      )
    ).default;

  const element =
    document.getElementById(
      elementId
    );

  if (!element) return;

  const canvas =
    await html2canvas(
      element,
      {
        scale: 2,
      }
    );

  const image =
    canvas.toDataURL(
      "image/png"
    );

  const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    );

  const width =
    pdf.internal.pageSize.getWidth();

  const height =
    (canvas.height *
      width) /
    canvas.width;

  pdf.addImage(
    image,
    "PNG",
    0,
    0,
    width,
    height
  );

  pdf.save(filename);
}