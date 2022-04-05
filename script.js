// Variables globales para traerme los elementos del html con los que trabajare
const container = document.querySelector("#container")
const spinner = document.querySelector("#spinner")
const inputText = document.querySelector("#nombrePoke")
const btn = document.querySelector("#boton")

// Variable dinamica, inicialmente vacia, para capturar el valor ingresado por el usuario y pasarselo al fetch
let pokemon = ""

// Meto mi fetch en una funcion para poder utilizarlo y ejecutarlo cuando yo necesito
const getPokemon = () => {
    // Fetch con mi URL BASE concatenando la variable de lo que ingresa el usuario
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        // La respuesta se recibe en el primer then() y la parseo con .json()
        .then(response => response.json())
        // Luego recibo la data y se la paso a mi funcion que va a renderizarla en pantalla
        .then(data => createCard(data))
        // En caso que la peticion falle, recibo el error en el catch() para ejecutar una funcion de error
        .catch(error => error404())
}

// Funcion utilizada en el catch() de mi peticion, para mostrarle un mensaje al usuario de que escribio mal
const error404 = () => {
    container.innerHTML = `<div class="alert alert-danger" role="alert">
    Has escrito mal el nombre del pokemon
  </div>`
}

// Esta funcion captura lo que el usuario ingresa en el input/
const searchPokemon = () => {
    // Muestro el spinner que inicialmente tiene un display none
    spinner.style.display = "block"
    // Capturo lo que el usuario ingresa en el input y lo guardo en mi variable que se usa en el fetch
    pokemon = inputText.value
    // Este setTimeout hace que la peticion se ejecute luego de 2 segundos, permitiendo que se vea el spinner y luego se renderiza la card
    setTimeout(() => {
        getPokemon()
    },2000)
}

// Evento que ejecuta mi funcion de searchPokemon, que es la que hace la magia del spinner y capturar lo que el usuario ingresa
btn.addEventListener("click", searchPokemon)

// Esta funcion solo recibe los datos del fetch en el 2do then() y renderiza los mismos
const createCard = (pokemon) => {
    // Hago destructuring para tomar solo los valores que me interesan
    const { stats, name, sprites: { front_default } } = pokemon
    // Genero la card con esos datos usando template strings y pasandole las propiedades que destructure
    container.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${front_default}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"><b>${stats[0].stat.name}:</b> ${stats[0].base_stat}</p>
            <p class="card-text"><b>${stats[1].stat.name}:</b> ${stats[1].base_stat}</p>
            <p class="card-text"><b>${stats[2].stat.name}:</b> ${stats[2].base_stat}</p>
            </div>
        </div>`
}