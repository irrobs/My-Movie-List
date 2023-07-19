import { AJAX } from "./helpers";

export const state = {
  popularMovies: {
    movies: [],
    renderedMovies: [],
    fetchPage: 0,
    viewPage: 1,
  },
  topMovies: {
    movies: [],
    renderedMovies: [],
    fetchPage: 0,
    viewPage: 1,
  },
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
