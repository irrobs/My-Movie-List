export default class Pagination {
  _data;

  slider() {
    this._parentElement
      .querySelectorAll(".movie__preview")
      .forEach(
        (movie) =>
          (movie.style.transform = `translateX(-${
            this._parentElement.getBoundingClientRect().width *
            (this._data.viewPage - 1)
          }px)`)
      );
  }

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    const btnNext = this._parentElement.querySelector(".btn--next");
    const btnPrev = this._parentElement.querySelector(".btn--prev");

    if (!btnNext || !btnPrev) return;
    this._parentElement.removeChild(btnNext);
    this._parentElement.removeChild(btnPrev);
  }

  _generateMarkup() {
    const currPage = +this._data.viewPage;
    return `
      <button class="btn--prev btn__list" data-page="${
        currPage - 1
      }" aria-label="Página anterior">
        <ion-icon class="icon" name="chevron-back-outline"></ion-icon>
      </button>
      
      <button class="btn--next btn__list" data-page="${
        currPage + 1
      }" aria-label="Próxima página">
        <ion-icon class="icon" name="chevron-forward-outline"></ion-icon>
      </button>
    `;
  }
}
