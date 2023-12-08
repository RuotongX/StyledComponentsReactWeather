import React, { useContext } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import {
  LocationContext,
  LoadingWeatherContext,
} from "../api/location_weather_get.jsx";

export default function MapComponent(props) {
  const { location } = useContext(LocationContext);
  const { isLoading } = useContext(LoadingWeatherContext);

  return !isLoading ? (
    <div style={{ height: "50vh", width: "60%" }}>
      
      <APIProvider apiKey={process.env.REACT_APP_Map_Key}>
        <Map
          zoom={13}
          center={{ lat: location.latitude, lng: location.longitude }}
        >
          <Marker
            position={{ lat: location.latitude, lng: location.longitude }}
            clickable={true}
            onClick={() => alert("marker was clicked!")}
            title={"clickable google.maps.Marker"}
          />
        </Map>
      </APIProvider>
    </div>
  ) : (
    <div alt="map_loading"></div>
  );
}
