// src/services/certificateService.js
/**
 * Service to generate PDF certificates using jsPDF.
 * The function returns a Blob URL that can be downloaded.
 */
import { jsPDF } from 'jspdf';
import { storageService } from './storageService';

export const certificateService = {
    /**
     * Generate a certificate PDF for a completed course.
     * @param {Object} params - { userName, courseTitle, completionDate }
     * @returns {string} - Object URL for the generated PDF
     */
    generateCertificate({ userName, courseTitle, completionDate }) {
        const doc = new jsPDF({ orientation: 'landscape' });
        // Background color
        doc.setFillColor(240, 248, 255);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        // Header logo placeholder
        doc.setFontSize(24);
        doc.setTextColor(37, 99, 235);
        doc.text('Digital Shiksha', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
        // Certificate title
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text('Certificate of Completion', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
        // Body
        doc.setFontSize(16);
        doc.text(`This certifies that`, doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129);
        doc.text(userName, doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(`has successfully completed the course`, doc.internal.pageSize.getWidth() / 2, 120, { align: 'center' });
        doc.setFontSize(20);
        doc.setTextColor(37, 99, 235);
        doc.text(courseTitle, doc.internal.pageSize.getWidth() / 2, 140, { align: 'center' });
        // Date and ID
        const certId = `DS-${Date.now()}`;
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Date: ${completionDate}`, 20, doc.internal.pageSize.getHeight() - 20);
        doc.text(`Certificate ID: ${certId}`, doc.internal.pageSize.getWidth() - 60, doc.internal.pageSize.getHeight() - 20);
        // Save to Blob URL
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        // Persist record
        const existing = storageService.getCertificates();
        existing.push({ id: certId, userName, courseTitle, date: completionDate, url });
        storageService.setCertificates(existing);
        return url;
    }
};
