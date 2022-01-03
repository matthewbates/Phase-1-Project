const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

// DOM global selectors
const cardsDisplay = document.querySelector("#cards");
const pokemonDisplay = document.querySelector("#pokemon-display");

// **********************************FETCHES**************************************

// GET Array of Pokemon
function getPokemonArray() {
  fetch(pokeUrl + "?limit=151")
    .then((response) => response.json())
    .then((arrayOfPokemon) =>
      arrayOfPokemon.results.forEach((pokemon) => renderCard(pokemon))
    );
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

// **********************************FUNCTIONS**************************************

function renderDisplay(pokeArray) {
  // creating single pokemon object
  const pokemon = {};
  pokemon["name"] = pokeArray.name; // pokemon name
  pokemon["id"] = pokeArray.id; // pokemon no.
  pokemon["image"] = pokeArray.sprites; // pokemon image - how can we grab front_default?
  pokemon["type"] = pokeArray.types; // how can we iterate through types array?
  console.log(pokemon);
  pokemonDisplay.innerHTML = `
            <h1>${pokemon.name}</h1>
            <img src="${pokemon.image.other["official-artwork"].front_default}" id="display-image" alt="">
            <p>${pokemon.id}</p>
  `;

  // depending on the index provided, this will give us the pokemon name, id, and image from pokemon object
  // loadOnePokemon(pokeArray.results[0]);
  // console.log(getPokemonDescription(pokeArray.results[0]));
}

function renderCard(pokemon) {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
      <h1>${name}</h1>
  `;
  cardsDisplay.appendChild(div);
}

// **********************************INITIALIZERS**************************************

getPokemonArray();
