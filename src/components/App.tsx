import "../styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { ModeContext } from "../contexts/mode";
import { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ModeContext.Provider
      value={{ darkMode: darkMode, setDarkMode: setDarkMode }}
    >
      <div
        id="app"
        onScroll={() => {
          console.log("scroll");
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </ModeContext.Provider>
  );
};

export default App;
