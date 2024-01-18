import React, { useState } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
import { GameState } from "@/interfaces/GameState";
import "../Game.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  if (!levelData) return <Typography>Loading...</Typography>;

  // print the start word and end word
  return (
    <Container
      maxWidth="xl" // Adjust to 'lg' or 'xl' for a larger container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        pt: "64px",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "80%", // Increase this to make the box wider
          maxWidth: "800px", // You can adjust this as needed
          p: 4, // Padding inside the box for spacing
          display: "flex",
          flexDirection: "column",
          alignItems: "left", // Center children horizontally
          justifyContent: "center", // Center children vertically
          gap: 3, // Space between items
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: "2.5rem", // Increase this to make the text larger
            textAlign: "center",
            mb: 4, // Increase bottom margin to add more space
          }}
        >
          Game Level: {levelData.levelId}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "2rem", // Adjust this value to match the TextField font size
            textAlign: "left", // Center the text if needed
            mb: 2, // Margin bottom for spacing
          }}
        >
          {levelData.startWord}
        </Typography>
        {words.map((word: string, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start", // Aligns items to the start of the main axis
              mb: 2,
              gap: 1, // Adds a gap between the TextField box and buttons
            }}
          >
            <Box
              sx={{
                width: "300px", // Set a fixed width for the TextField container
              }}
            >
              <TextField
                fullWidth // Ensures TextField occupies the full width of its parent Box
                type="text"
                value={word}
                onChange={(e) => handleChange(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "1.5rem", // Adjust the font size as needed
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "auto", // Let the height be dynamic based on content
                    padding: "18px", // More padding to increase the size
                  },
                  my: 2, // More vertical space
                  width: "100%", // Use the full width of the parent box
                }}
              />
            </Box>
            {index === words.length - 1 && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddWord}
                  sx={{
                    fontSize: "1.5rem", // Increases the font size in the button
                    width: "70px", // Adjust the width as needed
                    height: "70px", // Adjust the height to match the input fields
                    borderRadius: "10px", // Adjust the border-radius if needed
                  }}
                >
                  +
                </Button>
              </>
            )}
            {index !== 0 && index === words.length - 1 && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteWord}
                  sx={{
                    fontSize: "1.5rem", // Increases the font size in the button
                    width: "70px", // Adjust the width as needed
                    height: "70px", // Adjust the height to match the input fields
                    borderRadius: "10px", // Adjust the border-radius if needed
                  }}
                >
                  -
                </Button>
              </>
            )}
          </Box>
        ))}
        <Typography
          variant="body1"
          sx={{
            fontSize: "2rem", // Adjust this value to match the TextField font size
            textAlign: "left", // Center the text if needed
            mb: 2, // Margin bottom for spacing
          }}
        >
          {levelData.endWord}
        </Typography>
      </Box>
    </Container>
  );
};

export default Game;
