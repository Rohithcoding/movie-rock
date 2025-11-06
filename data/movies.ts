export const movies = [
  {
    id: '1',
    title: 'The Great Train Robbery',
    overview: 'A classic Western film that follows a group of bandits who rob a train and are pursued by a posse.',
    releaseDate: '1903-12-01',
    posterPath: '/great-train-robbery.jpg',
    backdropPath: '/great-train-robbery-backdrop.jpg',
    genres: ['Western', 'Action'],
    runtime: 12,
    status: 'Released',
    voteAverage: 7.8,
    voteCount: 342
  },
  {
    id: '2',
    title: 'Nosferatu',
    overview: 'A classic horror film that tells the story of Count Orlok, a vampire who preys on the wife of his real estate agent.',
    releaseDate: '1922-03-04',
    posterPath: '/nosferatu.jpg',
    backdropPath: '/nosferatu-backdrop.jpg',
    genres: ['Horror', 'Fantasy'],
    runtime: 94,
    status: 'Released',
    voteAverage: 8.0,
    voteCount: 1204
  },
  {
    id: '3',
    title: 'The Gold Rush',
    overview: 'The Little Tramp adventures in the Alaskan gold fields, where he falls in love with a dance hall performer.',
    releaseDate: '1925-06-26',
    posterPath: '/gold-rush.jpg',
    backdropPath: '/gold-rush-backdrop.jpg',
    genres: ['Comedy', 'Adventure'],
    runtime: 95,
    status: 'Released',
    voteAverage: 8.2,
    voteCount: 890
  }
]

export const popularMovies = movies

export const trendingMovies = [
  ...movies,
  {
    id: '4',
    title: 'Safety Last!',
    overview: 'A boy moves to the city to make good, but finds himself in increasingly dangerous situations.',
    releaseDate: '1923-04-01',
    posterPath: '/safety-last.jpg',
    backdropPath: '/safety-last-backdrop.jpg',
    genres: ['Comedy', 'Thriller'],
    runtime: 70,
    status: 'Released',
    voteAverage: 8.1,
    voteCount: 456
  }
]

export const tvShows = [
  {
    id: '1',
    name: 'The Adventures of Flash Gordon',
    overview: 'Flash Gordon battles space monsters and evil Emperor Ming the Merciless.',
    firstAirDate: '1936-01-01',
    posterPath: '/flash-gordon.jpg',
    backdropPath: '/flash-gordon-backdrop.jpg',
    genres: ['Science Fiction', 'Adventure'],
    status: 'Ended',
    voteAverage: 7.5,
    voteCount: 234,
    numberOfSeasons: 3,
    numberOfEpisodes: 39
  },
  {
    id: '2',
    name: 'Captain Video',
    overview: 'The adventures of a futuristic law enforcement officer and his team.',
    firstAirDate: '1949-06-27',
    posterPath: '/captain-video.jpg',
    backdropPath: '/captain-video-backdrop.jpg',
    genres: ['Science Fiction', 'Action'],
    status: 'Ended',
    voteAverage: 7.2,
    voteCount: 156,
    numberOfSeasons: 6,
    numberOfEpisodes: 1537
  }
]

export const popularTvShows = tvShows

export const trendingTvShows = [
  ...tvShows,
  {
    id: '3',
    name: 'Tales of Tomorrow',
    overview: 'An early science fiction anthology series featuring stories of the supernatural and the unexplained.',
    firstAirDate: '1951-08-03',
    posterPath: '/tales-of-tomorrow.jpg',
    backdropPath: '/tales-of-tomorrow-backdrop.jpg',
    genres: ['Science Fiction', 'Mystery'],
    status: 'Ended',
    voteAverage: 7.4,
    voteCount: 178,
    numberOfSeasons: 2,
    numberOfEpisodes: 85
  }
]

// Mock search results
export const searchMovies = (query: string) => {
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  )
}

export const searchTvShows = (query: string) => {
  return tvShows.filter(show => 
    show.name.toLowerCase().includes(query.toLowerCase()) ||
    show.overview.toLowerCase().includes(query.toLowerCase())
  )
}