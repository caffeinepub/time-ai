import { useEffect, useState, useRef, useCallback } from 'react';

interface UseNavbarOverflowOptions {
  maxRows?: number;
  enabled?: boolean;
}

interface UseNavbarOverflowResult {
  visibleCount: number;
  overflowCount: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLElement | null)[]>;
}

export function useNavbarOverflow(
  totalItems: number,
  options: UseNavbarOverflowOptions = {}
): UseNavbarOverflowResult {
  const { maxRows = 2, enabled = true } = options;
  const [visibleCount, setVisibleCount] = useState(totalItems);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const calculateOverflow = useCallback(() => {
    if (!enabled || !containerRef.current || itemRefs.current.length === 0) {
      setVisibleCount(totalItems);
      return;
    }

    const container = containerRef.current;
    const items = itemRefs.current.filter((item): item is HTMLElement => item !== null);

    if (items.length === 0) {
      setVisibleCount(totalItems);
      return;
    }

    // Get the first item to determine row height
    const firstItem = items[0];
    if (!firstItem) {
      setVisibleCount(totalItems);
      return;
    }

    const firstItemRect = firstItem.getBoundingClientRect();
    const rowHeight = firstItemRect.height;
    const maxHeight = rowHeight * maxRows;

    // Find items that exceed the max height
    let lastVisibleIndex = totalItems - 1;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;
      
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      
      // If this item's top position exceeds our max height threshold, it's in row 3+
      if (relativeTop >= maxHeight - 5) { // 5px tolerance
        lastVisibleIndex = i - 1;
        break;
      }
    }

    // Ensure at least some items are visible
    const newVisibleCount = Math.max(1, lastVisibleIndex + 1);
    setVisibleCount(newVisibleCount);
  }, [enabled, totalItems, maxRows]);

  useEffect(() => {
    if (!enabled) {
      setVisibleCount(totalItems);
      return;
    }

    // Initial calculation
    const timer = setTimeout(calculateOverflow, 100);

    // Recalculate on window resize
    const handleResize = () => {
      calculateOverflow();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateOverflow, enabled, totalItems]);

  const overflowCount = Math.max(0, totalItems - visibleCount);

  return {
    visibleCount,
    overflowCount,
    containerRef,
    itemRefs,
  };
}
