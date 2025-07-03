import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const totalStars = hasHalf ? fullStars + 1 : fullStars;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={cn(
            'text-yellow-400 fill-yellow-400',
            i >= totalStars && 'text-gray-300 fill-transparent'
          )}
        />
      ))}
      <span className="text-[12px] text-gray-500 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}
