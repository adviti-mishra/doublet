import React from "react";
import Game from "../src/components/Game";

const Home: React.FC = () => {
  return (
    <div>
      <h1> Welcome to Doublet! </h1>
      <Game levelId="1" />
    </div>
  );
};

export default Home;
