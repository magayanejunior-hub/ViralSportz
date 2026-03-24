export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  videoUrl?: string;
  category: 'Sports' | 'Entertainment' | 'Trending' | 'Videos';
  views: number;
  likes: number;
  fires: number;
  wows: number;
  createdAt: string;
  isTrending?: boolean;
}

export interface AdConfig {
  id: string;
  position: 'header' | 'feed' | 'article' | 'sidebar' | 'sticky-bottom';
  code: string;
  active: boolean;
}
