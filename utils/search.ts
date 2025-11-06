import { movies, tvShows } from "@/data/movies";
import { Movie, TV } from "@/types";

export function searchLocalMovies(query: string): Movie[] {
  const searchQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery) || 
    movie.overview.toLowerCase().includes(searchQuery)
  );
}

export function searchLocalTvShows(query: string): TV[] {
  const searchQuery = query.toLowerCase();
  return tvShows.filter(show => 
    show.name.toLowerCase().includes(searchQuery) || 
    show.overview.toLowerCase().includes(searchQuery)
  );
}