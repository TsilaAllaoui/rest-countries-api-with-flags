import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/Country.scss";
import CountryData from "../models/CountryData";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ModeContext } from "../contexts/mode";
import { useContext } from "react";

const Country = () => {
  const [params] = useSearchParams();

  const darkMode = useContext(ModeContext).darkMode;

  const [country, setCountry] = useState<
    | (CountryData & {
        nativeName: string;
        subRegion: string;
        topLevelDomain: string;
        currencies: string[];
        languages: string[];
        borderCountries: string[];
      })
    | null
  >(null);

  const navigate = useNavigate();

  const [borders, setBorders] = useState<string[]>([]);

  useEffect(() => {
    const app = document.querySelector("#app") as HTMLElement;
    app.style.overflowY = "hidden";
    fetch(
      `https://restcountries.com/v3.1/alpha/${params
        .get("name")
        ?.toLocaleLowerCase()}`
    )
      .then((res) => res.json())
      .then((datas: any) => {
        console.log(datas);
        const data = datas[0];
        const currencies: string[] = [];
        for (let prop in data.currencies) {
          currencies.push(data.currencies[prop].name + ",");
        }
        currencies[currencies.length - 1] = currencies[
          currencies.length - 1
        ].replace(",", "");

        const languages: string[] = [];
        for (let language in data.languages) {
          languages.push(data.languages[language] + ",");
        }
        languages[languages.length - 1] = languages[
          languages.length - 1
        ].replace(",", "");

        let _nativeName = "";
        for (let native in data.name.nativeName) {
          _nativeName = data.name.nativeName[native].common;
          break;
        }

        const f = async () => {
          const _borders: string[] = [];
          for (let border in data.borders) {
            console.log(border);
            try {
              const res = await fetch(
                `https://restcountries.com/v3.1/alpha/${data.borders[
                  border
                ].toLocaleLowerCase()}`
              );
              const ctrData = await res.json();
              _borders.push(ctrData[0].name.common);
            } catch (e) {
              console.log(e);
            }
          }
          setBorders([..._borders]);
        };

        f().then(() => {
          setCountry({
            name: data.name.common,
            capital: data.capital,
            population: data.population,
            region: data.region,
            flag: data.flags.svg,
            cca3: data.cca3,
            nativeName: _nativeName,
            subRegion: data.subregion,
            topLevelDomain: data.tld[0],
            currencies: currencies,
            languages: languages,
            borderCountries: borders,
          });
        });
      });

    return () => {
      const app = document.querySelector("#app") as HTMLElement;
      app.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    const color = darkMode ? "rgba(236, 211, 211, 0.696)" : "rgb(33, 46, 55)";
    const colorLight = darkMode ? "white" : "rgb(33, 46, 55)";
    const colorLighter = darkMode ? "white" : "rgb(43, 55, 67)";
    const bgColor = darkMode ? "rgb(33, 46, 55)" : "rgba(250, 250, 250)";
    const bgColorLight = darkMode ? "rgb(43, 55, 67)" : "rgba(250, 250, 250)";
    const boxShadowColor = darkMode
      ? "0 0 0.25rem rgb(30, 43, 52)"
      : "0 0 0.25rem rgb(33, 46, 55)";

    const country = document.querySelector("#country") as HTMLElement;
    country.style.backgroundColor = bgColor;

    const back = document.querySelector("#back") as HTMLElement;
    back.style.backgroundColor = bgColorLight;
    back.style.color = colorLight;

    const flag = document.querySelector("#flag") as HTMLElement;
    flag.style.boxShadow = boxShadowColor;

    const name = document.querySelector("#name") as HTMLElement;
    name.style.color = colorLight;

    const ps = document.querySelectorAll("#left p, #right p");
    ps.forEach((_p) => {
      const p = _p as HTMLElement;
      p.style.color = color;
    });

    const spans = document.querySelectorAll("#left span, #right span");
    spans.forEach((_span) => {
      const span = _span as HTMLElement;
      span.style.color = colorLighter;
      span.style.fontWeight = darkMode ? "500" : "900";
    });

    const borderspans = document.querySelector("#borders span") as HTMLElement;
    borderspans.style.color = colorLighter;
    borderspans.style.fontWeight = darkMode ? "500" : "900";

    const bordersps = document.querySelectorAll("#borders p");
    bordersps.forEach((_p) => {
      const p = _p as HTMLElement;
      p.style.color = colorLight;
      p.style.backgroundColor = bgColorLight;
      p.style.fontWeight = darkMode ? "500" : "900";
      p.style.boxShadow = boxShadowColor;
    });

    const borders = document.querySelectorAll("#borders-countries p");
    borders.forEach((_border) => {
      const border = _border as HTMLElement;
      border.style.color = color;
    });
  }, [darkMode]);

  return (
    <div id="country">
      <div id="back" onClick={() => navigate("/")}>
        <MdOutlineKeyboardBackspace />
        <p>Back</p>
      </div>
      <div id="country-infos">
        <div
          id="flag"
          style={{ backgroundImage: `url(${country?.flag})` }}
        ></div>
        <div id="infos">
          <p id="name">{country?.name}</p>
          <div id="more-infos">
            <div id="left">
              <p id="native-name">
                <span>Native Name:</span> {country?.nativeName}
              </p>
              <p id="population">
                <span>Population: </span>
                {country?.population}
              </p>
              <p id="region">
                <span>Region: </span>
                {country?.region}
              </p>
              <p id="sub-region">
                <span>Sub Region: </span>
                {country?.subRegion}
              </p>
              <p id="capital">
                <span>Capital: </span>
                {country?.capital}
              </p>
            </div>
            <div id="right">
              <p id="top-level-domain">
                <span>Top Level Domain:</span> {country?.topLevelDomain}
              </p>
              <div id="currencies">
                <p>
                  <span>Currencies:</span>
                </p>
                {country?.currencies.map((currency, index) => (
                  <p key={index}>
                    {currency +
                      (index == country?.currencies.length - 1 && index == 0
                        ? ""
                        : ",")}
                  </p>
                ))}
              </div>
              <div id="languages">
                <p>
                  <span>Languages:</span>
                </p>
                {country?.languages.map((language, index) => (
                  <p key={index}>
                    {language +
                      (index == country?.languages.length - 1 || index == 0
                        ? ""
                        : ",")}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div id="borders">
            <span>Border Countries: </span>
            <div id="borders-countries">
              {borders.length > 0 ? (
                borders.map((border, index) => <p key={index}>{border}</p>)
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
