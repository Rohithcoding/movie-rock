import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define types for our data
interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  genre: string[];
  language: string;
  year: number;
  director: string;
  cast: string[];
  rating: number;
  plot: string;
  poster_path: string;
  backdrop_path: string;
  trailer_url: string;
  watch_links: {
    platform: string;
    url: string;
    type: 'buy' | 'rent' | 'stream' | 'free' | 'subscription';
  }[];
  runtime?: number;
  seasons?: number;
  episodes?: number;
  is_featured?: boolean;
  tags?: string[];
}

// Helper function to generate TMDB-style image paths
const getImagePath = (title: string, type: 'poster' | 'backdrop' | 'profile') => {
  const basePath = type === 'poster' ? '/posters' : type === 'backdrop' ? '/backdrops' : '/profiles';
  const fileName = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${type}.jpg`;
  return `${basePath}/${fileName}`;
};

// Helper function to generate YouTube trailer URL
const getTrailerUrl = (title: string) => {
  // In a real app, these would be actual trailer video IDs
  const trailerIds = [
    'dQw4w9WgXcQ', // Sample trailer ID
    'tgbNymZ7vqY',
    'jNQXAC9IVRw',
    'dQw4w9WgXcQ',
    'tgbNymZ7vqY',
    'jNQXAC9IVRw',
  ];
  const randomId = trailerIds[Math.floor(Math.random() * trailerIds.length)];
  return `https://www.youtube.com/embed/${randomId}?autoplay=1&mute=1`;
};

// Helper function to generate watch links
const getWatchLinks = (title: string, type: 'movie' | 'tv') => {
  const platforms = [
    { name: 'Netflix', type: 'subscription' as const },
    { name: 'Prime Video', type: 'subscription' as const },
    { name: 'Disney+ Hotstar', type: 'subscription' as const },
    { name: 'Zee5', type: 'subscription' as const },
    { name: 'SonyLIV', type: 'subscription' as const },
    { name: 'YouTube Movies', type: type === 'movie' ? 'rent' as const : 'subscription' as const },
    { name: 'Google Play Movies', type: type === 'movie' ? 'buy' as const : 'subscription' as const },
    { name: 'Apple TV+', type: 'subscription' as const },
  ];
  
  // Randomly select 2-4 platforms for each item
  const count = 2 + Math.floor(Math.random() * 3);
  const selectedPlatforms = [...platforms]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
    
  return selectedPlatforms.map(platform => ({
    platform: platform.name,
    url: `https://www.${platform.name.toLowerCase().replace(/\s+/g, '')}.com/movie/${title.toLowerCase().replace(/\s+/g, '-')}`,
    type: platform.type,
  }));
};

// Generate a large dataset of movies and TV shows
const generateMediaData = (): MediaItem[] => {
  const genres = [
    'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 
    'Sci-Fi', 'Horror', 'Adventure', 'Crime', 'Mystery',
    'Fantasy', 'Animation', 'Documentary', 'Musical', 'War'
  ];
  
  const languages = ['Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'English'];
  
  const directors = [
    'Rajkumar Hirani', 'Sanjay Leela Bhansali', 'SS Rajamouli', 'Karan Johar', 'Zoya Akhtar',
    'Anurag Kashyap', 'Vishal Bhardwaj', 'Imtiaz Ali', 'Shoojit Sircar', 'Mani Ratnam',
    'Lokesh Kanagaraj', 'Atlee', 'Prasanth Neel', 'Sandeep Reddy Vanga', 'A.R. Murugadoss'
  ];
  
  const actors = [
    'Shah Rukh Khan', 'Salman Khan', 'Aamir Khan', 'Akshay Kumar', 'Hrithik Roshan',
    'Ranbir Kapoor', 'Ranveer Singh', 'Ajay Devgn', 'Rajinikanth', 'Vijay',
    'Prabhas', 'Yash', 'Allu Arjun', 'Mahesh Babu', 'Jr. NTR',
    'Deepika Padukone', 'Alia Bhatt', 'Priyanka Chopra', 'Kareena Kapoor', 'Katrina Kaif',
    'Nayanthara', 'Samantha', 'Kiara Advani', 'Anushka Sharma', 'Kangana Ranaut'
  ];
  
  const mediaItems: MediaItem[] = [];
  
  // Generate 100 movies
  for (let i = 1; i <= 100; i++) {
    const title = `Movie ${i}`;
    const type = 'movie' as const;
    const year = 2000 + Math.floor(Math.random() * 24);
    const rating = Number((4 + Math.random() * 6).toFixed(1));
    const genreCount = 1 + Math.floor(Math.random() * 3);
    const selectedGenres = [...genres].sort(() => 0.5 - Math.random()).slice(0, genreCount);
    const language = languages[Math.floor(Math.random() * languages.length)];
    const director = directors[Math.floor(Math.random() * directors.length)];
    const cast = [...actors].sort(() => 0.5 - Math.random()).slice(0, 5);
    const plot = `This is a sample plot for ${title}. ` + 
      `It's a ${selectedGenres.join('/')} ${type} from ${year} directed by ${director} ` +
      `starring ${cast.join(', ')}.`;
    
    mediaItems.push({
      id: `movie-${i}`,
      title,
      type,
      genre: selectedGenres,
      language,
      year,
      director,
      cast,
      rating,
      plot,
      poster_path: getImagePath(title, 'poster'),
      backdrop_path: getImagePath(title, 'backdrop'),
      trailer_url: getTrailerUrl(title),
      watch_links: getWatchLinks(title, 'movie'),
      runtime: 120 + Math.floor(Math.random() * 60), // 120-180 minutes
      is_featured: i <= 10, // First 10 movies are featured
      tags: ['popular', 'trending', 'new-release'].slice(0, 1 + Math.floor(Math.random() * 2)),
    });
  }
  
  // Generate 30 TV shows
  for (let i = 1; i <= 30; i++) {
    const title = `TV Show ${i}`;
    const type = 'tv' as const;
    const year = 2010 + Math.floor(Math.random() * 14);
    const rating = Number((4 + Math.random() * 6).toFixed(1));
    const genreCount = 1 + Math.floor(Math.random() * 3);
    const selectedGenres = [...genres].sort(() => 0.5 - Math.random()).slice(0, genreCount);
    const language = languages[Math.floor(Math.random() * languages.length)];
    const director = directors[Math.floor(Math.random() * directors.length)];
    const cast = [...actors].sort(() => 0.5 - Math.random()).slice(0, 7); // More cast for TV shows
    const plot = `This is a sample plot for ${title}. ` + 
      `It's a ${selectedGenres.join('/')} ${type} series from ${year} directed by ${director} ` +
      `starring ${cast.join(', ')}.`;
    
    mediaItems.push({
      id: `tv-${i}`,
      title,
      type,
      genre: selectedGenres,
      language,
      year,
      director,
      cast,
      rating,
      plot,
      poster_path: getImagePath(title, 'poster'),
      backdrop_path: getImagePath(title, 'backdrop'),
      trailer_url: getTrailerUrl(title),
      watch_links: getWatchLinks(title, 'tv'),
      seasons: 1 + Math.floor(Math.random() * 5),
      episodes: 8 + Math.floor(Math.random() * 40),
      is_featured: i <= 5, // First 5 TV shows are featured
      tags: ['popular', 'trending', 'binge-worthy'].slice(0, 1 + Math.floor(Math.random() * 2)),
    });
  }
  
  return mediaItems;
};

// Generate the complete dataset
const MEDIA_ITEMS = generateMediaData();

// Function to convert the movie data to the required format
function convertMovies(movies: any[]) {
  return movies.map((movie, index) => ({
    id: index + 1,
    title: movie.title,
    overview: movie.plot || 'No overview available',
    release_date: movie.year ? `${movie.year}-01-01` : '2023-01-01', // Using year as release date
    poster_path: `/posters/${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
    backdrop_path: `/backdrops/${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
    genres: movie.genre ? [movie.genre] : ['Unknown'],
    runtime: 120, // Default runtime
    vote_average: movie.rating || 5.0,
    vote_count: Math.floor(Math.random() * 1000) + 10, // Random vote count
    popularity: movie.rating ? movie.rating * 10 : 50, // Convert rating to popularity
    original_language: movie.language ? movie.language.toLowerCase() : 'en',
    status: 'Released',
    tagline: movie.plot ? `${movie.plot.split('.')[0]}.` : '',
    production_companies: [],
    production_countries: [],
    spoken_languages: [movie.language || 'English'],
    budget: 0,
    revenue: 0,
    imdb_id: `tt${Math.floor(1000000 + Math.random() * 9000000)}`,
    homepage: '',
    adult: false,
    video: false,
    original_title: movie.title,
    release_dates: {
      results: [
        {
          iso_3166_1: 'US',
          release_dates: [
            {
              certification: 'PG-13',
              release_date: movie.year ? `${movie.year}-01-01T00:00:00.000Z` : '2023-01-01T00:00:00.000Z',
            },
          ],
        },
      ],
    },
    credits: {
      cast: movie.cast
        ? movie.cast
            .split(',')
            .map((name: string) => name.trim())
            .slice(0, 5)
            .map((name: string, index: number) => ({
              id: index + 1,
              name: name,
              character: `Character ${index + 1}`,
              profile_path: `/profiles/${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
            }))
        : [],
      crew: [
        {
          id: 1,
          name: movie.director || 'Unknown Director',
          job: 'Director',
          profile_path: '/profiles/director.jpg',
        },
      ],
    },
    videos: {
      results: [
        {
          id: '1',
          key: 'dQw4w9WgXcQ', // Placeholder YouTube video ID
          name: 'Official Trailer',
          site: 'YouTube',
          type: 'Trailer',
        },
      ],
    },
    images: {
      backdrops: [
        {
          file_path: `/backdrops/${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
          width: 1920,
          height: 1080,
        },
      ],
      posters: [
        {
          file_path: `/posters/${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
          width: 500,
          height: 750,
        },
      ],
    },
    similar: {
      results: [],
    },
    recommendations: {
      results: [],
    },
  }));
}

// Convert the movies
const convertedMovies = convertMovies(COMPREHENSIVE_MOVIES);

// Write to file
const outputPath = path.join(__dirname, '../src/data/importedMovies.ts');
const output = `// Auto-generated file - DO NOT EDIT
export const importedMovies = ${JSON.stringify(convertedMovies, null, 2)} as const;

export type ImportedMovie = typeof importedMovies[number];
`;

writeFileSync(outputPath, output, 'utf-8');
console.log(`Successfully converted and saved ${convertedMovies.length} movies to ${outputPath}`);

// Also update the movies.ts file with the new data
const moviesOutputPath = path.join(__dirname, '../src/data/movies.ts');
const moviesOutput = `// Auto-generated file - DO NOT EDIT
export const movies = ${JSON.stringify(convertedMovies, null, 2)} as const;

export type Movie = typeof movies[number];
`;

writeFileSync(moviesOutputPath, moviesOutput, 'utf-8');
console.log(`Successfully updated ${moviesOutputPath}`);
