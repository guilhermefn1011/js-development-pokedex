const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonDetails = document.getElementById("pokemonDetails");
const shinyButton = document.getElementById("shinyButton");

const limit = 12;
var offset = 0;

//Realizando o get das informações dos pokemons e chamando a função convertPokemon para cara pokemon.
//Convertendo assim os dados dos pokemons em um item da lista html
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `
              <li id="teste" class="pokemon ${
                pokemon.type
              }" onclick="openDetails(${pokemon.number})">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
          
                    <div class="detail">
                      <ol class="types">
                          ${pokemon.types
                            .map(
                              (type) => `<li class="type ${type}">${type}</li>`
                            )
                            .join("")}
                      </ol>
                      <img
                        src=${pokemon.photo}
                        alt="${pokemon.name}"
                      />
                    </div>
              </li>
          `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

//função para carregar mais itens
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});

//função para criar a janela com informações do pokemon
function openDetails(i) {
  pokeApi.getEspecificPokemon(i).then((pokemon) => {
    const pokeDetailHtml = `
    <div class="pokeDetails">
      <button id="closeDetails" onclick="closeDetails()">
      X
      </button>
      <h1 class="pokeDetailName">${pokemon.name}</h1>
    
      <img id="pokeDetailPhoto" src="${pokemon.photo}" alt="${pokemon.name} Image" onclick="changeImage('${pokemon.shiny}', '${pokemon.photo}')">
  
      <p>Weight: ${pokemon.weight}</p>
  
      <ol class="stats">
        <li class="stat">${pokemon.stats[0].stat.name} : ${pokemon.stats[0].base_stat}</li>
        <li class="stat">${pokemon.stats[1].stat.name} : ${pokemon.stats[1].base_stat}</li>
        <li class="stat">${pokemon.stats[2].stat.name} : ${pokemon.stats[2].base_stat}</li>
        <li class="stat">${pokemon.stats[3].stat.name} : ${pokemon.stats[3].base_stat}</li>
        <li class="stat">${pokemon.stats[4].stat.name} : ${pokemon.stats[4].base_stat}</li>
        <li class="stat">${pokemon.stats[5].stat.name} : ${pokemon.stats[5].base_stat}</li>
      </ol>
    </div>
    `;

    pokemonDetails.innerHTML = pokeDetailHtml;

    pokemonDetails.style.display = "inline";
  });
}

//função para fechar a janela de detalhes do pokemon
function closeDetails() {
  pokemonDetails.style.display = "none";
}

function changeImage(urlShiny, urlNormal) {
  if (pokeDetailPhoto.src == urlNormal) {
    pokeDetailPhoto.src = urlShiny;
  } else {
    pokeDetailPhoto.src = urlNormal;
  }
}
