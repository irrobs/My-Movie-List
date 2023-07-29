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

  addHandlerLater(handler) {
    this.#later.addEventListener("click", function () {
      const listsContainer = document.querySelector(".lists__container");
      if (!listsContainer.classList.contains("hidden")) return;

      listsContainer.innerHTML = ''
      handler(listsContainer);
    });
  }
}

export default new navigationView();
