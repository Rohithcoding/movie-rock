const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

type MovieData = {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  status: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
  popularity: number;
};

const MOVIES_CSV_PATH = path.join(__dirname, '../../TMDB/tmdb_5000_movies.csv');
const CREDITS_CSV_PATH = path.join(__dirname, '../../TMDB/tmdb_5000_credits.csv');
const OUTPUT_MOVIES_PATH = path.join(__dirname, '../data/importedMovies.ts');
const OUTPUT_TVSHOWS_PATH = path.join(__dirname, '../data/importedTvShows.ts');

function processCsvData() {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(MOVIES_CSV_PATH, 'utf-8');
    
    // Parse the CSV data
    const records: any[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      cast: (value: string, context: { column: string }) => {
        if (context.column === 'genres' || 
            context.column === 'production_companies' || 
            context.column === 'production_countries' ||
            context.column === 'spoken_languages' ||
            context.column === 'keywords') {
          try {
            return JSON.parse(value);
          } catch {
            return [];
          }
        }
        return value;
      }
    });

    // Transform the data
    const movies: MovieData[] = records.map(record => ({
      id: record.id,
      title: record.title,
      overview: record.overview || 'No overview available',
      release_date: record.release_date || '1970-01-01',
      poster_path: record.poster_path ? `https://image.tmdb.org/t/p/w500${record.poster_path}` : '',
      backdrop_path: record.backdrop_path ? `https://image.tmdb.org/t/p/original${record.backdrop_path}` : '',
      genres: Array.isArray(record.genres) ? record.genres : [],
      runtime: parseInt(record.runtime) || 0,
      status: record.status || 'Released',
      vote_average: parseFloat(record.vote_average) || 0,
      vote_count: parseInt(record.vote_count) || 0,
      original_language: record.original_language || 'en',
      popularity: parseFloat(record.popularity) || 0,
    }));

    // Filter out movies without posters or with invalid data
    const validMovies = movies.filter(
      movie => movie.poster_path && movie.overview && movie.title
    );

    // Sort by popularity and take top 1000
    const topMovies = validMovies
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 1000);

    // Generate TypeScript file with the data
    const tsContent = `// Auto-generated file - DO NOT EDIT
// This file contains TMDB movie data imported from ${path.basename(MOVIES_CSV_PATH)}

export const importedMovies = ${JSON.stringify(topMovies, null, 2)} as const;

export type ImportedMovie = typeof importedMovies[number];
`;

    // Ensure the output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the TypeScript file
    fs.writeFileSync(OUTPUT_PATH, tsContent);

    console.log(`Successfully processed ${topMovies.length} movies.`);
    console.log(`Data written to: ${OUTPUT_PATH}`);
    
    return topMovies.length;
  } catch (error) {
    console.error('Error processing TMDB data:', error);
    throw error;
  }
}

// Run the import if this file is executed directly
if (require.main === module) {
  processCsvData();
}

module.exports = { processCsvData };
