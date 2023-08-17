import { useEffect } from "react";
import CountryData from "../models/CountryData";
import "../styles/CountryItem.scss";
import { ModeContext } from "../contexts/mode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CountryItem = ({ country }: { country: CountryData }) => {
  const darkMode = useContext(ModeContext).darkMode;
  const bgColor = darkMode ? "rgb(43, 55, 67)" : "rgba(250, 250, 250)";
  const color = darkMode ? "rgba(236, 211, 211, 0.696)" : "rgb(33, 46, 55)";
  const boxShadowColor = darkMode
    ? "0 0 0.5rem rgb(43, 55, 67)"
    : "0 0 0.5rem grey";

  const handleModeChange = () => {
    const countries = document.querySelectorAll("#country-item");
    countries.forEach((c) => {
      const country = c as HTMLElement;
      country.style.backgroundColor = darkMode ? "rgb(43, 55, 67)" : "white";
      country.style.boxShadow = boxShadowColor;

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

    const infosContainer = document.querySelector("#infos") as HTMLElement;
    infosContainer.style.backgroundColor = bgColor;
  };

  useEffect(() => {
    handleModeChange();
  }, [darkMode]);

  const navigate = useNavigate();

  return (
    <div
      id="country-item"
      onClick={() =>
        navigate({
          pathname: "/country",
          search: `?name=${country.cca3}`,
        })
      }
      style={{ boxShadow: boxShadowColor }}
    >
      <div
        id="flag"
        style={{ backgroundImage: `url(${country.flag.replace('"', "")})` }}
      ></div>
      <div
        id="infos"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <p
          id="name"
          style={{
            color: color,
          }}
        >
          {country.name}
        </p>
        <p
          style={{
            color: color,
          }}
        >
          Population: {country.population.toLocaleString("en-US")}
        </p>
        <p
          style={{
            color: color,
          }}
        >
          Region: {country.region}
        </p>
        <p
          style={{
            color: color,
          }}
        >
          Capital: {country.capital}
        </p>
      </div>
    </div>
  );
};

export default CountryItem;
