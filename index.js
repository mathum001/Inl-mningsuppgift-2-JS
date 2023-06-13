
let city = 'London';
let testBtn = document.getElementsByClassName("btn-search");
let testSearch = document.getElementsByClassName("input-search");
let offSet = 0;
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");


getCityCoords(city);
testBtn[0].addEventListener("click", () =>{
    getCityCoords(testSearch[0].value);
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
                console.log(data);
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
    /* let tid = document.createElement("h2");///TIDEN
    tid.innerHTML = (new Date(data.dt*1000-(data.timezone*1000))); */
    offSet = data.timezone;
    setInterval(clock(offSet), 1000);

    objekt.append(huvudValue, bild, stadNamn, grader, luftTryck, fuktighet, vind);
    


}

/////////Clock below///////

function clock(data){
    
    let localTime = new Date();
    let tidZonen = localTime.getTimezoneOffset();
    hours.innerHTML = localTime.getHours() + (tidZonen/60) + (data/3600);
    minutes.innerHTML = localTime.getMinutes();
    seconds.innerHTML = localTime.getSeconds();
    
    console.log(tidZonen);
    console.log(data);
    console.log(localTime);
}



