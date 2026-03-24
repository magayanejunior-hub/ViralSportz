import { useState, useEffect } from 'react';
import { mockPosts } from '../data/mockData';
import { PostCard } from '../components/PostCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { motion } from 'motion/react';
import { PlayCircle, TrendingUp, Hash } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Home() {
  const { category } = useParams();
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  // Reset visible posts when category changes
  useEffect(() => {
    setVisiblePosts(6);
    window.scrollTo(0, 0);
  }, [category]);

  const filteredPosts = category 
    ? mockPosts.filter(p => 
        category.toLowerCase() === 'trending' 
          ? p.isTrending 
          : p.category.toLowerCase() === category.toLowerCase()
      )
    : mockPosts;

  const trendingPosts = filteredPosts.filter(p => p.isTrending).slice(0, 3);
  const feedPosts = filteredPosts.slice(0, visiblePosts);
  const videoPosts = mockPosts.filter(p => p.category === 'Videos').slice(0, 4);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 4, filteredPosts.length));
  };

  return (
    <div className="space-y-12">
      {/* Category Header (if category selected) */}
      {category && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-2xl text-white",
              category === 'sports' ? "bg-blue-500" :
              category === 'entertainment' ? "bg-purple-500" :
              category === 'videos' ? "bg-red-500" : "bg-yellow-500"
            )}>
              <Hash className="w-8 h-8" />
            </div>
            {category}
          </h1>
        </div>
      )}

      {/* Trending Section - Only show on home page or if there are trending posts in this category */}
      {(!category || trendingPosts.length > 0) && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-red-100 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {category ? `Trending in ${category}` : 'Trending Now'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPosts.map((post, index) => (
              <PostCard 
                key={post.id} 
                post={post} 
                featured={index === 0} 
                className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              />
            ))}
          </div>
        </section>
      )}

      {/* Feed Ad */}
      <div className="flex justify-center my-8">
        <AdPlaceholder position="feed" />
      </div>

      {/* Latest Feed */}
      <section>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
          <span className="w-3 h-8 bg-blue-500 rounded-full inline-block"></span>
          {category ? `Latest in ${category}` : 'Latest Feed'}
        </h2>
        
        {feedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedPosts.map((post, index) => (
              <div key={post.id} className="contents">
                <PostCard post={post} />
                {/* Insert ad after every 4th post */}
                {(index + 1) % 4 === 0 && (
                  <div className="col-span-1 md:col-span-2 flex justify-center py-4">
                    <AdPlaceholder position="feed" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium text-lg">No posts found in this category.</p>
          </div>
        )}

        {visiblePosts < filteredPosts.length && (
          <div className="mt-10 text-center">
            <button 
              onClick={loadMore}
              className="px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Load More Content
            </button>
          </div>
        )}
      </section>

      {/* Video Section - Always show at bottom */}
      <section className="bg-gray-900 text-white rounded-3xl p-8 -mx-4 sm:mx-0 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
            <PlayCircle className="w-8 h-8 text-red-500" />
            Viral Videos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoPosts.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`} className="group relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-800 block">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white line-clamp-2 text-sm">{post.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">{post.views.toLocaleString()} views</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
