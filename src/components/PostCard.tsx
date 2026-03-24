import { Link } from 'react-router-dom';
import { PlayCircle, TrendingUp, Eye } from 'lucide-react';
import { Post } from '../types';
import { ReactionButtons } from './ReactionButtons';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import React from 'react';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
  key?: React.Key;
}

export function PostCard({ post, featured = false, className }: PostCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views.toString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100",
        featured ? "md:flex-row md:col-span-2 lg:col-span-3" : "",
        className
      )}
    >
      <Link to={`/post/${post.id}`} className={cn(
        "relative block overflow-hidden",
        featured ? "md:w-2/3 lg:w-3/4" : "aspect-[4/3]"
      )}>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={cn(
            "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-sm",
            post.category === 'Sports' ? "bg-blue-500" :
            post.category === 'Entertainment' ? "bg-purple-500" :
            post.category === 'Videos' ? "bg-red-500" : "bg-yellow-500"
          )}>
            {post.category}
          </span>
          {post.isTrending && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-red-500 text-white shadow-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
        </div>

        {post.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <PlayCircle className="w-16 h-16 text-white opacity-90 drop-shadow-lg group-hover:scale-110 transition-transform" />
          </div>
        )}
      </Link>

      <div className={cn(
        "flex flex-col flex-1 p-5",
        featured ? "md:w-1/3 lg:w-1/4 md:justify-center" : ""
      )}>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {formatViews(post.views)} views
          </span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>

        <Link to={`/post/${post.id}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className={cn(
            "font-bold text-gray-900 leading-tight mb-2 line-clamp-3",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <ReactionButtons likes={post.likes} fires={post.fires} wows={post.wows} />
        </div>
      </div>
    </motion.div>
  );
}
