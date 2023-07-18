class popularPaginationView {
  #parentElement = document.querySelector(".movies__popular");
  #moviePopularContainer = document.querySelector(
    ".movies__popular--container"
  );
  #data;

  addHandlerSlider(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__list");
      if (!btn) return;

      handler(btn);
    });
  }

  slider(btn) {
    document.querySelectorAll(".movie__preview").forEach(
      (movie) =>
        (movie.style.transform = `translateX(-${
          //TODO: Get the right calculation to work on every screen size
          /* (this.#parentElement.getBoundingClientRect().width +
              +window
                .getComputedStyle(this.#moviePopularContainer)
                .getPropertyValue("gap")
                .slice(0, 2)) *
            (this.#data.viewPage - 1) */
          1484 * (this.#data.viewPage - 1)
        }px)`)
    );
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

    if (!btnNext || !btnPrev) return;
    this.#parentElement.removeChild(btnNext);
    this.#parentElement.removeChild(btnPrev);
  }

  #generateMarkup() {
    const currPage = +this.#data.viewPage;
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
