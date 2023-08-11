import { useEffect, useRef, useState } from "react";
import "../styles/Home.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import CountryData from "../models/CountryData";
import Country from "./Country";

const Home = () => {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const regionList = useRef<HTMLDivElement>(null);

  const [region, setRegion] = useState(regions[0]);

  const toggleFilter = (_e: React.MouseEvent<HTMLDivElement>) => {
    console.log(regionList.current!.style.transform);
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
    console.log(region);
  };

  const [countries, setCountries] = useState<CountryData[]>([]);

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
        setCountries(datas);
      });
  }, []);

  return (
    <div id="home">
      <div id="options">
        <div id="searchbar">
          <AiOutlineSearch id="searchicon" />
          <input type="text" placeholder="Search for a country..." />
        </div>
        <div id="filter">
          <div id="region-dropdown" onClick={toggleFilter}>
            <p>Filter by Region</p>
            <RiArrowDropDownLine id="dropdown-icon" />
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
      <div id="countries">
        {countries.length > 0 &&
          countries.map((country) => (
            <Country key={country.name} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;