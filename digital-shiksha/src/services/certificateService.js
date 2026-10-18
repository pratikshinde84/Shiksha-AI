// src/services/certificateService.js
/**
 * Service to generate and manage PDF certificates using jsPDF.
 */
import { jsPDF } from 'jspdf';
import { storageService } from './storageService';

export const certificateService = {
  /**
   * Get all certificates for a specific user.
   * @param {string} userId
   * @returns {Array}
   */
  getCertificates(userId) {
    return storageService.getCertificatesForUser(userId);
  },

  /**
   * Generate a certificate PDF for a completed course and persist it.
   * @param {Object} params - { userId, userName, courseTitle, completionDate }
   * @returns {string} - Object URL for the generated PDF
   */
  generateCertificate({ userId, userName, courseTitle, completionDate }) {
    const doc = new jsPDF({ orientation: 'landscape' });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, pw, ph, 'F');

    // Border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(3);
    doc.rect(10, 10, pw - 20, ph - 20);

    // Header
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text('Digital Shiksha', pw / 2, 35, { align: 'center' });

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('Certificate of Completion', pw / 2, 55, { align: 'center' });

    // Body
    doc.setFontSize(14);
    doc.text('This certifies that', pw / 2, 75, { align: 'center' });

    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text(userName, pw / 2, 95, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully completed the course', pw / 2, 112, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text(courseTitle, pw / 2, 130, { align: 'center' });

    // Footer
    const certId = `DS-${Date.now()}`;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${completionDate}`, 20, ph - 20);
    doc.text(`Certificate ID: ${certId}`, pw - 80, ph - 20);

    // Generate blob URL
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    // Persist the certificate record under the user
    const record = { id: certId, userName, courseTitle, date: completionDate, url };
    const existing = storageService.getCertificatesForUser(userId);
    existing.push(record);
    storageService.setCertificatesForUser(userId, existing);

    return url;
  },

  /**
   * Download a certificate by opening its stored blob URL.
   * Falls back gracefully if the URL has been revoked (page refresh).
   * @param {string} userId
   * @param {string} certId
   */
  downloadCertificate(userId, certId) {
    const certs = storageService.getCertificatesForUser(userId);
    const cert = certs.find((c) => c.id === certId);
    if (!cert || !cert.url) {
      alert('Certificate URL is no longer available. Please regenerate it.');
      return;
    }
    const a = document.createElement('a');
    a.href = cert.url;
    a.download = `certificate-${cert.courseTitle.replace(/\s+/g, '-')}.pdf`;
    a.click();
  },
};
