var flightListEl = document.querySelector("#text-form-id");
var buttonEl = document.getElementById("text-form-submit");
var unorderList = document.getElementById("available-flights");
var weatherDisplay = document.getElementById("weather-display");

console.log(flightListEl);

//nothing is typed in text box 

// Mock Data for Fake API Calls
var mockDataFlights = {
    data: [
        {
            arrival: {
                airport: 'Los Angeles',
                icao: 'KLAX'
            },
            flight: {
                number: '12345',
            }
        },
        {
            arrival: {
                airport: 'Las Vegas',
                icao: 'KLVS'
            },
            flight: {
                number: '54321',
            }
        },
        {
            arrival: {
                airport: 'Frankfurt',
                icao: 'EDFH'
            },
            flight: {
                number: '12543',
            }
        },
        {
            arrival: {
                airport: 'London',
                icao: 'EGGW'
            },
            flight: {
                number: '54123',
            }
        },
    ]
};

function getFlightApi(icao) {
    var flightUrl = "http://api.aviationstack.com/v1/flights?access_key=febff7df015fc5038aff1dca8627952a&dep_icao=" + icao + "&limit=10";

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

// Get lat and lon

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

buttonEl.addEventListener("click",function(event){
    event.preventDefault();
    var airportInput = document.getElementById("text-form-airport").value;
    var zipInput = document.getElementById("text-form-zip").value;
    getFlightApi(airportInput);
    getLatAndLon(zipInput);


});



// This is a file we are using to test our APIs.

// Get the current day
var startDate = moment().format("YYYY-MM-DD");

// Set Airport
var airportCode = "KSLC" // Code will be grabbed from form

// Declare required URLs for fetch request
var aviationStackUrl = "http://api.aviationstack.com/v1/flights?access_key=febff7df015fc5038aff1dca8627952a&dep_icao=" + airportCode + "&limit=10";

// Lat and Lon provided by flight data requested
var weatherUrl = "";

// Fetch Requests
var getFlights = function(url) {
    fetch(url).then(
        response => response.json()
    ).then(
        function(data) {
            for(let i = 0; i < data.data.length; i++) {
                console.log(data.data[i].arrival.airport);
                console.log(data.data[i].flight.number);
            }
        }
    );
}

// Mock api call for testing
var getFlightsFake = function(data) {

    var displayData = data => {
        for(let i = 0; i < data.data.length; i++) {
            console.log(data.data[i].arrival.airport);
            console.log(data.data[i].flight.number);
        }
    }

    return displayData(data);
}

// Note: Fix to use gathered zip code
var getArrivalLatAndLon = function(data, zip) {
    var arrivalAirport = data.arrival.icao;

    airportUrl = "http://api.aviationstack.com/v1/airports?access_key=febff7df015fc5038aff1dca8627952a"

    fetch(airportUrl).then(
        response => response.json()
    ).then(
        function(data) {
            var latAndLon = {
                lat: data.data[0].latitude,
                lon: data.data[0].longitude
            };

            console.log(latAndLon);

            return latAndLon;
        }
    )

}

// Mock api call for testing
var getArrivalLatAndLonFake = function(data, zip) {

    var getLatAndLonFake = data => {
        var latAndLonFake = {
            lat: data.lat,
            lon: data.lon
        }

        return latAndLonFake;
    }

    console.log(getLatAndLonFake(data));

    return getLatAndLonFake(data);
}

var getWeatherFake = function(data) {
    console.log(data.main.temp + '° F.');

    return data.main.temp;
}







// getArrivalLatAndLon();