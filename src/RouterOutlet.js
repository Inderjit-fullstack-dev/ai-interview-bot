import { Outlet } from "react-router-dom";
import "./routeroutlet.css";
import { IntroTemplate } from "./components";

function RouterOutlet() {
  return (
    <div className="main-container">
      <div className="intro-component">
        <IntroTemplate />
      </div>
      <div className="child-outlet">
        <Outlet /> {/* This is where child routes will be rendered */}
      </div>
    </div>
  );
}

export default RouterOutlet;
