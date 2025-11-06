import json
import csv
import os
from pathlib import Path
import re

# Configuration
CSV_PATH = '/Users/rohithkumard/Downloads/TMDB/tmdb_5000_movies.csv'
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src/data')

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def parse_json_field(field):
    """Parse a JSON field, handling various formatting issues."""
    if not field or not isinstance(field, str):
        return []
    
    try:
        # First, try to parse as is
        return json.loads(field)
    except json.JSONDecodeError:
        try:
            # Try to fix common JSON formatting issues
            # Replace single quotes with double quotes
            cleaned = field.replace("'", '"')
            # Fix property names (add quotes around keys)
            cleaned = re.sub(r'([{\s])(\w+)(:)' , r'\1"\2"\3', cleaned)
            # Fix values that are not quoted
            cleaned = re.sub(r':\s*([^\s\{\}\[\]\",]+?)([,\}\]]|$)', r':"\1"\2', cleaned)
            return json.loads(cleaned)
        except (json.JSONDecodeError, TypeError) as e:
            print(f"Warning: Could not parse JSON field: {field[:100]}...")
            return []

def process_movies():
    """Process the TMDB movies CSV file and generate TypeScript files."""
    print(f"Reading file: {CSV_PATH}")
    
    # Read the CSV file
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        records = list(reader)
    
    print(f"Found {len(records)} records in the CSV file")
    
    if not records:
        print("No records found in the CSV file")
        return
    
    # Process movies
    movies = []
    for record in records:
        try:
            if not record.get('title') or not record.get('poster_path'):
                continue
                
            movie = {
                'id': record.get('id', ''),
                'title': record.get('title', ''),
                'overview': record.get('overview', 'No overview available'),
                'release_date': record.get('release_date', '1970-01-01'),
                'poster_path': f"https://image.tmdb.org/t/p/w500{record.get('poster_path', '')}" if record.get('poster_path') else '',
                'backdrop_path': f"https://image.tmdb.org/t/p/original{record.get('backdrop_path', '')}" if record.get('backdrop_path') else '',
                'genres': [g.get('name', '') for g in parse_json_field(record.get('genres', '[]')) if g.get('name')],
                'runtime': int(record.get('runtime', 0)) if record.get('runtime', '').isdigit() else 0,
                'status': record.get('status', 'Released'),
                'vote_average': float(record.get('vote_average', 0)) if record.get('vote_average') else 0,
                'vote_count': int(record.get('vote_count', 0)) if record.get('vote_count', '').isdigit() else 0,
                'original_language': record.get('original_language', 'en'),
                'popularity': float(record.get('popularity', 0)) if record.get('popularity') else 0,
            }
            
            if movie['poster_path']:
                movies.append(movie)
                
        except Exception as e:
            print(f"Error processing movie record: {e}")
    
    # Sort by popularity
    movies.sort(key=lambda x: x.get('popularity', 0), reverse=True)
    
    print(f"Successfully processed {len(movies)} movies")
    
    # Save movies to file
    movies_ts = f"// Auto-generated file - DO NOT EDIT\n"
    movies_ts += f"export const importedMovies = {json.dumps(movies, indent=2, ensure_ascii=False)} as const;\n\n"
    movies_ts += "export type ImportedMovie = typeof importedMovies[number];"
    
    movies_path = os.path.join(OUTPUT_DIR, 'importedMovies.ts')
    with open(movies_path, 'w', encoding='utf-8') as f:
        f.write(movies_ts)
    
    print(f"Saved movies to: {movies_path}")
    
    # Process TV shows (using a subset of movies as TV shows for demo)
    tv_shows = []
    for i, record in enumerate(records):
        try:
            if i % 3 != 0 or not record.get('title') or not record.get('poster_path'):
                continue
                
            tv_show = {
                'id': f"tv-{record.get('id', '')}",
                'name': record.get('title', ''),
                'overview': record.get('overview', 'No overview available'),
                'first_air_date': record.get('release_date', '1970-01-01'),
                'poster_path': f"https://image.tmdb.org/t/p/w500{record.get('poster_path', '')}" if record.get('poster_path') else '',
                'backdrop_path': f"https://image.tmdb.org/t/p/original{record.get('backdrop_path', '')}" if record.get('backdrop_path') else '',
                'genres': [g.get('name', '') for g in parse_json_field(record.get('genres', '[]')) if g.get('name')],
                'vote_average': float(record.get('vote_average', 0)) if record.get('vote_average') else 0,
                'vote_count': int(record.get('vote_count', 0)) if record.get('vote_count', '').isdigit() else 0,
                'original_language': record.get('original_language', 'en'),
                'popularity': float(record.get('popularity', 0)) if record.get('popularity') else 0,
                'number_of_seasons': (i % 10) + 1,  # Random number of seasons between 1 and 10
                'number_of_episodes': ((i * 17) % 100) + 10,  # Random number of episodes between 10 and 109
            }
            
            if tv_show['poster_path']:
                tv_shows.append(tv_show)
                
        except Exception as e:
            print(f"Error processing TV show record: {e}")
    
    # Sort by popularity
    tv_shows.sort(key=lambda x: x.get('popularity', 0), reverse=True)
    
    print(f"Successfully processed {len(tv_shows)} TV shows")
    
    # Save TV shows to file
    tv_shows_ts = f"// Auto-generated file - DO NOT EDIT\n"
    tv_shows_ts += f"export const importedTvShows = {json.dumps(tv_shows, indent=2, ensure_ascii=False)} as const;\n\n"
    tv_shows_ts += "export type ImportedTvShow = typeof importedTvShows[number];"
    
    tv_shows_path = os.path.join(OUTPUT_DIR, 'importedTvShows.ts')
    with open(tv_shows_path, 'w', encoding='utf-8') as f:
        f.write(tv_shows_ts)
    
    print(f"Saved TV shows to: {tv_shows_path}")
    print("\n🎉 Data import completed successfully! 🎉")

if __name__ == "__main__":
    process_movies()
