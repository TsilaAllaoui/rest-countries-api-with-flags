import { useState } from "react";
import "../styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Country from "./Country";

const App = () => {
  const [mode, setMode] = useState("Dark");

  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/country" element={<Country />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
