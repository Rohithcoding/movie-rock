const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const CSV_PATH = '/Users/rohithkumard/Downloads/TMDB/tmdb_5000_movies.csv';
const OUTPUT_DIR = path.join(__dirname, '../src/data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to clean and parse JSON fields
function parseJsonField(field: string): any[] {
  if (!field || typeof field !== 'string') return [];
  
  try {
    // First, try to parse as is
    return JSON.parse(field);
  } catch (error) {
    // If that fails, try to clean it up
    try {
      // Replace single quotes with double quotes and fix property names
      const cleaned = field
        .replace(/'/g, '"')
        .replace(/([{\s])(\w+)(:)/g, '$1"$2"$3')
        .replace(/:\s*([^\s\{\}\[\]\",]+?)([,\}\]]|$)/g, ':"$1"$2');
      
      return JSON.parse(cleaned);
    } catch (e) {
      console.warn('Error parsing JSON field:', field.substring(0, 100) + '...');
      return [];
    }
  }
}

// Main function to process the CSV file
function processCsv() {
  try {
    console.log('Reading file:', CSV_PATH);
    const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
    
    // Read the CSV file with proper handling of quoted fields
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax: true,
      skip_records_with_error: true,
      quote: '"',
      escape: '\\',
      ltrim: true,
      rtrim: true,
    });
    
    console.log(`Found ${records.length} records in the CSV file`);
    
    if (records.length === 0) {
      console.error('No records found in the CSV file');
      return;
    }
    
    // Process movies
    const movies = records
      .filter((record: any) => record.title && record.poster_path)
      .map((record: any) => ({
        id: record.id || '',
        title: record.title,
        overview: record.overview || 'No overview available',
        release_date: record.release_date || '1970-01-01',
        poster_path: record.poster_path ? `https://image.tmdb.org/t/p/w500${record.poster_path}` : '',
        backdrop_path: record.backdrop_path ? `https://image.tmdb.org/t/p/original${record.backdrop_path}` : '',
        genres: parseJsonField(record.genres).map((g: any) => g.name || g).filter(Boolean),
        runtime: parseInt(record.runtime) || 0,
        status: record.status || 'Released',
        vote_average: parseFloat(record.vote_average) || 0,
        vote_count: parseInt(record.vote_count) || 0,
        original_language: record.original_language || 'en',
        popularity: parseFloat(record.popularity) || 0,
      }))
      .filter((movie: any) => movie.poster_path) // Only keep movies with posters
      .sort((a: any, b: any) => b.popularity - a.popularity);
    
    console.log(`Successfully processed ${movies.length} movies`);
    
    // Process TV shows (using a subset of movies as TV shows for demo)
    const tvShows = records
      .filter((_: any, index: number) => index % 3 === 0) // Take every 3rd movie
      .filter((record: any) => record.title && record.poster_path)
      .map((record: any) => ({
        id: `tv-${record.id}`, // Prefix with tv- to avoid ID conflicts
        name: record.title,
        overview: record.overview || 'No overview available',
        first_air_date: record.release_date || '1970-01-01',
        poster_path: record.poster_path ? `https://image.tmdb.org/t/p/w500${record.poster_path}` : '',
        backdrop_path: record.backdrop_path ? `https://image.tmdb.org/t/p/original${record.backdrop_path}` : '',
        genres: parseJsonField(record.genres).map((g: any) => g.name || g).filter(Boolean),
        vote_average: parseFloat(record.vote_average) || 0,
        vote_count: parseInt(record.vote_count) || 0,
        original_language: record.original_language || 'en',
        popularity: parseFloat(record.popularity) || 0,
        number_of_seasons: Math.floor(Math.random() * 10) + 1, // Random number of seasons for demo
        number_of_episodes: Math.floor(Math.random() * 100) + 10, // Random number of episodes for demo
      }))
      .filter((show: any) => show.poster_path) // Only keep shows with posters
      .sort((a: any, b: any) => b.popularity - a.popularity);
    
    console.log(`Successfully processed ${tvShows.length} TV shows`);
    
    // Save movies to file
    const moviesContent = `// Auto-generated file - DO NOT EDIT
export const importedMovies = ${JSON.stringify(movies, null, 2)} as const;

export type ImportedMovie = typeof importedMovies[number];`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'importedMovies.ts'), moviesContent);
    console.log(`Saved movies to: ${path.join(OUTPUT_DIR, 'importedMovies.ts')}`);
    
    // Save TV shows to file
    const tvShowsContent = `// Auto-generated file - DO NOT EDIT
export const importedTvShows = ${JSON.stringify(tvShows, null, 2)} as const;

export type ImportedTvShow = typeof importedTvShows[number];`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'importedTvShows.ts'), tvShowsContent);
    console.log(`Saved TV shows to: ${path.join(OUTPUT_DIR, 'importedTvShows.ts')}`);
    
    console.log('\n🎉 Data import completed successfully! 🎉');
    
  } catch (error) {
    console.error('\n❌ Error during data import:', error);
    process.exit(1);
  }
}

// Run the script
processCsv();
