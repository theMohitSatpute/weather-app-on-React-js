import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cardImg1 from "./assets/weather-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = "1a3469b5eca1db96923dd6fe8b3689ae";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1>Weather App</h1>
        <div className="d-grid col-4 mt-4">
          <input
            type="text"
            placeholder="Enter city name..."
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className="weatherIcon" src={cardImg1} />
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">
            {(data?.main?.temp - 273.15).toFixed(2)}&#8451;
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
