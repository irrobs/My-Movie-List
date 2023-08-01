import moviesView from "./moviesView.js";

class cinemaMoviesView extends moviesView {
  _parentElement = document.querySelector(".movies__cinema--container");
}

export default new cinemaMoviesView();
