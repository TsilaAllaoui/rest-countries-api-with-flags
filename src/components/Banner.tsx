import { BsMoonFill, BsSunFill } from "react-icons/bs";
import "../styles/Banner.scss";
import { ModeContext } from "../contexts/mode";
import { useContext, useEffect } from "react";

const Banner = () => {
  const { darkMode, setDarkMode } = useContext(ModeContext);

  const toggleDarkMode = (_e: React.MouseEvent<HTMLDivElement>) => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const banner = document.querySelector("#banner") as HTMLElement;
    banner.style.backgroundColor = darkMode ? "rgb(43, 55, 67)" : "white";
    banner.style.boxShadow = darkMode
      ? "0 0 0.5rem rgb(30, 43, 52)"
      : "0 0 0.5rem grey";
    const paragraphs = document.querySelectorAll("#banner p, #banner #icon");
    paragraphs.forEach((p) => {
      const _p = p as HTMLElement;
      _p.style.color = darkMode ? "white" : "rgb(33, 46, 55)";
    });
  }, [darkMode]);

  return (
    <div id="banner" className="light-banner">
      <p>Where in the world?</p>
      <div id="mode" onClick={toggleDarkMode}>
        <div id="mode-icon">
          {darkMode ? <BsMoonFill id="icon" /> : <BsSunFill id="icon" />}
        </div>
        <p id="mode-text">{darkMode ? "Dark" : "Light"} Mode</p>
      </div>
    </div>
  );
};

export default Banner;
