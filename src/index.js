import './style.css';

const key= "AT5J3QEY95FF7MDY8JAR9QXDF";

const form = document.querySelector('form');
const cityInput = document.querySelector('.city');
const submit = document.querySelector('.submit');
const result = document.querySelector('.result');
const changeUnit = document.querySelector('.changeUnit');


class weatherInfo {
  constructor(Data) {
    this.conditions = Data.currentConditions.conditions;
    this.timezone = Data.timezone;
    this.discription = Data.description;
    this.temperature = Data.currentConditions.temp;
    this.feelsLike = Data.currentConditions.feelslike;
    this.humidity = Data.currentConditions.humidity;
    this.windSpeed = Data.currentConditions.windspeed;
    this.dewPoint = Data.currentConditions.dew;
    this.pressure = Data.currentConditions.pressure;
    this.resolvedAddress = Data.resolvedAddress;
  }
};

let lastWeatherInfo;
let tempMode = {unit: "f"};

document.addEventListener('DOMContentLoaded', () => {

  const data = JSON.parse(localStorage.getItem('weatherInfo')) || {};
  lastWeatherInfo = data;
  console.log(lastWeatherInfo)

  const savedMode = JSON.parse(localStorage.getItem("tempMode")) || { unit: "f" }
  tempMode = savedMode;
  render(lastWeatherInfo);
});

localStorage.setItem("tempMode", JSON.stringify(tempMode));

result.addEventListener('click', (event) => {
  if (event.target.matches('.changeUnit')) {
    if (tempMode.unit === "f") {
      tempMode.unit = "c";
      render(lastWeatherInfo);

      console.log('changing unit to c');
      console.log(tempMode.unit)

    } else if (tempMode.unit === "c") {
      tempMode.unit = "f";
      render(lastWeatherInfo);

      console.log('changing unit to c');
      console.log(tempMode.unit);
    }
    localStorage.setItem("tempMode", JSON.stringify(tempMode));
  }

})

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
    
   //await getWeather(address)
    console.log("Api call made!")

}

getAutoLocation();


submit.addEventListener('click', async (event) => {
    event.preventDefault();
    if (cityInput.value) {
      
      await getWeather(cityInput.value);
      cityInput.value = "";
    }

});


async function getWeather(city) {
  try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const weatherData = await response.json();
      const weatherinfo = new weatherInfo(weatherData);    
      console.log(weatherData);
      lastWeatherInfo = weatherinfo;
      localStorage.setItem('weatherInfo', JSON.stringify(weatherinfo));
      render(weatherinfo);

  } catch (error) {
      console.error(`Failed to get weather data: ${error}`);
      result.innerHTML = `<p class="error">Couldn't get the data. Cheack your internet</p>`
  }
 
}

function render(info, typeOut=tempMode.unit) {
    const tempUnitR = typeOut.toUpperCase();
    const temp = typeOut === "c" ? changeTemp(info.temperature, "c").toFixed(1) : info.temperature;
    const feels = typeOut === "c" ? changeTemp(info.feelsLike, "c").toFixed(1) : info.feelsLike;
    result.innerHTML = "";

    result.innerHTML = `
    <button class="changeUnit">°${tempUnitR}</button>

    <p class="conditions">${info.conditions}</p>
    <h1 class="resolvedAddress">${info.resolvedAddress}</h1>
    <h1 class="temp">${temp}<span class="tempUnit">°${tempUnitR}</span></h1>
    <div class="details">
        <p>Feels like: ${feels}<span>°F</span></p>
        <p>Wind: ${info.windSpeed} MPH</p>
        <p>Humidity: ${info.humidity}</p>
    </div>
    <p class="description">${info.discription}</p>
`

}

function changeTemp(tempNum, typeInput) {
  
  if (typeInput === "c") {
    const f =  (tempNum - 32) * 5/9;
    return f;
  } else if (typeInput === "f") {
    const c = 9/5 * tempNum + 32;
    return c;
  }
}
