import { MOVIE_LIST_AMOUNT } from "./config";

export const state = {
  popularMovies: {
    movies: [],
    renderedMovies: [],
    fetchPage: 0,
    viewPage: 1,
  },
};

const setRenderedPopularMovies = function (page) {
  state.popularMovies.renderedMovies = state.popularMovies.movies.slice(
    page === 3
      ? MOVIE_LIST_AMOUNT * (page - 1) - 1
      : MOVIE_LIST_AMOUNT * (page - 1),
    MOVIE_LIST_AMOUNT * page
      ? MOVIE_LIST_AMOUNT * page
      : MOVIE_LIST_AMOUNT * page - 1
  );
};

export const fetchPopularMovies = async function (page) {
  state.popularMovies.fetchPage = page;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${state.popularMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );
  const data = await res.json();

  state.popularMovies.movies = data.results;
};

export const popularPageChange = async function (page = 1) {
  if (page === 0 && state.popularMovies.fetchPage === 1) return;
  if (page === 0 && state.popularMovies.fetchPage > 1) {
    await fetchPopularMovies((state.popularMovies.fetchPage -= 1));
    page = 3;
  }
  console.log(page);
  console.log(state.popularMovies.fetchPage);
  state.popularMovies.viewPage = page;

  setRenderedPopularMovies(page);
};
