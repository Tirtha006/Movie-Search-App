// script.js

const API_KEY = '509492e4'; // Replace with your OMDb API Key
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const movieDetailsDiv = document.getElementById('movieDetails');

// Search on button click
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchMovies(searchTerm);
  }
});

// Search function
async function searchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsDiv.innerHTML = `<p>No movies found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    resultsDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}

// Display search results
function displayMovies(movies) {
  resultsDiv.innerHTML = '';
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    movieItem.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
    resultsDiv.appendChild(movieItem);
  });
}

// Fetch detailed info
async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    movieDetailsDiv.innerHTML = `<p>Could not load movie details.</p>`;
  }
}

// Display detailed info
function displayMovieDetails(movie) {
  movieDetailsDiv.innerHTML = `
    <h2>${movie.Title}</h2>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>Cast:</strong> ${movie.Actors}</p>
  `;
}
