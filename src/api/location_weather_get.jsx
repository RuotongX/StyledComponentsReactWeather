import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const LocationContext = createContext(null);
export const WeatherContext = createContext(null);
export const LoadingWeatherContext = createContext(true);
export const DisplayWeatherListContext = createContext(null);

export default function LocationWeatherContext(props) {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayList, setDisplayList] = useState([]);

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
          console.log(data?.data);
          setWeather(data?.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [location]);
  useEffect(() => {
    if (weather != null) {
      let tempList = [];
      for (let i = 0; i < weather.list.length; i++) {
        if (i % 8 === 0) {
          tempList.push(weather.list[i]);
        }
      }
      // console.log(tempList.length);
      setDisplayList(tempList);
    }
  }, [weather]);
  useEffect(() => {
    if (displayList.length !== 0) {
      setIsLoading(false);
    }
  }, [displayList]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <WeatherContext.Provider value={{ weather, setWeather }}>
        <DisplayWeatherListContext.Provider value={displayList}>
          <LoadingWeatherContext.Provider value={isLoading}>
            {props.children}
          </LoadingWeatherContext.Provider>
        </DisplayWeatherListContext.Provider>
      </WeatherContext.Provider>
    </LocationContext.Provider>
  );
}
