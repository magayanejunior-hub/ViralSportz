import { useState } from 'react';
import { mockPosts, mockAds } from '../data/mockData';
import { LayoutDashboard, FileText, Image as ImageIcon, DollarSign, Settings, Plus, Trash2, Edit } from 'lucide-react';
import { cn } from '../lib/utils';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'posts' | 'ads'>('posts');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[800px]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="font-black text-2xl tracking-tight">
            VIRAL<span className="text-red-500">ADMIN</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Content Management</p>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('posts')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors text-left",
              activeTab === 'posts' ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <FileText className="w-5 h-5" /> Manage Posts
          </button>
          <button 
            onClick={() => setActiveTab('ads')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors text-left",
              activeTab === 'ads' ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <DollarSign className="w-5 h-5" /> Ad Placements
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-left">
            <ImageIcon className="w-5 h-5" /> Media Library
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-left">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 bg-gray-50">
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black text-gray-900">Posts</h1>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" /> New Post
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Views</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockPosts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={post.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <span className="font-bold text-gray-900 line-clamp-1">{post.title}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black text-gray-900">Ad Placements</h1>
              <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
            
            <p className="text-gray-600 mb-8">
              Paste your Google AdSense or custom ad network code into the slots below. The system will automatically display them in the correct locations.
            </p>

            <div className="space-y-6">
              {mockAds.map(ad => (
                <div key={ad.id} className="bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wide flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-gray-400" />
                      {ad.position.replace('-', ' ')} Ad
                    </h3>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked={ad.active} />
                        <div className={cn("block w-10 h-6 rounded-full transition-colors", ad.active ? "bg-green-500" : "bg-gray-300")}></div>
                        <div className={cn("dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", ad.active ? "transform translate-x-4" : "")}></div>
                      </div>
                      <span className="ml-3 text-sm font-bold text-gray-600">
                        {ad.active ? 'Active' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                  <textarea 
                    className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-y"
                    defaultValue={`<!-- ${ad.code} -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"\n     data-ad-slot="XXXXXXXXXX"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`}
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
