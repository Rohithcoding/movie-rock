"use client";

import { discoverTvShows, getTrendingTvShowsPage, getPopularTvShowsPage } from "@/api/discover";
import { DiscoverTvShowsFetchQueryType } from "@/types/movie";
import { DiscoverTvResults } from "@/api/discover";

interface FetchDiscoverTvShows {
  page?: number;
  type?: DiscoverTvShowsFetchQueryType;
  genres?: string;
}
const fetchDiscoverTvShows = ({
  page = 1,
  type = "discover",
  genres,
}: FetchDiscoverTvShows): DiscoverTvResults => {
  const discover = () => discoverTvShows({ page, genres });
  const todayTrending = () => getTrendingTvShowsPage({ page });
  const thisWeekTrending = () => getTrendingTvShowsPage({ page }); // Using same data for now
  const popular = () => getPopularTvShowsPage({ page });
  const onTheAir = () => discoverTvShows({ page }); // Using discover for now
  const topRated = () => discoverTvShows({ page }); // Using discover for now

  const queryData = {
    discover,
    todayTrending,
    thisWeekTrending,
    popular,
    onTheAir,
    topRated,
  }[type];

  const result = queryData();

  return {
    ...result,
    results: result.results.map((show) => ({
      ...show,
      id: Number(show.id ?? show.id),
      name: show.name ?? show.title ?? "",
      overview: show.overview ?? "",
      first_air_date: show.first_air_date ?? show.releaseDate ?? "",
      last_air_date: show.last_air_date ?? show.first_air_date ?? "",
      poster_path: show.poster_path ?? show.posterPath ?? "",
      backdrop_path: show.backdrop_path ?? show.backdropPath ?? "",
      genres: (show.genres ?? []).map((genre: any, index: number) =>
        typeof genre === "string" ? { id: index + 1, name: genre } : genre,
      ),
      adult: show.adult ?? false,
      vote_average: show.vote_average ?? show.voteAverage ?? 0,
      vote_count: show.vote_count ?? show.voteCount ?? 0,
      number_of_seasons: show.number_of_seasons ?? show.numberOfSeasons ?? 0,
      number_of_episodes: show.number_of_episodes ?? show.numberOfEpisodes ?? 0,
    })),
  } satisfies DiscoverTvResults;
};

export default fetchDiscoverTvShows;
