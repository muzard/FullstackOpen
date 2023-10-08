import { useEffect, useState } from "react";
import countryService from "../services/CountryService";

const extractData = (country) => {
  const [data, setData] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    countryService.getOne(country).then((response) => {
      setData(response.data);
    });
  }, [country]);

  useEffect(() => {
    if (data) {
      countryService
        .getCoords(data.capital[0], data.altSpellings[0])
        .then((data) => {
          countryService
            .getWeather(data[0].lat, data[0].lon)
            .then((tempData) => {
              setWeather(tempData);
            });
        });
    }
  }, [data]);

  if (weather) {
    return [data, weather];
  }
};

export default extractData;
