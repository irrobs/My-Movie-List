class movieModalView {
  #parentElement = document.querySelector(".application__container");
  #modal = document.querySelector(".modal");
  #overlay = document.querySelector(".overlay");

  addHandlerMovieModal(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("movie__poster")) return;
      const targetMovie = e.target.closest(".movie__preview").dataset.id;
      handler(targetMovie);
    });
  }

  toggleModal() {
    this.#modal.classList.toggle("hidden");
    this.#overlay.classList.toggle("hidden");
  }
}

export default new movieModalView();
