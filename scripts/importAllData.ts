const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createReadStream } = require('fs');

// Configuration
const DATA_DIR = '/Users/rohithkumard/Downloads/TMDB';
const OUTPUT_DIR = path.join(__dirname, '../src/data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Process Movies
function processMovies(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      console.log('Processing movies...');
      const moviesFilePath = path.join(DATA_DIR, 'tmdb_5000_movies.csv');
      console.log(`Reading movies from: ${moviesFilePath}`);
      
      if (!fs.existsSync(moviesFilePath)) {
        throw new Error(`Movies file not found at: ${moviesFilePath}`);
      }

      const movies: any[] = [];
      
      // Process the CSV file with csv-parser
      createReadStream(moviesFilePath)
        .pipe(csv())
        .on('data', (data: any) => {
          try {
            // Parse JSON fields
            const jsonFields = ['genres', 'keywords', 'production_companies', 'production_countries', 'spoken_languages'];
            const processedData: any = { ...data };
            
            jsonFields.forEach(field => {
              if (data[field]) {
                try {
                  // Clean and parse JSON string
                  const cleaned = data[field]
                    .replace(/^\[|\]$/g, '')
                    .replace(/},/g, '}###')
                    .split('###')
                    .map((item: string) => item.trim().replace(/^\{|\}$/g, ''))
                    .filter((item: string) => item)
                    .map((item: string) => {
                      const obj: any = {};
                      item.split(',').forEach(pair => {
                        const [key, ...values] = pair.split(':');
                        if (key && values.length > 0) {
                          const cleanKey = key.trim().replace(/^"|"$/g, '');
                          const value = values.join(':').trim().replace(/^"|"$/g, '');
                          obj[cleanKey] = value;
                        }
                      });
                      return obj;
                    });
                  
                  processedData[field] = cleaned;
                } catch (error) {
                  console.warn(`Error parsing ${field}:`, data[field]);
                  processedData[field] = [];
                }
              } else {
                processedData[field] = [];
              }
            });
            
            movies.push(processedData);
          } catch (error) {
            console.warn('Error processing row:', error);
          }
        })
        .on('end', () => {
          try {
            console.log(`Successfully parsed ${movies.length} movies`);
            
            // Process and clean movie data
            const processedMovies = movies
              .filter((movie: any) => movie.poster_path && movie.overview && movie.title)
              .map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview || 'No overview available',
                release_date: movie.release_date || '1970-01-01',
                poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '',
                genres: Array.isArray(movie.genres) ? movie.genres.map((g: any) => g.name || g) : [],
                runtime: parseInt(movie.runtime) || 0,
                status: movie.status || 'Released',
                vote_average: parseFloat(movie.vote_average) || 0,
                vote_count: parseInt(movie.vote_count) || 0,
                original_language: movie.original_language || 'en',
                popularity: parseFloat(movie.popularity) || 0,
              }))
              .sort((a: any, b: any) => b.popularity - a.popularity);
            
            // Save to file
            const moviesContent = `// Auto-generated file - DO NOT EDIT\nexport const importedMovies = ${JSON.stringify(processedMovies, null, 2)} as const;\n\nexport type ImportedMovie = typeof importedMovies[number];`;
            
            fs.writeFileSync(path.join(OUTPUT_DIR, 'importedMovies.ts'), moviesContent);
            console.log(`Successfully processed ${processedMovies.length} movies.`);
            
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// Process TV Shows (using movie data as TV shows for demo)
// In a real app, you would have a separate TV shows CSV
function processTvShows(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      console.log('Processing TV shows...');
      const moviesFilePath = path.join(DATA_DIR, 'tmdb_5000_movies.csv');
      console.log(`Reading TV shows from: ${moviesFilePath}`);
      
      if (!fs.existsSync(moviesFilePath)) {
        throw new Error(`Movies file not found at: ${moviesFilePath}`);
      }

      const tvShows: any[] = [];
      let rowCount = 0;
      
      // Process the CSV file with csv-parser
      createReadStream(moviesFilePath)
        .pipe(csv())
        .on('data', (data: any) => {
          try {
            // Only take every 3rd movie as a TV show for demo
            if (rowCount++ % 3 !== 0) return;
            
            // Parse JSON fields
            const jsonFields = ['genres', 'keywords', 'production_companies', 'production_countries', 'spoken_languages'];
            const processedData: any = { ...data };
            
            jsonFields.forEach(field => {
              if (data[field]) {
                try {
                  // Clean and parse JSON string
                  const cleaned = data[field]
                    .replace(/^\[|\]$/g, '')
                    .replace(/},/g, '}###')
                    .split('###')
                    .map((item: string) => item.trim().replace(/^\{|\}$/g, ''))
                    .filter((item: string) => item)
                    .map((item: string) => {
                      const obj: any = {};
                      item.split(',').forEach(pair => {
                        const [key, ...values] = pair.split(':');
                        if (key && values.length > 0) {
                          const cleanKey = key.trim().replace(/^"|"$/g, '');
                          const value = values.join(':').trim().replace(/^"|"$/g, '');
                          obj[cleanKey] = value;
                        }
                      });
                      return obj;
                    });
                  
                  processedData[field] = cleaned;
                } catch (error) {
                  console.warn(`Error parsing ${field}:`, data[field]);
                  processedData[field] = [];
                }
              } else {
                processedData[field] = [];
              }
            });
            
            tvShows.push(processedData);
          } catch (error) {
            console.warn('Error processing TV show row:', error);
          }
        })
        .on('end', () => {
          try {
            console.log(`Successfully parsed ${tvShows.length} TV shows`);
            
            // Process and clean TV show data
            const processedTvShows = tvShows
              .filter((show: any) => show.poster_path && show.overview && show.title)
              .map((show: any) => ({
                id: `tv-${show.id}`, // Prefix with tv- to avoid ID conflicts
                name: show.title,
                overview: show.overview || 'No overview available',
                first_air_date: show.release_date || '1970-01-01',
                poster_path: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '',
                backdrop_path: show.backdrop_path ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` : '',
                genres: Array.isArray(show.genres) ? show.genres.map((g: any) => g.name || g) : [],
                vote_average: parseFloat(show.vote_average) || 0,
                vote_count: parseInt(show.vote_count) || 0,
                original_language: show.original_language || 'en',
                popularity: parseFloat(show.popularity) || 0,
                number_of_seasons: Math.floor(Math.random() * 10) + 1, // Random number of seasons for demo
                number_of_episodes: Math.floor(Math.random() * 100) + 10, // Random number of episodes for demo
              }))
              .sort((a: any, b: any) => b.popularity - a.popularity);
            
            // Save to file
            const tvShowsContent = `// Auto-generated file - DO NOT EDIT\nexport const importedTvShows = ${JSON.stringify(processedTvShows, null, 2)} as const;\n\nexport type ImportedTvShow = typeof importedTvShows[number];`;
            
            fs.writeFileSync(path.join(OUTPUT_DIR, 'importedTvShows.ts'), tvShowsContent);
            console.log(`Successfully processed ${processedTvShows.length} TV shows.`);
            
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// Update package.json to include the new script
function updatePackageJson() {
  try {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    if (!packageJson.scripts['import-all-data']) {
      packageJson.scripts['import-all-data'] = 'ts-node scripts/importAllData.ts';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Updated package.json with new script: import-all-data');
    }
  } catch (error) {
    console.warn('Could not update package.json:', error);
  }
}

// Run the import
async function main() {
  try {
    console.log('Starting data import...');
    
    // Process movies and TV shows in parallel
    await Promise.all([
      processMovies(),
      processTvShows()
    ]);
    
    // Update package.json
    updatePackageJson();
    
    console.log('\n🎉 Data import completed successfully! 🎉');
    console.log(`- Movies saved to: ${path.join(OUTPUT_DIR, 'importedMovies.ts')}`);
    console.log(`- TV shows saved to: ${path.join(OUTPUT_DIR, 'importedTvShows.ts')}`);
    
  } catch (error) {
    console.error('\n❌ Error during data import:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { processMovies, processTvShows };
