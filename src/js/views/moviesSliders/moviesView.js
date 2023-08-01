export default class moviesView {
  _parentElement = document.querySelector(".application__container");
  _modal = document.querySelector(".modal");
  _overlay = document.querySelector(".overlay");
  _data;

  addHandlerTrailer(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__trailer")) return;
      const movieId = e.target.closest(".movie__preview").dataset.id;

      handler(movieId);
    });
  }

  closeModal() {
    this._modal.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__close--icon")) return;
      toggleModal();
    });
  }

  renderModal(data) {
    this._clearModal();
    this._modal.innerHTML = `<button class="btn__close">
    <ion-icon class="icon btn__close--icon" name="close-outline"></ion-icon>
  </button><a href="${data}">Trailer Link</a>`;
    this.toggleModal();
  }

  _clearModal() {
    this._modal.innerHTML = "";
  }

  toggleModal() {
    this._modal.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
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
        <img class='movie__poster' src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
      </div>


      <button class="btn__favorite">
        <ion-icon class="icon icon__favorite" name="bookmark-outline"></ion-icon>
      </button>


      <div class="movie__description">
        <p class="movie__title">
          ${movie.title}
        </p>
        <div class="btn__container">
          <div class='btns__add'>
         <button class="btn__movie btn__watched">
           <ion-icon class="icon icon__watched" name="checkmark-outline"></ion-icon>
         </button>
          <p class="movie__rating">
           <span class="rating__value">${movie.vote_average}</span>
           <ion-icon class="rating__icon" name="star"></ion-icon>
          </p>
         <button class="btn__movie btn__later">
            <ion-icon class="icon icon__later" name="time-outline"></ion-icon>
         </button>
         </div>
         <button class="btn__trailer">Trailer</button>
        </div>
      </div>
    </div>`;
  }
}
