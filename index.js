const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const cardsDisplay = document.querySelector("#cards");
const pokemonDisplay = document.querySelector("#pokemon-display");
const newReview = document.querySelector("#review-form");
const reviewPosts = document.querySelector("#posted-reviews");
console.log(reviewPosts);

const pokemonTypes = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  ground: "#E0C068",
  flying: "#A890F0",
  ghost: "#705898",
  rock: "#B8A038",
  fighting: "#C03028",
  poison: "#A040A0",
  psychic: "#F85888",
  bug: "#A8B820",
  dark: "#705848",
  steel: "#B8B8D0",
  dragon: "#7038F8",
};

// ***FETCHES***

// GET Array of Pokemon
function getPokemonArray() {
  fetch(pokeUrl + "?limit=151")
    .then((response) => response.json())
    .then((arrayOfPokemon) => {
      arrayOfPokemon.results.forEach((pokemon) => renderCard(pokemon));
      arrayOfPokemon.results.forEach((pokemon) => loadPokemonCard(pokemon));
      scrollToTop();
    });
}

// Scroll To The Top Of The Page
function scrollToTop() {
  const button = document.createElement("button");
  button.addEventListener("click", (e) =>
    cardsDisplay.animate({ scrollTop: 0 }, "fast")
  );
  button.textContent = "Back to Top";
  cardsDisplay.appendChild(button);
}

// GET Pokemon Image
function loadPokemonCard(pokemonObj) {
  fetch(`${pokeUrl}/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((pokemon) => renderInfo(pokemon));
}

// GET Single Pokemon Details
function loadOnePokemon(pokemonObj) {
  fetch(`${pokeUrl}/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((pokemon) => renderDisplay(pokemon));
}

// GET Pokemon Species that copnstains Description
function getPokemonDescription(pokemonObj) {
  fetch(`${pokeUrl}-species/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((species) => console.log(species));
}

// ***LISTENERS***

newReview.addEventListener("submit", (e) => {
  e.preventDefault();
  const p = document.createElement("p");
  p.textContent = e.target["text-field"].value;
  reviewPosts.appendChild(p);
  newReview.reset();
});

// ***FUNCTIONS***

function renderDisplay(pokemon) {
  // creating single pokemon object
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  pokemonDisplay.innerHTML = `
            <p><b>${name}</b></p>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" id="display-image" alt="">
            <p>${pokemon.id}</p>
            `;
  console.log(pokemon);

  // depending on the index provided, this will give us the pokemon name, id, and image from pokemon object
  // loadOnePokemon(pokeArray.results[0]);
  // console.log(getPokemonDescription(pokeArray.results[0]));
}

function renderCard(pokemon) {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const div = document.createElement("div");
  div.addEventListener("click", (e) => {
    loadOnePokemon(pokemon);
    reviewPosts.innerHTML = "";
  });
  div.className = "card";
  div.id = pokemon.name;
  div.innerHTML = `
      <h1>${name}</h1>
  `;
  cardsDisplay.appendChild(div);
}

function renderInfo(pokemon) {
  const card = document.querySelector(`#${pokemon.name}`);
  const image = document.createElement("img");
  const p = document.createElement("p");
  card.classList.add(pokemon.types[0].type.name);
  p.textContent = "No. " + pokemon.id;
  image.className = "card-image";
  image.src = pokemon.sprites.front_default;
  card.appendChild(image);
  card.appendChild(p);

  // mouse-over event to show back_default of pokemon?
}

// ***INITIALIZERS***

getPokemonArray();
