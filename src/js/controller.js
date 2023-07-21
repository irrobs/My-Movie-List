import * as model from "./model.js";
import popularView from "./views/moviesSliders/popularView.js";
import topMoviesView from "./views/moviesSliders/topMoviesView.js";
import cinemaMoviesView from "./views/moviesSliders/cinemaMoviesView.js";
import popularPaginationView from "./views/paginationViews/popularPaginationView.js";
import topPaginationView from "./views/paginationViews/topPaginationView.js";
import cinemaPaginationView from "./views/paginationViews/cinemaPaginationView.js";
import searchView from "./views/searchView.js";
import searchPagination from "./views/searchPagination.js";

//TODO: SEARCH: Allow to click in button Inicio to get back to the sliders page. Fix data saving after searching for a different query, cleaning the old data and putting and rendering with the new one only. Allow pagination.

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

const setCinemaMovies = async function (page = 1) {
  // cinema movies
  await model.fetchCinemaMovies(page);
  await model.fetchCinemaMovies(page + 1);

  // Render cinema movies
  cinemaMoviesView.render(model.state.cinemaMovies);
  cinemaPaginationView.render(model.state.cinemaMovies);
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

const controlCinemaSlider = async function (btn) {
  try {
    if (+btn.dataset.page === 0) return;
    //Update view page
    await model.cinemaPageSlider(btn.dataset.page);
    //Change slide
    cinemaPaginationView.slider(btn);
    //Render updated buttons
    cinemaPaginationView.render(model.state.cinemaMovies);

    if (model.state.cinemaMovies.viewPage % 2 === 0) {
      cinemaMoviesView.update();
    }
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = async function (query) {
  try {
    if (!query) return;
    await model.fetchSearchedMovies(query);

    searchView.render(model.state.searchedMovies);
    searchPagination.render(model.state.searchedMovies);
  } catch (err) {
    console.error(err);
  }
};

const controlSearchPagination = function (btn) {};

const init = function () {
  setPopularMovies();
  setTopMovies();
  setCinemaMovies();
  popularPaginationView.addHandlerSlider(controlPopularSlider);
  topPaginationView.addHandlerSlider(controlTopSlider);
  cinemaPaginationView.addHandlerSlider(controlCinemaSlider);
  searchView.addHandlerSearch(controlSearch);
  searchPagination.addHandlerPagination(controlSearchPagination);
};
init();

/* const 

btnSearch.addEventListener("click", async function (e) {
  const markup = searchResults.results.map((movie) => render(movie)).join("");
  console.log(markup);
  moviesContainer.classList.toggle("hidden");
  document.querySelector(".movies__searched").classList.toggle("hidden");
  movies.innerHTML = markup;
}); */
