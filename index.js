const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const cardsDisplay = document.querySelector("#cards");
const pokemonDisplay = document.querySelector("#pokemon-display");
const newReview = document.querySelector("#review-form");
const reviewPosts = document.querySelector("#posted-reviews");
const textField = document.querySelector("#text-field");

// ***FETCHES*** //

// GET array of pokemon
function getPokemonArray() {
  fetch(pokeUrl + "?limit=151")
    .then((response) => response.json())
    .then((arrayOfPokemon) => {
      arrayOfPokemon.results.forEach((pokemon) => renderCard(pokemon));
      arrayOfPokemon.results.forEach((pokemon) => loadPokemonCard(pokemon));
      scrollToTop();
    });
}

// GET pokemon image
function loadPokemonCard(pokemonObj) {
  fetch(`${pokeUrl}/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((pokemon) => renderInfo(pokemon));
}

// GET single pokemon details
function loadOnePokemon(pokemonObj) {
  fetch(`${pokeUrl}/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((pokemon) => {
      renderDisplay(pokemon);
      getPokemonDescription(pokemonObj);
    });
}

// GET pokemon description that contains species
function getPokemonDescription(pokemonObj) {
  fetch(`${pokeUrl}-species/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((species) => renderPokemonDescription(species));
}

// ***LISTENERS*** //

// submits a new review
newReview.addEventListener("submit", (e) => {
  e.preventDefault();
  // const p = document.createElement("p");
  const div = document.createElement("div");
  div.className = "new-review";
  div.textContent = e.target["text-field"].value;
  // p.textContent = e.target["text-field"].value;
  reviewPosts.appendChild(div);
  newReview.reset();
});

// ***FUNCTIONS*** //

// scroll to the top of the page
function scrollToTop() {
  const button = document.createElement("img");
  button.className = "card";
  button.id = "pokeball";
  button.src =
    "https://i.etsystatic.com/19790818/r/il/8267c8/3525798335/il_1588xN.3525798335_gybz.jpg";
  button.addEventListener("click", (e) => {
    cardsDisplay.scrollTop = 0;
  });
  cardsDisplay.appendChild(button);
}

// renders pokemon display info @ top of page
function renderDisplay(pokemon) {
  console.log(pokemon);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const moves = getMoves(pokemon);
  const types = getTypes(pokemon);
  pokemonDisplay.style.backgroundImage = `url(assets/${types[0]}.jpeg)`;
  pokemonDisplay.innerHTML = `
            <div>
              <h2><b><u>${name}</u></b></h2>
              <p id="pokemon-description"></p>
            </div>
            <img src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" id="display-image" alt="">
            <p>Type: <b>${types.join(", ")}</b>
            <p>HP: <b>${pokemon.stats[0].base_stat}</b></p>
            <p>Height: <b>${pokemon.height / 10} m</b></p>
            <p>Weight: <b>${pokemon.weight} lbs</b></p>
            <p>Moves: <b>${moves.join(", ")}</b>
            `;
}

// renders pokemon card
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

// renders pokemon card info
function renderInfo(pokemon) {
  const card = document.querySelector(`#${pokemon.name}`);
  const image = document.createElement("img");
  const p = document.createElement("p");
  card.addEventListener("mouseenter", (e) => {
    image.src = pokemon.sprites.back_default;
  });
  card.addEventListener(
    "mouseleave",
    (e) => (image.src = pokemon.sprites.front_default)
  );
  card.classList.add(pokemon.types[0].type.name);
  p.textContent = "No. " + pokemon.id;
  image.className = "card-image";
  image.src = pokemon.sprites.front_default;
  card.appendChild(image);
  card.appendChild(p);
}

// renders pokemon description to english, if not default
function renderPokemonDescription(species) {
  const p = document.querySelector("#pokemon-description");
  const desc = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  console.log(desc);
  p.textContent = desc.flavor_text;
}

// loops through moves and returns first 4
function getMoves(pokemon) {
  const array = [];
  for (let counter = 0; counter < 4; counter++) {
    array.push(pokemon.moves[counter].move.name);
  }
  return array;
}

// loops through types and returns first 2
function getTypes(pokemon) {
  const array = [];
  for (let counter = 0; counter < pokemon.types.length; counter++) {
    array.push(pokemon.types[counter].type.name);
  }
  return array;
}

// ***INITIALIZERS*** //

getPokemonArray();
