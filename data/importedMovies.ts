// Auto-generated file - DO NOT EDIT
export const importedMovies = [
  {
    "id": 1,
    "title": "Sample Movie 1",
    "overview": "This is a sample movie overview.",
    "release_date": "2023-01-01",
    "poster_path": "https://image.tmdb.org/t/p/w500/example1.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/example1-bg.jpg",
    "genres": [
      "Action",
      "Adventure"
    ],
    "runtime": 120,
    "vote_average": 7.5,
    "vote_count": 1000,
    "popularity": 100.0,
    "original_language": "en",
    "status": "Released"
  },
  {
    "id": 2,
    "title": "Sample Movie 2",
    "overview": "This is another sample movie overview.",
    "release_date": "2023-02-15",
    "poster_path": "https://image.tmdb.org/t/p/w500/example2.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/example2-bg.jpg",
    "genres": [
      "Drama",
      "Thriller"
    ],
    "runtime": 110,
    "vote_average": 8.0,
    "vote_count": 1500,
    "popularity": 150.0,
    "original_language": "en",
    "status": "Released"
  }
] as const;

export type ImportedMovie = typeof importedMovies[number];
