import paginationView from "./paginationView";

class cinemaPaginationView extends paginationView {
  _parentElement = document.querySelector(".movies__cinema");
  _movieCinemaContainer = document.querySelector(
    ".movies__cinema--container"
  );

  addHandlerSlider(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__list");
      if (!btn) return;

      handler(btn);
    });
  }
}

export default new cinemaPaginationView();
