export default class moviesView {
  _parentElement = document.querySelector(".application__container");
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
    this._parentElement.scrollTo(0, 0);
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

  render(data) {
    this._data = data;
    const markup = this._data.movies
      .map((movie) => this._generateMarkup(movie))
      .join("");
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update() {
    const newMovies = this._data.movies.slice(20 * (+this._data.fetchPage - 1));
    const markup = newMovies
      .map((movie) => this._generateMarkup(movie))
      .join("");
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup(movie) {
    return `
    <div class="movie__preview" data-id="${movie.id}" >
      <div class="poster__container">
        <img class='movie__poster' src="https://image.tmdb.org/t/p/w400${movie.poster_path}" alt="${movie.title} poster">
      </div>


      <button class="btn__favorite" aria-label="Adicionar aos favoritos">
        <ion-icon class="icon icon__favorite" name="bookmark-outline"></ion-icon>
      </button>


      <div class="movie__description">
        <p class="movie__title">
          ${movie.title}
        </p>
        <div class="btn__container">
          <div class='btns__add'>
         <button class="btn__movie btn__watched" aria-label="Adicionar aos assistidos">
           <ion-icon class="icon icon__watched" name="checkmark-outline"></ion-icon>
         </button>
          <p class="movie__rating">
           <span class="rating__value">${movie.vote_average}</span>
           <ion-icon class="rating__icon" name="star"></ion-icon>
          </p>
         <button class="btn__movie btn__later" aria-label="Adicionar a assistir depois">
            <ion-icon class="icon icon__later" name="time-outline"></ion-icon>
         </button>
         </div>
         <button class="btn__trailer">Trailer</button>
        </div>
      </div>
    </div>`;
  }
}
