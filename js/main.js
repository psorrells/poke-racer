//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

let racers = []

const windSpeed = Math.floor(Math.random()*22 - 11)

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
        document.querySelector('.racetrack').appendChild(curPoke)

      })
      .catch(err => {
          console.log(`error ${err}`)
      });   
}


function calculateSpeed(pokemon) {
  let speed = Math.max(0, 10 - ((pokemon.weight/pokemon.height)/16 - 3)**2)

  let readiness = Math.random() * 5

  speed += readiness + pokemon.height/windSpeed + windSpeed/pokemon.weight

  return speed

}

//make Pokemon move incrementally based on their speed
function runPokemon(pokeArray) {

  //get the time to start fading
  let start = Date.now()

  //create an interval that takes a function and the milliseconds between frames
  let timer = setInterval(function() {
      //how much time has passed from start
      timePassed = Date.now() - start
    for (pokemon of pokeArray) {
      let prevValue = parseFloat(document.querySelector(`${pokemon.name}`).style.marginLeft.value.replace('px',''))
      if (prevValue > 1000) {
          clearInterval(timer) // finish the animation after someone crosses the finish line
      } 
    }
      
      //draw the animation at the moment time passed
      changeLocation()

      //incrementally change the location of pokemon
      function changeLocation() {
          for (pokemon of pokeArray) {
            let prevValue = parseFloat(document.querySelector(`${pokemon.name}`).style.marginLeft.value.replace('px',''))
            console.log(prevValue)
            document.querySelector(`#${pokemon.name}`).style.marginLeft = `${pokemon.speed + prevValue}px`
          } 
      }

  },20)


}
