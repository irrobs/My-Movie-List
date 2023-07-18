import { MOVIE_LIST_AMOUNT } from "./config.js";
import * as model from "./model.js";
import popularView from "./views/popularView.js";
import popularPaginationView from "./views/popularPaginationView.js";

const setPopularMovies = async function (page = 1) {
  // Set popular movie
  await model.fetchPopularMovies(page);
  await model.fetchPopularMovies(page + 1);

  // Render popular movies
  /* model.setRenderedPopularMovies(page); */
  popularView.render(model.state.popularMovies);

  // Render buttons
  popularPaginationView.render(model.state.popularMovies);
};

const controlSlider = async function (btn) {
  if (+btn.dataset.page === 0) return;
  //Update view page
  await model.popularPageSlider(btn.dataset.page);
  //Change slide
  popularPaginationView.slider(btn);
  //Render updated buttons
  popularPaginationView.render(model.state.popularMovies);

  if (model.state.popularMovies.viewPage % 2 === 0) {
    popularView.update();
  }
};

const init = function () {
  setPopularMovies();
  popularPaginationView.addHandlerSlider(controlSlider);
};
init();
