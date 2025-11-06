import { MediaItem, WatchLink, UserReview } from './enhancedMedia';

// Helper function to create consistent movie objects
const createMovie = (data: Omit<MediaItem, 'id' | 'type' | 'download_links' | 'watch_links'>, id: number): MediaItem => ({
  ...data,
  id,
  type: 'movie' as const,
  download_links: {
    poster: data.poster_path,
    backdrop: data.backdrop_path
  },
  watch_links: data.watch_links || []
});

// Regional movies data
const regionalMovies: Omit<MediaItem, 'id' | 'type' | 'download_links'>[] = [
  // South Indian Cinema
  {
    title: "K.G.F: Chapter 1",
    year: 2018,
    rating: 8.2,
    genres: ["Action", "Drama", "Thriller"],
    director: "Prashanth Neel",
    cast: ["Yash", "Srinidhi Shetty", "Anant Nag", "Achyuth Kumar"],
    plot: "In the 1970s, a fierce rebel rises against the brutal oppression in the Kolar Gold Fields and becomes the symbol of hope to legions of downtrodden people.",
    poster_path: "https://image.tmdb.org/t/p/w500/sgHmoqF97bjMmxIIZEh0NkMLk4Q.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/1X7v4HqjOqe9HtWdeWCHrllWUaD.jpg",
    trailer_url: "https://www.youtube.com/embed/-KfsY-qwBS0",
    runtime: 155,
    language: "Kannada",
    original_language: "Kannada",
    subtitles: ["English", "Hindi", "Tamil", "Telugu", "Malayalam"],
    audio_languages: ["Kannada", "Hindi", "Tamil", "Telugu", "Malayalam"],
    user_reviews: [
      { user: "CinemaLover", rating: 5, comment: "Yash's performance is electrifying!" },
      { user: "MovieBuff", rating: 4, comment: "Brilliant cinematography and background score." }
    ],
    watch_links: [
      { platform: "Amazon Prime", type: "subscription", url: "https://www.primevideo.com/detail/KGF-Chapter-1/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "HD" },
      { platform: "ZEE5", type: "subscription", url: "https://www.zee5.com/movies/details/kgf-chapter-1/0-6-4z5416964", quality: "HD" },
    ]
  },
  
  // Malayalam Cinema
  {
    title: "Premam",
    year: 2015,
    rating: 8.5,
    genres: ["Drama", "Romance", "Comedy"],
    director: "Alphonse Puthren",
    cast: ["Nivin Pauly", "Sai Pallavi", "Madonna Sebastian", "Anupama Parameswaran"],
    plot: "A young man's three stages of life, from his teens to adulthood, exploring the love and relationships that shape his journey.",
    poster_path: "https://image.tmdb.org/t/p/w500/8Z8p2ZiabjNnrZEuW1fERcD9tD8.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/8Z8p2ZiabjNnrZEuW1fERcD9tD8.jpg",
    trailer_url: "https://www.youtube.com/embed/1MfE8OELBdM",
    runtime: 156,
    language: "Malayalam",
    original_language: "Malayalam",
    subtitles: ["English", "Hindi", "Tamil", "Telugu"],
    audio_languages: ["Malayalam", "Tamil", "Telugu", "Kannada"],
    user_reviews: [
      { user: "RomanceFan", rating: 5, comment: "A beautiful coming-of-age story with amazing music." },
      { user: "FilmCritic", rating: 4, comment: "Nivin Pauly's best performance to date." }
    ],
    watch_links: [
      { platform: "Netflix", type: "subscription", url: "https://www.netflix.com/title/80065184", quality: "HD" },
      { platform: "Amazon Prime", type: "rent", price: "₹99", url: "https://www.primevideo.com/detail/Premam/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "HD" },
    ]
  },
  
  // Tamil Cinema
  {
    title: "Ponniyin Selvan: Part 1",
    year: 2022,
    rating: 8.0,
    genres: ["Historical", "Drama", "Action"],
    director: "Mani Ratnam",
    cast: ["Vikram", "Aishwarya Rai Bachchan", "Jayam Ravi", "Karthi", "Trisha"],
    plot: "The story of the early life of Arulmozhivarman, who would become the great Chola emperor Rajaraja I.",
    poster_path: "https://image.tmdb.org/t/p/w500/8kQB7r1XYHPyNl1Sz0T1e50QK5A.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/8kQB7r1XYHPyNl1Sz0T1e50QK5A.jpg",
    trailer_url: "https://www.youtube.com/embed/KsH2LA8pCjo",
    runtime: 167,
    language: "Tamil",
    original_language: "Tamil",
    subtitles: ["English", "Hindi", "Telugu", "Malayalam", "Kannada"],
    audio_languages: ["Tamil", "Hindi", "Telugu", "Malayalam", "Kannada"],
    user_reviews: [
      { user: "HistoryBuff", rating: 5, comment: "A visual masterpiece that does justice to the classic novel." },
      { user: "CinemaFan", rating: 4, comment: "Brilliant performances and stunning cinematography." }
    ],
    watch_links: [
      { platform: "Amazon Prime", type: "subscription", url: "https://www.primevideo.com/detail/Ponniyin-Selvan-1/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "4K" },
      { platform: "Disney+ Hotstar", type: "subscription", url: "https://www.hotstar.com/in/movies/ponniyin-selvan-part-1/1260094181", quality: "4K" },
    ]
  },
  
  // Bengali Cinema
  {
    title: "Pather Panchali",
    year: 1955,
    rating: 8.7,
    genres: ["Drama", "Family"],
    director: "Satyajit Ray",
    cast: ["Kanu Bannerjee", "Karuna Bannerjee", "Subir Banerjee", "Uma Dasgupta"],
    plot: "Impoverished priest Harihar Ray, dreaming of a better life for himself and his family, leaves his rural Bengal village in search of work.",
    poster_path: "https://image.tmdb.org/t/p/w500/3n4kXQBGvO5xUvsjI9j1kbyYQ9n.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/3n4kXQBGvO5xUvsjI9j1kbyYQ9n.jpg",
    trailer_url: "https://www.youtube.com/embed/3eJ0L5U6F1Y",
    runtime: 125,
    language: "Bengali",
    original_language: "Bengali",
    subtitles: ["English", "French", "Spanish", "German", "Japanese"],
    audio_languages: ["Bengali", "English", "French", "Japanese"],
    user_reviews: [
      { user: "ClassicFilmLover", rating: 5, comment: "A timeless masterpiece that defined Indian parallel cinema." },
      { user: "Cinephile", rating: 5, comment: "Satyajit Ray's debut is a poetic and deeply humanistic film." }
    ],
    watch_links: [
      { platform: "Criterion Channel", type: "subscription", url: "https://www.criterionchannel.com/pather-panchali", quality: "HD" },
      { platform: "MUBI", type: "subscription", url: "https://mubi.com/films/pather-panchali", quality: "HD" },
    ]
  },
  
  // Marathi Cinema
  {
    title: "Sairat",
    year: 2016,
    rating: 8.3,
    genres: ["Drama", "Romance", "Musical"],
    director: "Nagraj Manjule",
    cast: ["Rinku Rajguru", "Akash Thosar", "Tanaji Galgunde", "Arbaz Shaikh"],
    plot: "A lower-caste boy and an upper-caste girl fall in love and elope, facing the harsh realities of caste discrimination in rural India.",
    poster_path: "https://image.tmdb.org/t/p/w500/6YwkGolwdOMNpbTOiJXH8Bk3zv2.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/6YwkGolwdOMNpbTOiJXH8Bk3zv2.jpg",
    trailer_url: "https://www.youtube.com/embed/vZV2qOM1QOQ",
    runtime: 174,
    language: "Marathi",
    original_language: "Marathi",
    subtitles: ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"],
    audio_languages: ["Marathi", "Hindi"],
    user_reviews: [
      { user: "RomanticDramaFan", rating: 5, comment: "A powerful and heartbreaking love story that stays with you." },
      { user: "FilmEnthusiast", rating: 4, comment: "Rinku Rajguru's performance is extraordinary for a debut." }
    ],
    watch_links: [
      { platform: "ZEE5", type: "subscription", url: "https://www.zee5.com/movies/details/sairat/0-6-4z5416964", quality: "HD" },
      { platform: "Amazon Prime", type: "rent", price: "₹99", url: "https://www.primevideo.com/detail/Sairat/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "HD" },
    ]
  },
  
  // Punjabi Cinema
  {
    title: "Carry On Jatta",
    year: 2012,
    rating: 8.5,
    genres: ["Comedy", "Romance", "Drama"],
    director: "Smeep Kang",
    cast: ["Gippy Grewal", "Sonam Bajwa", "Gurpreet Ghuggi", "Binnu Dhillon"],
    plot: "A young man's web of lies to impress his girlfriend's family leads to hilarious situations and misunderstandings.",
    poster_path: "https://image.tmdb.org/t/p/w500/1X7v4HqjOqe9HtWdeWCHrllWUaD.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/1X7v4HqjOqe9HtWdeWCHrllWUaD.jpg",
    trailer_url: "https://www.youtube.com/embed/Q4BmYvBCr4k",
    runtime: 145,
    language: "Punjabi",
    original_language: "Punjabi",
    subtitles: ["English", "Hindi"],
    audio_languages: ["Punjabi", "Hindi"],
    user_reviews: [
      { user: "ComedyLover", rating: 5, comment: "One of the funniest Punjabi movies ever made!" },
      { user: "PunjabiCinemaFan", rating: 4, comment: "Gippy Grewal and Binnu Dhillon's comic timing is perfect." }
    ],
    watch_links: [
      { platform: "ZEE5", type: "subscription", url: "https://www.zee5.com/movies/details/carry-on-jatta/0-6-4z5416964", quality: "HD" },
      { platform: "Amazon Prime", type: "rent", price: "₹99", url: "https://www.primevideo.com/detail/Carry-On-Jatta/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "HD" },
    ]
  },
  
  // Bhojpuri Cinema
  {
    title: "Nirahua Hindustani",
    year: 2019,
    rating: 7.5,
    genres: ["Action", "Drama", "Comedy"],
    director: "Pawan Singh",
    cast: ["Dinesh Lal Yadav", "Amrapali Dubey", "Khesari Lal Yadav", "Ravi Kishan"],
    plot: "A story of patriotism and love, where a common man stands up against corruption and injustice in the system.",
    poster_path: "https://image.tmdb.org/t/p/w500/1X7v4HqjOqe9HtWdeWCHrllWUaD.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/1X7v4HqjOqe9HtWdeWCHrllWUaD.jpg",
    trailer_url: "https://www.youtube.com/embed/9Xk0JXQ9X9Q",
    runtime: 150,
    language: "Bhojpuri",
    original_language: "Bhojpuri",
    subtitles: ["Hindi", "English"],
    audio_languages: ["Bhojpuri", "Hindi"],
    user_reviews: [
      { user: "BhojpuriFan", rating: 4, comment: "Dinesh Lal Yadav delivers a powerful performance." },
      { user: "CinemaLover", rating: 3, comment: "Entertaining movie with good music and action sequences." }
    ],
    watch_links: [
      { platform: "ZEE5", type: "subscription", url: "https://www.zee5.com/movies/details/nirahua-hindustani/0-6-4z5416964", quality: "HD" },
      { platform: "Amazon Prime", type: "rent", price: "₹99", url: "https://www.primevideo.com/detail/Nirahua-Hindustani/0S3RWI9XCRF4K7Q6JZ2XJ9Z4Z2", quality: "HD" },
    ]
  }
];

// Generate unique IDs and create final movie objects
export const enhancedRegionalMovies = regionalMovies.map((movie, index) => 
  createMovie(movie, index + 1000) // Start IDs from 1000 to avoid conflicts
);

// Export all movies combined with the original enhancedMedia
export const allMovies = [
  ...enhancedRegionalMovies,
  // Add any existing movies from enhancedMedia if needed
];

// Helper functions for filtering
export const filterMovies = (filters: {
  language?: string;
  year?: number;
  genre?: string;
  rating?: number;
  runtime?: number;
  subtitles?: string[];
  audio?: string[];
}) => {
  return allMovies.filter(movie => {
    return (
      (!filters.language || movie.language === filters.language) &&
      (!filters.year || movie.year === filters.year) &&
      (!filters.genre || movie.genres.includes(filters.genre)) &&
      (!filters.rating || movie.rating >= filters.rating) &&
      (!filters.runtime || (movie.runtime && movie.runtime <= filters.runtime)) &&
      (!filters.subtitles || filters.subtitles.some(sub => movie.subtitles?.includes(sub))) &&
      (!filters.audio || filters.audio.some(audio => movie.audio_languages?.includes(audio)))
    );
  });
};

// Get all unique values for filters
export const getFilterOptions = () => {
  const languages = new Set<string>();
  const years = new Set<number>();
  const genres = new Set<string>();
  const allSubtitles = new Set<string>();
  const allAudio = new Set<string>();

  allMovies.forEach(movie => {
    if (movie.language) languages.add(movie.language);
    if (movie.year) years.add(movie.year);
    movie.genres.forEach(genre => genres.add(genre));
    movie.subtitles?.forEach(sub => allSubtitles.add(sub));
    movie.audio_languages?.forEach(audio => allAudio.add(audio));
  });

  return {
    languages: Array.from(languages).sort(),
    years: Array.from(years).sort((a, b) => b - a), // Most recent first
    genres: Array.from(genres).sort(),
    subtitles: Array.from(allSubtitles).sort(),
    audioLanguages: Array.from(allAudio).sort()
  };
};
