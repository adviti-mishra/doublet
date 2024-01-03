import React from "react";
import Game from "../src/components/Game";
import "../src/Banner.css";

const Home: React.FC = () => {
  return (
    <div>
      <div className="banner"> Doublet </div>
      <Game />
    </div>
  );
};

export default Home;
