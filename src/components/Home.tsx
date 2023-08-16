import { useContext, useEffect, useRef, useState } from "react";
import "../styles/Home.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import CountryData from "../models/CountryData";
import Country from "./Country";
import { RxCross2 } from "react-icons/rx";
import { ModeContext } from "../contexts/mode";

const Home = () => {
  const darkMode = useContext(ModeContext).darkMode;

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const regionList = useRef<HTMLDivElement>(null);
  const countriesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const [searchFilter, setSearchFilter] = useState("");

  const toggleFilter = (_e: React.MouseEvent<HTMLDivElement> | null) => {
    regionList.current!.style.transform =
      regionList.current!.style.transform == "scaleY(0)"
        ? "scaleY(1)"
        : "scaleY(0)";
  };

  const handleRegionChange = (
    _e: React.MouseEvent<HTMLLIElement>,
    region: string
  ) => {
    setRegion(region);
    toggleFilter(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.currentTarget.value);
  };

  const applySearchFilter = (_e: React.MouseEvent<HTMLDivElement> | null) => {
    if (searchFilter == "") setCountries(allCountries);
    else
      setCountries(
        allCountries.filter((country) => country.name.includes(searchFilter))
      );
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        let datas: CountryData[] = [];
        data.forEach((country: any) =>
          datas.push({
            name: country.name,
            capital: country.capital,
            population: country.population,
            region: country.region,
            flag: country.flag,
          })
        );
        setAllCountries(datas);
        setCountries(datas);
      });
  }, []);

  useEffect(() => {
    if (region == "") {
      setCountries(allCountries);
      return;
    }
    if (searchFilter == "")
      setCountries(allCountries.filter((country) => country.region == region));
    else
      setCountries(
        allCountries.filter(
          (country) =>
            country.region == region && country.name.includes(searchFilter)
        )
      );
  }, [region]);

  useEffect(() => {
    countriesRef.current?.childNodes.forEach((node) => {
      const element = node as HTMLElement;
      element.style.animation = "";
      setTimeout(() => {
        element.style.animation = "fadein 1000ms forwards";
      }, 500);
    });
  }, [countries]);

  useEffect(() => {
    const home = document.querySelector("#home") as HTMLElement;
    home.style.backgroundColor = darkMode
      ? "rgb(33, 46, 55)"
      : "rgba(250, 250, 250)";
  }, [darkMode]);

  return (
    <div id="home">
      <div id="options">
        <div id="searchbar">
          <div onClick={applySearchFilter}>
            <AiOutlineSearch id="searchicon" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applySearchFilter(null);
            }}
          >
            <input
              type="text"
              placeholder="Search for a country..."
              onChange={handleSearch}
              ref={inputRef}
              id="search-input"
            />
          </form>
        </div>
        <div id="filter">
          <div id="region-dropdown">
            <p id="current-region-name" onClick={toggleFilter}>
              {region == "" ? "Filter by Region" : region}
            </p>
            <div onClick={toggleFilter}>
              <RiArrowDropDownLine id="dropdown-icon" />
            </div>
            <div
              onClick={() => {
                setRegion("");
                setSearchFilter("");
                inputRef.current!.value = "";
              }}
            >
              <RxCross2 id="reset" />
            </div>
          </div>
          <div
            id="region-list"
            ref={regionList}
            style={{ transform: "scaleY(0)" }}
          >
            <ul>
              {regions.map((region) => (
                <li key={region} onClick={(e) => handleRegionChange(e, region)}>
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div id="countries" ref={countriesRef}>
        {countries.length > 0 &&
          countries.map((country) =>
            region == "" || country.region == region ? (
              <Country key={country.name} country={country} />
            ) : null
          )}
      </div>
    </div>
  );
};

export default Home;
