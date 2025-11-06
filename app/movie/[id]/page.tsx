'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { MediaItem, enhancedMedia } from '@/data/enhancedMedia';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FaPlay, FaStar, FaClock, FaCalendarAlt, FaLanguage, FaFilm, FaThumbsUp, FaPlus, FaShareAlt, FaUser, FaComment } from 'react-icons/fa';
import { FaArrowLeft, FaDownload } from 'react-icons/fa6';

// Import components
import BackdropSection from '@/components/movie/BackdropSection';
import OverviewSection from '@/components/movie/OverviewSection';
import PhotosSection from '@/components/movie/PhotosSection';
import YouTubePlayer from '@/components/movie/YouTubePlayer';
import CastsSection from '@/components/movie/CastsSection';
import RelatedSection from '@/components/movie/RelatedSection';

// Helper function to get movie by ID
const getMovieById = (id: string): Promise<MediaItem | undefined> => {
  return new Promise((resolve) => {
    const movie = enhancedMedia.movies.find(m => m.id.toString() === id);
    resolve(movie);
  });
};

// Define interfaces for the movie data structure
interface MovieImage {
  file_path: string;
  width: number;
  height: number;
}

interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieCredit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Define additional interfaces for the details page
interface MovieDetails {
  id: number;
  title: string;
  release_date?: string;
  poster_path: string;
  backdrop_path: string;
  plot: string;
  rating: number;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  genres: Array<{ id: number; name: string } | string>;
  original_language: string;
  images?: {
    backdrops: MovieImage[];
    posters: MovieImage[];
  };
  videos?: {
    results: MovieVideo[];
  };
  credits?: {
    cast: MovieCredit[];
    crew: MovieCredit[];
  };
  similar?: MediaItem[];
  recommendations?: MediaItem[];
  name?: string;
  media_type?: string;
  first_air_date?: string;
  trailer_url?: string;
  watch_links?: Array<{ platform: string; type: string; url: string; quality?: string }>;
}

export default function MovieDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWatchAvailable, setIsWatchAvailable] = useState(false);
  const [watchLink, setWatchLink] = useState('#');
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);

  // Ensure poster has a valid URL
  const getPosterUrl = (path: string | null | undefined) => {
    if (!path) return '/placeholder-poster.jpg';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  // Format runtime
  const formatRuntime = (minutes: number | undefined) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const movieData = await getMovieById(id);
        if (!movieData) {
          notFound();
          return;
        }

        // Set movie data with proper typing
        const movieDetails: MovieDetails = {
          ...movieData,
          title: movieData.title || 'Unknown Title',
          release_date: movieData.release_date || '',
          poster_path: movieData.poster_path || '',
          backdrop_path: movieData.backdrop_path || '',
          plot: movieData.plot || 'No overview available.',
          rating: movieData.rating || 0,
          vote_average: movieData.rating || 0,
          vote_count: movieData.vote_count || 0,
          runtime: movieData.runtime,
          genres: Array.isArray(movieData.genres) ? movieData.genres : [],
          original_language: movieData.original_language || 'en',
          // Add mock data for demonstration
          images: {
            backdrops: [],
            posters: []
          },
          videos: {
            results: [
              {
                id: '1',
                key: 'dQw4w9WgXcQ', // Example YouTube video ID
                name: 'Trailer',
                site: 'YouTube',
                type: 'Trailer'
              }
            ]
          },
          credits: {
            cast: [],
            crew: []
          },
          similar: [],
          recommendations: []
        };

        setMovie(movieDetails);

        // Set trailer if available
        const trailerVideo = movieDetails.videos?.results?.find(video =>
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailerVideo) {
          setTrailer(trailerVideo);
        }

        // Set watch availability
        if (movieData.watch_links && movieData.watch_links.length > 0) {
          // Use the first watch link available
          const watchLink = movieData.watch_links[0].url;
          if (watchLink) {
            setIsWatchAvailable(true);
            setWatchLink(watchLink);
            console.log('Watch link set to:', watchLink);
          } else if (movieData.trailer_url) {
            // Fallback to trailer if watch link is not available
            setIsWatchAvailable(true);
            setWatchLink(movieData.trailer_url);
            console.log('Using trailer as fallback:', movieData.trailer_url);
          } else if (movieData.imdb_id) {
            // Fallback to IMDB page
            const imdbLink = `https://www.imdb.com/title/${movieData.imdb_id}/`;
            setIsWatchAvailable(true);
            setWatchLink(imdbLink);
            console.log('Using IMDB as fallback:', imdbLink);
          } else {
            setIsWatchAvailable(false);
            console.log('No watch links available');
          }
        } else if (movieData.trailer_url) {
          // If no watch_links but has trailer_url
          setIsWatchAvailable(true);
          setWatchLink(movieData.trailer_url);
          console.log('Using trailer as primary source:', movieData.trailer_url);
        } else {
          setIsWatchAvailable(false);
          console.log('No watch links or trailer available');
        }

      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - poster skeleton */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            </div>

            {/* Right column - details skeleton */}
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="pt-4">
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get movie data with default values to prevent undefined errors
  const title = movie?.title || '';
  const release_date = movie?.release_date || '';
  const poster_path = movie?.poster_path || '';
  const backdrop_path = movie?.backdrop_path || '';
  const plot = movie?.plot || '';
  const vote_average = movie?.vote_average || 0;
  const vote_count = movie?.vote_count || 0;
  const runtime = movie?.runtime || 0;
  const genres = Array.isArray(movie?.genres) ? movie.genres : [];
  const original_language = movie?.original_language || 'en';
  const credits = movie?.credits || { cast: [], crew: [] };
  const videos = movie?.videos || { results: [] };
  const similar = Array.isArray(movie?.similar) ? movie.similar : [];
  const recommendations = Array.isArray(movie?.recommendations) ? movie.recommendations : [];
  const trailer_url = movie?.trailer_url || '';

  const formattedRating = vote_average ? vote_average.toFixed(1) : 'NR';
  const formattedRuntime = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : '';
  const topCast = credits?.cast?.slice(0, 5) || [];
  const directorName = credits?.crew?.[0]?.name || '';
  const language = new Intl.DisplayNames(['en'], { type: 'language' }).of(original_language);
  const certification = 'PG-13'; // Default certification, you can fetch this from your data if available

  // Get the trailer video if available
  const trailerVideo = videos?.results?.find(video =>
    video.type === 'Trailer' && video.site === 'YouTube'
  ) || null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <Image src={getPosterUrl(poster_path)} alt={title} fill className="object-cover" onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-poster.jpg';
              }} />
            </div>

            <div className="mt-4 md:hidden">
              <div className="w-full">
                <Button 
                  onClick={() => {
                    if (isWatchAvailable && watchLink) {
                      console.log('Opening watch link:', watchLink);
                      window.open(watchLink, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  size="lg" 
                  className={`w-full ${isWatchAvailable ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`} 
                  disabled={!isWatchAvailable}
                >
                  <FaPlay className="mr-2 h-4 w-4" />
                  {isWatchAvailable ? 'Watch Now' : 'Coming Soon'}
                </Button>
                {isWatchAvailable && (
                  <p className="mt-2 text-xs text-gray-400">
                    Watch on {watchLink.includes('primevideo') ? 'Prime Video' : 
                              watchLink.includes('zee5') ? 'ZEE5' : 
                              watchLink.includes('youtube') ? 'YouTube' : 'External Site'}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span>{movie.release_date || 'N/A'}</span>
              </div>

              {runtime && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>{formattedRuntime}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FaLanguage className="text-gray-400" />
                <span>{language || 'English'}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaFilm className="text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {genres.map((genre, index) => {
                    const genreName = typeof genre === 'string' ? genre : genre.name;
                    return (
                      <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
                        {genreName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title} ({new Date(release_date).getFullYear()})</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                <FaStar className="text-yellow-400" />
                <span>{formattedRating}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>{certification || 'NR'}</span>
                <span>•</span>
                <span>{language || 'English'}</span>
                {runtime && <span>•</span>}
                {runtime && <span>{formattedRuntime}</span>}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{plot || 'No overview available.'}</p>
            </div>

            {topCast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {topCast.map((person, index) => (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 mb-2 overflow-hidden">
                        {person.profile_path ? (
                          <Image src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} width={80} height={80} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700">
                            <FaUser className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm">{person.name}</h3>
                      <p className="text-xs text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {similar && similar.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similar.map((movie) => {
                    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
                    return (
                      <div key={movie.id} className="cursor-pointer group" onClick={() => router.push(`/movie/${movie.id}`)}>
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                          <Image 
                            src={getPosterUrl(movie.poster_path)} 
                            alt={movie.title} 
                            fill 
                            className="object-cover group-hover:opacity-80 transition-opacity" 
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-poster.jpg';
                            }} 
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <FaPlay className="text-white text-2xl" />
                          </div>
                        </div>
                        <h3 className="font-medium text-sm line-clamp-2">{movie.title}</h3>
                        {releaseYear && (
                          <p className="text-xs text-gray-400">{releaseYear}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}