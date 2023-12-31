import "../styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { ModeContext } from "../contexts/mode";
import { useState } from "react";
import Country from "./Country";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ModeContext.Provider
      value={{ darkMode: darkMode, setDarkMode: setDarkMode }}
    >
      <div id="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/country" element={<Country />} />
            <Route />
          </Route>
        </Routes>
      </div>
    </ModeContext.Provider>
  );
};

export default App;
