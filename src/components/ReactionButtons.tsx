import { useState } from 'react';
import { ThumbsUp, Flame, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReactionButtonsProps {
  likes: number;
  fires: number;
  wows: number;
  className?: string;
}

export function ReactionButtons({ likes: initialLikes, fires: initialFires, wows: initialWows, className }: ReactionButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [fires, setFires] = useState(initialFires);
  const [wows, setWows] = useState(initialWows);
  
  const [reacted, setReacted] = useState<{like: boolean, fire: boolean, wow: boolean}>({
    like: false, fire: false, wow: false
  });

  const handleReact = (type: 'like' | 'fire' | 'wow') => {
    if (type === 'like') {
      setLikes(prev => reacted.like ? prev - 1 : prev + 1);
      setReacted(prev => ({ ...prev, like: !prev.like }));
    } else if (type === 'fire') {
      setFires(prev => reacted.fire ? prev - 1 : prev + 1);
      setReacted(prev => ({ ...prev, fire: !prev.fire }));
    } else if (type === 'wow') {
      setWows(prev => reacted.wow ? prev - 1 : prev + 1);
      setReacted(prev => ({ ...prev, wow: !prev.wow }));
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button 
        onClick={() => handleReact('like')}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          reacted.like ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        <ThumbsUp className={cn("w-4 h-4", reacted.like && "fill-current")} />
        {formatNumber(likes)}
      </button>
      
      <button 
        onClick={() => handleReact('fire')}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          reacted.fire ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        <Flame className={cn("w-4 h-4", reacted.fire && "fill-current")} />
        {formatNumber(fires)}
      </button>

      <button 
        onClick={() => handleReact('wow')}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          reacted.wow ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
      >
        <Star className={cn("w-4 h-4", reacted.wow && "fill-current")} />
        {formatNumber(wows)}
      </button>
    </div>
  );
}
