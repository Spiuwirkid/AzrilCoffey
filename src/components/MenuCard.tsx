import { memo } from 'react';
import { OptimizedImage } from './OptimizedImage';

const MenuCard = memo(({ item, onDelete }) => {
  return (
    <div className="group relative bg-white rounded-lg border overflow-hidden">
      {/* ... card content ... */}
    </div>
  );
}); 