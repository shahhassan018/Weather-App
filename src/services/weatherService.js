/*import constants */
import { configuration } from "../constants/apiConstants";

/* import helpers */
import { iconURL } from "../helpers/weatherHelper";

const getWeatherData = async (city, units = "metric", lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=daily,hourly&appid=${configuration.API_KEY}&units=${units}`;


  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country, sunrise, sunset },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: iconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
    sunrise,
    sunset,
  };
};

export default getWeatherData;
