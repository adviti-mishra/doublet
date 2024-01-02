import React, { useState } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
import { GameState } from "@/interfaces/GameState";

const Game: React.FC<{ levelId: string }> = ({ levelId }) => {
  // store current state of words inputted
  const [words, setWords] = useState<string[]>([""]);
  // store current state of the Game (current word, isWin)
  const [gameState, setGameState] = useState<GameState>({
    currentWord: "",
    isWin: false,
  });

  // store levelData
  const levelData = useGameLevel(levelId);

  // reflect upper case input in list of words
  const handleChange = (index: number, value: string) => {
    // shallow copy of words
    const newWords = [...words];
    // adding new input in upper case
    newWords[index] = value.toUpperCase();
    // reflecting it in the list of words
    setWords(newWords);
  };

  const handleAddWord = () => {
    // access the last word
    const lastWord = words[words.length - 1];
    // if valid,
    // add an empty word to the list of input words
    setWords([...words, ""]);
  };

  // levelData not yet fetched
  if (!levelData) return <div> Loading ... </div>;

  // print the start word and end word
  return (
    <div>
      <h1> Game Level: {levelData.levelId} </h1>
      <p> Start word: {levelData.startWord} </p>
      {words.map((word: string, index: number) => (
        <div key={index}>
          <input
            type="text"
            value={word}
            onChange={(e) => handleChange(index, e.target.value)}
          ></input>
        </div>
      ))}
      <button onClick={handleAddWord}>+</button>
      <p> End word: {levelData.endWord} </p>
    </div>
  );
};

export default Game;
