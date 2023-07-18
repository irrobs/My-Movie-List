//TODO: Add way to fetch new page of movies from API to push into the popularMovies.movies array to allow to always keep sliding through movies.

export const state = {
  popularMovies: {
    movies: [],
    renderedMovies: [],
    fetchPage: 0,
    viewPage: 1,
  },
};

export const fetchPopularMovies = async function (page) {
  state.popularMovies.fetchPage = page;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${state.popularMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );
  const data = await res.json();

  state.popularMovies.movies.push(...data.results);
};

export const popularPageSlider = async function (page) {
  state.popularMovies.viewPage = page;
  if (
    state.popularMovies.viewPage !== 2 &&
    state.popularMovies.viewPage % 2 === 0
  ) {
    await fetchPopularMovies(state.popularMovies.fetchPage + 1);
  }
};
