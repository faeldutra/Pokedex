
const pokemons = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')


const limit = 10
let offset = 0;
const maxRecords = 151


function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon-hover" class="pokemon ${pokemon.type}" onClick="selectPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}" 
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

const selectPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    displaySelectPokemon(pokemon)
}

const displaySelectPokemon = (pokemon) =>{
   
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
 
    const photo = pokemon.sprites.other.dream_world.front_default
    const htmlString = `
        <div id="selectPokemon">
            <div>
                <button class="buttonFechar" onclick="fecharSelectPokemon()">Fechar</button>
            
                <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id.toString().padStart(3,"0")}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>

                <img class="img-stats" src="${photo}" alt="${pokemon.name}">

                <div class="base-stats">
                    <h4>Status</h4>
                        
                    <div class="hability">  
                        <div class="descricao-stats">
                        ${pokemon.stats.map((name_stats) =>`<p>${name_stats.stat.name}</p>`).join('')}
                        </div>
                        <div class="results-stats">
                        ${pokemon.stats.map((base_stats) =>`<p>${base_stats.base_stat}</p>`).join('')}  
                        </div>
                    </div>
                </div>    
                <div class="stats">
                    <div class="stats-bar">
                        <p>Height: ${(pokemon.height/10).toFixed(2)}m</p>
                        <p>Weight: ${(pokemon.weight/10)}kg</p>
                    </div> 
                </div>
            </div>
        </div>
    </li>
    `

    pokemons.innerHTML = htmlString + pokemons.innerHTML
}

const fecharSelectPokemon = () =>{
    const popup = document.getElementById('selectPokemon')
    popup.parentElement.removeChild(popup)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(convertPokemonToLi).join('')
        pokemons.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})