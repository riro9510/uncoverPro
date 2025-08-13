import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { FormRequest } from 'src/models/formRequestInterface.js';
import { getCoverLetterTexts, getSectionTitles } from 'src/utils/language.utils.js';

// Colores y tipografía base
const PRIMARY_COLOR = '#003366';
const TEXT_COLOR = '#333333';
const HEADER_FONT_SIZE = 16;
const SECTION_TITLE_FONT_SIZE = 12;
const TEXT_FONT_SIZE = 10;

export function generateCVBuffer(data: FormRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    const titles = getSectionTitles(data['code'] || 'en');
    const alignDirection = data.rtl ? 'right' : 'left'; // Nuevo valor de alineación

    // Recolectar chunks del PDF en memoria
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Encabezado
    doc
      .fillColor(PRIMARY_COLOR)
      .fontSize(20)
      .text(data['personal_info.full_name'], { align: 'center' });

    doc
      .fontSize(12)
      .fillColor(TEXT_COLOR)
      .text(data['personal_info.professional_title'], { align: 'center' })
      .moveDown(1);

    doc
      .fontSize(10)
      .fillColor(TEXT_COLOR)
      .text(
        `${data['personal_info.email']} | ${data['personal_info.phone']} | ${data['personal_info.linkedin']}`,
        {
          align: 'center',
        }
      )
      .moveDown(2);

    // Secciones
    sectionTitle(doc, titles.professionalSummary);
    doc.fontSize(TEXT_FONT_SIZE).text(data['professional_summary.summary'], { align: alignDirection }).moveDown(1);

    sectionTitle(doc, titles.keySkills);
    data['key_skills.skills']?.split(',').forEach((skill: string) => {
      doc.fontSize(TEXT_FONT_SIZE).text(`• ${skill.trim()}`, { align: alignDirection });
    });
    doc.moveDown(1);

    sectionTitle(doc, titles.workExperience);
    doc
      .fontSize(TEXT_FONT_SIZE)
      .fillColor(PRIMARY_COLOR)
      .text(`${data['work_experience.job_title']} - ${data['work_experience.company']}`, {
        continued: false,
        align: alignDirection,
      });
    doc.fillColor(TEXT_COLOR).text(`${data['work_experience.period']}`, { align: alignDirection }).moveDown(0.5);

    doc.fontSize(TEXT_FONT_SIZE).text(data['work_experience.achievements'], { align: alignDirection }).moveDown(1);

    sectionTitle(doc, titles.education);
    doc
      .fontSize(TEXT_FONT_SIZE)
      .fillColor(PRIMARY_COLOR)
      .text(`${data['education.degree']}`, { continued: true, align: alignDirection })
      .fillColor(TEXT_COLOR)
      .text(` - ${data['education.institution']} (${data['education.graduation_year']})`, { align: alignDirection })
      .moveDown(1);

    sectionTitle(doc, titles.languages);
    data['languages.languages']?.split(',').forEach((lang: string) => {
      doc.fontSize(TEXT_FONT_SIZE).text(`• ${lang}`, { align: alignDirection });
    });

    doc.end();
  });
}

export function generateCoverLetterBuffer(data: FormRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    const alignDirection = data.rtl ? 'right' : 'left';
    const texts = getCoverLetterTexts(data.code || 'en');

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const currentDate = new Date().toLocaleDateString();

    doc
      .fontSize(10)
      .text(`${data['personal_info.full_name']}`, { align: alignDirection })
      .text(`${data['personal_info.email']} | ${data['personal_info.phone']}`, { align: alignDirection })
      .text(`${currentDate}`, { align: alignDirection })
      .moveDown(2);

    doc
      .text('Hiring Manager', { align: alignDirection })
      .text(`${data['letter_customization.target_company']}`, { align: alignDirection })
      .moveDown(2);

    doc.text(texts.greeting, { align: alignDirection }).moveDown(1);

    doc.text(
      texts.intro(data["letter_customization.target_position"], data["letter_customization.target_company"]!),
      { align: alignDirection }
    ).moveDown(1);

    doc.text(texts.highlights, { align: alignDirection });
    doc.text(`${data['work_experience.achievements']}`, { align: alignDirection }).moveDown(1);

    doc.text(texts.closing, { align: alignDirection }).moveDown(2);

    doc.text(texts.farewell, { align: alignDirection });
    doc.text(`${data['personal_info.full_name']}`, { align: alignDirection });

    doc.end();
  });
}

function sectionTitle(doc: PDFKit.PDFDocument, title: string) {
  doc
    .moveDown(0.5)
    .fontSize(SECTION_TITLE_FONT_SIZE)
    .fillColor(PRIMARY_COLOR)
    .text(title, { underline: true })
    .fillColor(TEXT_COLOR)
    .moveDown(0.5);
}
