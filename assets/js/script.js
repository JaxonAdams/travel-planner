var flightListEl = document.querySelector("#text-form-id");
var buttonEl = document.getElementById("text-form-submit");
var unorderList = document.getElementById("available-flights");
var weatherDisplay = document.getElementById("weather-display");

// Get flight info, then use results to display data
function getFlightApi(icao) {
    var flightUrl = "https://api.aviationstack.com/v1/flights?access_key=febff7df015fc5038aff1dca8627952a&dep_icao=" + icao + "&limit=10";

    if (icao) {
        fetch(flightUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);

                    displayResults(data, icao);
                })
            }
        })
    }
}

// Display data using flight info
function displayResults(result, airportInput) {

    for(let i = 0; i < result.data.length; i++){
        var listItem = document.createElement("li");
        listItem.classList.add("flight-info");

        if (!airportInput) {
            listItem.textContent = "";
        } else {
            listItem.textContent = "Flight to " + result.data[i].arrival.airport + " :  " + result.data[i].flight.number;   
        }

        unorderList.appendChild(listItem);
    }
}

// Get lat and lon for use in geo api and weather api, then send info to weather api function
function getLatAndLon(location) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + location + "&appid=67c682bdeb2484022f2478f1c184a2f6";

    if (location) {
        fetch(geoUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);

                    var lat = getLat(data);
                    var lon = getLon(data);

                    getWeatherApi(lat, lon, location);

                });
            }
        })
        .catch(function(error) {
            console.log("Unable to connect to our weather API.");
        });
    }
}

function getLat(data) {
    return data.lat;
}

function getLon(data) {
    return data.lon;
}

// Get weather info using lat and lon provided, then send info to display weather function
function getWeatherApi(lat, lon, input) {
    console.log("Getting weather at lat: " + lat + " and lon: " + lon);

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=67c682bdeb2484022f2478f1c184a2f6";

    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var temp = data.current.temp;

                displayWeather(temp, input);
            })
        }
    })
}

// Display weather from info provided by weather api
function displayWeather(weatherData, input) {
    var weatherDataItem = document.createElement("h2");
    weatherDataItem.classList.add("is-size-2", "has-text-centered");

    if (!input) {
        weatherDataItem.textContent = "";
    } else {
        weatherDataItem.textContent = "It is currently " + weatherData + "° F. at the requested location."
    }

    weatherDisplay.appendChild(weatherDataItem);
}

// Form event listener
buttonEl.addEventListener("click",function(event){
    event.preventDefault();
    var airportInput = document.getElementById("text-form-airport").value;
    var zipInput = document.getElementById("text-form-zip").value;
    getFlightApi(airportInput);
    getLatAndLon(zipInput);


});