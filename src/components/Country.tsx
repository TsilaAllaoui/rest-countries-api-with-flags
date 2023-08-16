import { useEffect } from "react";
import CountryData from "../models/CountryData";
import "../styles/Country.scss";
import { ModeContext } from "../contexts/mode";
import { useContext } from "react";

const Country = ({ country }: { country: CountryData }) => {
  const darkMode = useContext(ModeContext).darkMode;

  const handleModeChange = () => {
    const countries = document.querySelectorAll("#country");
    countries.forEach((c) => {
      const country = c as HTMLElement;
      country.style.backgroundColor = darkMode ? "rgb(43, 55, 67)" : "white";
      country.style.boxShadow = darkMode
        ? "0 0 0.5rem rgb(30, 43, 52)"
        : "0 0 0.5rem grey";
      const infos = country.querySelectorAll("p");
      infos.forEach((_p) => {
        const p = _p as HTMLElement;
        p.style.color = darkMode
          ? p.id == "name"
            ? "white"
            : "rgba(236, 211, 211, 0.696)"
          : "rgb(33, 46, 55)";
      });
    });
  };

  useEffect(() => {
    handleModeChange();
  }, [darkMode]);

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
