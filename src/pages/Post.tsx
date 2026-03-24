import { useParams, Link } from 'react-router-dom';
import { mockPosts } from '../data/mockData';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ReactionButtons } from '../components/ReactionButtons';
import { Share2, MessageCircle, Clock, Eye, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export function PostPage() {
  const { id } = useParams();
  const post = mockPosts.find(p => p.id === id) || mockPosts[0]; // Fallback for demo
  const relatedPosts = mockPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Media Header */}
      <div className="relative aspect-video w-full bg-gray-900">
        {post.videoUrl ? (
          <video 
            src={post.videoUrl} 
            poster={post.imageUrl}
            controls 
            autoPlay 
            muted 
            className="w-full h-full object-contain"
          />
        ) : (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <Link to="/" className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
      </div>

      <div className="p-6 md:p-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full bg-blue-100 text-blue-700">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {post.views.toLocaleString()} views
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-red-500 pl-4">
          {post.excerpt}
        </p>

        {/* Share & React Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100 mb-8 bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10">
          <ReactionButtons likes={post.likes} fires={post.fires} wows={post.wows} className="scale-110 origin-left" />
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              WhatsApp
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              X
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-300 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* In-Article Ad */}
        <div className="my-10 flex justify-center">
          <AdPlaceholder position="article" />
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            Comments (24)
          </h3>
          
          <div className="flex gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="flex-1">
              <textarea 
                placeholder="Add a comment..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none h-24"
              ></textarea>
              <div className="mt-2 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 p-6 md:p-10 border-t border-gray-100">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map(rp => (
              <Link key={rp.id} to={`/post/${rp.id}`} className="group block">
                <div className="aspect-video rounded-xl overflow-hidden mb-3">
                  <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {rp.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
