import { searchIndex, type SearchEntry, type SearchResult } from '../content/searchIndex';

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/).filter(Boolean);

  return searchIndex
    .map((item) => {
      let score = 0;

      // Title match (highest weight)
      if (item.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
      }

      // Keyword match
      const keywordMatches = item.keywords.filter((kw) =>
        kw.toLowerCase().includes(lowerQuery)
      ).length;
      score += keywordMatches * 5;

      // Description match
      if (item.description && item.description.toLowerCase().includes(lowerQuery)) {
        score += 3;
      }

      // Category match
      if (item.category.toLowerCase().includes(lowerQuery)) {
        score += 2;
      }

      // Individual term matches
      terms.forEach((term) => {
        if (item.title.toLowerCase().includes(term)) score += 2;
        if (item.description && item.description.toLowerCase().includes(term)) score += 1;
        if (item.keywords.some((kw) => kw.toLowerCase().includes(term))) score += 1;
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function groupResultsByCategory(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce((acc, result) => {
    const category = result.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);
}
