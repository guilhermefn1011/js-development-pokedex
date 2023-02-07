const pokeEspecificApi = {};
const pokeApi = {};

//função para converter o padrão de dados do pokeApi para um modelo próprio
function convertpokeApiToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;

  const types = pokeDetail.types.map((typeslot) => typeslot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.weight = pokeDetail.weight;
  pokemon.photo = pokeDetail.sprites.front_default;
  pokemon.shiny = pokeDetail.sprites.front_shiny;
  pokemon.stats = pokeDetail.stats;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertpokeApiToPokemon);
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
};

pokeApi.getEspecificPokemon = (i) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  return fetch(url)
    .then((response) => response.json())
    .then(convertpokeApiToPokemon)
    .catch((error) => console.error(error));
};
