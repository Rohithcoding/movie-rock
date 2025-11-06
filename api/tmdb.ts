import {
  movies,
  trendingMovies,
  popularMovies,
  searchMovies,
} from "@/data/movies";
import {
  tvShows,
  trendingTvShows,
  popularTvShows,
  searchTvShows,
} from "@/data/tvShows";
import type { MovieDetails, SimilarMovies } from "tmdb-ts/dist/types/movies";
import type { Movie, Recommendation, Recommendations, Image as TmdbImage, Images, Videos, Video } from "tmdb-ts/dist/types";
import type { Credits, Cast, Crew } from "tmdb-ts/dist/types/credits";

type RawMovie = (typeof movies)[number];

type MovieCredits = Omit<Credits, "id">;
type MovieImages = Omit<Images, "id">;
type MovieVideos = Omit<Videos, "id">;

const toGenreId = (_: string, index: number) => index + 1;

const ensurePath = (path?: string) => path ?? "";

const toMovieDetails = (movie: RawMovie): MovieDetails => ({
  adult: false,
  backdrop_path: ensurePath(movie.backdropPath),
  belongs_to_collection: undefined,
  budget: 0,
  genres: movie.genres.map((name, index) => ({ id: index + 1, name })),
  homepage: "",
  id: Number(movie.id),
  imdb_id: null,
  original_language: "en",
  original_title: movie.title,
  overview: movie.overview,
  popularity: movie.voteAverage ?? 0,
  poster_path: movie.posterPath,
  production_companies: [],
  production_countries: [],
  release_date: movie.releaseDate,
  revenue: 0,
  runtime: movie.runtime ?? 0,
  spoken_languages: [],
  status: movie.status ?? "Released",
  tagline: "",
  title: movie.title,
  video: false,
  vote_average: movie.voteAverage ?? 0,
  vote_count: movie.voteCount ?? 0,
});

const toMovieListItem = (movie: RawMovie): Movie => ({
  id: Number(movie.id),
  poster_path: ensurePath(movie.posterPath),
  adult: false,
  overview: movie.overview,
  release_date: movie.releaseDate,
  genre_ids: movie.genres.map(toGenreId),
  original_title: movie.title,
  original_language: "en",
  title: movie.title,
  backdrop_path: ensurePath(movie.backdropPath),
  popularity: movie.voteAverage ?? 0,
  vote_count: movie.voteCount ?? 0,
  video: false,
  vote_average: movie.voteAverage ?? 0,
});

const toRecommendation = (movie: RawMovie): Recommendation => ({
  adult: false,
  backdrop_path: ensurePath(movie.backdropPath),
  genre_ids: movie.genres.map(toGenreId),
  id: Number(movie.id),
  original_language: "en",
  original_title: movie.title,
  overview: movie.overview,
  release_date: movie.releaseDate,
  poster_path: ensurePath(movie.posterPath),
  popularity: movie.voteAverage ?? 0,
  title: movie.title,
  video: false,
  vote_average: movie.voteAverage ?? 0,
  vote_count: movie.voteCount ?? 0,
});

const toImage = (path: string): TmdbImage => ({
  aspect_ratio: 16 / 9,
  file_path: path,
  height: 1080,
  iso_639_1: "en",
  vote_average: 0,
  vote_count: 0,
  width: 1920,
});

const toPosterImage = (path: string): TmdbImage => ({
  aspect_ratio: 2 / 3,
  file_path: path,
  height: 1200,
  iso_639_1: "en",
  vote_average: 0,
  vote_count: 0,
  width: 800,
});

const toVideo = (id: string, name: string): Video => ({
  id,
  iso_639_1: "en",
  iso_3166_1: "US",
  key: `mock-${id}`,
  name,
  site: "YouTube",
  size: 1080,
  type: "Trailer",
});

const toCast = (id: number, name: string, character: string, profile: string, order: number): Cast => ({
  adult: false,
  gender: 0,
  id,
  known_for_department: "Acting",
  name,
  original_name: name,
  popularity: 0,
  profile_path: profile,
  cast_id: order,
  character,
  credit_id: `cast-${id}-${order}`,
  order,
});

const toCrew = (id: number, name: string, job: string, profile: string, department: string): Crew => ({
  adult: false,
  gender: 0,
  id,
  known_for_department: department,
  name,
  original_name: name,
  popularity: 0,
  profile_path: profile,
  credit_id: `crew-${id}-${job}`,
  department,
  job,
});

export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const movie = movies.find((m) => m.id === id);
  if (!movie) throw new Error("Movie not found");
  return toMovieDetails(movie);
};

interface TVShowDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  genres: { id: number; name: string }[];
  adult: boolean;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
}

interface TVShow {
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date?: string;
  genres: string[];
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  status?: string;
  in_production?: boolean;
  languages?: string[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  popularity?: number;
  posterPath?: string; // For backward compatibility
  backdropPath?: string; // For backward compatibility
  firstAirDate?: string; // For backward compatibility
  voteAverage?: number; // For backward compatibility
  voteCount?: number; // For backward compatibility
  numberOfSeasons?: number; // For backward compatibility
  numberOfEpisodes?: number; // For backward compatibility
}

export const get_tv_show_by_id = async (id: string): Promise<TVShowDetails> => {
  const show = tvShows.find((s: TVShow) => s.id === id);
  if (!show) throw new Error("TV Show not found");
  
  // Use the snake_case properties first, fall back to camelCase for backward compatibility
  const firstAirDate = show.first_air_date || show.firstAirDate || '';
  const lastAirDate = show.last_air_date || show.lastAirDate || firstAirDate;
  
  return {
    ...show,
    id: Number(show.id),
    poster_path: show.poster_path || show.posterPath || '',
    backdrop_path: show.backdrop_path || show.backdropPath || '',
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    genres: (show.genres || []).map((genre: string | { id: number; name: string }, index: number) => {
      if (typeof genre === 'string') {
        return { id: index + 1, name: genre };
      }
      return { id: genre.id || index + 1, name: genre.name };
    }),
    adult: false,
    vote_average: show.vote_average || show.voteAverage || 0,
    vote_count: show.vote_count || show.voteCount || 0,
    number_of_seasons: show.number_of_seasons || show.numberOfSeasons || 1,
    number_of_episodes: show.number_of_episodes || show.numberOfEpisodes || 10,
  };
};

export const get_trending_movies = async () => {
  return trendingMovies.map(toMovieListItem);
};

export const get_trending_tv_shows = async () => {
  return trendingTvShows.map((show: TVShow) => ({
    id: show.id,
    name: show.name,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    first_air_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
  }));
};

export const get_popular_movies = async () => {
  return popularMovies.map(toMovieListItem);
};

export const getPopularTvShows = async () => {
  return popularTvShows.map((show: TVShow) => ({
    id: show.id,
    name: show.name,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    first_air_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
  }));
};

import { searchContent } from "@/utils/searchUtils";

// Type for search results from searchContent
interface SearchResult {
  id: string | number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: string[];
  popularity?: number;
  original_language?: string;
  original_title?: string;
  video?: boolean;
  adult?: boolean;
}

// Update the SearchResult type to allow null for poster_path and backdrop_path
type SearchResultWithNulls = Omit<SearchResult, 'poster_path' | 'backdrop_path'> & {
  poster_path: string | null;
  backdrop_path: string | null;
};

// Type for our local TV show data
type LocalTvShow = {
  id: string | number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: string[];
  status: string;
};

// Type for our local movie data
type LocalMovie = {
  id: string | number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  status: string;
  genres: string[];
};

// Helper function to safely handle null poster_path and backdrop_path
const getSafePath = (path: string | null | undefined): string => path || '';

export const search = async (query: string) => {
  const results = searchContent(query) as SearchResultWithNulls[];
  
  // Separate movies and TV shows
  const movies: LocalMovie[] = results
    .filter((item): item is SearchResultWithNulls & { media_type: 'movie' } => item.media_type === 'movie')
    .map(item => ({
      id: item.id,
      title: item.title || '',
      overview: item.overview || '',
      poster_path: getSafePath(item.poster_path),
      backdrop_path: getSafePath(item.backdrop_path),
      release_date: item.release_date || '',
      vote_average: item.vote_average || 0,
      vote_count: item.vote_count || 0,
      runtime: 0,
      status: 'Released',
      genres: item.genres || []
    }));
    
  const tvShows: LocalTvShow[] = results
    .filter((item): item is SearchResultWithNulls & { media_type: 'tv' } => item.media_type === 'tv')
    .map(item => ({
      id: item.id,
      name: item.name || item.title || 'Unknown Show',
      overview: item.overview || '',
      poster_path: getSafePath(item.poster_path),
      backdrop_path: getSafePath(item.backdrop_path),
      first_air_date: item.first_air_date || '',
      last_air_date: item.first_air_date || '',
      vote_average: item.vote_average || 0,
      vote_count: item.vote_count || 0,
      number_of_seasons: 1,
      number_of_episodes: 10,
      genres: item.genres || [],
      status: 'Returning Series'
    }));
    
  return {
    movies,
    tvShows
  };
};

export const getSimilarMovies = async (movieId: string): Promise<SimilarMovies> => {
  const results = movies.filter((m) => m.id !== movieId).slice(0, 5).map(toMovieListItem);
  return {
    page: 1,
    results,
    total_pages: 1,
    total_results: results.length,
  };
};

export const getRecommendedMovies = async (movieId: string): Promise<Recommendations> => {
  const results = movies.filter((m) => m.id !== movieId).slice(0, 5).map(toRecommendation);
  return {
    page: 1,
    results,
    total_pages: 1,
    total_results: results.length,
  };
};

export const getMovieCredits = async (_movieId: string): Promise<MovieCredits> => {
  return {
    cast: [
      toCast(1, "John Smith", "Lead Actor", "/actor1.jpg", 1),
      toCast(2, "Jane Doe", "Supporting Actor", "/actor2.jpg", 2),
    ],
    crew: [toCrew(3, "Director Name", "Director", "/director.jpg", "Directing")],
  };
};

export const getTvShowCredits = async (tvShowId: string) => {
  return {
    cast: [
      {
        id: "1",
        name: "TV Actor 1",
        character: "Main Character",
        profilePath: "/tv-actor1.jpg",
      },
      {
        id: "2",
        name: "TV Actor 2",
        character: "Supporting Character",
        profilePath: "/tv-actor2.jpg",
      },
    ],
    crew: [
      {
        id: "1",
        name: "Show Runner",
        job: "Executive Producer",
        profilePath: "/producer.jpg",
      },
    ],
  };
};

export const getMovieImages = async (movieId: string): Promise<MovieImages> => {
  const target = movies.find((movie) => movie.id === movieId);
  const backdrops = [target?.backdropPath, ...movies.map((movie) => movie.backdropPath)]
    .filter((path): path is string => Boolean(path))
    .slice(0, 6)
    .map(toImage);
  const posters = [target?.posterPath, ...movies.map((movie) => movie.posterPath)]
    .filter((path): path is string => Boolean(path))
    .slice(0, 6)
    .map(toPosterImage);
  return {
    backdrops,
    logos: posters.slice(0, 2),
    posters,
  };
};

export const getTvShowImages = async (tvShowId: string) => {
  return {
    backdrops: [
      { filePath: "/tv-backdrop1.jpg" },
      { filePath: "/tv-backdrop2.jpg" },
    ],
    posters: [
      { filePath: "/tv-poster1.jpg" },
      { filePath: "/tv-poster2.jpg" },
    ],
  };
};

export const getTvShowSeasonDetails = async (tvShowId: string, seasonNumber: number) => {
  return {
    id: seasonNumber,
    air_date: "1951-08-03",
    name: `Season ${seasonNumber}`,
    overview: "Season overview text",
    poster_path: "/season1.jpg",
    season_number: seasonNumber,
    episodes: Array(13)
      .fill(null)
      .map((_, index) => ({
        id: Number(`${seasonNumber}${index + 1}`),
        name: `Episode ${index + 1}`,
        overview: "Episode overview text",
        still_path: "/episode1.jpg",
        air_date: "1951-08-03",
        episode_number: index + 1,
        season_number: seasonNumber,
        vote_average: 7.5,
        vote_count: 100,
        runtime: 45,
        crew: [],
        guest_stars: [],
        show_id: Number(tvShowId),
        production_code: "",
      })),
  };
};

export const getMovieVideos = async (_movieId: string): Promise<MovieVideos> => {
  return {
    results: [toVideo("1", "Trailer 1")],
  };
};

export const getTvShowVideos = async (tvShowId: string) => {
  return {
    results: [
      {
        id: "1",
        key: "example-key-1",
        name: "TV Show Trailer",
        site: "YouTube",
        type: "Trailer",
      },
    ],
  };
};

// Export all functions as a single tmdb object
const tmdb = {
  getMovieById,
  getTvShowById: get_tv_show_by_id,
  getTrendingMovies: get_trending_movies,
  getTrendingTvShows: get_trending_tv_shows,
  getPopularMovies: get_popular_movies,
  getPopularTvShows,
  search,
  getSimilarMovies,
  getRecommendedMovies,
  getMovieCredits,
  getTvShowCredits,
  getMovieImages,
  getTvShowImages,
  getTvShowSeasonDetails,
  getMovieVideos,
  getTvShowVideos,
};

export { tmdb };
