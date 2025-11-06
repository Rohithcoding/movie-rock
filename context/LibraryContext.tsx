'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LibraryMediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  media_type?: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

type LibraryContextType = {
  library: LibraryMediaItem[];
  addToLibrary: (item: LibraryMediaItem) => void;
  removeFromLibrary: (id: number) => void;
  isInLibrary: (id: number) => boolean;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<LibraryMediaItem[]>([]);

  const addToLibrary = (item: LibraryMediaItem) => {
    setLibrary(prev => {
      // Check if item already exists in library
      if (!prev.some(i => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromLibrary = (id: number) => {
    setLibrary(prev => prev.filter(item => item.id !== id));
  };

  const isInLibrary = (id: number) => {
    return library.some(item => item.id === id);
  };

  return (
    <LibraryContext.Provider 
      value={{ 
        library, 
        addToLibrary, 
        removeFromLibrary, 
        isInLibrary 
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
