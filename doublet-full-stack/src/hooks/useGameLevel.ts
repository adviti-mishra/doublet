import { useEffect, useState } from "react";
import { GameLevel } from "@/interfaces/GameLevel";

// Handles state of levelData. Whenever the levelId changes, this function
// gets the start word and end word of that level and returns them
export const useGameLevel = (levelId: string) => {
  // state of levelData (levelid, startWord, endWord)
  const [levelData, setLevelData] = useState<GameLevel | null>(null);

  useEffect(() => {
    // performs GET request to /api/levels/${levelId}
    /*
    const fetchLevelData = async () => {
      try {
        // fetch response of GET request
        const response = await fetch(`/api/levels/${levelId}`);
        // error handling for response not OK
        if (!response.ok) {
          console.error(`failed to fetch level data ${response.status}`);
          return;
        }
        // store response's data in json format
        const data: GameLevel = await response.json();
        // store json response in the state of levelData
        setLevelData(data);
      } catch (err) {
        // catch any errors
        console.error("An unexpected error occured: ", err);
        return;
      }
    };
    // initiate handling of state of levelData
    fetchLevelData();
    */
    let data = { levelId: levelId, startWord: "FOUR", endWord: "FIVE" };
    setLevelData(data);
    // whenever levelData changes
  }, [levelData]);

  return levelData;
};
