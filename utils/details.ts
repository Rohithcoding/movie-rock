import { movies, tvShows } from "@/data/movies";
import { Movie, TV } from "@/types";
import { convertToMovie, convertToTV } from "./converters";

export async function getLocalMovieById(id: string): Promise<Movie> {
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    throw new Error(`Movie with id ${id} not found`);
  }
  return convertToMovie(movie);
}

export async function getLocalTvShowById(id: string): Promise<TV> {
  const show = tvShows.find(s => s.id === id);
  if (!show) {
    throw new Error(`TV Show with id ${id} not found`);
  }
  return convertToTV(show);
}