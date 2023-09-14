const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
  const typeList = pokemon.types.map(
    (type) => `<li class="type ${type}">${type}</li>`
  );
  return `
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="details">
              <ol class="types">
                  ${typeList.join("")}
              </ol>
              <img src="${pokemon.image}" alt="${pokemon.name}">
          </div>
      </li>
  `;
}

async function loadPokemonItems(offset, limit) {
  try {
    const pokemons = await pokeApi.getPokemons(offset, limit);
    const newHTML = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHTML;
  } catch (error) {
    console.error("Error loading Pokémon items:", error);
  }
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItems(offset, limit);
});