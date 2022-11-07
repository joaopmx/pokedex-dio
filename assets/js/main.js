
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const limit = 6;
let offset = 0;
const maxRecords = 151;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
       const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <div class="detail">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <ol class="types">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">${pokemon.number}</span>
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </li>       
        `).join('')

       pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit)
    }

})