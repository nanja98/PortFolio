import { jsPDF } from "jspdf";
import cvData from "../data/cv.json";

/**
 * Clean & Professional ATS-Friendly PDF CV Generator (2-Page Executive Layout)
 * Adheres strictly to ATS parsing standards:
 * - Single-column flow
 * - Standard web-safe typography (Helvetica)
 * - Clear text hierarchy and semantic section labels
 * - Standard bullet points
 * - High contrast ratios
 */
export function generateCV() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const cv = cvData;

  const MARGIN_X = 18;
  const MARGIN_Y = 18;
  const PAGE_W = 210;
  const PAGE_H = 297;
  const CONTENT_W = PAGE_W - MARGIN_X * 2;

  // Professional Palette
  const PRIMARY = [30, 41, 59];    // Deep Slate #1E293B
  const ACCENT = [124, 58, 237];   // Elegant Violet #7C3AED
  const TEXT_MAIN = [51, 65, 85];  // Charcoal #334155
  const TEXT_MUTED = [100, 116, 139];// Muted Gray #64748B
  const LINE_COLOR = [226, 232, 240]; // Light Gray #E2E8F0

  let y = MARGIN_Y;
  let pageNum = 1;

  function addFooter() {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(
      `${cv.name} — CV Ingénieur Développeur Full Stack & OWASP`,
      MARGIN_X,
      PAGE_H - 10
    );
    doc.text(
      `Page ${pageNum}`,
      PAGE_W - MARGIN_X,
      PAGE_H - 10,
      { align: "right" }
    );
  }

  function checkPageBreak(neededSpace = 8) {
    if (y + neededSpace > PAGE_H - 18) {
      addFooter();
      doc.addPage();
      pageNum += 1;
      y = MARGIN_Y + 5;
    }
  }

  function renderSectionHeader(title) {
    checkPageBreak(14);
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...ACCENT);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    y += 2.5;

    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(0.4);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
    y += 5;
  }

  // ── HEADER ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY);
  doc.text(cv.name, MARGIN_X, y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.text(cv.title, MARGIN_X, y);
  y += 6;

  // Contact Info Line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  const contactText = `Email: ${cv.email}   |   Tel: ${cv.phone}   |   Localisation: ${cv.location}`;
  doc.text(contactText, MARGIN_X, y);
  y += 4.5;

  const linksText = `LinkedIn: ${cv.linkedin}   |   GitHub: ${cv.github}`;
  doc.text(linksText, MARGIN_X, y);
  y += 6;

  // Divider
  doc.setDrawColor(...LINE_COLOR);
  doc.setLineWidth(0.5);
  doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  y += 5;

  // ── PROFIL / RÉSUMÉ ──
  renderSectionHeader("Profil Professionnel");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT_MAIN);
  const summaryLines = doc.splitTextToSize(cv.summary, CONTENT_W);
  summaryLines.forEach((line) => {
    checkPageBreak(5);
    doc.text(line, MARGIN_X, y);
    y += 4.8;
  });
  y += 2;

  // ── COMPÉTENCES CLÉS ──
  renderSectionHeader("Compétences Techniques & Ingénierie");
  doc.setFontSize(9.5);
  Object.entries(cv.skills).forEach(([category, items]) => {
    checkPageBreak(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...PRIMARY);
    doc.text(`${category} : `, MARGIN_X, y);

    const catWidth = doc.getTextWidth(`${category} : `);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXT_MAIN);

    const itemsStr = items.join(", ");
    const skillLines = doc.splitTextToSize(itemsStr, CONTENT_W - catWidth);

    doc.text(skillLines[0], MARGIN_X + catWidth, y);
    y += 4.8;

    for (let i = 1; i < skillLines.length; i++) {
      checkPageBreak(4.8);
      doc.text(skillLines[i], MARGIN_X + catWidth, y);
      y += 4.8;
    }
  });
  y += 2;

  // ── EXPÉRIENCES PROFESSIONNELLES ──
  renderSectionHeader("Expérience Professionnelle");
  cv.experience.forEach((exp) => {
    checkPageBreak(16);

    // Title + Period
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...PRIMARY);
    doc.text(exp.role, MARGIN_X, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ACCENT);
    doc.text(exp.period, PAGE_W - MARGIN_X, y, { align: "right" });
    y += 4.8;

    // Org + Location
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(`${exp.org} — ${exp.location}`, MARGIN_X, y);
    y += 5.2;

    // Bullet Points
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    doc.setTextColor(...TEXT_MAIN);

    exp.bullets.forEach((bullet) => {
      const formattedBullet = `•   ${bullet}`;
      const bulletLines = doc.splitTextToSize(formattedBullet, CONTENT_W - 2);
      
      bulletLines.forEach((bLine, lineIdx) => {
        checkPageBreak(4.6);
        const indent = lineIdx === 0 ? MARGIN_X : MARGIN_X + 5;
        doc.text(bLine, indent, y);
        y += 4.6;
      });
    });
    y += 3;
  });

  // ── FORMATION & DIPLÔMES ──
  renderSectionHeader("Formation & Diplômes d'Ingénieur");
  cv.education.forEach((edu) => {
    checkPageBreak(12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...PRIMARY);
    doc.text(edu.degree, MARGIN_X, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ACCENT);
    doc.text(edu.period, PAGE_W - MARGIN_X, y, { align: "right" });
    y += 4.8;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(`${edu.school} — ${edu.location}`, MARGIN_X, y);
    y += 6;
  });

  // ── LANGUES ──
  renderSectionHeader("Langues");
  cv.languages.forEach((langItem) => {
    checkPageBreak(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...PRIMARY);
    doc.text(`${langItem.lang} : `, MARGIN_X, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXT_MAIN);
    doc.text(langItem.level, MARGIN_X + 28, y);
    y += 4.8;
  });

  // Final footer on last page
  addFooter();

  // Save ATS PDF
  doc.save(`CV_Ingenieur_${cv.name.replace(/\s+/g, "_")}_ATS.pdf`);
}
