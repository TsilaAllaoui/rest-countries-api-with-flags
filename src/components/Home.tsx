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
    const color = darkMode ? "rgba(236, 211, 211, 0.696)" : "rgb(33, 46, 55)";
    const bgColor = darkMode ? "rgb(33, 46, 55)" : "rgba(250, 250, 250)";
    const bgColorLight = darkMode ? "rgb(43, 55, 67)" : "rgba(250, 250, 250)";
    const boxShadowColor = darkMode
      ? "0 0 0.25rem rgb(30, 43, 52)"
      : "0 0 0.25rem rgb(33, 46, 55)";

    const home = document.querySelector("#home") as HTMLElement;
    home.style.backgroundColor = bgColor;

    const searchbar = document.querySelector("#searchbar") as HTMLElement;
    searchbar.style.backgroundColor = darkMode ? "rgb(43, 55, 67)" : "white";
    searchbar.style.boxShadow = boxShadowColor;

    const searchicon = document.querySelector("#searchicon") as HTMLElement;
    searchicon.style.color = color;

    const placeholder = document.querySelector("input") as HTMLElement;
    placeholder.style.setProperty(
      "--c",
      darkMode ? "rgba(236, 211, 211, 0.696)" : "rgb(33, 46, 55)"
    );

    const filter = document.querySelector("#filter") as HTMLElement;
    filter.style.backgroundColor = bgColor;

    const regionDropdown = document.querySelector(
      "#region-dropdown"
    ) as HTMLElement;
    regionDropdown.style.backgroundColor = bgColorLight;
    regionDropdown.style.boxShadow = boxShadowColor;

    const currRegionName = document.querySelector(
      "#current-region-name"
    ) as HTMLElement;
    currRegionName.style.color = color;

    const dropDownIcon = document.querySelector(
      "#dropdown-icon"
    ) as HTMLElement;
    dropDownIcon.style.color = color;
    const resetIcon = document.querySelector("#reset") as HTMLElement;
    resetIcon.style.color = color;

    const regionList = document.querySelector("#region-list") as HTMLElement;
    regionList.style.backgroundColor = bgColorLight;
    regionList.style.boxShadow = boxShadowColor;

    const lis = document.querySelectorAll("li");
    lis.forEach((li) => (li.style.color = color));
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
