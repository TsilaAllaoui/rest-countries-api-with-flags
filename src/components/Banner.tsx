import { BsMoonFill, BsSunFill } from "react-icons/bs";
import "../styles/Banner.scss";

const Banner = ({ mode }: { mode: string }) => {
  return (
    <div id="banner">
      <p>Where in the world?</p>
      <div id="mode">
        {mode == "Dark" ? <BsMoonFill /> : <BsSunFill />}
        <p>{mode} Mode</p>
      </div>
    </div>
  );
};

export default Banner;
