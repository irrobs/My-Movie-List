const posterEl = document.querySelector(".movie__preview");

const fetchMovies = async function () {
  const res = await fetch(
    "http://www.omdbapi.com/?apikey=43699dc7&t=Harry+Potter"
  );

  const data = await res.json();
  const poster = data.Poster;

  console.log(res);
  console.log(data);
  console.log(poster);

  const markup = `<img class='movie__poster' src="${poster}" alt="">`;

  posterEl.insertAdjacentHTML("afterbegin", markup);
};

fetchMovies();
