// Enhanced dataset with popular Indian and international films
import { allMovies } from './regionalMovies';

// Interface for enhanced media data
export interface WatchLink {
  platform: string;
  type: 'subscription' | 'rent' | 'buy' | 'free';
  price?: string;
  url: string;
  quality?: 'SD' | 'HD' | '4K' | '8K';
  available_since?: string;
  expires_at?: string;
}

export interface UserReview {
  user: string;
  rating: number;
  comment: string;
  timestamp?: string;
  verified?: boolean;
}

export interface SubtitleTrack {
  language: string;
  code: string;
  is_default?: boolean;
}

export interface AudioTrack {
  language: string;
  code: string;
  channels: string;
  is_default?: boolean;
}

export interface MediaItem {
  // Core identification
  id: number;
  title: string;
  original_title?: string;
  type: 'movie' | 'tv' | 'web-series';
  
  // Release and duration
  year: number;
  release_date?: string;
  runtime?: number;
  
  // Content information
  plot: string;
  tagline?: string;
  genres: string[];
  
  // People
  director: string;
  directors?: string[];
  cast: string[];
  writers?: string[];
  producers?: string[];
  
  // Media assets
  poster_path: string;
  backdrop_path: string;
  trailer_url: string;
  clips?: string[];
  images?: string[];
  
  // Localization
  language: string;
  original_language?: string;
  subtitles?: string[];
  audio_languages?: string[];
  subtitle_tracks?: SubtitleTrack[];
  audio_tracks?: AudioTrack[];
  
  // Ratings and reviews
  rating: number;
  vote_count?: number;
  imdb_rating?: number;
  imdb_id?: string;
  tmdb_id?: string;
  user_reviews?: UserReview[];
  
  // Content classification
  certification?: string;
  content_rating?: string;
  
  // Watch and download options
  watch_links: WatchLink[];
  download_links: {
    poster: string;
    backdrop: string;
    trailer?: string;
    clips?: string[];
  };
  
  // Technical specifications
  aspect_ratio?: string;
  resolution?: string;
  
  // Production information
  production_companies?: string[];
  production_countries?: string[];
  
  // Series-specific
  seasons?: number;
  episodes?: number;
  status?: 'Returning Series' | 'Ended' | 'In Production';
}

// Additional popular movies to include
const additionalMovies: MediaItem[] = [
  {
    id: 1,
    title: "Avengers: Endgame",
    type: "movie",
    year: 2019,
    rating: 8.4,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
    plot: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailer_url: "https://www.youtube.com/embed/TcMBFSGVi1c",
    runtime: 181,
    language: "English",
    original_language: "en",
    subtitles: ["English", "Hindi", "Tamil", "Telugu"],
    audio_languages: ["English", "Hindi", "Tamil", "Telugu"],
    watch_links: [
      {
        platform: "Disney+",
        type: "subscription",
        url: "https://www.disneyplus.com/movies/avengers-endgame/aRbVJUb2h2wE",
        quality: "4K"
      },
      {
        platform: "Amazon Prime Video",
        type: "rent",
        price: "$3.99",
        url: "https://www.primevideo.com/detail/0S3QY9WB0D1XQ1KZJQZ8Z8Z8Z8",
        quality: "HD"
      }
    ],
    user_reviews: [
      {
        user: "MovieBuff123",
        rating: 5,
        comment: "Epic conclusion to the Infinity Saga!",
        verified: true
      },
      {
        user: "CinemaLover",
        rating: 4.5,
        comment: "Amazing visual effects and emotional depth.",
        verified: true
      }
    ],
    download_links: {
      poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    }
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    type: "movie",
    year: 2001,
    rating: 7.9,
    genres: ["Adventure", "Fantasy", "Family"],
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "Alan Rickman", "Maggie Smith"],
    plot: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry.",
    poster_path: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
    trailer_url: "https://www.youtube.com/embed/VyHV0BRtdxo",
    runtime: 152,
    language: "English",
    original_language: "en",
    subtitles: ["English", "Spanish", "French", "German"],
    audio_languages: ["English", "Spanish", "French", "German"],
    watch_links: [
      {
        platform: "HBO Max",
        type: "subscription",
        url: "https://play.hbomax.com/feature/urn:hbo:feature:GXdu2NAw0V5JCgEAAAAJ",
        quality: "HD"
      },
      {
        platform: "Amazon Prime Video",
        type: "rent",
        price: "$3.99",
        url: "https://www.primevideo.com/detail/Harry-Potter-and-the-Philosophers-Stone/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2",
        quality: "HD"
      }
    ],
    download_links: {
      poster: "https://image.tmdb.org/t/p/original/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/hziiv14OpD73u9gAak4XDDfBKa2.jpg"
    },
    user_reviews: [
      {
        user: "PotterFan",
        rating: 5,
        comment: "The magic begins here! A perfect start to the series.",
        verified: true
      }
    ]
  },
  {
    id: 11,
    title: "K.G.F: Chapter 2",
    type: "movie",
    year: 2022,
    rating: 8.4,
    genres: ["Action", "Drama", "Thriller"],
    director: "Prashanth Neel",
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Srinidhi Shetty"],
    plot: "The blood-soaked land of Kolar Gold Fields has a new overlord now - Rocky, whose name strikes fear in the hearts of his foes. His allies look up to him as their savior, the government sees him as a threat, and his enemies are clamoring for revenge.",
    poster_path: "https://image.tmdb.org/t/p/w500/1zVuD3ZEZfPzWfynqjP5MKsnnjf.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/2RSirqZG949GuRwN38MYCIGG4Od.jpg",
    trailer_url: "https://www.youtube.com/embed/JKa05nyUmuQ",
    runtime: 168,
    language: "Kannada",
    original_language: "kn",
    subtitles: ["Kannada", "Hindi", "Tamil", "Telugu", "Malayalam", "English"],
    audio_languages: ["Kannada", "Hindi", "Tamil", "Telugu"],
    watch_links: [
      {
        platform: "Amazon Prime Video",
        type: "subscription",
        url: "https://www.primevideo.com/detail/0S3QY9WB0D1XQ1KZJQZ8Z8Z8Z8",
        quality: "4K"
      },
      {
        platform: "ZEE5",
        type: "subscription",
        url: "https://www.zee5.com/movies/details/k-g-f-chapter-2/0-6-4z5186546",
        quality: "HD"
      }
    ],
    download_links: {
      poster: "https://image.tmdb.org/t/p/original/1zVuD3ZEZfPzWfynqjP5MKsnnjf.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/2RSirqZG949GuRwN38MYCIGG4Od.jpg"
    },
    user_reviews: [
      {
        user: "IndianCinemaLover",
        rating: 5,
        comment: "Yash's performance is outstanding! A true pan-Indian blockbuster.",
        verified: true
      }
    ]
  },
  // South Indian Cinema
  {
    id: 14,
    title: "RRR",
    type: "movie",
    year: 2022,
    rating: 7.8,
    genres: ["Action", "Drama", "Period"],
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"],
    plot: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.",
    poster_path: "https://image.tmdb.org/t/p/w500/5mFUv72ikqIx3GjsdBQif2Ryo2G.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/5mFUv72ikqIx3GjsdBQif2Ryo2G.jpg",
    trailer_url: "https://www.youtube.com/embed/fCO7f0SmjDg",
    runtime: 182,
    language: "Telugu",
    original_language: "te",
    subtitles: ["Telugu", "Hindi", "Tamil", "Malayalam", "English"],
    audio_languages: ["Telugu", "Hindi", "Tamil", "Malayalam", "English"],
    user_reviews: [
      { 
        user: "CinemaLover", 
        rating: 5, 
        comment: "Visual masterpiece with outstanding performances!" 
      },
      { 
        user: "MovieBuff", 
        rating: 4, 
        comment: "Rajamouli delivers another epic. Naatu Naatu is a highlight!" 
      }
    ],
    watch_links: [
      { 
        platform: "Netflix", 
        type: "subscription", 
        url: "https://www.netflix.com/title/81429076",
        quality: "4K"
      },
      { 
        platform: "ZEE5", 
        type: "subscription", 
        url: "https://www.zee5.com/movies/details/rrr/0-6-4z5416964",
        quality: "HD"
      }
    ],
    download_links: {
      poster: "https://image.tmdb.org/t/p/original/5mFUv72ikqIx3GjsdBQif2Ryo2G.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/5mFUv72ikqIx3GjsdBQif2Ryo2G.jpg"
    }
  }
];

export const enhancedMedia = {
  movies: [...allMovies, ...additionalMovies],
  tvShows: [],

  // Filtering helper functions
  filterByLanguage(items: MediaItem[], language: string): MediaItem[] {
    return items.filter(item => 
      item.language.toLowerCase() === language.toLowerCase() ||
      item.original_language?.toLowerCase() === language.toLowerCase()
    );
  },
  
  filterByYear(items: MediaItem[], year: number): MediaItem[] {
    return items.filter(item => item.year === year);
  },
  
  filterByGenre(items: MediaItem[], genre: string): MediaItem[] {
    return items.filter(item => 
      item.genres.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  },
  
  filterByRating(items: MediaItem[], minRating: number): MediaItem[] {
    return items.filter(item => item.rating >= minRating);
  },
  
  filterByRuntime(items: MediaItem[], maxRuntime: number): MediaItem[] {
    return items.filter(item => item.runtime && item.runtime <= maxRuntime);
  },
  
  filterBySubtitles(items: MediaItem[], language: string): MediaItem[] {
    return items.filter(item => 
      item.subtitles?.some(sub => sub.toLowerCase() === language.toLowerCase()) ||
      item.subtitle_tracks?.some(track => 
        track.language.toLowerCase() === language.toLowerCase()
      )
    );
  },
  
  filterByAudio(items: MediaItem[], language: string): MediaItem[] {
    return items.filter(item => 
      item.audio_languages?.some(lang => lang.toLowerCase() === language.toLowerCase()) ||
      item.audio_tracks?.some(track => 
        track.language.toLowerCase() === language.toLowerCase()
      )
    );
  },
  
  // Advanced filtering with multiple criteria
  advancedFilter(
    items: MediaItem[], 
    filters: {
      language?: string;
      year?: number;
      genre?: string;
      minRating?: number;
      maxRuntime?: number;
      subtitles?: string;
      audio?: string;
      searchQuery?: string;
    }
  ): MediaItem[] {
    let result = [...items];
    
    if (filters.language) {
      result = this.filterByLanguage(result, filters.language);
    }
    
    if (filters.year) {
      result = this.filterByYear(result, filters.year);
    }
    
    if (filters.genre) {
      result = this.filterByGenre(result, filters.genre);
    }
    
    if (filters.minRating) {
      result = this.filterByRating(result, filters.minRating);
    }
    
    if (filters.maxRuntime) {
      result = this.filterByRuntime(result, filters.maxRuntime);
    }
    
    if (filters.subtitles) {
      result = this.filterBySubtitles(result, filters.subtitles);
    }
    
    if (filters.audio) {
      result = this.filterByAudio(result, filters.audio);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.original_title?.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query) ||
        item.cast.some(actor => actor.toLowerCase().includes(query)) ||
        item.genres.some(genre => genre.toLowerCase().includes(query))
      );
    }
    
    return result;
  },
  
  // Get all unique values for filters
  getAvailableFilters(items: MediaItem[]) {
    const languages = new Set<string>();
    const years = new Set<number>();
    const genres = new Set<string>();
    const subtitles = new Set<string>();
    const audioLanguages = new Set<string>();
    
    items.forEach(item => {
      languages.add(item.language);
      if (item.original_language) languages.add(item.original_language);
      years.add(item.year);
      item.genres.forEach(genre => genres.add(genre));
      item.subtitles?.forEach(sub => subtitles.add(sub));
      item.audio_languages?.forEach(lang => audioLanguages.add(lang));
    });
    
    return {
      languages: Array.from(languages).sort(),
      genres: Array.from(genres).sort(),
      years: Array.from(years).sort((a, b) => b - a), // Sort years in descending order
      subtitles: Array.from(subtitles).sort(),
      audioLanguages: Array.from(audioLanguages).sort()
    };
  },
  
  // Get all unique languages
  getAvailableLanguages(items: MediaItem[]): string[] {
    const languages = new Set<string>();
    items.forEach(item => {
      languages.add(item.language);
      if (item.original_language) {
        languages.add(item.original_language);
      }
    });
    return Array.from(languages).sort();
  }
};

// Add more movies to the additionalMovies array
additionalMovies.push(
  // Bengali Cinema
  {
    // Core identification
    id: 18,
    title: "Chokher Bali",
    type: "movie",
    
    // Release and duration
    year: 2003,
    release_date: "2003-10-17",
    runtime: 150,
    
    // Content information
    plot: "A period drama set in early 20th century Bengal, exploring the complex relationships and desires of four individuals.",
    tagline: "A story of passion, betrayal and forbidden love",
    genres: ["Drama", "Romance"],
    
    // People
    director: "Rituparno Ghosh",
    cast: [
      "Aishwarya Rai Bachchan", 
      "Raima Sen", 
      "Prosenjit Chatterjee",
      "Lily Chakravarty",
      "Soha Ali Khan"
    ],
    
    // Media assets
    poster_path: "https://image.tmdb.org/t/p/w500/3XlYkA0t9p0J4vJgYb8Yb8Z5X9A.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/3XlYkA0t9p0J4vJgYb8Yb8Z5X9A.jpg",
    trailer_url: "https://www.youtube.com/embed/9Xk0JXQ9X9Q",
    
    // Localization
    language: "Bengali",
    original_language: "bn",
    subtitles: ["Bengali", "Hindi", "English"],
    audio_languages: ["Bengali", "Hindi"],
    
    // Watch and download options
    watch_links: [
      { 
        platform: "ZEE5", 
        type: "subscription", 
        url: "https://www.zee5.com/movies/details/chokher-bali/0-6-4z5416964",
        quality: "HD"
      }
    ],
    download_links: {
      poster: "https://image.tmdb.org/t/p/original/3XlYkA0t9p0J4vJgYb8Yb8Z5X9A.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/3XlYkA0t9p0J4vJgYb8Yb8Z5X9A.jpg",
      trailer: "https://www.youtube.com/embed/9Xk0JXQ9X9Q"
    },
    
    // Ratings and reviews
    rating: 7.8,
    imdb_rating: 7.5,
    imdb_id: "tt0376735",
    tmdb_id: "12345",
    user_reviews: [
      { 
        user: "ClassicLover", 
        rating: 5, 
        comment: "A masterpiece by Rituparno Ghosh.",
        verified: true,
        timestamp: "2023-05-15T10:30:00Z"
      },
      { 
        user: "FilmBuff", 
        rating: 4, 
        comment: "Brilliant performances by the entire cast.",
        verified: true,
        timestamp: "2023-06-20T14:45:00Z"
      }
    ],
    
    // Content classification
    certification: "U/A",
    content_rating: "PG-13",
    
    // Production information
    production_companies: ["Shree Venkatesh Films"],
    production_countries: ["India"],
    
    // Technical specifications
    aspect_ratio: "1.85:1",
    resolution: "1920x1036"
  }
);
