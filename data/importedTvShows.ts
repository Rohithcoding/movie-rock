// Auto-generated file - DO NOT EDIT
export const importedTvShows = [
  {
    "id": "tv-1",
    "name": "Sample TV Show 1",
    "overview": "This is a sample TV show overview.",
    "first_air_date": "2023-01-01",
    "poster_path": "https://image.tmdb.org/t/p/w500/example-tv1.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/example-tv1-bg.jpg",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "vote_average": 7.8,
    "vote_count": 2000,
    "original_language": "en",
    "popularity": 180.0,
    "number_of_seasons": 3,
    "number_of_episodes": 30
  },
  {
    "id": "tv-2",
    "name": "Sample TV Show 2",
    "overview": "This is another sample TV show overview.",
    "first_air_date": "2023-02-15",
    "poster_path": "https://image.tmdb.org/t/p/w500/example-tv2.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/example-tv2-bg.jpg",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "vote_average": 8.2,
    "vote_count": 2500,
    "original_language": "en",
    "popularity": 200.0,
    "number_of_seasons": 5,
    "number_of_episodes": 50
  }
] as const;

export type ImportedTvShow = typeof importedTvShows[number];
