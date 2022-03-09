// This is a file we are using to test our APIs.

// Set the day and time they would like to leave
var startDate = "2022-02-10" // Date will be grabbed from form

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

// MOck api call for testing
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

var getWeather = function(url) {
    fetch(url).then(
        response => response.json()
    ).then(
        data => console.log(data)
    )
}

var getWeatherFake = function(data) {
    console.log(data.main.temp + '° F.');

    return data.main.temp;
}







// getArrivalLatAndLon();



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
}

// Mock Data for Fake API Calls
var mockDataAirport = {
    lat: 34.0901,
    lon: -118.4065
}

var mockDataWeather = {
    main: {
        temp: 80
    }
}

// Mock API call
getFlightsFake(mockDataFlights);

// Mock API call
getArrivalLatAndLonFake(mockDataAirport, 84005);

// Mock API call
getWeatherFake(mockDataWeather);