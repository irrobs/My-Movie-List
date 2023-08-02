class aboutView {
  #parentElement = document.querySelector(`.lists__container`);
  #moviesContainer = document.querySelector(".movies__sliders--container");
  #moviesSearched = document.querySelector(".movies__searched");
  #about = document.querySelector(".about");

  addHandlerAbout(handler) {
    this.#about.addEventListener("click", function () {
      const listsContainer = document.querySelector(".lists__container");

      handler(listsContainer);
    });
  }

  render() {
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.innerHTML = markup;

    if (this.#parentElement.classList.contains("hidden")) {
      this.#moviesContainer.classList.add("hidden");
      this.#moviesSearched.classList.add("hidden");
      this.#parentElement.classList.toggle("hidden");
    }
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup() {
    return `
    <h1 class="heading__primary">Sobre</h1>
        <div class="about__container">
          <ul class="about__description">
            <li>
              Seja bem vindo ao My Movie List! Este site é um projeto pessoal
              criado principalment com as intenções de testar meus conhecimentos
              com HTML, CSS e JS, e também de criar algo que pudesse ser
              realmente utilizado por alguém.
            </li>
            <li>
              A inspiração dessa idéia veio de site como o IMDB ou Rotten
              Tomatoes, que são sites onde é possível adquirir diversas
              informações sobre filme e séries, porém são sites gringos, então
              pensei "por que não um site brasileiro para isso?" e então começou
              o projeto
            </li>
            <li>
              My Movie List é um site feito para adquirir informações sobres
              filmes atuais, populares, mais bem avaliados, ou qualquer um que
              você queira, e além disso salvar eles em listas de favoritos ou
              para assistir no futuro, como uma forma de agenda pessoal de
              filmes. As listas são salvas utilizando localstorage, ou seja, ela
              é reconhecida no seu navegador.
            </li>
            <li>
              Todas as informações dos filmes utilizadas foram através da
              utilização da TMDB API.
            </li>
          </ul>
          <div class="api__attribution" >
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="Logo TMDB" width="96" height="40"/>
            "This product uses the TMDB API but is not endorsed or certified by
            TMDB."
          </div>
        </div>
    `;
  }
}

export default new aboutView();
