import './style.css';

const key= "AT5J3QEY95FF7MDY8JAR9QXDF";

const form = document.querySelector('form');
const cityInput = document.querySelector('.city');
const submit = document.querySelector('.submit');
const result = document.querySelector('.result');

console.log("what")

let Timezone;
let Temperature;
let FeelsLike;
let Humidity;
let WindSpeed;
let DewPoint;
let Pressure;

const obj = {
    "place_id": 298062177,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 396509,
    "lat": "34.8253019",
    "lon": "-116.0833144",
    "class": "boundary",
    "type": "administrative",
    "place_rank": 12,
    "importance": 0.6062067831569095,
    "addresstype": "county",
    "name": "San Bernardino County",
    "display_name": "San Bernardino County, California, United States",
    "address": {
        "county": "San Bernardino County",
        "state": "California",
        "ISO3166-2-lvl4": "US-CA",
        "country": "United States",
        "country_code": "us"
    },
    "boundingbox": [
        "33.8709844",
        "35.8092552",
        "-117.8025491",
        "-114.1307816"
    ]
}

function getAutoLocation() {
    let position;

    navigator.geolocation.getCurrentPosition((success) => {
        position = success;
        console.log(position)

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getAutoCityName(latitude, longitude);
        console.log(latitude, longitude);

    },

    (error) => {
        console.error(error)
    })
};

async function getAutoCityName(latitude, longitude ) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

    const data = await response.json();

    console.log(data)

    const address = data.display_name;
    console.log(address)

    await getWeather(address)
}

getAutoLocation();


submit.addEventListener('click', async (event) => {
    event.preventDefault();

    await getWeather(cityInput.value);

});

async function getWeather(city) {
    
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});

    const wetherData = await response.json();
    console.log(wetherData)

    Timezone = wetherData.timezone;
    Temperature = wetherData.currentConditions.temp;
    FeelsLike = wetherData.currentConditions.feelslike;
    Humidity = wetherData.currentConditions.humidity;
    WindSpeed = wetherData.currentConditions.windspeed;
    DewPoint = wetherData.currentConditions.dew;
    Pressure = wetherData.currentConditions.pressure;
    
    render();
}

function render() {
    result.innerHTML = ""

    result.innerHTML = `

    <h1>Timezone: ${Timezone}</h1>
    <h1>Temperature: ${Temperature}</h1>
    <h1>Feels like: ${FeelsLike}</h1>
    <h1>Humidity: ${Humidity}</h1>
    <h1>Wind Speed: ${WindSpeed}</h1>
    <h1>Dew Point: ${DewPoint}</h1>
    <h1>Pressure: ${Pressure}</h1>
`
}