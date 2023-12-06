import React, { useContext } from "react";
import {
  WeatherContext,
  LoadingWeatherContext,
  DisplayWeatherListContext,
} from "../api/location_weather_get.jsx";

function findIcon(iconName) {
  switch (iconName) {
    case "01d":
      return "d01.png";
    case "01n":
      return "n01.png";
    case "02d":
      return "d02.png";
    case "02n":
      return "n02.png";
    case "03d":
      return "d03.png";
    case "03n":
      return "d03.png";
    case "04d":
      return "d04.png";
    case "04n":
      return "d04.png";
    case "09d":
      return "d09.png";
    case "09n":
      return "d09.png";
    case "10d":
      return "d10.png";
    case "10n":
      return "n10.png";
    case "11d":
      return "d11.png";
    case "11n":
      return "d11.png";
    case "13d":
      return "d13.png";
    case "13n":
      return "d13.png";
    case "50d":
      return "d50.png";
    case "50n":
      return "d50.png";
    default:
      return "sunny.png";
  }
}

export default function Weather(props) {
  const { weather } = useContext(WeatherContext);
  const isLoading = useContext(LoadingWeatherContext);
  const displayList = useContext(DisplayWeatherListContext);

  return !isLoading ? (
    <React.Fragment>
      <div>{weather.city.name}</div>
      <img
        src={require("/assets/" + findIcon(weather.list[0].weather[0].icon))}
        alt={weather.list[0].dt + weather.city.name}
      />
      <div>{weather.list[0].weather[0].main}</div>
      <div>
        {parseFloat(weather.list[0].main.temp - 273.15).toFixed(1) + "℃"}
      </div>
      
        {displayList.map((weather) => (
          <div key={weather.dt}>
            <img
              src={require("/assets/" + findIcon(weather.weather[0].icon))}
              alt={weather.dt}
            />
            <p>{weather.dt_txt.split(" ")[0]}</p>
            <div>{weather.weather[0].main}</div>
            <p>{parseFloat(weather.main.temp - 273.15).toFixed(1) + "℃"}</p>
          </div>
        ))}
      
    </React.Fragment>
  ) : (
    <h1>Loading!!!!</h1>
  );
}
