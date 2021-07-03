const api = {
    key: "a6739088354df2c812b318a59026ba84",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener(`keypress`, query);

function query(ant) {
    if (ant.keyCode == 13) {
        fetchResults(searchBox.value);
    }
    

    function fetchResults(thaQuery) {
        fetch(`${api.baseurl}weather?q=${thaQuery}&units=metric&appid=${api.key}`)
        .then(weather => {
        console.log(weather);
            return weather.json();
        }).then(results => {
            displayResults(results)
            displayHistory(results)
        });
    }

}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText= `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilding(today);

    let temp = document.querySelector(`.current .temp`);
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

    let weatherElement = document.querySelector(`.current .weather`);
    weatherElement.innerText = weather.weather[0].main;

    let willow = document.querySelector(`.hi-low`);
    willow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilding (d) {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}

function displayHistory (fetchResults) {
 let div = document.createElement("div");
let p = document.createElement("p");
let pTemp = document.createElement("pTemp");
let pWeather = document.createElement("pWeather");
let pHiLow = document.createElement("pHiLow");
let pMain = document.createElement("pMain");
let pMain2 = document.createElement("pMain2");

p.innerText = fetchResults.name;
pTemp.innerText = fetchResults.sys.country;
pWeather.innerText= fetchResults.d;
pHiLow.innerText = fetchResults.weather[0].main;
pMain.innerText = fetchResults.main.temp_min;
pMain2.innerText = fetchResults.main.temp_max;

div.append(p,pTemp,pWeather,pHiLow ,pMain ,pMain2);

document.getElementById("element").appendChild(div);
}

document.getElementById("buttun").addEventListener('click', deleteHistory);

function deleteHistory (displayHistory) {
  let val = document.getElementById("element");
  val.remove();
}

