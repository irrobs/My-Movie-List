import { MOVIE_LIST_AMOUNT } from "./config.js";
import * as model from "./model.js";
import popularView from "./views/popularView.js";
import popularPaginationView from "./views/popularPaginationView.js";

const controlSlider = function (btn) {
  popularPaginationView.slider(btn);
};

const setPopularMovies = async function (page = 1) {
  // Set popular movie
  await model.fetchPopularMovies(page);

  // Render popular movies
  model.setRenderedPopularMovies(page);
  popularView.render(model.state.popularMovies);
};

const controlPopularPageChange = async function (page) {
  if (page === 0 && model.state.popularMovies.fetchPage === 1) return;
  if (page === 4) {
    setPopularMovies(model.state.popularMovies.fetchPage + 1);
  }
  //Update Page
  await model.popularPageChange(page === 4 ? 1 : page);
  //Render next/prev page btns
  popularPaginationView.render(model.state.popularMovies);

  //Render popular movies
  /*  popularView.render(model.state.popularMovies); */
};

const init = function () {
  setPopularMovies();
  controlPopularPageChange();
  popularPaginationView.addHandlerChangePage(controlPopularPageChange);
  popularPaginationView.addHandlerSlider(controlSlider);
};
init();
