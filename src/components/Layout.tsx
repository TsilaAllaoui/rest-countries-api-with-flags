import { useState } from "react";
import "../styles/Layout.scss";
import Banner from "./Banner";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [mode, setMode] = useState("Dark");
  return (
    <div id="layout">
      <Banner mode={mode} />
      <Outlet />
    </div>
  );
};

export default Layout;
