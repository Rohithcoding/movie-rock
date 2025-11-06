import { createElement } from "react";
import type { SiteConfigType, Movie as MovieType, TV as TvType } from "@/types";
import { movies, popularMovies, tvShows, popularTvShows } from "@/data/movies";
import { Grid, Info, List, Movie as MovieIcon, Search as SearchIcon } from "@/utils/icons";
import { FaMoon, FaRegSun } from "react-icons/fa6";
import { LuMonitor } from "react-icons/lu";
import { getLocalTrendingMovies, getLocalTrendingTvShows } from "@/utils/trending";

type RawMovie = (typeof movies)[number];
type RawTv = (typeof tvShows)[number];

const toMovie = (movie: RawMovie): MovieType => ({
  id: Number(movie.id),
  title: movie.title,
  overview: movie.overview,
  release_date: movie.releaseDate,
  poster_path: movie.posterPath,
  backdrop_path: movie.backdropPath,
  vote_average: movie.voteAverage,
  genres: movie.genres.map((name, index) => ({ id: index, name })),
  adult: false,
  runtime: movie.runtime ?? 0,
});

const toTv = (show: RawTv): TvType => ({
  id: Number(show.id),
  name: show.name,
  overview: show.overview,
  first_air_date: show.firstAirDate,
  last_air_date: show.firstAirDate, // Using firstAirDate as fallback since lastAirDate doesn't exist
  poster_path: show.posterPath,
  backdrop_path: show.backdropPath,
  genres: show.genres.map((name, index) => ({ id: index, name })),
  adult: false,
  vote_average: show.voteAverage,
  vote_count: show.voteCount ?? 0,
  number_of_seasons: show.numberOfSeasons ?? 0,
  number_of_episodes: show.numberOfEpisodes ?? 0,
});

const buildMovieList = (items: RawMovie[]) =>
  Promise.resolve({
    page: 1,
    results: items.map(toMovie),
    total_results: items.length,
    total_pages: 1,
  });

const buildTvList = (items: RawTv[]) =>
  Promise.resolve({
    page: 1,
    results: items.map(toTv),
    total_results: items.length,
    total_pages: 1,
  });

export const siteConfig: SiteConfigType = {
  name: "MovieRock⭐",
  description: "Your ultimate destination for movies and TV shows.",
  favicon: "/favicon.ico",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: createElement(MovieIcon, { className: "text-lg" }),
      activeIcon: createElement(MovieIcon, { className: "text-primary text-lg" }),
    },
    {
      label: "Discover",
      href: "/discover",
      icon: createElement(Grid, { className: "text-lg" }),
      activeIcon: createElement(Grid, { className: "text-primary text-lg" }),
    },
    {
      label: "Library",
      href: "/library",
      icon: createElement(List, { className: "text-lg" }),
      activeIcon: createElement(List, { className: "text-primary text-lg" }),
    },
    {
      label: "Search",
      href: "/search",
      icon: createElement(SearchIcon, { className: "text-lg" }),
      activeIcon: createElement(SearchIcon, { className: "text-primary text-lg" }),
    },
    {
      label: "About",
      href: "/about",
      icon: createElement(Info, { className: "text-lg" }),
      activeIcon: createElement(Info, { className: "text-primary text-lg" }),
    },
  ],
  queryLists: {
    movies: [
      {
        name: "Trending Today",
        param: "todayTrending",
        query: () => getLocalTrendingMovies("day"),
      },
      {
        name: "Trending This Week",
        param: "thisWeekTrending",
        query: () => getLocalTrendingMovies("week"),
      },
      {
        name: "Popular Movies",
        param: "popular",
        query: () => buildMovieList(popularMovies),
      },
      {
        name: "Now Playing",
        param: "nowPlaying",
        query: () => buildMovieList([...movies]),
      },
      {
        name: "Upcoming Movies",
        param: "upcoming",
        query: () => buildMovieList([...movies]),
      },
      {
        name: "Top Rated Movies",
        param: "topRated",
        query: () => buildMovieList([...movies].sort((a, b) => (b.voteAverage ?? 0) - (a.voteAverage ?? 0))),
      },
    ],
    tvShows: [
      {
        name: "Trending Today",
        param: "todayTrending",
        query: () => getLocalTrendingTvShows("day"),
      },
      {
        name: "Trending This Week",
        param: "thisWeekTrending",
        query: () => getLocalTrendingTvShows("week"),
      },
      {
        name: "Popular Series",
        param: "popular",
        query: () => buildTvList(popularTvShows),
      },
      {
        name: "On The Air",
        param: "onTheAir",
        query: () => buildTvList(tvShows),
      },
      {
        name: "Top Rated Series",
        param: "topRated",
        query: () => buildTvList([...tvShows].sort((a, b) => (b.voteAverage ?? 0) - (a.voteAverage ?? 0))),
      },
    ],
  },
  themes: [
    { name: "light", icon: createElement(FaRegSun, { className: "text-xl" }) },
    { name: "dark", icon: createElement(FaMoon, { className: "text-xl" }) },
    { name: "system", icon: createElement(LuMonitor, { className: "text-xl" }) },
  ],
  socials: {
    github: "https://github.com/wisnuwirayuda15/cinextma",
  },
};

export default siteConfig;
