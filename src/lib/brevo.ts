// Brevo API integration utilities

export interface BrevoConfig {
  apiKey: string;
  baseUrl?: string; // For image URLs
}

/**
 * Convert relative image URLs to absolute URLs for Brevo
 * @param html - HTML string with relative URLs
 * @param baseUrl - Base URL for images (e.g., 'https://yourdomain.com')
 * @returns HTML with absolute URLs
 */
export function convertToAbsoluteUrls(html: string, baseUrl: string): string {
  // Convert relative image URLs to absolute
  return html.replace(
    /src="(\/uploads\/[^"]+)"/g,
    (match, path) => `src="${baseUrl}${path}"`
  );
}

/**
 * Prepare HTML for Brevo
 * - Converts relative URLs to absolute
 * - Ensures all images have absolute URLs
 * @param html - HTML string
 * @param config - Brevo configuration
 * @returns Prepared HTML
 */
export function prepareForBrevo(html: string, config: BrevoConfig): string {
  if (config.baseUrl) {
    return convertToAbsoluteUrls(html, config.baseUrl);
  }
  return html;
}

/**
 * Brevo API client (prepared for future implementation)
 * 
 * When Brevo API key is available, implement:
 * 
 * 1. Upload images to Brevo CDN
 * 2. Send email via Brevo API
 * 3. Create email template in Brevo
 * 
 * Example structure:
 * 
 * ```typescript
 * export class BrevoClient {
 *   constructor(private apiKey: string) {}
 * 
 *   async uploadImage(file: File): Promise<string> {
 *     // Upload to Brevo CDN
 *   }
 * 
 *   async sendEmail(html: string, recipients: string[]): Promise<void> {
 *     // Send via Brevo API
 *   }
 * 
 *   async createTemplate(html: string, name: string): Promise<string> {
 *     // Create template in Brevo
 *   }
 * }
 * ```
 */

export interface BrevoEmailOptions {
  subject: string;
  html: string;
  recipients: string[];
  from?: {
    email: string;
    name?: string;
  };
}

/**
 * Placeholder for Brevo email sending
 * This will be implemented when API key is available
 */
export async function sendBrevoEmail(
  options: BrevoEmailOptions,
  config: BrevoConfig
): Promise<void> {
  // TODO: Implement Brevo API call when API key is available
  // For now, just log the prepared HTML
  const preparedHtml = prepareForBrevo(options.html, config);
  console.log('Prepared HTML for Brevo:', preparedHtml);
  console.log('Email options:', options);
  
  throw new Error('Brevo API integration not yet implemented. Please use export HTML feature.');
}

