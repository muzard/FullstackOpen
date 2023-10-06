import axios from "axios";

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

export default { getAll, getOne };
