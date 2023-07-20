import paginationView from "./paginationView";

class popularPaginationView extends paginationView {
  _parentElement = document.querySelector(".movies__popular");
  _moviePopularContainer = document.querySelector(
    ".movies__popular--container"
  );

  addHandlerSlider(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__list");
      if (!btn) return;

      handler(btn);
    });
  }
}

export default new popularPaginationView();
