import React, { useContext } from "react";

import {LocationContext, WeatherContext, LoadingContext} from "../api/location_weather_get.jsx";

export default function MainPage (props) {
  const {location,setLocation} = useContext(LocationContext);
  const isLoading = useContext(LoadingContext);
  return !isLoading ? (
    <div>
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          
        </div>
    </div>
  ) : (
    <h1>Loading!!!!</h1>
  )
  ;
};
