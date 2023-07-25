class navigationView {
  #home = document.querySelector(".home");

  addHandlerHome(handler) {
    this.#home.addEventListener("click", function () {
      const homeContainer = document.querySelector(
        ".movies__sliders--container"
      );
      if (!homeContainer.classList.contains("hidden")) return;

      handler(homeContainer);
    });
  }
}

export default new navigationView();
