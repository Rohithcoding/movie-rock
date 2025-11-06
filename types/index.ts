export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: Genre[];
  adult: boolean;
  runtime: number;
};

export type TV = {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  adult: boolean;
  number_of_seasons: number;
  number_of_episodes: number;
};

export type ContentType = "movie" | "tv";

export type Params<T> = {
  params: Promise<T>;
};

export type ActionResponse<T = null> = Promise<{
  success: boolean;
  message?: string;
  data?: T;
}>;

export type MovieParam =
  | "todayTrending"
  | "thisWeekTrending"
  | "popular"
  | "nowPlaying"
  | "upcoming"
  | "topRated";

export type TvShowParam =
  | "todayTrending"
  | "thisWeekTrending"
  | "popular"
  | "onTheAir"
  | "topRated";

export type QueryList<T extends Movie | TV> = {
  name: string;
  query: () => Promise<{
    page: number;
    results: T[];
    total_results: number;
    total_pages: number;
  }>;
  param: T extends Movie ? MovieParam : TvShowParam;
};

export type SiteConfigType = {
  name: string;
  description: string;
  favicon: string;
  navItems: {
    label: string;
    href: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
  }[];
  queryLists: {
    movies: QueryList<Movie>[];
    tvShows: QueryList<TV>[];
  };
  themes: {
    name: "light" | "dark" | "system";
    icon: React.ReactNode;
  }[];
  socials: {
    github: string;
  };
};

export type PlayersProps = {
  title: string;
  source: `https://${string}`;
  recommended?: boolean;
  fast?: boolean;
  ads?: boolean;
  resumable?: boolean;
};

export type Settings = {
  theme: "light" | "dark" | "system";
  showSpecialSeason: boolean;
  disableAnimation: boolean;
  saveWatchHistory: boolean;
};
