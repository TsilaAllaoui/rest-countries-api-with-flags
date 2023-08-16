import "../styles/Layout.scss";
import Banner from "./Banner";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div id="layout">
      <Banner />
      <Outlet />
    </div>
  );
};

export default Layout;
