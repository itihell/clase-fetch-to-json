const listPokemons = document.getElementById("list-pokemon");

//TODO: Funcion para traer todos los pokemon desde el api
const getPokemons = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching pokemons:", error));
};

const renderPokemons = (pokemons) => {
  listPokemons.innerHTML = "";
  let html = "";
  pokemons.results.forEach((pokemon) => {
    html += `<div class="card">
                <div class="margin-10">
                  <span onclick="openPokemon(${pokemon.name})">
                    <h3>${pokemon.name}</h3>
                  </span>
                </div>
              </div>`;
  });
  listPokemons.innerHTML = html;
};

const openPokemons = async () => {
  const pokemons = await getPokemons();
  renderPokemons(pokemons);
};
openPokemons();
