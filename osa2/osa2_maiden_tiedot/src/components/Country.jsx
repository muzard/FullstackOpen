import extractData from "./extractData";

const Country = ({ country }) => {
  const data = extractData(country);

  if (data) {
    return (
      <div>
        <h1>{data.name.common}</h1>

        <div>
          <div>capital {data.capital}</div>
          <div>area {data.area}km</div>
        </div>

        <div>
          <h3>languages:</h3>
          <ul>
            {Object.values(data.languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img src={data.flags.png} />
        </div>
      </div>
    );
  }
};

export default Country;
