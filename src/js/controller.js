import * as model from "./model.js";
import popularView from "./views/popularView.js";

const controlPopularMovies = async function () {
  // Set popular moview
  await model.fetchPopularMovies();

  // Render popular movies
  popularView.render(model.state.movies.popular);
};

const init = function () {
  controlPopularMovies();
};
init();

/* const fetchMovies = async function () {
  const search = movieSearchEl.value;
  console.log(search);

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=43699dc7&type=movie&t=${search}`
  );

  const data = await res.json();

  console.log(data);

  const markup = `
  <div class="movie__preview">
    <img src="${data.Poster}" alt="${data.Title} poster">
    <button class="btn__favorite">
      <ion-icon class="icon" name="bookmark-outline"></ion-icon>
    </button>
    <p class="movie__title">
      ${data.Title}
    </p>

    <div class="btn__container">
     <button class="btn__movie btn__later">
       <ion-icon class="icon" name="checkmark-outline"></ion-icon>
     </button>
     <p class="movie__rating">
       <span class="rating__value">${data.imdbRating}</span>
       <ion-icon class="rating__icon" name="star"></ion-icon>
     </p>
     <button class="btn__movie btn__later">
        <ion-icon class="icon" name="time-outline"></ion-icon>
     </button>
    </div>
    <button class="btn__trailer">Trailer</button>
  </div>`;

  movieEl.insertAdjacentHTML("beforeend", markup);
};

btnSearchEl.addEventListener("click", fetchMovies);
 */
