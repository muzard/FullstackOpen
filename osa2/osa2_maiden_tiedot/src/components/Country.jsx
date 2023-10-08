import extractData from "./extractData";

const Country = ({ countryName }) => {
  const data = extractData(countryName);

  if (data) {
    console.log(data);
    return (
      <div>
        <h1>{data[0].name.common}</h1>

        <div>
          <div>capital {data[0].capital}</div>
          <div>area {data[0].area}km</div>
        </div>

        <div>
          <h3>languages:</h3>
          <ul>
            {Object.values(data[0].languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img src={data[0].flags.png} />
        </div>

        <div>
          <h2>Weather in {data[0].capital}</h2>

          <div>
            temperature {Math.round((data[1].main.temp - 273.15) * 100) / 100}{" "}
            Celcius
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${data[1].weather[0].icon}@2x.png`}
          />

          <div>wind {data[1].wind.speed} m/s</div>
        </div>
      </div>
    );
  }
};

export default Country;
