export const tvShows = [
  {
    id: '101',
    name: 'Breaking Bad',
    overview: 'A high school chemistry teacher turned meth kingpin navigates the dangerous world of the drug trade.',
    first_air_date: '2008-01-20',
    poster_path: '/breaking-bad.jpg',
    backdrop_path: '/breaking-bad-backdrop.jpg',
    genres: ['Drama', 'Crime', 'Thriller'],
    vote_average: 8.9,
    vote_count: 8500,
    number_of_seasons: 5,
    number_of_episodes: 62
  },
  {
    id: '102',
    name: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    first_air_date: '2016-07-15',
    poster_path: '/stranger-things.jpg',
    backdrop_path: '/stranger-things-backdrop.jpg',
    genres: ['Drama', 'Fantasy', 'Horror'],
    vote_average: 8.7,
    vote_count: 12500,
    number_of_seasons: 4,
    number_of_episodes: 34
  },
  {
    id: '103',
    name: 'The Mandalorian',
    overview: 'After the fall of the Empire, a lone gunfighter makes his way through the lawless outer reaches of the galaxy.',
    first_air_date: '2019-11-12',
    poster_path: '/mandalorian.jpg',
    backdrop_path: '/mandalorian-backdrop.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    vote_average: 8.5,
    vote_count: 9800,
    number_of_seasons: 3,
    number_of_episodes: 24
  },
  {
    id: '104',
    name: 'The Crown',
    overview: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    first_air_date: '2016-11-04',
    poster_path: '/the-crown.jpg',
    backdrop_path: '/the-crown-backdrop.jpg',
    genres: ['Drama', 'History'],
    vote_average: 8.6,
    vote_count: 7800,
    number_of_seasons: 6,
    number_of_episodes: 60
  },
  {
    id: '105',
    name: 'The Witcher',
    overview: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    first_air_date: '2019-12-20',
    poster_path: '/witcher.jpg',
    backdrop_path: '/witcher-backdrop.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
    vote_average: 8.2,
    vote_count: 9200,
    number_of_seasons: 3,
    number_of_episodes: 24
  }
];

export const popularTvShows = [...tvShows];
export const trendingTvShows = [...tvShows];

// Mock search results
export function searchTvShows(query: string) {
  const lowerQuery = query.toLowerCase();
  return tvShows.filter(show => 
    show.name.toLowerCase().includes(lowerQuery) ||
    show.overview.toLowerCase().includes(lowerQuery)
  );
}
