import { movies, tvShows } from "@/data/movies";
import { Movie, TV } from "@/types";
import { convertToMovie, convertToTV } from "./converters";

export async function getLocalTrendingMovies(timeWindow: 'day' | 'week'): Promise<{ 
  page: number; 
  results: Movie[];
  total_results: number;
  total_pages: number;
}> {
  // For demo, return first 20 movies as trending
  return {
    page: 1,
    results: movies.slice(0, 20).map(movie => convertToMovie(movie)),
    total_results: 20,
    total_pages: 1
  };
}

export async function getLocalTrendingTvShows(timeWindow: 'day' | 'week'): Promise<{
  page: number;
  results: TV[];
  total_results: number;
  total_pages: number;
}> {
  // For demo, return first 20 TV shows as trending
  return {
    page: 1,
    results: tvShows.slice(0, 20).map(show => convertToTV(show)),
    total_results: 20,
    total_pages: 1
  };
}