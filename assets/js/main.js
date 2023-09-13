function convertPokemonToLi(pokemon) {
    const typeList = pokemon.types.map(type => `<li class="type">${type}</li>`)
    return  `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${typeList.join('')}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemons().then(pokemons => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})