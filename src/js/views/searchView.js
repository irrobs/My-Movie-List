class searchView {
  #btnSearch = document.querySelector(".btn__search");
  #moviesContainer = document.querySelector(".movies__sliders--container");
  #movies = document.querySelector(".movies__searched--container");
  #data;

  addHandlerSearch(handler) {
    this.#btnSearch.addEventListener("click", function () {
      const search = document.querySelector(".movie__search--input");
      handler(search.value);
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#data.movies
      .map((movie) => this.#generateMarkup(movie))
      .join("");
    this.#moviesContainer.classList.toggle("hidden");
    document.querySelector(".movies__searched").classList.toggle("hidden");
    this.#movies.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup = function (movie) {
    return `
    <div class="movie__preview" >
      <div class="poster__container">
        <img class='movie__poster' src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title} poster">
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

export default new searchView();
