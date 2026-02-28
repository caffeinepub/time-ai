import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getUrlParameter } from '../utils/urlParams';

/**
 * BrowserSearch is now a backward-compatible alias that redirects to the unified Search page
 * Preserves any ?q= parameter from the URL
 */
export function BrowserSearch() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = getUrlParameter('q');
    const targetPath = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
    navigate({ to: targetPath });
  }, [navigate]);

  // Show minimal loading state during redirect
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <p className="text-muted-foreground">Redirecting to unified search...</p>
    </div>
  );
}
