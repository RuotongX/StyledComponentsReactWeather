import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const LocationContext = createContext(null);
export const WeatherContext = createContext(null);
export const LoadingContext = createContext(true);

export default function Location_Weather_Context(props) {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          // display an error if we cant get the users position
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // display an error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (location != null) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_OpenWeather_Key}`
        )
        .then((data) => {
          console.log(data?.data.list);
          setWeather(data?.data.list);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [location]);
  useEffect(() => {
    if (weather != null) {
      if(location !=null){
        setIsLoading(false);
      }
      
    }
  }, [weather]);

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <WeatherContext.Provider value={{weather,setWeather}}>
        <LoadingContext.Provider value ={isLoading}>
          {props.children}
          </LoadingContext.Provider>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}
