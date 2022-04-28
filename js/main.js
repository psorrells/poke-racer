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
  let speed = Math.random() * 5

  speed += pokemon.weight/pokemon.height + pokemon.height/windSpeed + windSpeed/pokemon.weight

  return speed

}

