/* import react & libraries */
import React, { useEffect, useState } from "react";
import moment from "moment";

/* import components */
import Forecast from "../components/Forecast";

/* import services */
import getWeatherData from "../services/weatherService";

/* import styles */
import "../styles/weather.css";

const Weather = () => {
  // initial states
  const [city, setCity] = useState("Faisalabad");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units, lat, long);
      setWeather(data);
    };

    fetchWeatherData();
  }, [units, city, lat, long]);

  const convertTemperature = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="overlay">
      {weather && (
        <div className="container">
          <div className="row w-100">
            <div className="col-sm-12">
              <h3 className="text-center">Weather App</h3>
            </div>
          </div>

          <div className="row w-100">
            <div className="col-sm-12">
              <div className="section section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  className="w-100"
                />
              </div>
            </div>
          </div>

          <div className="row w-100">
            <div className="col-sm-12 col-md-6">
              <div className="section section__temperature">
                <div className="text-center">
                  Today’s Forecast for {`${weather.name}, ${weather.country}`}
                </div>

                <div className="todayweather">
                  <div className="temperature mt-3">
                    <p>{`${weather.temp.toFixed()} °${
                      units === "metric" ? "C" : "F"
                    }`}</p>
                    <p>{weather.description}</p>
                    <p>
                      Min: {weather.temp_min.toFixed()} °
                      {units === "metric" ? "C" : "F"}
                    </p>
                    <p>
                      Max: {weather.temp_max.toFixed()} °
                      {units === "metric" ? "C" : "F"}
                    </p>
                    <p>WindSpeed: {weather.speed.toFixed()}</p>
                    <p>Humidity: {weather.humidity}</p>
                    <p>Pressure: {weather.pressure}</p>
                    <p>Sunrise: {moment.utc(weather.sunrise,'X').add(3600,'seconds').format('HH:mm a')}</p>
                    <p>Sunset: {moment.utc(weather.sunset,'X').add(3600,'seconds').format('HH:mm a')}</p>
                  </div>

                  <div className="icon">
                    <img src={weather.iconURL} alt="weatherIcon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="section section__temperature">
                <div className="text-center">Temperature Converter</div>
                <button onClick={(e) => convertTemperature(e)}>°F</button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Weather;
