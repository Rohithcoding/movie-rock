import { Movie, TvShow } from "tmdb-ts";

export interface TmdbResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult extends Omit<Movie, 'id'> {
  id: number;
  media_type?: 'movie';
}

export interface TvShowResult extends Omit<TvShow, 'id'> {
  id: number;
  media_type?: 'tv';
}

export type MediaItem = MovieResult | TvShowResult;
