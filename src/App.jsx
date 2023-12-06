import "./App.css";
import MainPage from "./components/main_page.jsx";
import Location_Weather_Context from "./api/location_weather_get.jsx";

function App() {
  return (
    <div className="App">
      <Location_Weather_Context>
        <MainPage />
      </Location_Weather_Context>
    </div>
  );
}

export default App;
