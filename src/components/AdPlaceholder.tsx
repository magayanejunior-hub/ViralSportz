import { cn } from '../lib/utils';

interface AdPlaceholderProps {
  position: 'header' | 'feed' | 'article' | 'sidebar' | 'sticky-bottom';
  className?: string;
}

export function AdPlaceholder({ position, className }: AdPlaceholderProps) {
  // In a real app, this would render actual Google AdSense code or similar
  // based on the position and active status from the backend/CMS.
  
  const getAdDimensions = () => {
    switch (position) {
      case 'header': return 'w-full h-[90px] max-w-[728px]';
      case 'feed': return 'w-full h-[250px] max-w-[300px] sm:max-w-full sm:h-[150px]';
      case 'article': return 'w-full h-[250px] max-w-[300px] mx-auto';
      case 'sidebar': return 'w-full h-[600px] max-w-[300px]';
      case 'sticky-bottom': return 'w-full h-[50px] max-w-[320px]';
      default: return 'w-full h-[100px]';
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 text-gray-400 font-mono text-sm overflow-hidden",
      getAdDimensions(),
      className
    )}>
      <div className="text-center p-2">
        <span className="block font-bold text-gray-500 mb-1 uppercase">{position} AD</span>
        <span className="text-xs opacity-70">Advertisement</span>
      </div>
    </div>
  );
}
