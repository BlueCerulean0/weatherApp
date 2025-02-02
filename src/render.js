import { tempMode } from "./index.js";
import { result } from "./index.js";

export default function render(info, typeOut=tempMode.unit) {

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
    <p class="description">${info.description}</p>
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
