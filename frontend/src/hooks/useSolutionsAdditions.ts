import { solutionsCatalog, SolutionEntry } from '../content/solutionsCatalog';

/**
 * Unified Solutions Hook
 * 
 * Returns the complete solutions catalog without any localStorage-based
 * add/remove functionality. All solutions are always visible.
 */
export function useSolutions() {
  return {
    solutions: solutionsCatalog,
    isLoading: false,
  };
}

/**
 * Get solutions by category
 */
export function useSolutionsByCategory(category: SolutionEntry['category']) {
  const solutions = solutionsCatalog.filter(s => s.category === category);
  return {
    solutions,
    isLoading: false,
  };
}

/**
 * Get all unique categories
 */
export function useCategories() {
  const categories = Array.from(new Set(solutionsCatalog.map(s => s.category))).sort();
  return {
    categories,
    isLoading: false,
  };
}
