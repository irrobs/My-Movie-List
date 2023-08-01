import moviesView from "./moviesView.js";

class popularView extends moviesView {
  _parentElement = document.querySelector(".movies__popular--container");
}

export default new popularView();
