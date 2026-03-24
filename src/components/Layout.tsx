import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AdPlaceholder } from './AdPlaceholder';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />
      
      {/* Top Header Ad */}
      <div className="w-full bg-white border-b border-gray-100 py-4 flex justify-center">
        <AdPlaceholder position="header" />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-black text-lg uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Must Read
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 group cursor-pointer">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/sidebar${i}/100/100`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          This is a catchy title for a sidebar article that people want to click
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <AdPlaceholder position="sidebar" />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-black text-3xl tracking-tight mb-4">
            VIRAL<span className="text-red-500">FEED</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your daily dose of the most exciting, viral, and trending content on the internet.
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold uppercase tracking-wider text-gray-400">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Ad (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center p-2">
        <AdPlaceholder position="sticky-bottom" />
      </div>
    </div>
  );
}
