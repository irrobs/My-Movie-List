export default class moviesView {
  _data;

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
}
