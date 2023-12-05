import React, { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
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
          `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=d1580a5eaffdf2ae907ca97ceaff0235`
        )
        .then((data) => {
           console.log( data?.data.list); 
          setWeather( data?.data.list);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
        })
    }
    if(location != null){
        setIsLoading(false);
    }
  }, [location]);
//   useEffect(() => {
//     if(){
//         setIsLoading(false);
//     }
//   },[weather])

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

export default MainPage;
