"use client";

import { getPopularMovies, getTrendingMovies } from "@/api/tmdb";
import { discoverMovies, getTrendingMoviesPage, getPopularMoviesPage } from "@/api/discover";
import { DiscoverMoviesFetchQueryType } from "@/types/movie";
import { DiscoverResults } from "@/api/discover";

interface FetchDiscoverMovies {
  page?: number;
  type?: DiscoverMoviesFetchQueryType;
  genres?: string;
}
const fetchDiscoverMovies = ({
  page = 1,
  type = "discover",
  genres,
}: FetchDiscoverMovies): DiscoverResults => {
  const discover = () => discoverMovies({ page, genres });
  const todayTrending = () => getTrendingMoviesPage({ page });
  const thisWeekTrending = () => getTrendingMoviesPage({ page }); // Using same data for now
  const popular = () => getPopularMoviesPage({ page });
  const nowPlaying = () => discoverMovies({ page }); // Using discover for now
  const upcoming = () => discoverMovies({ page }); // Using discover for now
  const topRated = () => discoverMovies({ page }); // Using discover for now

  const queryData = {
    discover,
    todayTrending,
    thisWeekTrending,
    popular,
    nowPlaying,
    upcoming,
    topRated,
  }[type];

  return queryData();
};

export default fetchDiscoverMovies;
