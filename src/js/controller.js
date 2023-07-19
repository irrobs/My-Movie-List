import * as model from "./model.js";
import popularView from "./views/popularView.js";
import topMoviesView from "./views/topMoviesView.js";
import popularPaginationView from "./views/popularPaginationView.js";
import topPaginationView from "./views/topPaginationView.js";

const setPopularMovies = async function (page = 1) {
  try {
    // Set
    await model.fetchPopularMovies(page);
    await model.fetchPopularMovies(page + 1);

    // Render popular movies
    popularView.render(model.state.popularMovies);

    // Render buttons
    popularPaginationView.render(model.state.popularMovies);
  } catch (err) {
    console.error(err);
  }
};

const setTopMovies = async function (page = 1) {
  // Top movies
  await model.fetchTopMovies(page);
  await model.fetchTopMovies(page + 1);

  // Render top movies
  topMoviesView.render(model.state.topMovies);
  topPaginationView.render(model.state.topMovies);
};

const controlPopularSlider = async function (btn) {
  try {
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
  } catch (err) {
    console.error(err);
  }
};
const controlTopSlider = async function (btn) {
  try {
    if (+btn.dataset.page === 0) return;
    //Update view page
    await model.topPageSlider(btn.dataset.page);
    //Change slide
    topPaginationView.slider(btn);
    //Render updated buttons
    topPaginationView.render(model.state.topMovies);

    if (model.state.topMovies.viewPage % 2 === 0) {
      topMoviesView.update();
    }
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  setPopularMovies();
  setTopMovies();
  popularPaginationView.addHandlerSlider(controlPopularSlider);
  topPaginationView.addHandlerSlider(controlTopSlider);
};
init();
