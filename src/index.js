import './style.css';

const key= "AT5J3QEY95FF7MDY8JAR9QXDF";

const form = document.querySelector('form');
const cityInput = document.querySelector('.city');
const submit = document.querySelector('.submit');
const result = document.querySelector('.result');

console.log("what")
submit.addEventListener('click', async (event) => {
    event.preventDefault();

    const city = cityInput.value;

    let Timezone;
    let Temperature;
    let FeelsLike;
    let Humidity;
    let WindSpeed;
    let DewPoint;
    let Pressure;

    let position;

    navigator.geolocation.getCurrentPosition((success) => {
        position = success;
        console.log(position)
    }, 
    
    (error) => {
        console.error(error)
    })







    async function getWeather() {
        
        // const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});

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

    await getWeather();

    
})