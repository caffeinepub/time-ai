/**
 * Utility functions for computing and formatting cryptographic hashes
 * for the AI Notary system
 */

/**
 * Computes SHA-256 hash of text content
 */
export async function computeTextHash(text: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

/**
 * Computes SHA-256 hash of file content
 */
export async function computeFileHash(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  return new Uint8Array(hashBuffer);
}

/**
 * Converts Uint8Array hash to hex string for display
 */
export function hashToHex(hash: Uint8Array): string {
  return Array.from(hash)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts hex string back to Uint8Array
 */
export function hexToHash(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}
