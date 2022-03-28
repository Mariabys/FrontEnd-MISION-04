//  Récupérer un pokémon
async function fetchPokemon(index) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const response = await data.json();
    // console.log(response);
    return response;
}

// index de départ et navigation
let indexPokemon = 1;

function changeIndex(index, nav) {
    if (index === 1 && nav === "prev") {
        indexPokemon = 1;
    } else if (index === 151 && nav === "next") {
        indexPokemon = 151;
    } else if (index >= 1 && index <= 151 && nav === "prev") {
        index = index - 1;
    } else if (index >= 1 && index <= 151 && nav === "next") {
        index++;
    }
    console.log("index: " + index);
    return index;
}

function formateIndex(index) {
    if (index < 10) {
        return `#00${index}`;
    } else if (index < 100) {
        return `#0${index}`;
    } else {
        return `#${index}`;
    }
}

// Gestion de la navigation + animation lumière bleue
const blueBtn = document.getElementById("blueBtn");

const prev = document.getElementById("prev");
prev.addEventListener("click", () => {
    indexPokemon = changeIndex(indexPokemon, "prev");
    if (blueBtn.classList.contains("active")) {
        console.log("jai la classe active");
        blueBtn.classList.remove("active");
    }
    updateUI();
});

const next = document.getElementById("next");
next.addEventListener("click", () => {
    indexPokemon = changeIndex(indexPokemon, "next");
    if (blueBtn.classList.contains("active")) {
        console.log("jai la classe active");
        blueBtn.classList.remove("active");
    }
    updateUI();
});

// Gestion de la recherche par index :
const inputIndex = document.getElementById("inputIndex");
const btnJaune = document.getElementById("btnJaune");
inputIndex.addEventListener("input", () => {
    btnJaune.classList.add("active");
});

btnJaune.addEventListener("click", () => {
    btnJaune.classList.remove("active");
    const indexSelected = parseInt(inputIndex.value);
    if (indexSelected < 1 || indexSelected > 151) {
        const name = document.getElementById("name");
        name.textContent = "POKEMON NO ENCONTRADO";
        return;
    } else {
        indexPokemon = indexSelected;
        updateUI();
    }
});

inputIndex.addEventListener("blur", () => {
    btnJaune.classList.remove("active");
});

async function pokemon() {
    // const indexAleat = Math.floor(Math.random() * 151) + 1;
    const pokemonChoix = await fetchPokemon(indexPokemon);

    const getTypes = [...pokemonChoix.types];
    let types = [];
    getTypes.forEach((el) => {
        types.push(el.type.name);
    });
    const typesArray = types;
    types = types.join(" / ");

    const height = `${pokemonChoix.height * 10} cm`;
    const weight = `${pokemonChoix.weight / 10} kg`;

    const formatedIndexPokemon = formateIndex(indexPokemon);

    return {
        index: formatedIndexPokemon,
        name: pokemonChoix.name,
        type: types,
        typesArray: typesArray,
        height: height,
        weight: weight,
        image: pokemonChoix.sprites.front_default,
        region: "Kanto"
    };
}

const updateUI = async function () {
    const data = await pokemon();
    const reponse = await data;

    // DOM
    const name = document.getElementById("name");
    const index = document.getElementById("index");
    const type = document.getElementById("type");
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const image = document.getElementById("image");
    const blueBtn = document.getElementById("blueBtn");
 
    const region = document.getElementById("region");
    const bubble1 = document.getElementById("bubble1");
    const bubble2 = document.getElementById("bubble2");
    

    const colorType = {
        grass: "#2DCD45",
        poison: "#883688",
        fire: "#F08030",
        flying: "#A890F0",
        water: "#4BA2E1",
        bug: "#A8B820",
        normal: "#A8A878",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#94352D",
        psychic: "#FF6996",
        rock: "#B8A038",
        steel: "#B8B8D0",
        ice: "#98D8D8",
        ghost: "#614C83",
        dragon: "#700AEE"
    };


    if (reponse.typesArray.length === 2) {
        bubble1.style.backgroundColor = colorType[reponse.typesArray[0]];
        bubble2.style.backgroundColor = colorType[reponse.typesArray[1]];
    } else if (reponse.typesArray.length === 1) {
        bubble1.style.backgroundColor = colorType[reponse.typesArray[0]];
        bubble2.style.backgroundColor = "transparent";
    }

    name.textContent = reponse.name;
    index.textContent = reponse.index;
    type.textContent = reponse.type;
    height.textContent = reponse.height;
    weight.textContent = reponse.weight;
    region.textContent = reponse.region;
    image.setAttribute("src", reponse.image);


    blueBtn.addEventListener("animationend", () => {
        blueBtn.classList.remove("active");
    });

    blueBtn.classList.add("active");
};

updateUI();

// POKEBALL BTN
const pokeballSocial = document.getElementById("pokeball");
const socialBg = document.getElementById("socialBg");
const socialDiv = document.getElementById("socialDiv");
pokeballSocial.addEventListener("click", () => {
    pokeballSocial.classList.toggle("activePokeball");
    socialBg.classList.toggle("activeSocialBg");
    socialDiv.classList.toggle("activeSocialDiv");
});