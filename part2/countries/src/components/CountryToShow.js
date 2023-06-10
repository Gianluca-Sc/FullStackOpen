import { useState, useEffect } from "react";
import axios from "axios";

const CountryToshow = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);
  const [wind, setWind] = useState(null);

  const api_key = process.env.REACT_APP_WEATHER_API;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`;
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.current.weather.icon);
        setTemp(res.data.current.temp);
        setWind(res.data.current.wind_speed);
        setIcon(
          `https://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
      {!isLoading && (
        <div>
          <h3>Weather in {country.name.common}</h3>
          <p>temperature {temp} Celsius</p>
          <img src={icon} alt="weather-icon" />
          <p>wind {wind} m/s</p>
        </div>
      )}
    </>
  );
};

export default CountryToshow;
