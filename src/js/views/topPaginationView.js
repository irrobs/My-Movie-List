import paginationView from "./paginationView";

class topPaginationView extends paginationView {
  _parentElement = document.querySelector(".movies__top");
  _movietopContainer = document.querySelector(".movies__top--container");

  addHandlerSlider(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__list");
      if (!btn) return;

      handler(btn);
    });
  }
}

export default new topPaginationView();
