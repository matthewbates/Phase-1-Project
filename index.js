// DOM global selectors
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonImage = document.createElement("img");
const pokemonContainer = document.querySelector("#pokemon-container");

// **********************************FETCHES**************************************
// fetch containing array with all pokemon
function getPokemonArray() {
  fetch(pokeUrl + "?limit=151")
    .then((response) => response.json())
    .then(renderArray);
}
// fetch containing pokemon attributes/info
function loadOnePokemon(pokemonObj) {
  fetch(`${pokeUrl}/${pokemonObj.name}`)
    .then((response) => response.json())
    .then(renderArray);
}
// fetch containing pokemon description
function getPokemonDescription(pokemonObj) {
  fetch(`${pokeUrl}-species/${pokemonObj.name}`)
    .then((response) => response.json())
    .then(renderArray);
}

function renderArray(pokeArray) {
  // creating single pokemon object
  const pokemon = {};
  pokemon["name"] = pokeArray.name; // pokemon name
  pokemon["id"] = pokeArray.id; // pokemon no.
  pokemon["image"] = pokeArray.sprites; // pokemon image - how can we grab front_default?
  pokemon["type"] = pokeArray.types // how can we iterate through types array?
  console.log(pokemon);

  // depending on the index provided, this will give us the pokemon name, id, and image from pokemon object
  loadOnePokemon(pokeArray.results[0]);
  // console.log(getPokemonDescription(pokeArray.results[0]));
}

// initializers
getPokemonArray();
