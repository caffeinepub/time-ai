/**
 * Utility functions for file downloads
 */

/**
 * Sanitizes a filename by removing special characters and replacing spaces with hyphens
 * @param filename - The filename to sanitize
 * @returns Sanitized filename safe for use in file systems
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
    .substring(0, 50); // Limit length to 50 characters
}

/**
 * Formats a timestamp for use in filenames
 * @param date - The date to format
 * @returns Formatted timestamp string (YYYYMMDD-HHMMSS)
 */
export function formatTimestampForFilename(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

/**
 * Triggers a browser download for the given content
 * @param content - The content to download
 * @param filename - The filename for the download
 * @param mimeType - The MIME type of the content
 */
export function triggerDownload(content: string, filename: string, mimeType: string): void {
  // Create a Blob with the content
  const blob = new Blob([content], { type: mimeType });
  
  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  
  // Append to body, click, and remove
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  // Clean up the URL
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Generates a PDF from HTML content using browser's print functionality
 * @param htmlContent - The HTML content to convert to PDF
 * @param filename - The filename for the PDF
 */
export function generatePDFFromHTML(htmlContent: string, filename: string): void {
  // Create a Blob with HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Open in a new window and trigger print dialog
  const printWindow = window.open(url, '_blank');
  
  if (printWindow) {
    printWindow.onload = () => {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        printWindow.print();
        // Clean up after a delay
        setTimeout(() => {
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 100);
      }, 250);
    };
  } else {
    // Fallback: download as HTML if popup is blocked
    triggerDownload(htmlContent, filename.replace('.pdf', '.html'), 'text/html');
    URL.revokeObjectURL(url);
  }
}
