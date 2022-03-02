// This is a file we are using to test our APIs. 
// Once I have confirmed the APIs will work for our project, feel free to copy/paste
// into script.js.

// Set the day and time they would like to leave
var startDate = "2022-02-10" // Date will be grabbed from form

// Set Airport
var airportCode = "KSLC" // Code will be grabbed from form

// Declare required URLs for fetch request
var aviationStackUrl = "https://api.aviationstack.com/v1/flights?access_key=f0a2175610404dc341c65c8292828821&flight_date=" + startDate + "&dep_icao=" + airportCode;

// Lat and Lon provided by flight data requested
var weatherUrl = "";

// Fetch Requests
var getFlights = function(url) {
    fetch(url).then(
        response => response.json()
    ).then(
        data => console.log(data)
    );
}

var getArrivalLatAndLon = function(data, url) {
    var arrivalAirport = data.arrival.icao;

    airportUrl = "https://api.aviationstack.com/v1/airports?access_key=f0a2175610404dc341c65c8292828821"

    fetch(airportUrl).then(
        response => response.json()
    ).then(
        function(data) {
            var latAndLon = {
                
            };

            return latAndLon;
        }
    )

}

var getWeather = function(url) {
    fetch(url).then(
        response => response.json()
    ).then(
        data => console.log(data)
    )
}

getFlights(aviationStackUrl);
