import { MOVIE_LIST_AMOUNT } from "./config.js";
import * as model from "./model.js";
import popularView from "./views/popularView.js";

const setPopularMovies = async function (page = 1) {
  // Set popular movie
  await model.fetchPopularMovies(page);

  // Render popular movies
  popularView.render(
    model.state.popularMovies.movies.slice(0, MOVIE_LIST_AMOUNT)
  );
};

const controlPopularPageChange = async function (page) {
  if (page === 4) {
    setPopularMovies(model.state.popularMovies.fetchPage + 1);
  }
  // Render popular movies
  console.log(page);
  console.log(MOVIE_LIST_AMOUNT * page);
  popularView.render(
    model.state.popularMovies.movies.slice(
      MOVIE_LIST_AMOUNT * (page - 1),
      MOVIE_LIST_AMOUNT * page
        ? MOVIE_LIST_AMOUNT * page
        : MOVIE_LIST_AMOUNT * page - 1
    )
  );
};

const init = function () {
  setPopularMovies();
  popularView.addHandlerNextPage(controlPopularPageChange);
};
init();
