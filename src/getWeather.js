import { setLastWeatherInfo } from "./index.js";

const key= "AT5J3QEY95FF7MDY8JAR9QXDF";

class weatherInfo {
  constructor(Data) {
    this.conditions = Data.currentConditions.conditions;
    this.timezone = Data.timezone;
    this.description = Data.description;
    this.temperature = Data.currentConditions.temp;
    this.feelsLike = Data.currentConditions.feelslike;
    this.humidity = Data.currentConditions.humidity;
    this.windSpeed = Data.currentConditions.windspeed;
    this.dewPoint = Data.currentConditions.dew;
    this.pressure = Data.currentConditions.pressure;
    this.resolvedAddress = Data.resolvedAddress;
  }
};

export default async function getWeather(city) {
  try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const weatherResponse = await response.json();
      const weatherinfo = new weatherInfo(weatherResponse);    
      setLastWeatherInfo(weatherinfo)
      localStorage.setItem('weatherInfo', JSON.stringify(weatherinfo));
      return weatherinfo;

  } catch (error) {
      console.error(`Failed to get weather data: ${error}`);
  }
}


