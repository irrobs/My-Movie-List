class searchPagination {
  _parentElement = document.querySelector(".movies__searched");
  _data;

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__pag");
      if (!btn) return;

      handler(btn);
    });
  }

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    const btnNext = this._parentElement.querySelector(".btn__pag--next");
    const btnPrev = this._parentElement.querySelector(".btn__pag--prev");

    if (!btnNext && !btnPrev) return;
    if (btnNext && !btnPrev) this._parentElement.removeChild(btnNext);
    if (!btnNext && btnPrev) this._parentElement.removeChild(btnPrev);
    if (btnNext && btnPrev) {
      this._parentElement.removeChild(btnNext);
      this._parentElement.removeChild(btnPrev);
    }
  }

  _generateMarkup() {
    const currPage = +this._data.viewPage;
    if (this._data.totalPages <= 3) return "";
    if (this._data.totalPages > 3 && currPage === 1) {
      return `
      <button class="btn__pag--next btn__pag" data-page="${currPage + 1}">
        página ${currPage + 1}
        <ion-icon class="icon__pag" name="arrow-forward-outline"></ion-icon>
      </button>
    `;
    }
    if (
      this._data.totalPages > 3 &&
      currPage !== Math.ceil(this._data.totalPages / 3)
    ) {
      return `
      <button class="btn__pag--prev btn__pag" data-page="${currPage - 1}">
        <ion-icon class="icon__pag" name="arrow-back-outline"></ion-icon>
        ${currPage - 1} página
      </button>
      
      <button class="btn__pag--next btn__pag" data-page="${currPage + 1}">
        página ${currPage + 1}
        <ion-icon class="icon__pag" name="arrow-forward-outline"></ion-icon>
      </button>
    `;
    }
    if (
      this._data.totalPages > 3 &&
      currPage === Math.ceil(this._data.totalPages / 3)
    ) {
      return `
      <button class="btn__pag--prev btn__pag" data-page="${currPage - 1}">
        <ion-icon class="icon__pag" name="arrow-back-outline"></ion-icon>
        ${currPage - 1} página
      </button>
    `;
    }
  }
}

export default new searchPagination();
