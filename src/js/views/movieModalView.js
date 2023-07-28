class movieModalView {
  #parentElement = document.querySelector(".application__container");
  #modal = document.querySelector(".modal");
  #overlay = document.querySelector(".overlay");
  #data;

  addHandlerMovieModal(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("movie__poster")) return;
      const targetMovie = e.target.closest(".movie__preview").dataset.id;
      handler(targetMovie);
    });
  }

  addHandlerCloseModal(handler) {
    this.#modal.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn__close--icon")) return;
      handler();
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup(this.#data.movie);
    this.#clear();
    this.#modal.innerHTML = markup;
  }

  #clear() {
    this.#modal.innerHTML = "";
  }

  toggleModal() {
    this.#modal.classList.toggle("hidden");
    this.#overlay.classList.toggle("hidden");
  }

  #generateMarkup(movie) {
    return `
      <button class="btn__close">
          <ion-icon class="icon btn__close--icon" name="close-outline"></ion-icon>
        </button>
        <div class="movie__modal--container">
        <div class="movie__modal--poster">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title} poster"
          class="movie__modal--img"
        />
        </div>
        <div class="movie__modal--description">
        <h1 class="movie__modal--title">${movie.title}</h1>
        <h2 class="movie__modal--tagline">${movie.tagline}</h2>
        <p class="movie__modal--length">Tempo de filme: ${
          movie.runtime
        } minutos</p>
        <p class="movie__modal--status">Status de lançamento: ${
          movie.status === "Released" ? "Lançado" : "Não Lançado"
        }</p>
        <p class="movie__modal--rating">
          <span class="movie__modal--ratingValue">Avaliação: ${movie.vote_average.toFixed(
            1
          )}</span>
          <ion-icon class="rating__icon" name="star"></ion-icon>
        </p>
        <ul class="movie__modal--genres">${this.#generateGenreTags(
          movie.genres
        )}</ul>
        <ul class="movie__modal--listBtns navigation__items">
            <li class="navigation__item">
              <ion-icon class="icon" name="bookmark-outline"></ion-icon>
              <span>Favoritos</span>
            </li>
            <li class="navigation__item">
              <ion-icon class="icon" name="checkmark-outline"></ion-icon>
              <span>Assistidos</span>
            </li>
            <li class="navigation__item">
              <ion-icon class="icon" name="time-outline"></ion-icon>
              <span>Assistir depois</span>
            </li>
          </ul>
        <div class="movie__modal--overview">
        <p>Sinopse:</p>
        </br>
        ${movie.overview}</div>
        <button class="btn__trailer">Trailer</button>
        </div>
        </div>
    `;
  }

  #generateGenreTags(tags) {
    return tags
      .map((tag) => `<li class="movie__modal--genres-itens"> ${tag.name}</li>`)
      .join("");
  }
}

export default new movieModalView();
