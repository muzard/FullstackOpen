import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import countryService from "./services/CountryService";
import Countries from "./components/Countries";

function App() {
  const [countryArray, setCountryArray] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [type, setType] = useState(0);

  useEffect(() => {
    countryService.getAll().then((data) => {
      const localArray = data.map((country) => {
        return country.name.common;
      });
      setCountryArray(localArray);
    });
  }, []);

  const handleCountryChange = (event) => {
    const newVal = event.target.value;
    setNewCountry(newVal);

    const filteredCountries = countryArray.filter((country) =>
      country.toLowerCase().includes(newVal.toLowerCase())
    );
    setCountriesToShow(filteredCountries);

    if (newVal === "") {
      setType(0);
    } else if (filteredCountries.length > 10 && newVal !== "") {
      setType(1);
    } else if (filteredCountries.length > 1) {
      setType(2);
    } else if (filteredCountries.length === 0) {
      setType(4);
    } else {
      setType(3);
    }
  };

  const showCountry = (country) => {
    setType(3);
    setCountriesToShow([country]);
  };

  return (
    <div>
      <SearchBar
        newCountry={newCountry}
        handleCountryChange={handleCountryChange}
      />
      <Countries
        type={type}
        countries={countriesToShow}
        showCountry={showCountry}
      />
    </div>
  );
}

export default App;
