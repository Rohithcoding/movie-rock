const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const DATA_DIR = '/Users/rohithkumard/Downloads/TMDB';
const OUTPUT_DIR = path.join(__dirname, '../src/data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Simple function to parse JSON fields
function parseJsonField(field: string): any[] {
  if (!field) return [];
  try {
    // Clean up the JSON string
    const cleaned = field
      .replace(/^\[|\]$/g, '') // Remove square brackets
      .replace(/},/g, '}###') // Replace commas between objects
      .split('###') // Split into individual objects
      .map(item => item.trim())
      .filter(item => item)
      .map(item => {
        try {
          // Handle the case where the string might have single quotes instead of double quotes
          const jsonStr = item
            .replace(/'/g, '"')
            .replace(/(\w+):/g, '"$1":')
            .replace(/:"([^\"\{\}]+?)(?=,|\s*\}|$)/g, ':"$1"');
          return JSON.parse(jsonStr);
        } catch (e) {
          console.warn('Error parsing item:', item);
          return null;
        }
      })
      .filter(item => item !== null);
    
    return cleaned;
  } catch (error) {
    console.warn('Error parsing JSON field:', error);
    return [];
  }
}

// Process Movies
function processMovies() {
  try {
    console.log('Processing movies...');
    const moviesFilePath = path.join(DATA_DIR, 'tmdb_5000_movies.csv');
    console.log(`Reading movies from: ${moviesFilePath}`);
    
    if (!fs.existsSync(moviesFilePath)) {
      throw new Error(`Movies file not found at: ${moviesFilePath}`);
    }
    
    // Read and parse the CSV file
    const fileContent = fs.readFileSync(moviesFilePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax: true,
      skip_records_with_error: true
    });
    
    console.log(`Found ${records.length} movie records`);
    
    // Process and clean movie data
    const processedMovies = records
      .filter((movie: any) => movie.id && movie.title && movie.poster_path)
      .map((movie: any) => {
        // Parse JSON fields
        const genres = parseJsonField(movie.genres);
        
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview || 'No overview available',
          release_date: movie.release_date || '1970-01-01',
          poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
          backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '',
          genres: genres.map((g: any) => g.name || g).filter(Boolean),
          runtime: parseInt(movie.runtime) || 0,
          status: movie.status || 'Released',
          vote_average: parseFloat(movie.vote_average) || 0,
          vote_count: parseInt(movie.vote_count) || 0,
          original_language: movie.original_language || 'en',
          popularity: parseFloat(movie.popularity) || 0,
        };
      })
      .filter((movie: any) => movie.poster_path) // Only keep movies with posters
      .sort((a: any, b: any) => b.popularity - a.popularity);
    
    console.log(`Successfully processed ${processedMovies.length} movies`);
    
    // Save to file
    const moviesContent = `// Auto-generated file - DO NOT EDIT
export const importedMovies = ${JSON.stringify(processedMovies, null, 2)} as const;

export type ImportedMovie = typeof importedMovies[number];`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'importedMovies.ts'), moviesContent);
    console.log(`Saved movies to: ${path.join(OUTPUT_DIR, 'importedMovies.ts')}`);
    
    return processedMovies;
  } catch (error) {
    console.error('Error processing movies:', error);
    throw error;
  }
}

// Process TV Shows (using movie data as TV shows for demo)
function processTvShows() {
  try {
    console.log('\nProcessing TV shows...');
    const moviesFilePath = path.join(DATA_DIR, 'tmdb_5000_movies.csv');
    console.log(`Reading TV shows from: ${moviesFilePath}`);
    
    if (!fs.existsSync(moviesFilePath)) {
      throw new Error(`Movies file not found at: ${moviesFilePath}`);
    }
    
    // Read and parse the CSV file
    const fileContent = fs.readFileSync(moviesFilePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax: true,
      skip_records_with_error: true
    });
    
    console.log(`Found ${records.length} records for TV shows`);
    
    // Process and clean TV show data (using movie data as TV shows for demo)
    const processedTvShows = records
      .filter((show: any, index: number) => 
        show.id && show.title && show.poster_path && index % 3 === 0 // Take every 3rd movie as a TV show
      )
      .map((show: any) => {
        // Parse JSON fields
        const genres = parseJsonField(show.genres);
        
        return {
          id: `tv-${show.id}`, // Prefix with tv- to avoid ID conflicts
          name: show.title,
          overview: show.overview || 'No overview available',
          first_air_date: show.release_date || '1970-01-01',
          poster_path: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '',
          backdrop_path: show.backdrop_path ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` : '',
          genres: genres.map((g: any) => g.name || g).filter(Boolean),
          vote_average: parseFloat(show.vote_average) || 0,
          vote_count: parseInt(show.vote_count) || 0,
          original_language: show.original_language || 'en',
          popularity: parseFloat(show.popularity) || 0,
          number_of_seasons: Math.floor(Math.random() * 10) + 1, // Random number of seasons for demo
          number_of_episodes: Math.floor(Math.random() * 100) + 10, // Random number of episodes for demo
        };
      })
      .filter((show: any) => show.poster_path) // Only keep shows with posters
      .sort((a: any, b: any) => b.popularity - a.popularity);
    
    console.log(`Successfully processed ${processedTvShows.length} TV shows`);
    
    // Save to file
    const tvShowsContent = `// Auto-generated file - DO NOT EDIT
export const importedTvShows = ${JSON.stringify(processedTvShows, null, 2)} as const;

export type ImportedTvShow = typeof importedTvShows[number];`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'importedTvShows.ts'), tvShowsContent);
    console.log(`Saved TV shows to: ${path.join(OUTPUT_DIR, 'importedTvShows.ts')}`);
    
    return processedTvShows;
  } catch (error) {
    console.error('Error processing TV shows:', error);
    throw error;
  }
}

// Main function
function main() {
  try {
    console.log('Starting data import...');
    
    // Process movies and TV shows
    const movies = processMovies();
    const tvShows = processTvShows();
    
    console.log('\n🎉 Data import completed successfully! 🎉');
    console.log(`- Processed ${movies.length} movies`);
    console.log(`- Processed ${tvShows.length} TV shows`);
    
  } catch (error) {
    console.error('\n❌ Error during data import:', error);
    process.exit(1);
  }
}

// Run the script
main();
