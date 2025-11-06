import json
import os

def main():
    # Configuration
    csv_path = '/Users/rohithkumard/Downloads/TMDB/tmdb_5000_movies.csv'
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src/data')
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Sample movie data (we'll generate this from the CSV)
    movies = [
        {
            'id': 1,
            'title': 'Sample Movie 1',
            'overview': 'This is a sample movie overview.',
            'release_date': '2023-01-01',
            'poster_path': 'https://image.tmdb.org/t/p/w500/example1.jpg',
            'backdrop_path': 'https://image.tmdb.org/t/p/original/example1-bg.jpg',
            'genres': ['Action', 'Adventure'],
            'runtime': 120,
            'vote_average': 7.5,
            'vote_count': 1000,
            'popularity': 100.0,
            'original_language': 'en',
            'status': 'Released'
        },
        {
            'id': 2,
            'title': 'Sample Movie 2',
            'overview': 'This is another sample movie overview.',
            'release_date': '2023-02-15',
            'poster_path': 'https://image.tmdb.org/t/p/w500/example2.jpg',
            'backdrop_path': 'https://image.tmdb.org/t/p/original/example2-bg.jpg',
            'genres': ['Drama', 'Thriller'],
            'runtime': 110,
            'vote_average': 8.0,
            'vote_count': 1500,
            'popularity': 150.0,
            'original_language': 'en',
            'status': 'Released'
        }
    ]
    
    # Create TV shows (using a subset of movies for demo)
    tv_shows = [
        {
            'id': 'tv-1',
            'name': 'Sample TV Show 1',
            'overview': 'This is a sample TV show overview.',
            'first_air_date': '2023-01-01',
            'poster_path': 'https://image.tmdb.org/t/p/w500/example-tv1.jpg',
            'backdrop_path': 'https://image.tmdb.org/t/p/original/example-tv1-bg.jpg',
            'genres': ['Drama', 'Mystery'],
            'vote_average': 7.8,
            'vote_count': 2000,
            'original_language': 'en',
            'popularity': 180.0,
            'number_of_seasons': 3,
            'number_of_episodes': 30
        },
        {
            'id': 'tv-2',
            'name': 'Sample TV Show 2',
            'overview': 'This is another sample TV show overview.',
            'first_air_date': '2023-02-15',
            'poster_path': 'https://image.tmdb.org/t/p/w500/example-tv2.jpg',
            'backdrop_path': 'https://image.tmdb.org/t/p/original/example-tv2-bg.jpg',
            'genres': ['Comedy', 'Drama'],
            'vote_average': 8.2,
            'vote_count': 2500,
            'original_language': 'en',
            'popularity': 200.0,
            'number_of_seasons': 5,
            'number_of_episodes': 50
        }
    ]
    
    # Save movies to file
    movies_file = os.path.join(output_dir, 'importedMovies.ts')
    with open(movies_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated file - DO NOT EDIT\n')
        f.write(f'export const importedMovies = {json.dumps(movies, indent=2, ensure_ascii=False)} as const;\n\n')
        f.write('export type ImportedMovie = typeof importedMovies[number];\n')
    
    print(f"Saved movies to: {movies_file}")
    
    # Save TV shows to file
    tv_shows_file = os.path.join(output_dir, 'importedTvShows.ts')
    with open(tv_shows_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated file - DO NOT EDIT\n')
        f.write(f'export const importedTvShows = {json.dumps(tv_shows, indent=2, ensure_ascii=False)} as const;\n\n')
        f.write('export type ImportedTvShow = typeof importedTvShows[number];\n')
    
    print(f"Saved TV shows to: {tv_shows_file}")
    print("\n🎉 Data files generated successfully! 🎉")

if __name__ == "__main__":
    main()
