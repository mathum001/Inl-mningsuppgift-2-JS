
let city = 'London';
let testBtn = document.getElementsByClassName("btn-search");
let testSearch = document.getElementsByClassName("input-search");
let offSet = 3600;
let intervalID;
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");


getCityCoords(city);
testBtn[0].addEventListener("click", () =>{
    getCityCoords(testSearch[0].value);
    clearInterval(intervalID);
})

//Får tag på kordinaterna och kör sedan getweather funktionen
function getCityCoords(name) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=5&appid=3a93b9cdf8529afa9e002d3c5ee7dd58').then(
        function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(function (data) {
                /* console.log(data); */
                getWheather(data[0].lat, data[0].lon);
            });
        }
    )
        .catch(function (err) {
            console.log("fetch Error", err);
        })

}

function getWheather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=b823b4873417423ca400dc5b452e442c&units=metric').then(
        function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data);
                /* clearInterval(intervalID); */
                intervalID = setInterval(clock, 1000, data.timezone);
                /* setInterval(clock, 1000, data.timezone); */
                
            });
        }
    )
        .catch(function (err) {
            console.log("fetch Error :-S", err);
        })
}


 function displayWeather(data){
    document.getElementById("bottom").innerHTML = "";
    let objekt = document.getElementById("bottom");

    let huvudValue = document.createElement("h1");
    huvudValue.innerHTML = data.weather[0].main;
    let bild = document.createElement("IMG");
    bild.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    let stadNamn = document.createElement("h2");
    stadNamn.innerHTML = data.name;
    let grader = document.createElement("h3");
    grader.innerHTML = "Temperatur: " + data.main.temp + "°C";
    let luftTryck = document.createElement("h3");
    luftTryck.innerHTML = "Lufttryck: " + data.main.pressure + "hPa";
    let fuktighet = document.createElement("h3");
    fuktighet.innerHTML = "Fuktighet: " + data.main.humidity + "%";
    let vind = document.createElement("h3");
    vind.innerHTML = "Wind: " + data.wind.speed + "m/s";

    
    objekt.append(huvudValue, bild, stadNamn, grader, luftTryck, fuktighet, vind);
    
    /* return (data.timezone); */


}

/////////Clock below///////

function clock(offSet){
    
    let localTime = new Date();
    let tidZonen = localTime.getTimezoneOffset();
    if(offSet !== 0){
        hours.innerHTML = localTime.getHours() + (tidZonen/60) + (offSet/3600);
    }
    else{
        hours.innerHTML = localTime.getHours();
    }
    minutes.innerHTML = localTime.getMinutes();
    seconds.innerHTML = localTime.getSeconds();

    let spans = document.querySelectorAll('span');///Adds a 0 if the number is < 10
    spans.forEach((span) => {
        if(span.innerHTML.length === 1){
        span.innerHTML = `0${span.innerHTML}`;
        }})
    
   /*  console.log(tidZonen + "   tidszon");
    console.log(offSet + "   offset");
    console.log(localTime); */

    
}



