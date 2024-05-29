import React from "react";
import Game from "../src/components/Game";
import "../src/Banner.css";
import InfoIcon from "@mui/icons-material/Info";
import DashBoard from "@/components/DashBoard";
const Home: React.FC = () => {
  return (
    <div>
      <div className="banner">
        <div className="banner-content">Doublet</div>
        <div className="info-icon">
          <InfoIcon />
        </div>
      </div>
      <DashBoard />
    </div>

  );
};

export default Home;
