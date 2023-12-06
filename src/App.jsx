import "./App.css";
import MainPage from "./components/main_page.jsx";
import LocationWeatherContext from "./api/location_weather_get.jsx";

function App() {
  return (
    <div className="App">
      <LocationWeatherContext>
        <MainPage />
      </LocationWeatherContext>
    </div>
  );
}

export default App;
