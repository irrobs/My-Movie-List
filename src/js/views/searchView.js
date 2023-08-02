class searchView {
  #btnSearch = document.querySelector(".btn__search");
  #moviesContainer = document.querySelector(".movies__sliders--container");
  #searchedContainer = document.querySelector(".movies__searched");
  #moviesLists = document.querySelector(".lists__container");
  #movies = document.querySelector(".movies__searched--container");
  #modal = document.querySelector(".modal__trailer");
  #overlay = document.querySelector(".overlay");
  #data;

  addHandlerTrailer(handler) {
    this.#searchedContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__trailer")) return;
      const movieId = e.target.closest(".movie__preview").dataset.id;

      handler(movieId);
    });
  }

  addHandlerCloseModal(handler) {
    this.#modal.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__close--icon")) return;
      handler();
    });
  }

  renderModal(data) {
    this.#clearModal();
    this.#modal.innerHTML = `
    <button class="btn__close">
      <ion-icon class="icon btn__close--icon" name="close-outline"></ion-icon>
    </button>
    <div class="modal__trailer--container">
    <h1 class="heading__primary">Trailer</h1>
    <div class="link__container">
      <a href="${data}" target="_blank" class="trailer__link">Link para o trailer <ion-icon class="icon" name="arrow-forward-outline"></ion-icon></a>
    </div>
    </div>`;
    this.toggleModal();
  }

  #clearModal() {
    this.#modal.innerHTML = "";
  }

  toggleModal() {
    this.#modal.classList.toggle("hidden");
    this.#overlay.classList.toggle("hidden");
    console.log("hi2");
    window.scrollTo(0, 0);
    document.body.style.overflow === "hidden"
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  }

  addHandlerSearch(handler) {
    this.#btnSearch.addEventListener("click", function () {
      const search = document.querySelector(".movie__search--input");
      handler(search.value);
    });

    document.addEventListener("keydown", function (e) {
      const search = document.querySelector(".movie__search--input");
      if (!(e.key === "Enter") || !(document.activeElement === search)) return;
      handler(search.value);
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#data.movies
      .map((movie) => this.#generateMarkup(movie))
      .join("");

    this.#clear();
    this.#movies.insertAdjacentHTML("beforeend", markup);

    if (this.#searchedContainer.classList.contains("hidden")) {
      this.#moviesContainer.classList.add("hidden");
      this.#moviesLists.classList.add("hidden");
      this.#searchedContainer.classList.toggle("hidden");
    }
  }

  #clear() {
    this.#movies.innerHTML = "";
  }

  #getMoviePoster(movie) {
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";
  }

  #generateMarkup = function (movie) {
    return `
    <div class="movie__preview" data-id="${movie.id}" >
      <div class="poster__container">
        <img class='movie__poster' src=${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : ""
        } alt="${movie.title} poster">
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
           <span class="rating__value">${movie.vote_average.toFixed(1)}</span>
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
  };
}

export default new searchView();
