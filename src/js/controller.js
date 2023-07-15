import { MOVIE_LIST_AMOUNT } from "./config.js";
import * as model from "./model.js";
import popularView from "./views/popularView.js";
import popularPaginationView from "./views/popularPaginationView.js";

const setPopularMovies = async function (page = 1) {
  // Set popular movie
  await model.fetchPopularMovies(page);

  // Render popular movies
  model.popularPageChange();
  popularView.render(model.state.popularMovies.renderedMovies);
};

const controlPopularPageChange = async function (page) {
  if (page === 4) {
    setPopularMovies(model.state.popularMovies.fetchPage + 1);
  }
  //Update Page
  await model.popularPageChange(page === 4 ? 1 : page);

  //Render next/prev page btns
  popularPaginationView.render(model.state.popularMovies);

  //Render popular movies
  popularView.render(model.state.popularMovies.renderedMovies);
};

const init = function () {
  setPopularMovies();
  popularPaginationView.render(model.state.popularMovies);
  popularPaginationView.addHandlerChangePage(controlPopularPageChange);
};
init();
