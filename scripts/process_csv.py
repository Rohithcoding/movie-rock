import json
import csv
import os
import re
from pathlib import Path

def parse_json_field(field):
    """Parse a JSON field, handling various formatting issues."""
    if not field or not isinstance(field, str):
        return []
    
    # Clean up the field
    field = field.strip()
    if not field or field == '[]':
        return []
    
    # Try to parse as JSON first
    try:
        return json.loads(field)
    except json.JSONDecodeError:
        pass
    
    # Try to fix common JSON formatting issues
    try:
        # Replace single quotes with double quotes
        cleaned = field.replace("'", '"')
        # Fix property names (add quotes around keys)
        cleaned = re.sub(r'([\{\s,])(\w+)(:)' , r'\1"\2"\3', cleaned)
        # Fix values that are not quoted
        cleaned = re.sub(r':\s*([^\s\{\}\[\]\",]+?)([,\}\]]|$)', r':"\1"\2', cleaned)
        return json.loads(cleaned)
    except (json.JSONDecodeError, TypeError) as e:
        print(f"Warning: Could not parse JSON field: {field[:100]}...")
        return []

def process_csv_file(input_file, output_dir):
    """Process the TMDB movies CSV file and generate TypeScript files."""
    print(f"Reading file: {input_file}")
    
    # Read the CSV file
    movies = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for i, record in enumerate(reader):
            try:
                if not record.get('title'):
                    continue
                
                # Extract poster_path from the record if available
                poster_path = ''
                if 'poster_path' in record and record['poster_path']:
                    poster_path = f"https://image.tmdb.org/t/p/w500{record['poster_path']}"
                
                # Only include movies with a poster
                if not poster_path:
                    continue
                
                # Parse genres
                genres = []
                if 'genres' in record and record['genres']:
                    genre_data = parse_json_field(record['genres'])
                    if isinstance(genre_data, list):
                        genres = [g.get('name', '') for g in genre_data if isinstance(g, dict) and g.get('name')]
                
                # Create movie object
                movie = {
                    'id': str(record.get('id', f'movie-{i}')),
                    'title': record.get('title', 'Untitled'),
                    'overview': record.get('overview', 'No overview available'),
                    'release_date': record.get('release_date', '1970-01-01'),
                    'poster_path': poster_path,
                    'backdrop_path': f"https://image.tmdb.org/t/p/original{record.get('backdrop_path', '')}" if record.get('backdrop_path') else '',
                    'genres': genres,
                    'runtime': int(record.get('runtime', 0)) if str(record.get('runtime', '')).isdigit() else 0,
                    'status': record.get('status', 'Released'),
                    'vote_average': float(record.get('vote_average', 0)) if record.get('vote_average') else 0,
                    'vote_count': int(record.get('vote_count', 0)) if str(record.get('vote_count', '')).isdigit() else 0,
                    'original_language': record.get('original_language', 'en'),
                    'popularity': float(record.get('popularity', 0)) if record.get('popularity') else 0,
                }
                
                movies.append(movie)
                
            except Exception as e:
                print(f"Error processing row {i+1}: {e}")
    
    # Sort by popularity
    movies.sort(key=lambda x: x.get('popularity', 0), reverse=True)
    
    print(f"Successfully processed {len(movies)} movies")
    
    # Save movies to file
    output_file = os.path.join(output_dir, 'importedMovies.ts')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated file - DO NOT EDIT\n')
        f.write(f'export const importedMovies = {json.dumps(movies, indent=2, ensure_ascii=False)} as const;\n\n')
        f.write('export type ImportedMovie = typeof importedMovies[number];\n')
    
    print(f"Saved movies to: {output_file}")
    
    # Create TV shows (using a subset of movies for demo)
    tv_shows = []
    for i, movie in enumerate(movies):
        if i % 3 != 0:  # Take every 3rd movie
            continue
            
        tv_show = {
            'id': f"tv-{movie['id']}",
            'name': movie['title'],
            'overview': movie['overview'],
            'first_air_date': movie['release_date'],
            'poster_path': movie['poster_path'],
            'backdrop_path': movie['backdrop_path'],
            'genres': movie['genres'],
            'vote_average': movie['vote_average'],
            'vote_count': movie['vote_count'],
            'original_language': movie['original_language'],
            'popularity': movie['popularity'],
            'number_of_seasons': (i % 10) + 1,  # 1-10 seasons
            'number_of_episodes': ((i * 17) % 100) + 10,  # 10-109 episodes
        }
        tv_shows.append(tv_show)
    
    # Sort TV shows by popularity
    tv_shows.sort(key=lambda x: x.get('popularity', 0), reverse=True)
    
    print(f"Successfully processed {len(tv_shows)} TV shows")
    
    # Save TV shows to file
    output_file = os.path.join(output_dir, 'importedTvShows.ts')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated file - DO NOT EDIT\n')
        f.write(f'export const importedTvShows = {json.dumps(tv_shows, indent=2, ensure_ascii=False)} as const;\n\n')
        f.write('export type ImportedTvShow = typeof importedTvShows[number];\n')
    
    print(f"Saved TV shows to: {output_file}")
    print("\n🎉 Data import completed successfully! 🎉")

if __name__ == "__main__":
    # Configuration
    CSV_PATH = '/Users/rohithkumard/Downloads/TMDB/tmdb_5000_movies.csv'
    OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src/data')
    
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Process the CSV file
    process_csv_file(CSV_PATH, OUTPUT_DIR)
