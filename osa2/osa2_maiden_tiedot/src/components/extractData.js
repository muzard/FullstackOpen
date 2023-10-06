import { useEffect, useState } from "react";
import countryService from "../services/CountryService";

const extractData = (country) => {
  const [data, setData] = useState("");

  useEffect(() => {
    countryService.getOne(country).then((response) => {
      setData(response.data);
    });
  }, [country]);

  return data;
};

export default extractData;
