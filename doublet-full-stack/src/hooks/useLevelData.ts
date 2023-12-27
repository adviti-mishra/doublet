import { useEffect, useState } from "react";
import { GameLevel } from "@/interfaces/GameLevel";

export const useGameLevel = (levelId: string) => {
  // state of levelData (levelid, startWord, endWord)
  const [levelData, setLevelData] = useState<GameLevel | null>(null);

  useEffect(() => {
    // performs GET request to /api/levels/${levelId}
    const fetchLevelData = async () => {
      try {
        const response = await fetch(`/api/levels/${levelId}`);
        if (!response.ok) {
          console.error(`failed to fetch level data ${response.status}`);
          return;
        }
        const data: GameLevel = await response.json();
        setLevelData(data);
      } catch (err) {
        console.error("An unexpected error occured: ", err);
        return;
      }
    };
    // initiate handling of state of levelData
    fetchLevelData();
    // whenever levelData changes
  }, [levelData]);

  return levelData;
};
