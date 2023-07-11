const posterEl = document.querySelector(".poster");

const fetchMovies = async function () {
  const res = await fetch(
    "http://www.omdbapi.com/?apikey=43699dc7&t=Harry+Potter"
  );

  const data = await res.json();
  const poster = data.Poster;

  console.log(res);
  console.log(data);
  console.log(poster);

  posterEl.innerHTML = `<img src="${poster}" alt="">`;
};

fetchMovies();
