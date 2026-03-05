import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate a single-page PDF from HTML element
 * Automatically scales content to fit on one page
 */
export const generateSinglePagePDF = async (element, fileName = 'document') => {
  try {
    if (!element) {
      throw new Error('No element provided for PDF generation');
    }

    // Get the element dimensions
    const originalWidth = element.offsetWidth;
    const originalHeight = element.offsetHeight;

    // A4 dimensions in pixels (assuming 96 DPI)
    const A4_WIDTH = 210; // mm
    const A4_HEIGHT = 297; // mm
    const DPI = 96;
    const A4_WIDTH_PX = (A4_WIDTH / 25.4) * DPI;
    const A4_HEIGHT_PX = (A4_HEIGHT / 25.4) * DPI;

    // Calculate scaling factor to fit content on one page
    const scaleX = A4_WIDTH_PX / originalWidth;
    const scaleY = A4_HEIGHT_PX / originalHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

    // Create canvas with scaled dimensions
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowHeight: originalHeight,
      backgroundColor: '#ffffff',
      // Ensure single page by constraining canvas
      maxHeight: A4_HEIGHT_PX * 2,
      maxWidth: A4_WIDTH_PX * 2,
      canvasWidth: A4_WIDTH_PX,
      canvasHeight: A4_HEIGHT_PX,
    });

    // Calculate final image dimensions for PDF
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = A4_WIDTH;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add image ensuring it fits on single page
    const pdfHeight = A4_HEIGHT;
    const finalHeight = Math.min(imgHeight, pdfHeight - 5); // Leave small margin

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, finalHeight);

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating single-page PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

/**
 * Generate optimized single-page PDF with better compression
 */
export const generateOptimizedPDF = async (element, fileName = 'document', options = {}) => {
  try {
    const {
      scale = 2,
      quality = 0.95,
      margin = 5, // mm
    } = options;

    if (!element) {
      throw new Error('No element provided for PDF generation');
    }

    // Get dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // A4 dimensions
    const A4_WIDTH = 210; // mm
    const A4_HEIGHT = 297; // mm
    const A4_WIDTH_PX = (A4_WIDTH / 25.4) * 96;
    const A4_HEIGHT_PX = (A4_HEIGHT / 25.4) * 96;

    // Create canvas
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowHeight: elementHeight,
      // Constraint to single page
      canvasWidth: A4_WIDTH_PX,
      canvasHeight: A4_HEIGHT_PX,
    });

    const imgData = canvas.toDataURL('image/png', quality);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Calculate dimensions to fit on page with margins
    const availableWidth = A4_WIDTH - 2 * margin;
    const availableHeight = A4_HEIGHT - 2 * margin;

    // Calculate aspect ratio and fit
    const aspectRatio = canvas.width / canvas.height;
    let finalWidth = availableWidth;
    let finalHeight = availableWidth / aspectRatio;

    if (finalHeight > availableHeight) {
      finalHeight = availableHeight;
      finalWidth = availableHeight * aspectRatio;
    }

    // Center the image
    const xPos = (A4_WIDTH - finalWidth) / 2;
    const yPos = margin;

    pdf.addImage(imgData, 'PNG', xPos, yPos, finalWidth, finalHeight);

    // Save PDF
    pdf.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating optimized PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

/**
 * Generate PDF with font optimization for better text rendering
 */
export const generatePDFWithOptimization = async (element, fileName = 'document', options = {}) => {
  try {
    const {
      scale = 3, // Higher scale for better quality
      format = 'a4',
      orientation = 'portrait',
    } = options;

    if (!element) {
      throw new Error('No element provided');
    }

    // Temporarily hide overflow
    const originalOverflow = element.style.overflow;
    element.style.overflow = 'hidden';

    // Create high-quality canvas
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Force single page size
      windowHeight: element.scrollHeight,
    });

    // Restore overflow
    element.style.overflow = originalOverflow;

    // Get dimensions
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
      compress: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const ratio = canvas.width / canvas.height;

    let width = A4_WIDTH - 10;
    let height = width / ratio;

    // If height exceeds page, scale down
    if (height > A4_HEIGHT - 10) {
      height = A4_HEIGHT - 10;
      width = height * ratio;
    }

    // Center horizontally
    const x = (A4_WIDTH - width) / 2;
    const y = 5;

    pdf.addImage(imgData, 'JPEG', x, y, width, height);
    pdf.save(`${fileName}.pdf`);

    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

/**
 * Download resume as single-page PDF without printing
 */
export const downloadResumeSinglePage = async (element, resumeName = 'resume') => {
  try {
    // Validate element
    if (!element) {
      throw new Error('Resume element not found. Please ensure preview is rendered.');
    }

    // Hide print-only elements
    const printElements = element.querySelectorAll('.print-only');
    const originalDisplay = [];
    printElements.forEach((el) => {
      originalDisplay.push(el.style.display);
      el.style.display = 'none';
    });

    // Generate PDF using optimization
    await generatePDFWithOptimization(
      element,
      `${resumeName.replace(/\s+/g, '_')}_Resume`,
      {
        scale: 3,
        orientation: 'portrait',
      }
    );

    // Restore print elements
    printElements.forEach((el, idx) => {
      el.style.display = originalDisplay[idx];
    });

    return { success: true, message: 'Resume downloaded successfully' };
  } catch (error) {
    console.error('Download error:', error);
    throw new Error(`Failed to download resume: ${error.message}`);
  }
};
