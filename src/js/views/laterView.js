import movieListsView from "./movieListsView.js";

class laterView extends movieListsView {
  #moviesContainer = document.querySelector(".movies__sliders--container");
  #moviesSearched = document.querySelector(".movies__searched");
  #applicationContainer = document.querySelector(".application__container");
  #later = document.querySelector(".later");
  #data;

  addHandlerAddTolater(handler) {
    this.#applicationContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("icon__later")) return;
      if (document.querySelector(".modal").classList.contains("hidden")) {
        const targetMovie = e.target.closest(".movie__preview").dataset.id;

        handler(targetMovie);
      }
    });
  }

  addHandlerLater(handler) {
    this.#later.addEventListener("click", function () {
      const listsContainer = document.querySelector(".lists__container");

      handler(listsContainer);
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#data
      .map((movie) => this.#generateMarkup(movie))
      .join("");

    this.#clear();
    this._parentElement.innerHTML = `<h1 class="heading__primary">Assistir depois</h1><div class='lists__description--container' >${markup}</div>`;

    if (this._parentElement.classList.contains("hidden")) {
      this.#moviesContainer.classList.add("hidden");
      this.#moviesSearched.classList.add("hidden");
      this._parentElement.classList.toggle("hidden");
    }
  }

  #clear() {
    this._parentElement.innerHTML = "";
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
        <ion-icon class="icon" name="bookmark-outline"></ion-icon>
      </button>
  
  
      <div class="movie__description">
        <p class="movie__title">
          ${movie.title}
        </p>
        <div class="btn__container">
          <div class='btns__add'>
         <button class="btn__movie btn__later">
           <ion-icon class="icon" name="checkmark-outline"></ion-icon>
         </button>
          <p class="movie__rating">
           <span class="rating__value">${movie.vote_average.toFixed(1)}</span>
           <ion-icon class="rating__icon" name="star"></ion-icon>
          </p>
         <button class="btn__movie btn__later">
            <ion-icon class="icon" name="time-outline"></ion-icon>
         </button>
         </div>
         <button class="btn__trailer">Trailer</button>
        </div>
      </div>
    </div>`;
  };
}

export default new laterView();
