import { useVirtual } from 'react-virtual';
import { useRef, useEffect, useState, useCallback } from 'react';

interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  columnCount: number;
}

export function VirtualizedGrid<T>({ items, renderItem, columnCount }: VirtualizedGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, []);

  const rowVirtualizer = useVirtual({
    size: Math.ceil(items.length / columnCount),
    parentRef,
    estimateSize: useCallback(() => 300, []), // Estimasi tinggi row
    overscan: 5
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {items
              .slice(
                virtualRow.index * columnCount,
                (virtualRow.index + 1) * columnCount
              )
              .map((item) => renderItem(item))}
          </div>
        ))}
      </div>
    </div>
  );
} 