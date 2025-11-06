import { enhancedMedia } from '@/data/enhancedMedia';

type SearchResult = {
  id: number;
  title: string;
  plot: string;
  poster_path?: string | null;
  year: number;
  media_type: 'movie' | 'tv' | 'web-series';
  rating?: number;
};

export const searchContent = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  // Search in all media
  return [
    ...enhancedMedia.movies,
    ...(enhancedMedia.tvShows || [])
  ].filter(media => {
    const title = media.title?.toLowerCase() || '';
    const plot = media.plot?.toLowerCase() || '';
    const originalTitle = media.original_title?.toLowerCase() || '';
    const genres = media.genres?.map(g => g.toLowerCase()) || [];
    
    return (
      title.includes(searchTerm) || 
      plot.includes(searchTerm) ||
      originalTitle.includes(searchTerm) ||
      genres.some(genre => genre.includes(searchTerm))
    );
  }).map(media => ({
    id: media.id,
    title: media.title,
    plot: media.plot,
    poster_path: media.poster_path,
    year: media.year,
    media_type: media.type,
    rating: media.rating
  }));
};

export const searchByGenre = (genre: string): SearchResult[] => {
  if (!genre) return [];
  
  const genreLower = genre.toLowerCase();
  
  // Search in all media
  return [
    ...enhancedMedia.movies,
    ...(enhancedMedia.tvShows || [])
  ].filter(media => 
    media.genres?.some(g => g.toLowerCase().includes(genreLower))
  ).map(media => ({
    id: media.id,
    title: media.title,
    plot: media.plot,
    poster_path: media.poster_path,
    year: media.year,
    media_type: media.type,
    rating: media.rating
  }));
};
