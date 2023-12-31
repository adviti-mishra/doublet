import React, { useState } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
import { GameState } from "@/interfaces/GameState";
import "../Game.css";

const Game: React.FC = () => {
  // store current state of winning
  const [isWin, setIsWin] = useState<boolean>(false);
  // store current state of levelId
  const [currentLevelId, setCurrentlevelId] = useState<string>("1");

  // store levelData
  const levelData = useGameLevel(currentLevelId);

  // store current state of words inputted
  const [words, setWords] = useState<string[]>([""]);

  // reflect upper case input in list of words
  const handleChange = (value: string) => {
    // shallow copy of words
    const newWords = [...words];
    // adding new input in upper case
    newWords[words.length - 1] = value.toUpperCase();
    // reflecting it in the list of words
    setWords(newWords);
  };

  const handleDeleteWord = () => {
    // shallow copy of words
    const newWords = [...words];
    // delete most recent word
    newWords.splice(newWords.length - 1, 1);
    // reflecting it in the list of words
    setWords(newWords);
  };

  const handleAddWord = () => {
    if (isWin) {
      return;
    }
    // access the last word
    const lastWord = words[words.length - 1];
    // access the second last word
    const secondLastWord =
      words.length > 1 ? words[words.length - 2] : levelData?.startWord;
    // if valid,
    if (secondLastWord != undefined && isValidWord(lastWord, secondLastWord)) {
      // is end word?
      const isWin = lastWord === levelData?.endWord;
      if (isWin === true) {
        alert("Congratulations! You won this level!");
        // turn isWin back to false
        setIsWin(false);
        // clear out words
        setWords([""]);
        // update to next level
        setCurrentlevelId((parseInt(currentLevelId) + 1).toString());
      } else {
        // add an empty word to the list of input words
        setWords([...words, ""]);
      }
    }
  };

  const isValidWord = (lastWord: string, secondLastWord: string): boolean => {
    // word is not the same
    const sameWord = lastWord === secondLastWord;
    if (sameWord === true) {
      alert("Please make sure you type a word different from the previous one");
      return false;
    }
    // word length is the same
    const lengthCheck = lastWord.length == secondLastWord.length;
    if (lengthCheck === false) {
      alert(
        "Please make sure your word is of the same length as the start word"
      );
      return false;
    }

    // word consists of letters only
    const lettersOnly = /^[A-Za-z]+$/.test(lastWord);
    if (lettersOnly === false) {
      alert("Please make sure your word only consists of letters");
      return false;
    }

    // rule of doublet followed
    const wordCheck =
      [...lastWord].filter((char, i) => char !== secondLastWord[i]).length ===
      1;
    if (wordCheck === false) {
      alert("Please make sure you're changing at most one character");
      return false;
    }

    return true;
  };

  // levelData not yet fetched
  if (!levelData) return <div> Loading ... </div>;

  // print the start word and end word
  return (
    <div className="container">
      <h1> Game Level: {levelData.levelId} </h1>
      <div className="input-container">
        <p className="left-aligned">{levelData.startWord}</p>
        {words.map((word: string, index: number) => (
          <div key={index} className="input-wrapper">
            <div className="input-and-buttons">
              <input
                type="text"
                value={word}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              {index == words.length - 1 && (
                <button className="plus" onClick={handleAddWord}>
                  +
                </button>
              )}
              {index !== 0 && index === words.length - 1 && (
                <button onClick={handleDeleteWord}>-</button>
              )}
            </div>
          </div>
        ))}
        <p className="left-aligned">{levelData.endWord}</p>
      </div>
    </div>
  );
};

export default Game;
