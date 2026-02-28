import { routes } from '../router/routes';

/**
 * Omnibox utility for unified search and navigation
 * Handles both keyword/content search and direct navigation input
 */

export interface NavigationMatch {
  type: 'route' | 'label';
  path: string;
  label: string;
}

/**
 * Normalize user input for navigation matching
 */
function normalizeInput(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Check if input matches a route path exactly or partially
 */
export function matchRoutePath(input: string): NavigationMatch | null {
  const normalized = normalizeInput(input);
  
  // Exact path match
  for (const [, route] of Object.entries(routes)) {
    if (route.path.toLowerCase() === normalized || route.path.toLowerCase() === `/${normalized}`) {
      return {
        type: 'route',
        path: route.path,
        label: route.label,
      };
    }
  }
  
  // Partial path match (e.g., "trade/market" matches "/trade/market")
  for (const [, route] of Object.entries(routes)) {
    const routePath = route.path.toLowerCase();
    if (routePath.includes(normalized) || normalized.includes(routePath.substring(1))) {
      return {
        type: 'route',
        path: route.path,
        label: route.label,
      };
    }
  }
  
  return null;
}

/**
 * Check if input matches a route label exactly
 */
export function matchRouteLabel(input: string): NavigationMatch | null {
  const normalized = normalizeInput(input);
  
  for (const [, route] of Object.entries(routes)) {
    if (route.label.toLowerCase() === normalized) {
      return {
        type: 'label',
        path: route.path,
        label: route.label,
      };
    }
  }
  
  return null;
}

/**
 * Resolve navigation from user input
 * Returns a navigation match if the input is a valid route path or exact label match
 */
export function resolveNavigation(input: string): NavigationMatch | null {
  if (!input.trim()) {
    return null;
  }
  
  // Try exact label match first (highest priority)
  const labelMatch = matchRouteLabel(input);
  if (labelMatch) {
    return labelMatch;
  }
  
  // Try path match
  const pathMatch = matchRoutePath(input);
  if (pathMatch) {
    return pathMatch;
  }
  
  return null;
}
