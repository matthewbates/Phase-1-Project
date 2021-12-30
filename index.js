// DOM global selectors
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const pokemonImage = document.createElement("img");
const pokemonContainer = document.querySelector("#pokemon-container");

console.log(pokemonContainer);
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
  // renders the default-front image from sprite property
    // front_default
  console.log(pokeArray.sprites);
  //   console.log(pokeArray.flavor_text_entries[0].flavor_text);
  loadOnePokemon(pokeArray.results[0]);
    console.log(getPokemonDescription(pokeArray.results[0]));

}

// fetch all of the name stats from pokemon page
// fetch the pokemon description from there

// initializers
getPokemonArray();
