import { jsPDF } from "jspdf";
import cvData from "../data/cv.json";

/**
 * Multilingual ATS-Friendly PDF CV Generator (FR / EN)
 */
export function generateCV(lang = "fr") {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const cv = cvData[lang] || cvData.fr;

  const MARGIN_X = 18;
  const MARGIN_Y = 18;
  const PAGE_W = 210;
  const PAGE_H = 297;
  const CONTENT_W = PAGE_W - MARGIN_X * 2;

  // Professional Palette
  const PRIMARY = [30, 41, 59];    // Deep Slate #1E293B
  const ACCENT = [99, 102, 241];   // Indigo #6366F1
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
      `${cv.name} — ${cv.title}`,
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
  const contactText = `Email: ${cv.email}   |   Tel: ${cv.phone}   |   ${cv.location}`;
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

  // ── PROFIL / SUMMARY ──
  renderSectionHeader(lang === "fr" ? "Profil Professionnel" : "Professional Summary");
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

  // ── SKILLS ──
  renderSectionHeader(lang === "fr" ? "Compétences Techniques & Ingénierie" : "Technical & Engineering Skills");
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

  // ── EXPERIENCE ──
  renderSectionHeader(lang === "fr" ? "Expérience Professionnelle" : "Work Experience");
  cv.experience.forEach((exp) => {
    checkPageBreak(16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...PRIMARY);
    doc.text(exp.role, MARGIN_X, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ACCENT);
    doc.text(exp.period, PAGE_W - MARGIN_X, y, { align: "right" });
    y += 4.8;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(`${exp.org} — ${exp.location}`, MARGIN_X, y);
    y += 5.2;

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

  // ── EDUCATION ──
  renderSectionHeader(lang === "fr" ? "Formation & Diplômes d'Ingénieur" : "Education & Engineering Degrees");
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

  // ── LANGUAGES ──
  renderSectionHeader(lang === "fr" ? "Langues" : "Languages");
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

  addFooter();

  doc.save(`CV_${cv.name.replace(/\s+/g, "_")}_${lang.toUpperCase()}_ATS.pdf`);
}
