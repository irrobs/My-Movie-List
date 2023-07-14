export const state = {
  popularMovies: {
    movies: [],
    fetchPage: 0,
  },
};

export const fetchPopularMovies = async function (page) {
  state.popularMovies.fetchPage = page;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${state.popularMovies.fetchPage}&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );
  const data = await res.json();

  state.popularMovies.movies = data.results;
};
