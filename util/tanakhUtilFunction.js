const fs = require('fs');

// Load and parse the JSON file
const data = JSON.parse(fs.readFileSync('hebrew.json', 'utf8'));

// Function to get a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to pick a random book
function getRandomBook() {
  const books = Object.keys(data);
  const randomBook = books[getRandomInt(0, books.length)];
  return randomBook;
}

// Function to pick a random chapter within a book
function getRandomChapter(book) {
  const chapters = data[book];
  const randomChapter = chapters[getRandomInt(0, chapters.length)];
  return randomChapter;
}

// Function to pick a random line within a chapter
function getRandomLine(chapter) {
  const randomLine = chapter[getRandomInt(0, chapter.length)];
  return randomLine;
}

// Function to pick a random line from the entire tanakh
function getRandomSection() {
  const book = getRandomBook();
  const chapter = getRandomChapter(book);
  const line = getRandomLine(chapter);
  const spacedLine = line.map(word => word[0].replace(/\//g, '')).join(' ');
  return {
    book,
    line: spacedLine
  };
}

// Export the getRandomSection function
module.exports = {
  getRandomSection
};