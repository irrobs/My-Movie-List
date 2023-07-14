class popularView {
  #parentElement = document.querySelector(".movies__popular--container");
  #data;

  render(data) {
    this.#data = data;
    console.log(data);

    const markup = data.map((movie) => this.#generateMarkup(movie)).join("");
    this.#clear();
    this.#parentElement.innerHTML = markup;
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup(movie) {
    return `
    <div class="movie__preview">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
      <button class="btn__favorite">
        <ion-icon class="icon" name="bookmark-outline"></ion-icon>
      </button>
      <p class="movie__title">
        ${movie.title}
      </p>
  
      <div class="btn__container">
       <button class="btn__movie btn__later">
         <ion-icon class="icon" name="checkmark-outline"></ion-icon>
       </button>
       <p class="movie__rating">
         <span class="rating__value">${movie.vote_average}</span>
         <ion-icon class="rating__icon" name="star"></ion-icon>
       </p>
       <button class="btn__movie btn__later">
          <ion-icon class="icon" name="time-outline"></ion-icon>
       </button>
      </div>
      <button class="btn__trailer">Trailer</button>
    </div>`;
  }
}

export default new popularView();