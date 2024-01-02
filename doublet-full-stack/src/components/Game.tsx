import React, { useState } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
import { GameState } from "@/interfaces/GameState";

const Game: React.FC<{ levelId: string }> = ({ levelId }) => {
  // store current state of the Game (current word, isWin)
  const [gameState, setGameState] = useState<GameState>({
    currentWord: "",
    isWin: false,
  });

  // store levelData
  const levelData = useGameLevel(levelId);

  // levelData not yet fetched
  if (!levelData) return <div> Loading ... </div>;

  // print the start word and end word
  return (
    <div>
      <h1> Game Level </h1>
      <p> Start word: {levelData.startWord} </p>

      <p> End word: {levelData.endWord} </p>
    </div>
  );
};

export default Game;
