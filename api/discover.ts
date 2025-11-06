import { movies, tvShows, trendingMovies, trendingTvShows, popularMovies, popularTvShows } from '@/data/movies'

export type DiscoverResults = {
  page: number;
  results: typeof movies;
  total_pages: number;
  total_results: number;
}

export type DiscoverTvResults = {
  page: number;
  results: typeof tvShows;
  total_pages: number;
  total_results: number;
}

// Mock pagination by returning subsets of the data
const paginateResults = <T>(items: T[], page: number = 1, pageSize: number = 20) => {
  const start = (page - 1) * pageSize
  const results = items.slice(start, start + pageSize)
  return {
    page,
    results,
    total_pages: Math.ceil(items.length / pageSize),
    total_results: items.length
  }
}

// Filter by genres if provided
const filterByGenres = <T extends { genres: string[] }>(items: T[], genres?: string) => {
  if (!genres) return items
  const genreList = genres.split(',')
  return items.filter(item => 
    item.genres.some(genre => genreList.includes(genre))
  )
}

export const discoverMovies = (options: { page?: number, genres?: string }) => {
  const filtered = filterByGenres(movies, options.genres)
  return paginateResults(filtered, options.page)
}

export const getTrendingMoviesPage = (options: { page?: number }) => {
  return paginateResults(trendingMovies, options.page)
}

export const getPopularMoviesPage = (options: { page?: number }) => {
  return paginateResults(popularMovies, options.page)
}

export const discoverTvShows = (options: { page?: number, genres?: string }) => {
  const filtered = filterByGenres(tvShows, options.genres)
  return paginateResults(filtered, options.page)
}

export const getTrendingTvShowsPage = (options: { page?: number }) => {
  return paginateResults(trendingTvShows, options.page)
}

export const getPopularTvShowsPage = (options: { page?: number }) => {
  return paginateResults(popularTvShows, options.page)
}