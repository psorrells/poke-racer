//Example fetch using pokemonapi.co
document.querySelector('#add-pokemon').addEventListener('click', getFetch)
document.querySelector('#start').addEventListener('click',runPokemon)

let racers = []

const windSpeed = Math.floor(Math.random()*22 - 11)
document.querySelector('#track-info h2').textContent = `Wind Speed: ${windSpeed}`

function getFetch(){
  const poke = document.querySelector('#pokeAdd').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+poke
  let pokeStore = {}
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let pokeObj = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          img: data.sprites.front_shiny
        }

        pokeObj.speed = calculateSpeed(pokeObj)

        racers.push(pokeObj)

        let curPoke = document.createElement('img')
        curPoke.src = pokeObj.img
        curPoke.id = pokeObj.name
        curPoke.style.marginLeft = '0px'
        document.querySelector('.racetrack').appendChild(curPoke)

      })
      .catch(err => {
          console.log(`error ${err}`)
      });   
}


function calculateSpeed(pokemon) {
  let speed = Math.max(0, 10 - ((pokemon.weight/pokemon.height)/16 - 3)**2)
  console.log(`base speed of ${pokemon.name} is ${speed}`)

  let readiness = Math.random() * 5

  console.log(`readiness is ${readiness}`)

  speed += readiness + pokemon.height/(pokemon.weight * (windSpeed == 0 ? 1 : windSpeed)) + windSpeed/pokemon.weight

  console.log(`total speed with wind interference of ${pokemon.name} is ${speed}`)

  return speed

}

//make Pokemon move incrementally based on their speed
function runPokemon() {
  let pokeArray = racers

  //get the time to start fading
  let start = Date.now()

  //create an interval that takes a function and the milliseconds between frames
  let timer = setInterval(function() {
      //how much time has passed from start
      timePassed = Date.now() - start
      
      //draw the animation at the moment time passed
      changeLocation()

      //incrementally change the location of pokemon
      function changeLocation() {
          for (pokemon of pokeArray) {
            let prevValue = parseFloat(document.querySelector(`#${pokemon.name}`).style.marginLeft.replace('px',''))
            let obstacle = -Math.random() * (pokemon.height/2.5 - 4)**2
            console.log(prevValue + ' / ' + obstacle)
            let newValue = pokemon.speed + prevValue + obstacle
            document.querySelector(`#${pokemon.name}`).style.marginLeft = `${newValue}px`
            if (newValue > 1000) {
              document.querySelector('h1').textContent = `${pokemon.name} wins!`
              clearInterval(timer) // finish the animation after someone crosses the finish line
          } 
          } 
      }

  },20)


}
