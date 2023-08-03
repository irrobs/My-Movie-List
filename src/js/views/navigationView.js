class navigationView {
  #home = document.querySelector(".home");
  #later = document.querySelector(".later");
  #btnMobileNavEl = document.querySelector(".btn-mobile-nav");

  addHandlerOpenMobileNav() {
    this.#btnMobileNavEl.addEventListener("click", function () {
      const nav = document.querySelector(".navigation");
      console.log(nav);
      nav.classList.toggle("nav-open");
      this.classList.toggle("nav-open");
    });
  }
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

      listsContainer.innerHTML = "";
      handler(listsContainer);
    });
  }
}

export default new navigationView();
