'use client';

import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { MediaGrid } from '@/components/sections/Home/MediaGrid';
import { searchContent } from '@/utils/searchUtils';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Get search results
  const results = searchContent(query);
  
  // Separate movies and TV shows
  const movies = results.filter(item => item.media_type === 'movie');
  const tvShows = results.filter(item => item.media_type === 'tv');
  
  if (!query) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <div className="bg-gray-800 p-6 rounded-full mb-4">
          <SearchIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Search for movies and TV shows</h2>
        <p className="text-gray-400 max-w-md">
          Find your favorite movies and TV shows by typing in the search bar above.
        </p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <div className="bg-gray-800 p-6 rounded-full mb-4">
          <SearchIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">
          We couldn't find any results for "{query}". Try a different search term.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search results for "{query}"
      </h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="all">All ({results.length})</TabsTrigger>
          <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
          <TabsTrigger value="tv">TV Shows ({tvShows.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8">
          {movies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <MediaGrid items={movies} title="" />
              </div>
            </div>
          )}
          
          {tvShows.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <MediaGrid 
                  items={tvShows.map(show => ({
                    ...show,
                    title: show.title || show.name || '',
                    name: show.name || show.title || ''
                  }))} 
                  title="" 
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="movies">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <MediaGrid items={movies} title="" />
          </div>
        </TabsContent>
        
        <TabsContent value="tv">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <MediaGrid 
              items={tvShows.map(show => ({
                ...show,
                title: show.title || show.name || '',
                name: show.name || show.title || ''
              }))} 
              title="" 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
