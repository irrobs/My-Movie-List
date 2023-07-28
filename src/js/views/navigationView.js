class navigationView {
  #home = document.querySelector(".home");

  #watched = document.querySelector(".watched");
  #later = document.querySelector(".later");

  addHandlerHome(handler) {
    this.#home.addEventListener("click", function () {
      const homeContainer = document.querySelector(
        ".movies__sliders--container"
      );
      if (!homeContainer.classList.contains("hidden")) return;

      handler(homeContainer);
    });
  }

  addHandlerWatched(handler) {
    this.#watched.addEventListener("click", function () {
      const listsContainer = document.querySelector(".lists__container");
      if (!listsContainer.classList.contains("hidden")) return;

      handler(listsContainer);
    });
  }
  addHandlerLater(handler) {
    this.#later.addEventListener("click", function () {
      const listsContainer = document.querySelector(".lists__container");
      if (!listsContainer.classList.contains("hidden")) return;

      handler(listsContainer);
    });
  }
}

export default new navigationView();
