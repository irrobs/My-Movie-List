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
  },
};

// API calls
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
  state.searchedMovies.fetchPage = page;
  const searchResults = await AJAX(
    `https://api.themoviedb.org/3/search/movie?query=${query}&page=${state.searchedMovies.fetchPage}&language=pt-BR&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );

  state.searchedMovies.totalPages = searchResults.total_pages;
  state.searchedMovies.totalResults = searchResults.total_results;
  state.searchedMovies.movies.push(...searchResults.results);
  console.log(state.searchedMovies);
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
