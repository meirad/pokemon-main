async function getData() {
    const response = await fetch( 'https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    return data.results;
} 

async function getPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let btn = document.getElementById('search-btn');
let input = document.getElementById('name');
let pokelist = document.querySelector('.poke-list');
let datalist = document.getElementById('pokemon-names');
let mainContent = document.querySelector('.main-container'); 

async function displayData() {
    const pokemons = await getData();
    for (let pokemon of pokemons) {
        const pokemonData = await getPokemonData(pokemon.url);

        let option = document.createElement('option');
        option.value = pokemonData.name;
        datalist.appendChild(option);

        let listItem = document.createElement('li');
        listItem.className = 'pokemon-list-item';
 
        let a = document.createElement('a');
        a.href = `./single.html?id=${pokemonData.id}`;
       
        let numberElement = document.createElement('p');
        numberElement.className = 'pokemon-number';

        let imageElement = document.createElement('img');
        imageElement.className = 'pokemon-image';

        let nameElement = document.createElement('p');
        nameElement.className = 'pokemon-name';

        numberElement.innerHTML = `#${pokemonData.id}`;
        imageElement.src = pokemonData.sprites.other.dream_world.front_default;
        nameElement.innerHTML = pokemonData.name;
        a.appendChild(listItem);
        listItem.appendChild(numberElement);
        listItem.appendChild(imageElement);
        listItem.appendChild(nameElement);
        pokelist.appendChild(a);

listItem.dataset.name = pokemonData.id;

listItem.addEventListener('click', async (event) => {
    
    let name = event.currentTarget.dataset.name;

    pokelist.innerHTML = '';
    displaySinglePokemon(); 
});
    }
}


btn.addEventListener('click', async (event) => {
    event.preventDefault();
    let name = input.value;
    const pokemonData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (pokemonData && pokemonData.sprites) {
        pokelist.innerHTML = '';

        let listItem = document.createElement('li');
        listItem.className = 'pokemon-list-item';

                let numberElement = document.createElement('p');
                numberElement.className = 'pokemon-number';

                let imageElement = document.createElement('img');
                imageElement.className = 'pokemon-image';

                let nameElement = document.createElement('p');
                nameElement.className = 'pokemon-name';
        
                let a = document.createElement('a');
                a.href = `./single.html?id=${pokemonData.id}`;
               
                numberElement.innerHTML = `#${pokemonData.id}`;
                imageElement.src = pokemonData.sprites.other.dream_world.front_default;
                nameElement.innerHTML = pokemonData.name;
        
                listItem.dataset.name = pokemonData.id;

                a.appendChild(listItem);
                listItem.appendChild(numberElement);
                listItem.appendChild(imageElement);
                listItem.appendChild(nameElement);
                pokelist.appendChild(a);
                
                listItem.addEventListener('click', async (event) => {
                    mainContent.style.display = 'none';
                    let name = event.currentTarget.dataset.name;
                
                    pokelist.innerHTML = '';
                    displaySinglePokemon(name);
                });
            } 

        if  (name === '') {
            pokelist.innerHTML = '';
            displayData();
            }
        
    });


displayData();
