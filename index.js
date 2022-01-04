const pokeUrl = "https://pokeapi.co/api/v2/pokemon";
const cardsDisplay = document.querySelector("#cards");
const pokemonDisplay = document.querySelector("#pokemon-display");
const newReview = document.querySelector("#review-form");
const reviewPosts = document.querySelector("#posted-reviews");

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
    .then((pokemon) => {
      renderDisplay(pokemon);
      getPokemonDescription(pokemonObj);
    });
}

// GET Pokemon Species that contains Description
function getPokemonDescription(pokemonObj) {
  fetch(`${pokeUrl}-species/${pokemonObj.name}`)
    .then((response) => response.json())
    .then((species) => renderPokemonDescription(species));
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

// Scroll To The Top Of The Page
function scrollToTop() {
  const button = document.createElement("img");
  button.className = "card"
  button.id = "pokeball"
  button.src = "https://i.etsystatic.com/19790818/r/il/8267c8/3525798335/il_1588xN.3525798335_gybz.jpg"
  button.addEventListener("click", (e) =>
    cardsDisplay.animate({ scrollTop: 0 }, "fast")
  );
  // button.textContent = "Back to Top";
  cardsDisplay.appendChild(button);
}

function renderDisplay(pokemon) {
  console.log(pokemon);
  // creating single pokemon object
  // grab weight, height, first 4 moves of moves array, types, hp
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const moves = getMoves(pokemon);
  const types = getTypes(pokemon);
  pokemonDisplay.innerHTML = `
            <div>
              <h3><b><u>${name}</u></b></h3>
              <p id="pokemon-description"></p>
            </div>
            <img src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" id="display-image" alt="">
            <p>Type: ${types.join(", ")}
            <p>HP: ${pokemon.stats[0].base_stat}</p>
            <p>Height: ${pokemon.height / 10} m</p>
            <p>Weight: ${pokemon.weight} lbs</p>
            <p>Moves: ${moves.join(", ")}
            
            `;

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

  // mouse-over event to show back_default of pokemon?
}

function renderPokemonDescription(species) {
  const p = document.querySelector("#pokemon-description");
  const desc = species.flavor_text_entries.find(entry => entry.language.name === "en");
  console.log(desc)
  p.textContent = desc.flavor_text;
}

function getMoves(pokemon) {
  const array = [];
  for (let counter = 0; counter < 4; counter++) {
    array.push(pokemon.moves[counter].move.name);
  }
  return array;
}

function getTypes(pokemon) {
  const array = [];
  for (let counter = 0; counter < pokemon.types.length; counter++) {
    array.push(pokemon.types[counter].type.name);
  }
  return array;
}

// ***INITIALIZERS***

getPokemonArray();

// ***EVENT LISTENERS***
// 'submit' - newReview (add a new review of the pokemon selected)
// 'click' - button (when at the bottom of the page, scroll back to the top of the page)
// 'click' - div (when a pokemon container is clicked, render the info at the top of the page)
// 'mouseenter - div (when a pokemon container is mouse-overed, render the sprite.back_default image)
// 'mouseleave - div (when the mouse exits the pokemon container, return the image back to sprite-front_default)
