import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const getAll = () => {
  const request = axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );
  return request.then((response) => response.data);
};

const getOne = (name) => {
  return axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  );
};

const getCoords = (city, country) => {
  const request = axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getOne, getCoords, getWeather };
