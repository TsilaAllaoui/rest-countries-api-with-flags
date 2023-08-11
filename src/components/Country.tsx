import { useEffect } from "react";
import CountryData from "../models/CountryData";
import "../styles/Country.scss";

const Country = ({ country }: { country: CountryData }) => {
  return (
    <div id="country">
      <div
        id="flag"
        style={{ backgroundImage: `url(${country.flag.replace('"', "")})` }}
      ></div>
      <div id="infos">
        <p id="name">{country.name}</p>
        <p>Population: {country.population.toLocaleString("en-US")}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </div>
  );
};

export default Country;
