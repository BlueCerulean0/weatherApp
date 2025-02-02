import './style.css';
import getAutoLocation from './automate.js';
import getWeather from './getWeather.js';
import render from './render.js';

const cityInput = document.querySelector('.city');
const submit = document.querySelector('.submit');
export const result = document.querySelector('.result');

export let lastWeatherInfo;
export let tempMode = {unit: "f"};

export function setLastWeatherInfo(data) {
    lastWeatherInfo = data;
}

document.addEventListener('DOMContentLoa ded', () => {

  const data = JSON.parse(localStorage.getItem('weatherInfo')) || {};
  lastWeatherInfo = data; 
  console.log(lastWeatherInfo)

  const savedMode = JSON.parse(localStorage.getItem("tempMode")) || { unit: "f" }
  tempMode = savedMode;
  if (lastWeatherInfo) {render(lastWeatherInfo)}
});

localStorage.setItem("tempMode", JSON.stringify(tempMode));

result.addEventListener('click', (event) => {
  if (event.target.matches('.changeUnit')) {
    if (tempMode.unit === "f") {
      tempMode.unit = "c";
      render(lastWeatherInfo);

    } else if (tempMode.unit === "c") {
      tempMode.unit = "f";
      render(lastWeatherInfo);
    }
    localStorage.setItem("tempMode", JSON.stringify(tempMode));
  }
})


const autoLocation = await getAutoLocation();

render(await getWeather(autoLocation))


submit.addEventListener('click', async (event) => {
    event.preventDefault();
    if (cityInput.value) {
      
      try {
        render(await getWeather(cityInput.value));
        
      } catch (error) {
        result.innerHTML = `<h1>No Such Place. Try again!<h1>`
      }
    }
});



