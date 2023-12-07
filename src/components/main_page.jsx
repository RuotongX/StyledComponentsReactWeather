import React, { useContext } from "react";
import Weather from "./weather_component.jsx";
import Map from "./map_component.jsx"
import {LoadingWeatherContext} from "../api/location_weather_get.jsx";

export default function MainPage (props) {
  
  const isLoading = useContext(LoadingWeatherContext);
  
  return !isLoading ? (
    <div>
        <Weather></Weather>
        <Map/>
    </div>
  ) : (
    <h1>Loading!!!!</h1>
  )
  ;
};
