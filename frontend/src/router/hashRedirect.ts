/**
 * Detects when the app is loaded at a non-root pathname without a hash route
 * and performs a one-time location.replace() to the equivalent /#<pathname><search> URL.
 * 
 * This prevents 404 errors on page refresh for hash-based routing.
 * 
 * @returns true if a redirect was triggered, false otherwise
 */
export function ensureHashRoute(): boolean {
  const { pathname, search, hash } = window.location;

  // Skip if already on a hash route
  if (hash) {
    return false;
  }

  // Skip if at root path
  if (pathname === '/' || pathname === '') {
    return false;
  }

  // Skip if pathname looks like a file/asset (ends with file extension)
  const lastSegment = pathname.split('/').pop() || '';
  if (lastSegment.includes('.')) {
    return false;
  }

  // Redirect to hash-based route
  const hashRoute = `/#${pathname}${search}`;
  window.location.replace(hashRoute);
  return true;
}
