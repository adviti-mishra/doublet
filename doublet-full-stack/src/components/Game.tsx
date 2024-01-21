import React, { useState } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
import { GameState } from "@/interfaces/GameState";
import "../Game.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Game: React.FC = () => {
  // store current state of winning
  const [isWin, setIsWin] = useState<boolean>(false);
  // store current state of levelId
  const [currentLevelId, setCurrentlevelId] = useState<string>("1");
  // store number of tries left for the day
  const [triesLeft, setTriesLeft] = useState<number>(3);
  // store levelData
  const levelData = useGameLevel(currentLevelId);
  // store current state of words inputted
  const [words, setWords] = useState<string[]>([""]);
  // store state of error message of most recent word
  const [errorMessage, setErrorMessage] = useState<string>("");

  // reflect upper case input in list of words
  const handleChange = (value: string) => {
    // shallow copy of words
    const newWords = [...words];
    // adding new input in upper case
    newWords[words.length - 1] = value.toUpperCase();
    // reflecting it in the list of words
    setWords(newWords);
    // clearing out the error message since a new word / first word is being typed in
    setErrorMessage("");
  };

  const handleDeleteWords = () => {
    // clear out words
    setWords([""]);
    // decrement number of tries
    setTriesLeft((prev) => prev - 1);
    // announce number of tries left
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

    if (secondLastWord !== undefined) {
      // perform validation
      const validationStatus = isValidWord(lastWord, secondLastWord);
      // If invalid
      if (validationStatus !== "") {
        setErrorMessage(validationStatus);
      } else {
        // If valid
        setErrorMessage(""); // Clear out error message
        if (lastWord === levelData?.endWord) {
          alert("Congratulations! You won this level!");
          setIsWin(false);
          setWords([""]);
          setCurrentlevelId((parseInt(currentLevelId) + 1).toString());
        } else {
          setWords([...words, ""]);
        }
      }
    }
  };

  const isValidWord = (lastWord: string, secondLastWord: string): string => {
    // word is not the same
    const sameWord = lastWord === secondLastWord;
    if (sameWord === true) {
      return "Please make sure you type a word different from the previous one";
    }
    // word length is the same
    const lengthCheck = lastWord.length == secondLastWord.length;
    if (lengthCheck === false) {
      return "Please make sure your word is of the same length as the start word";
    }

    // word consists of letters only
    const lettersOnly = /^[A-Za-z]+$/.test(lastWord);
    if (lettersOnly === false) {
      return "Please make sure your word only consists of letters";
    }

    // rule of doublet followed
    const wordCheck =
      [...lastWord].filter((char, i) => char !== secondLastWord[i]).length ===
      1;
    if (wordCheck === false) {
      return "Please make sure you're changing at most one character";
    }

    // no error
    return "";
  };

  // levelData not yet fetched
  if (!levelData) return <Typography>Loading...</Typography>;

  // print the start word and end word
  return (
    <Container
      maxWidth="xl" // Adjust to 'lg' or 'xl' for a larger container
      sx={{
        marginTop: "70px",
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
            color: "#03254E",
            fontSize: "2.5rem", // Increase this to make the text larger
            textAlign: "center",
            mb: 4, // Increase bottom margin to add more space
          }}
        >
          Game Level: {levelData.levelId}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns the button to the right
          }}
        >
          <Button
            variant="contained"
            onClick={handleDeleteWords}
            disabled={words.length === 1}
            startIcon={<RestartAltIcon />}
            sx={{
              textTranform: "none",
              backgroundColor: "#A2D6F9", // Light grey when disabled
              color: "white", // Darker grey for text when disabled
              fontSize: "1.5rem", // Increases the font size in the button
              width: "160px", // Adjust the width as needed
              height: "80px", // Adjust the height to match the input fields
              borderRadius: "20px", // Adjust the border-radius if needed
              ":hover": {
                backgroundColor: "#1E96FC", // Replace with your desired hover color
                // You can also add other styles that should change on hover
              },
            }}
          >
            Restart
          </Button>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "2rem", // Adjust this value to match the TextField font size
            textAlign: "left", // Center the text if needed
            mb: 2, // Margin bottom for spacing
            color: "#545677",
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
                error={index === words.length - 1 && errorMessage !== ""}
                helperText={index === words.length - 1 ? errorMessage : ""}
                //variant={index === words.length - 1 ? "outlined" : "filled"}
                disabled={index !== words.length - 1}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "1.5rem", // Adjust the font size as needed
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "auto", // Let the height be dynamic based on content
                    padding: "9px", // More padding to increase the size
                  },
                  my: 1, // More vertical space
                  width: "100%", // Use the full width of the parent box
                  borderRadius: "20px", // Adjust the border-radius if needed
                }}
              />
            </Box>
            {index === words.length - 1 && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  disabled={errorMessage !== ""}
                  onClick={handleAddWord}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#A2D6F9",
                    fontSize: "1.5rem", // Increases the font size in the button
                    width: "200px", // Adjust the width as needed
                    height: "80px", // Adjust the height to match the input fields
                    borderRadius: "20px", // Adjust the border-radius if needed
                    ":hover": {
                      backgroundColor: "#1E96FC",
                    },
                  }}
                >
                  Add word
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
            color: "#545677",
          }}
        >
          {levelData.endWord}
        </Typography>
      </Box>
    </Container>
  );
};

export default Game;
