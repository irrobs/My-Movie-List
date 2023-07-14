export const state = {
  movies: {
    popular: [],
  },
};

export const fetchPopularMovies = async function () {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&api_key=175417d18069c0e4b048ceb3ba6d229b`
  );
  const data = await res.json();

  state.movies.popular = data.results;
};
