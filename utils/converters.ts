import { Movie, TV } from "@/types";

// Convert our local movie format to TMDB format
export const convertToMovie = (movie: any): Movie => ({
  id: Number(movie.id),
  title: movie.title,
  overview: movie.overview,
  release_date: movie.releaseDate,
  poster_path: movie.posterPath,
  backdrop_path: movie.backdropPath,
  vote_average: movie.voteAverage,
  genres: movie.genres.map((g: string, index: number) => ({ id: index + 1, name: g })),
  adult: false,
  runtime: movie.runtime || 0,
});

// Convert our local TV show format to TMDB format
export const convertToTV = (show: any): TV => ({
  id: Number(show.id),
  name: show.name,
  overview: show.overview,
  first_air_date: show.firstAirDate ?? "",
  last_air_date: show.lastAirDate ?? show.firstAirDate ?? "",
  poster_path: show.posterPath ?? "",
  backdrop_path: show.backdropPath ?? "",
  genres: show.genres.map((g: string, index: number) => ({ id: index + 1, name: g })),
  adult: false,
  vote_average: show.voteAverage ?? 0,
  vote_count: show.voteCount ?? 0,
  number_of_seasons: show.numberOfSeasons ?? 0,
  number_of_episodes: show.numberOfEpisodes ?? 0
});