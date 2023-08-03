export default class movieListsView {
  _parentElement = document.querySelector(`.lists__container`);
  _modal = document.querySelector(".modal__trailer");
  _overlay = document.querySelector(".overlay");
  _data;

  addHandlerTrailer(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__trailer")) return;
      const movieId = e.target.closest(".movie__preview").dataset.id;

      handler(movieId);
    });
  }

  addHandlerCloseModal(handler) {
    this._modal.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__close--icon")) return;
      handler();
    });
  }

  renderModal(data) {
    this._clearModal();
    this._modal.innerHTML = `
    <button class="btn__close">
      <ion-icon class="icon btn__close--icon" name="close-outline"></ion-icon>
    </button>
    <div class="modal__trailer--container">
    <h1 class="heading__primary">Trailer</h1>
    <div class="link__container">
      <a href="${data}" target="_blank" class="trailer__link">Link para o trailer <ion-icon class="icon" name="arrow-forward-outline"></ion-icon></a>
    </div>
    </div>`;
    window.scrollTo(0, 0);
    this.toggleModal();
  }

  _clearModal() {
    this._modal.innerHTML = "";
  }

  toggleModal() {
    this._modal.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");

    window.scrollTo(0, 0);
    document.body.style.overflow === "hidden"
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  }
}
