const fs = require('fs');
const path = require('path');

// Configuration
const CSV_PATH = '/Users/rohithkumard/Downloads/TMDB/tmdb_5000_movies.csv';

console.log(`Reading file: ${CSV_PATH}`);
console.log(`File exists: ${fs.existsSync(CSV_PATH)}`);

// Read the first few lines of the file
const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
const lines = fileContent.split('\n').slice(0, 5);

console.log('\nFirst 5 lines of the CSV:');
console.log('------------------------');
lines.forEach((line: string, index: number) => {
  console.log(`Line ${index + 1}: ${line.substring(0, 200)}...`);
});

// Try to parse the first line as headers
if (lines.length > 0) {
  const headers = lines[0].split(',');
  console.log('\nCSV Headers:');
  console.log('------------');
  headers.forEach((header: string, index: number) => {
    console.log(`${index + 1}. ${header}`);
  });
}

// Check file stats
const stats = fs.statSync(CSV_PATH);
console.log('\nFile stats:');
console.log('-----------');
console.log(`Size: ${stats.size} bytes`);
console.log(`Created: ${stats.birthtime}`);
console.log(`Modified: ${stats.mtime}`);

// Try to read the first data row
if (lines.length > 1) {
  console.log('\nFirst data row:');
  console.log('---------------');
  console.log(lines[1]);
  
  // Try to parse the first data row
  try {
    const firstRow = {} as any;
    const values = lines[1].match(/"(?:[^"]|"")*"|[^,]*/g) || [];
    const headers = lines[0].split(',');
    
    values.forEach((value: string, index: number) => {
      const header = headers[index] || `col_${index}`;
      // Clean up the value
      value = value.trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      firstRow[header] = value;
    });
    
    console.log('\nParsed first row:');
    console.log('----------------');
    console.log(JSON.stringify(firstRow, null, 2));
    
    // Try to parse the genres field
    if (firstRow.genres) {
      console.log('\nGenres field:');
      console.log('------------');
      console.log(firstRow.genres);
      
      try {
        const genres = JSON.parse(firstRow.genres);
        console.log('\nParsed genres:');
        console.log('-------------');
        console.log(genres);
      } catch (error) {
        console.log('\nError parsing genres as JSON, trying to clean it up...');
        // Try to fix common JSON formatting issues
        const cleaned = firstRow.genres
          .replace(/'/g, '"')
          .replace(/([{\[\],])(\s*)([^\s\{\}\[\]\",]+?):/g, '$1"$3":')
          .replace(/:\s*([^\s\{\}\[\]\",]+?)([,\}\]]|$)/g, ':"$1"$2');
        
        console.log('\nCleaned genres:');
        console.log('--------------');
        console.log(cleaned);
        
        try {
          const parsed = JSON.parse(cleaned);
          console.log('\nSuccessfully parsed cleaned genres:');
          console.log('--------------------------------');
          console.log(parsed);
        } catch (e) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          console.log('\nStill could not parse genres:', errorMessage);
        }
      }
    }
  } catch (error) {
    console.error('Error parsing first row:', error);
  }
}
