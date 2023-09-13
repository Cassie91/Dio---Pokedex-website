const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertPokeApiDetailToPokemon)
            .catch(error => console.error(error))
}

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const jsonBody = await response.json();
  	const pokemons = await jsonBody.results;
    const detailRequests = await pokemons.map(pokeApi.getPokemonDetail);
    const pokemonsDetails = await Promise.all(detailRequests)
    return pokemonsDetails;
}