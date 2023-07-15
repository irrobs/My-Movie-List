class popularPaginationView {
  #parentElement = document.querySelector(".movies__popular");
  #data;

  addHandlerChangePage(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__list");
      if (!btn) return;
      const goTo = +btn.dataset.page;

      handler(goTo);
    });
  }

  render(data) {
    this.#data = data;

    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    const btnNext = document.querySelector(".btn--next");
    const btnPrev = document.querySelector(".btn--prev");
    this.#parentElement.removeChild(btnNext);
    this.#parentElement.removeChild(btnPrev);
  }

  #generateMarkup() {
    const currPage = this.#data.viewPage;
    return `
      <button class="btn--prev btn__list" data-page="${currPage - 1}">
        <ion-icon class="icon" name="chevron-back-outline"></ion-icon>
      </button>
      
      <button class="btn--next btn__list" data-page="${currPage + 1}">
        <ion-icon class="icon" name="chevron-forward-outline"></ion-icon>
      </button>
    `;
  }
}

export default new popularPaginationView();
