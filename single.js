
//function getpokemon(){
document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.href;
    const params = new URLSearchParams(window.location.search);
    const urlid = params.get('id');
    console.log(urlid);
    displaySinglePokemon(urlid);
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');
    const mainBtn = document.querySelector('.main-btn');

    const back = parseInt(urlid) - 1;
    const next = parseInt(urlid) + 1;

    backBtn.addEventListener('click', async () => { 
        backBtn.href = `./single.html?id=${back}`;
    });
    nextBtn.addEventListener('click', async () => {
        nextBtn.href = `./single.html?id=${next}`;
        console.log(nextBtn.href);
    });

    mainBtn.addEventListener('click', async () => {
        mainBtn.href = `./index.html`;
    });
});



async function displaySinglePokemon(urlid){


    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${urlid}`);
    const pokemonData = await response.json();

   
    let pokemonDetails = document.querySelector('.pokemon-details');
    pokemonDetails.style.display = 'flex';


    let speciesResponse = await fetch(pokemonData.species.url);
    let speciesData = await speciesResponse.json();
    let firsthalf = document.querySelector('.first-half');

    let backgroundColor = speciesData.color.name;

    if(speciesData.color.name === 'white'){
        document.documentElement.style.setProperty('--main-color', 'black');
    }else if(speciesData.color.name === 'yellow'){
        document.documentElement.style.setProperty('--main-color', '#c3c362');
    }else{
        document.documentElement.style.setProperty('--main-color', backgroundColor);
    }

    let pokemonId = document.querySelector('.pokemon-id');
    pokemonId.textContent = ` #${pokemonData.id}`; 

    let pokemonImage = document.querySelector('.pokemon-image2');
    pokemonImage.src = pokemonData.sprites.other.dream_world.front_default; 


    let ul = document.querySelector('.pokemon-type');

    for(let i = 0; i < pokemonData.types.length; i++) {
        let pokemonTypelist = document.createElement('li');
        let pokemonType = document.createElement('p');
        pokemonType.className = 'pokemon-type-label';
        

        pokemonType.textContent = pokemonData.types[i].type.name;
    
        pokemonTypelist.appendChild(pokemonType);
        ul.appendChild(pokemonTypelist);
    }
    


    let pokemonHeight = document.querySelector('.pokemon-height');
    pokemonHeight.innerHTML =`${pokemonData.height}m <br> <span>height</span>`; 

    let pokemonWeight = document.querySelector('.pokemon-weight');
    pokemonWeight.innerHTML = `${pokemonData.weight}kg <br><span> weight</span>`;

    let pokemonAbilities = document.querySelector('.pokemon-abilities');
    pokemonAbilities.innerHTML = pokemonData.abilities[0].ability.name ; 

    let pokemonMoves = document.querySelector('.pokemon-moves');
    pokemonMoves.innerHTML = `${pokemonData.moves[0].move.name} <br> <span>move </span> `;

    let pokemonHp = document.querySelector('#hp');
    let pokemonhpnum = document.querySelector('.pokemon-hp-label');
    pokemonhpnum.innerHTML = ` <span class="stats"> HP  </span>|  ${pokemonData.stats[0].base_stat}`;
        pokemonHp.value = pokemonData.stats[0].base_stat; 
/*     pokemonHp.style.backgroundColor = speciesData.color.name;
 */
    let pokemonAttack = document.querySelector('#attack');
    let pokemonattacknum = document.querySelector('.pokemon-attack-label');
    pokemonattacknum.innerHTML = `<span class="stats"> Attack  </span>| ${pokemonData.stats[1].base_stat}`;    pokemonAttack.value = pokemonData.stats[1].base_stat; 

    let pokemonDefense = document.querySelector('#defense');
    let pokemondefensenum = document.querySelector('.pokemon-defense-label');
    pokemondefensenum.innerHTML = ` <span class="stats"> Defense  </span>|${pokemonData.stats[2].base_stat}`;
    pokemonDefense.value = pokemonData.stats[2].base_stat; 

    let pokemonSpeed = document.querySelector('#speed');
    let pokemonSpeednum = document.querySelector('.pokemon-speed-label');
    pokemonSpeednum.innerHTML = `<span class="stats"> Speed </span>| ${pokemonData.stats[5].base_stat}`;
        pokemonSpeed.value = pokemonData.stats[5].base_stat; 


    // Update the elements
    document.querySelector('.pokemon-name').textContent = pokemonData.name; 
    
}

