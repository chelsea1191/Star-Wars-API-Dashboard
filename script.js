let filmsAPI = "http://star-cors.herokuapp.com/films"
let peopleAPI = "http://star-cors.herokuapp.com/people"
let starshipsAPI = "http://star-cors.herokuapp.com/starships"
let vehiclesAPI = "http://star-cors.herokuapp.com/vehicles"
let allUls = document.querySelectorAll("ul"); //people is 0, films is 1, starships is 2, vehicles is 3
let countsArray = [];

Promise.all([filmsAPI, peopleAPI, starshipsAPI, vehiclesAPI].map(eachUrl => fetch(eachUrl).then(result => result.json()))).then(data => {
  let films = data[0].results
  let people = data[1].results
  let starships =  data[2].results
  let vehicles = data[3].results
  // data.forEach((count) => {
  //   let displayCount = document.createElement("p");
  //   displayCount.innerHTML = `Viewing ${count.results.length} of ${count.count} results`
  //   allUls[data.indexOf(count)].appendChild(displayCount)
  //   countsArray.push(count.count);
  //    });
 films.forEach((film) => {
   let title = film.title
   let date = film.release_date
   let newElement = document.createElement("div")
   newElement.innerHTML += `<div class="items"><div class='searchParams'><b>` + title + `</b></div><p>Released on: ` + date + `</p></div>`
   allUls[1].appendChild(newElement)
 })
 people.forEach((person) => {
   let name = person.name
   let filmCount = person.films.length
   let newElement = document.createElement("div")
   newElement.innerHTML += `<div class="items"><div class='searchParams'><b>` + name + `</b></div><p>Appears in: ` + filmCount + ` films</p></div>`
  allUls[0].appendChild(newElement)
 })
 starships.forEach((ship) => {
   let name = ship.name;
   let shipClass = ship.starship_class;
   let newElement = document.createElement("div")
   newElement.innerHTML += `<div class="items"><div class="searchParams"><b>` + name + `</b></div><p>` + shipClass + `</p></div>`
   allUls[2].appendChild(newElement)
 })
vehicles.forEach((vehicle) => {
  let name = vehicle.name
  let manu = vehicle.manufacturer
  let newElement = document.createElement("div")
  newElement.innerHTML += `<div class="items"><div class="searchParams"><b>` + name + `</b></div><p>Manufactured by: ` + manu + `</p></div>`
  allUls[3].appendChild(newElement)
})
})

function search (id, inputId) {
  const input = document.getElementById(inputId)
  filter = input.value.toUpperCase()
  let ul = document.getElementById(id);
  let searchParams = ul.getElementsByClassName("searchParams");
  let dataCard = ul.getElementsByClassName("items")
  for (let i = 0; i < searchParams.length; i++) {
    let titles = searchParams[i].innerText.toUpperCase()
    if (titles.includes(filter)) {
      dataCard[i].style.display = "";
    } else {
      dataCard[i].style.display = "none"
    }
  }
}
let peopleIterator = 1
let starshipsIterator  = 1
let vehiclesIterator = 1

async function loadMore (type) {
  if (type === "people") {
    peopleIterator++
    axios.get(peopleAPI + "/?page=" + peopleIterator).then(result => {
      let data = result.data.results
      data.forEach((person)=>{
        let name = person.name
   let filmCount = person.films.length
   let newElement = document.createElement("div")
   newElement.innerHTML += `<div class="items"><div class='searchParams'><b>` + name + `</b></div><p>Appears in: ` + filmCount + ` films</p></div>`
  allUls[0].appendChild(newElement)
      })
    }
    ).catch(error => {
      alert("no more data!")
    })
  }
  if (type === "starships") {
    starshipsIterator++
    axios.get(starshipsAPI + "/?page=" + starshipsIterator).then(result => {
      let data = result.data.results
      data.forEach((ship)=>{
        let name = ship.name;
        let shipClass = ship.starship_class;
        let newElement = document.createElement("div")
        newElement.innerHTML += `<div class="items"><div class="searchParams"><b>` + name + `</b></div><p>` + shipClass + `</p></div>`
        allUls[2].appendChild(newElement)
      })
    }
    ).catch(error => {
      alert("austin has big weiner")
    })
  }
  if (type === "vehicles") {
    vehiclesIterator++
    axios.get(vehiclesAPI + "/?page=" + vehiclesIterator).then(result => {
      let data = result.data.results
      data.forEach((vehicle)=>{
        let name = vehicle.name
        let manu = vehicle.manufacturer
        let newElement = document.createElement("div")
        newElement.innerHTML += `<div class="items"><div class="searchParams"><b>` + name + `</b></div><p>Manufactured by: ` + manu + `</p></div>`
        allUls[3].appendChild(newElement)
      })
    }
    ).catch(error => {
      alert("no more data!")
    })
  }
}
