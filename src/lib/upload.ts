// Image upload utilities

export interface UploadResult {
  url: string;
  filename: string;
}

/**
 * Upload an image file to the server
 * @param file - The file to upload
 * @returns Promise with the uploaded file URL
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload image');
  }

  const data: UploadResult = await response.json();
  
  // Return full URL (for Brevo compatibility, this should be absolute URL in production)
  // For now, return relative URL that will work in generated HTML
  return data.url;
}

/**
 * Convert file to base64 data URL (for temporary preview before upload)
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Generate Brevo-compatible URL from uploaded file
 * In production, this should upload to Brevo CDN or your own CDN
 * For now, returns the relative URL
 */
export function getBrevoImageUrl(relativeUrl: string, baseUrl?: string): string {
  if (baseUrl) {
    return `${baseUrl}${relativeUrl}`;
  }
  // In production, this should be your CDN URL
  // For now, return relative URL (will need to be replaced with absolute URL before sending to Brevo)
  return relativeUrl;
}

