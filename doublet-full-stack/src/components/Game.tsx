import React, { useState, useEffect } from "react";
import { useGameLevel } from "@/hooks/useGameLevel";
// import { GameState } from "@/interfaces/GameState";
import "../Game.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isValidWord } from "@/utils/gameUtils";
import GameButton from "./Game/GameButton";
import GameLevelWords from "./Game/GameLevelWords";
import { useWordChecker } from "react-word-checker";
import { GameProps } from "@/interfaces/GameProps";

const Game: React.FC<GameProps> = ({ level }) => {
  // store current state of winning
  const [isWin, setIsWin] = useState<boolean>(false);
  // store current state of levelId
  const [currentLevelId, setCurrentlevelId] = useState<string>(level.toString());
  // store number of tries left for the day
  const [triesLeft, setTriesLeft] = useState<number>(3);
  // store levelData
  const levelData = useGameLevel(currentLevelId);
  // store current state of words inputted
  const [inputWords, setInputWords] = useState<string[]>([""]);
  // store state of error message of most recent word
  const [errorMessage, setErrorMessage] = useState<string>("");
  // store state to trigger word checks
  const [wordToCheck, setWordToCheck] = useState("");

  const { words, isLoading, wordExists } = useWordChecker("en");

  useEffect(() => {
    if (wordToCheck && !isLoading) {
      const exists = wordExists(wordToCheck.toUpperCase()); // Ensuring case-insensitivity
      if (!exists) {
        setErrorMessage("Please enter a valid English word");
      } else {
        // word exists
        // proceed with post-validation success logic
        setErrorMessage(""); // Clear out error message
        if (wordToCheck === levelData?.endWord) {
          alert("Congratulations! You won this level!");
          setIsWin(false);
          setInputWords([""]);
          setCurrentlevelId((parseInt(currentLevelId) + 1).toString());
        } else {
          setInputWords([...inputWords, ""]);
        }
      }
      // Reset wordToCheck after checking
      setWordToCheck("");
    }
  }, [wordToCheck, isLoading, wordExists]);

  // reflect upper case input in list of words
  const handleChange = (value: string) => {
    // shallow copy of words
    const newInputWords = [...inputWords];
    // adding new input in upper case
    newInputWords[inputWords.length - 1] = value.toUpperCase();
    // reflecting it in the list of words
    setInputWords(newInputWords);
    // clearing out the error message since a new word / first word is being typed in
    setErrorMessage("");
  };

  const handleDeleteWords = () => {
    // clear out words
    setInputWords([""]);
    // decrement number of tries
    setTriesLeft((prev) => prev - 1);
    // announce number of tries left
  };

  const handleAddWord = () => {
    if (isWin) {
      return;
    }
    // access the last word
    const lastWord = inputWords[inputWords.length - 1];
    // access the second last word
    const secondLastWord =
      inputWords.length > 1
        ? inputWords[inputWords.length - 2]
        : levelData?.startWord;

    if (secondLastWord !== undefined) {
      // perform validation
      const validationStatus = isValidWord(lastWord, secondLastWord);
      // If invalid
      if (validationStatus !== "") {
        setErrorMessage(validationStatus);
      } else {
        setWordToCheck(lastWord);
      }
      // valid
      // perform valid English word check

      // else {
      // If valid
      // setErrorMessage(""); // Clear out error message
      // if (lastWord === levelData?.endWord) {
      //  alert("Congratulations! You won this level!");
      //  setIsWin(false);
      //  setWords([""]);
      //  setCurrentlevelId((parseInt(currentLevelId) + 1).toString());
      // } else {
      //  setWords([...words, ""]);
      //  }
    }
  };

  // levelData not yet fetched
  if (!levelData) return <Typography>Loading...</Typography>;

  return (
    <Container
      maxWidth="xl" // Adjust to 'lg' or 'xl' for a larger container
      sx={{
        backgroundColor: "#FAF0CA",
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
          backgroundColor: "#F4D35E",
          width: "80%", // Increase this to make the box wider
          maxWidth: "800px", // You can adjust this as needed
          p: 4, // Padding inside the box for spacing
          display: "flex",
          flexDirection: "column",
          alignItems: "left", // Center children horizontally
          justifyContent: "center", // Center children vertically
          gap: 3, // Space between items
          borderRadius: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // This adds a shadow to create the lifted tile effect
          // You can adjust the x-offset, y-offset, blur-radius, and spread-radius to get the desired effect
          transition: "box-shadow 0.3s", // Smooth transition for the shadow, can be omitted if not needed
          "&:hover": {
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)", // Optional: Change shadow on hover for an interactive effect
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#392A16",
            fontSize: "2.5rem", // Increase this to make the text larger
            textAlign: "center",
            mb: 4, // Increase bottom margin to add more space
          }}
        >
          Level: {levelData.levelId}
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#392A16",
            fontSize: "1.5rem", // Increase this to make the text larger
            textAlign: "center",
            mb: 4, // Increase bottom margin to add more space
          }}
        >
          {triesLeft}
          {triesLeft == 1 ? " attempt left" : " attempts left"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns the button to the right
          }}
        >
          <GameButton
            onClick={handleDeleteWords}
            startIcon={<RestartAltIcon />}
            disabled={inputWords.length === 1}
            text="Reset"
          />
        </Box>
        <GameLevelWords word={levelData.startWord} />
        {inputWords.map((word: string, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevent the default action to avoid form submission if wrapped in a form
                    handleAddWord(); // Call the same function as the button click
                  }
                }}
                //margin="normal"
                variant="outlined"
                error={index === inputWords.length - 1 && errorMessage !== ""}
                helperText={index === inputWords.length - 1 ? errorMessage : ""}
                disabled={index !== inputWords.length - 1}
                autoFocus={index === inputWords.length - 1}
                sx={{
                  // height: "80px",  // removed with Brian
                  boxSizing: "border-box",
                  borderRadius: "20px", // Adjust the border-radius if needed
                  "& .MuiInputBase-input": {
                    fontSize: "1.5rem", // Adjust the font size as needed
                    // padding: "10px", // Adjust padding to match your design
                    borderRadius: "20px", // This should match the fieldset border-radius
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "80px",
                    borderRadius: "20px", // Ensure this matches the input border-radius
                    backgroundColor: "#ffffff", // Set the background color for the entire component
                    "& fieldset": {
                      borderRadius: "20px", // Ensure this matches the input border-radius
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main", // Color when the TextField is focused
                    },
                    "&.Mui-error fieldset": {
                      borderColor: "error.main", // Color when there is an error
                    },
                  },
                  my: 1, // More vertical space
                  width: "100%", // Use the full width of the parent box
                  margin: 0,
                }}
              />
            </Box>
            {index === inputWords.length - 1 && (
              <GameButton
                onClick={handleAddWord}
                startIcon={<AddIcon />}
                disabled={
                  errorMessage !== "" ||
                  inputWords[inputWords.length - 1].length === 0
                }
                text="Add word"
              />
            )}
          </Box>
        ))}
        <Typography
          variant="body1"
          sx={{
            fontSize: "2rem", // Adjust this value to match the TextField font size
            textAlign: "left", // Center the text if needed
            mb: 2, // Margin bottom for spacing
            color: "#392A16",
          }}
        >
          {levelData.endWord}
        </Typography>
      </Box>
    </Container>
  );
};

export default Game;
