
let city = 'London';
let testBtn = document.getElementsByClassName("btn-search");
let testSearch = document.getElementsByClassName("input-search");

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
            console.log("fetch Error :-S", err);
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
                console.log(data)
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

    let stadNamn = document.createElement("h2");
    stadNamn.innerHTML = data.name;
    let grader = document.createElement("h3");
    grader.innerHTML = "Temperatur: " + data.main.temp;

    objekt.append(stadNamn, grader);
    


}