import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { FormRequest } from 'src/models/formRequestInterface.js';

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
    sectionTitle(doc, 'PROFESSIONAL SUMMARY');
    doc.fontSize(TEXT_FONT_SIZE).text(data['professional_summary.summary']).moveDown(1);

    sectionTitle(doc, 'KEY SKILLS');
    data['key_skills.skills']?.split(',').forEach((skill: string) => {
      doc.fontSize(TEXT_FONT_SIZE).text(`• ${skill.trim()}`);
    });
    doc.moveDown(1);

    sectionTitle(doc, 'WORK EXPERIENCE');
    doc
      .fontSize(TEXT_FONT_SIZE)
      .fillColor(PRIMARY_COLOR)
      .text(`${data['work_experience.job_title']} - ${data['work_experience.company']}`, {
        continued: false,
      });
    doc.fillColor(TEXT_COLOR).text(`${data['work_experience.period']}`).moveDown(0.5);

    doc.fontSize(TEXT_FONT_SIZE).text(data['work_experience.achievements']).moveDown(1);

    sectionTitle(doc, 'EDUCATION');
    doc
      .fontSize(TEXT_FONT_SIZE)
      .fillColor(PRIMARY_COLOR)
      .text(`${data['education.degree']}`, { continued: true })
      .fillColor(TEXT_COLOR)
      .text(` - ${data['education.institution']} (${data['education.graduation_year']})`)
      .moveDown(1);

    sectionTitle(doc, 'LANGUAGES');
    data['languages.languages']?.split(',').forEach((lang: string) => {
      doc.fontSize(TEXT_FONT_SIZE).text(`• ${lang}`);
    });

    doc.end();
  });
}

export function generateCoverLetterBuffer(data: FormRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const currentDate = new Date().toLocaleDateString();

    // Encabezado
    doc
      .fontSize(10)
      .text(`${data['personal_info.full_name']}`)
      .text(`${data['personal_info.email']} | ${data['personal_info.phone']}`)
      .text(`${currentDate}`)
      .moveDown(2);

    // Destinatario
    doc.text('Hiring Manager').text(`${data['letter_customization.target_company']}`).moveDown(2);

    // Cuerpo
    doc.text(`Dear Hiring Team,`).moveDown(1);

    doc
      .fontSize(TEXT_FONT_SIZE)
      .text(
        `I am excited to apply for the ${data['letter_customization.target_position']} position at ${data['letter_customization.target_company']}. ` +
          `With my experience as described below, I am confident in my ability to contribute effectively.`
      )
      .moveDown(1);

    doc.text(`Key highlights from my experience:`);
    doc.text(`${data['work_experience.achievements']}`).moveDown(1);

    doc
      .text(
        `I would welcome the opportunity to discuss how my skills align with your needs. Thank you for your consideration.`
      )
      .moveDown(2);

    // Cierre
    doc.text(`Best regards,`);
    doc.text(`${data['personal_info.full_name']}`);

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
