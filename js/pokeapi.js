const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
  try {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return convertPokeApiDetailToPokemon(data);
  } catch (error) {
    console.error(error);
  }
};

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const jsonBody = await response.json();
    const pokemons = await jsonBody.results;
    const detailRequests = await pokemons.map(pokeApi.getPokemonDetail);
    const pokemonsDetails = await Promise.all(detailRequests);
    return pokemonsDetails;
  } catch {
    console.error(error);
  }
};
