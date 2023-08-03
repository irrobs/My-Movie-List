import * as model from "./model.js";
import navigationView from "./views/navigationView.js";
import popularView from "./views/moviesSliders/popularView.js";
import topMoviesView from "./views/moviesSliders/topMoviesView.js";
import cinemaMoviesView from "./views/moviesSliders/cinemaMoviesView.js";
import popularPaginationView from "./views/paginationViews/popularPaginationView.js";
import topPaginationView from "./views/paginationViews/topPaginationView.js";
import cinemaPaginationView from "./views/paginationViews/cinemaPaginationView.js";
import searchView from "./views/searchView.js";
import searchPagination from "./views/paginationViews/searchPagination.js";
import movieModalView from "./views/movieModalView.js";
import favoriteView from "./views/favoriteView.js";
import watchedView from "./views/watchedView.js";
import laterView from "./views/laterView.js";
import aboutView from "./views/aboutView.js";

const controlTrailerPopular = async function (movieId) {
  await model.getTrailerData(movieId);

  popularView.renderModal(model.state.movieTrailer);
};

const controlTrailerTop = async function (movieId) {
  await model.getTrailerData(movieId);

  topMoviesView.renderModal(model.state.movieTrailer);
};

const controlTrailerCine = async function (movieId) {
  await model.getTrailerData(movieId);

  cinemaMoviesView.renderModal(model.state.movieTrailer);
};

const controlTrailerSearch = async function (movieId) {
  await model.getTrailerData(movieId);

  searchView.renderModal(model.state.movieTrailer);
};
const controlTrailerFavorite = async function (movieId) {
  await model.getTrailerData(movieId);

  favoriteView.renderModal(model.state.movieTrailer);
};
const controlTrailerLater = async function (movieId) {
  await model.getTrailerData(movieId);

  laterView.renderModal(model.state.movieTrailer);
};
const controlTrailerWatched = async function (movieId) {
  await model.getTrailerData(movieId);

  watchedView.renderModal(model.state.movieTrailer);
};

const controlAddToLists = function (btn, movieId) {
  if (btn.classList.contains("item__favorite")) {
    controlAddToBookmark(movieId);
  }
  if (btn.classList.contains("item__watched")) {
    controlAddToWatched(movieId);
  }
  if (btn.classList.contains("item__later")) {
    controlAddToLater(movieId);
  }
};

const controlBookmark = function () {
  favoriteView.render(model.state.favoriteMovies);
};

const controlAddToBookmark = async function (movieId) {
  try {
    await model.addToFavorite(movieId);
  } catch (err) {
    console.error(err);
  }
};

const controlWatched = function () {
  watchedView.render(model.state.watchedMovies);
};
const controlAddToWatched = async function (movieId) {
  try {
    await model.addToWatched(movieId);
  } catch (err) {
    console.error(err);
  }
};

const controlLater = function () {
  laterView.render(model.state.laterMovies);
};
const controlAbout = function () {
  aboutView.render();
};

const controlAddToLater = async function (movieId) {
  try {
    await model.addToLater(movieId);
  } catch (err) {
    console.error(err);
  }
};

const controlMovieModal = async function (movieID) {
  try {
    await model.fetchMovieByID(movieID);
    movieModalView.render(model.state.movieModal);
    movieModalView.toggleModal();
  } catch (err) {
    console.error(err);
  }
};

const controlCloseModal = function () {
  movieModalView.toggleModal();
};

const controlCloseTrailerModal = function () {
  popularView.toggleModal();
};

const controlHome = function (homeContainer) {
  const moviesSearched = document.querySelector(".movies__searched");
  const moviesLists = document.querySelector(".lists__container");
  homeContainer.classList.toggle("hidden");
  moviesSearched.classList.add("hidden");
  moviesLists.classList.add("hidden");
};

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
  try {
    // Top movies
    await model.fetchTopMovies(page);
    await model.fetchTopMovies(page + 1);

    // Render top movies
    topMoviesView.render(model.state.topMovies);
    topPaginationView.render(model.state.topMovies);
  } catch (err) {
    console.error(err);
  }
};

const setCinemaMovies = async function (page = 1) {
  try {
    // cinema movies
    await model.fetchCinemaMovies(page);
    await model.fetchCinemaMovies(page + 1);

    // Render cinema movies
    cinemaMoviesView.render(model.state.cinemaMovies);
    cinemaPaginationView.render(model.state.cinemaMovies);
  } catch (err) {
    console.error(err);
  }
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

const controlSearchPagination = async function (btn) {
  try {
    //Change viewPage in state
    model.searchPagination(btn);

    //Fetch new page data
    await model.fetchSearchedMovies(
      model.state.searchedMovies.prevQuery,
      model.state.searchedMovies.viewPage
    );

    // render data
    searchView.render(model.state.searchedMovies);
    searchPagination.render(model.state.searchedMovies);

    window.scrollTo(0, 0);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  setPopularMovies();
  setTopMovies();
  setCinemaMovies();

  popularView.addHandlerTrailer(controlTrailerPopular);
  topMoviesView.addHandlerTrailer(controlTrailerTop);
  cinemaMoviesView.addHandlerTrailer(controlTrailerCine);
  searchView.addHandlerTrailer(controlTrailerSearch);
  favoriteView.addHandlerTrailer(controlTrailerFavorite);
  laterView.addHandlerTrailer(controlTrailerLater);
  watchedView.addHandlerTrailer(controlTrailerWatched);

  popularView.addHandlerCloseModal(controlCloseTrailerModal);

  navigationView.addHandlerHome(controlHome);
  popularPaginationView.addHandlerSlider(controlPopularSlider);
  topPaginationView.addHandlerSlider(controlTopSlider);
  cinemaPaginationView.addHandlerSlider(controlCinemaSlider);
  searchView.addHandlerSearch(controlSearch);

  searchPagination.addHandlerPagination(controlSearchPagination);
  movieModalView.addHandlerMovieModal(controlMovieModal);
  movieModalView.addHandlerCloseModal(controlCloseModal);
  movieModalView.addHandlerAddToLists(controlAddToLists);

  navigationView.addHandlerLater(controlLater);

  favoriteView.addHandlerBookmark(controlBookmark);
  favoriteView.addHandlerAddToFavorite(controlAddToBookmark);

  watchedView.addHandlerWatched(controlWatched);
  watchedView.addHandlerAddToWatched(controlAddToWatched);

  laterView.addHandlerLater(controlLater);
  laterView.addHandlerAddTolater(controlAddToLater);

  aboutView.addHandlerAbout(controlAbout);

  navigationView.addHandlerOpenMobileNav();
};
init();
