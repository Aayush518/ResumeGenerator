import { jsPDF } from 'jspdf';

export const generatePDF = (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Helper functions
  const addHeading = (text, size = 24) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
  };

  const addText = (text, size = 12, align = 'left', font = 'normal') => {
    doc.setFont('helvetica', font);
    doc.setFontSize(size);
    doc.text(text, align === 'center' ? pageWidth / 2 : margin, yPos, {
      align,
      maxWidth: contentWidth
    });
    yPos += size / 2 + 2;
  };

  const addSection = (title, content) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(title, margin, yPos);
    yPos += 8;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(content, margin, yPos, { maxWidth: contentWidth });
    yPos += calculateHeight(content, 12) + 10;
  };

  const calculateHeight = (text, fontSize) => {
    const lines = doc.splitTextToSize(text, contentWidth).length;
    return lines * (fontSize / 2);
  };

  // Header
  addHeading(data.fullName);
  
  // Contact Info
  const contactInfo = `${data.email} | ${data.phone || ''} ${data.linkedin ? '| ' + data.linkedin : ''}`;
  addText(contactInfo, 10, 'center');
  yPos += 10;

  // Summary
  if (data.summary) {
    addSection('Summary', data.summary);
  }

  // Education
  if (data.education?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Education', margin, yPos);
    yPos += 8;

    data.education.forEach(edu => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(edu.institution, margin, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.degree} (${edu.year})`, margin, yPos);
      yPos += 8;
    });
    yPos += 5;
  }

  // Experience
  if (data.experience?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Experience', margin, yPos);
    yPos += 8;

    data.experience.forEach(exp => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(exp.company, margin, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'italic');
      doc.text(`${exp.position} (${exp.duration})`, margin, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.text(exp.description, margin, yPos, { maxWidth: contentWidth });
      yPos += calculateHeight(exp.description, 12) + 8;
    });
    yPos += 5;
  }

  // Projects
  if (data.projects?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Projects', margin, yPos);
    yPos += 8;

    data.projects.forEach(project => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(project.name, margin, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'italic');
      doc.text(project.technologies, margin, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.text(project.description, margin, yPos, { maxWidth: contentWidth });
      yPos += calculateHeight(project.description, 12) + 8;
    });
    yPos += 5;
  }

  // Skills
  if (data.skills) {
    addSection('Skills', data.skills);
  }

  return doc;
};