import { AJAX } from "./helpers";

export const state = {
  popularMovies: {
    movies: [],
    fetchPage: 0,
    viewPage: 1,
  },
  topMovies: {
    movies: [],
    fetchPage: 0,
    viewPage: 1,
  },
  cinemaMovies: {
    movies: [],
    fetchPage: 0,
    viewPage: 1,
  },
  searchedMovies: {
    totalPages: 0,
    totalResults: 0,
    movies: [],
    fetchPage: 0,
    viewPage: 1,
    prevQuery: "",
  },
  movieModal: {
    movie: {},
  },
  favoriteMovies: [],
  watchedMovies: [],
  laterMovies: [],
};

const clearStorage = function () {
  localStorage.clear();
};
/* clearStorage(); */

const setFavorite = function () {
  if (localStorage.getItem("favoriteMovies")) {
    JSON.parse(localStorage.getItem("favoriteMovies")).forEach((movie) =>
      state.favoriteMovies.push(movie)
    );
  }
};

setFavorite();

export const addToFavorite = async function (movieId) {
  const movie = await AJAX(
    `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );

  if (state.favoriteMovies.some((favMovie) => favMovie.id === movie.id)) return;
  state.favoriteMovies.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(state.favoriteMovies));
  console.log(state.favoriteMovies);
};

const setLater = function () {
  if (localStorage.getItem("laterMovies")) {
    JSON.parse(localStorage.getItem("laterMovies")).forEach((movie) =>
      state.laterMovies.push(movie)
    );
  }
};

setLater();

export const addToLater = async function (movieId) {
  const movie = await AJAX(
    `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );

  if (state.laterMovies.some((laterMovie) => laterMovie.id === movie.id))
    return;
  state.laterMovies.push(movie);
  localStorage.setItem("laterMovies", JSON.stringify(state.laterMovies));
  console.log(state.laterMovies);
};

const setwatched = function () {
  if (localStorage.getItem("watchedMovies")) {
    JSON.parse(localStorage.getItem("watchedMovies")).forEach((movie) =>
      state.watchedMovies.push(movie)
    );
  }
};

setwatched();

export const addToWatched = async function (movieId) {
  const movie = await AJAX(
    `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );

  if (state.watchedMovies.some((watchedMovie) => watchedMovie.id === movie.id))
    return;
  state.watchedMovies.push(movie);
  localStorage.setItem("watchedMovies", JSON.stringify(state.watchedMovies));
  console.log(state.watchedMovies);
};

// API calls
export const fetchMovieByID = async function (movieID) {
  const movie = await AJAX(
    `https://api.themoviedb.org/3/movie/${movieID}?language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );

  state.movieModal.movie = movie;
};
export const fetchPopularMovies = async function (page) {
  try {
    state.popularMovies.fetchPage = page;
    const data = await AJAX(
      `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${state.popularMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
    );

    state.popularMovies.movies.push(...data.results);
  } catch (err) {
    console.error(err);
  }
};

export const fetchTopMovies = async function (page) {
  try {
    state.topMovies.fetchPage = page;
    const data = await AJAX(
      `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${state.topMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
    );

    state.topMovies.movies.push(...data.results);
  } catch (err) {
    console.error(err);
  }
};
export const fetchCinemaMovies = async function (page) {
  try {
    state.cinemaMovies.fetchPage = page;
    const data = await AJAX(
      `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${state.cinemaMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
    );

    state.cinemaMovies.movies.push(...data.results);
  } catch (err) {
    console.error(err);
  }
};

export const fetchSearchedMovies = async function (query, page = 1) {
  if (!query) return;
  if (
    query.toLowerCase() === state.searchedMovies.prevQuery.toLowerCase() &&
    page === 0
  )
    return;

  state.searchedMovies.fetchPage = page * 2 + (page - 2);
  const searchResults = await Promise.all([
    AJAX(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${state.searchedMovies.fetchPage}&language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
    ),
    AJAX(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${
        state.searchedMovies.fetchPage + 1
      }&language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
    ),
    AJAX(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${
        state.searchedMovies.fetchPage + 2
      }&language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
    ),
  ]);

  state.searchedMovies.movies = [];

  searchResults.forEach((result) =>
    state.searchedMovies.movies.push(...result.results)
  );
  if (query.toLowerCase() !== state.searchedMovies.prevQuery.toLowerCase())
    state.searchedMovies.viewPage = 1;
  state.searchedMovies.prevQuery = query;
  state.searchedMovies.totalPages = searchResults[0].total_pages;
  state.searchedMovies.totalResults = searchResults[0].total_results;
};

export const searchPagination = function (btn) {
  const page = +btn.dataset.page;
  if (page === 0) return;

  state.searchedMovies.viewPage = page;
};

// Sliders
export const popularPageSlider = async function (page) {
  try {
    state.popularMovies.viewPage = page;
    if (
      state.popularMovies.viewPage !== 2 &&
      state.popularMovies.viewPage % 2 === 0
    ) {
      await fetchPopularMovies(state.popularMovies.fetchPage + 1);
    }
  } catch (err) {
    console.error(err);
  }
};

export const topPageSlider = async function (page) {
  try {
    state.topMovies.viewPage = page;
    if (state.topMovies.viewPage !== 2 && state.topMovies.viewPage % 2 === 0) {
      await fetchTopMovies(state.topMovies.fetchPage + 1);
    }
  } catch (err) {
    console.error(err);
  }
};

export const cinemaPageSlider = async function (page) {
  try {
    state.cinemaMovies.viewPage = page;
    if (
      state.cinemaMovies.viewPage !== 2 &&
      state.cinemaMovies.viewPage % 2 === 0
    ) {
      await fetchCinemaMovies(state.cinemaMovies.fetchPage + 1);
    }
  } catch (err) {
    console.error(err);
  }
};
