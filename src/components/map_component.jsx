import React, { useContext } from "react";
import { APIProvider, Map} from "@vis.gl/react-google-maps";

import { LocationContext,LoadingWeatherContext } from "../api/location_weather_get.jsx";

export default function MapComponent(props) {
  const { location } = useContext(LocationContext);
  const {isLoading} = useContext(LoadingWeatherContext);
  
  
  return !isLoading ? (
    <div style={{ height: "50vh", width: "50%" }}>
        <APIProvider apiKey={process.env.REACT_APP_Map_Key}>
            <Map
            zoom={13}
            center={{ lat: location.latitude, lng: location.longitude }}
            />
        </APIProvider>
    </div>
  ) : (
    <div alt="map_loading"></div>
  );
}
