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
    const btnNext = this._parentElement.querySelector(".btn--next");
    const btnPrev = this._parentElement.querySelector(".btn--prev");

    if (!btnNext || !btnPrev) return;
    this._parentElement.removeChild(btnNext);
    this._parentElement.removeChild(btnPrev);
  }

  _generateMarkup() {
    const currPage = +this._data.viewPage;
    return `
      <button class="btn__pag--prev btn__pag" data-page="${currPage - 1}">
        <ion-icon class="icon__pag" name="arrow-back-outline"></ion-icon>
       1 página
      </button>
      
      <button class="btn__pag--next btn__pag" data-page="${currPage + 1}">
        página 3
        <ion-icon class="icon__pag" name="arrow-forward-outline"></ion-icon>
      </button>
    `;
  }
}

export default new searchPagination();
