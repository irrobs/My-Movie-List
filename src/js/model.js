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
