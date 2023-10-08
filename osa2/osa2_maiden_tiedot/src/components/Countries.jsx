import Country from "./Country";

const Countries = ({ type, countries, showCountry }) => {
  if (type === 0) {
    return <div></div>;
  } else if (type === 1) {
    return <div>Too many matches, please specify</div>;
  } else if (type === 2) {
    return (
      <div>
        <ul>
          {countries.map((country) => {
            return (
              <li key={country}>
                {country}{" "}
                <button
                  onClick={(e) => {
                    showCountry(country);
                  }}
                >
                  show
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (type === 3) {
    return <Country countryName={countries[0]} />;
  } else if (type === 4) {
    return <div>No countries found</div>;
  }
};

export default Countries;
