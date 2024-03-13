import React from "react";
import Button from "@mui/material/Button";
import { GameButtonProps } from "@/interfaces/GameButtonProps";

const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  startIcon,
  disabled,
  text,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled}
      disableRipple
      sx={{
        textTransform: "none",
        boxSizing: "border-box",
        backgroundColor: "#CC5803",
        fontSize: "1.5rem", // Increases the font size in the button
        width: "200px", // Adjust the width as needed
        height: "80px", // Adjust the height to match the input fields
        borderRadius: "20px", // Adjust the border-radius if needed
        ":hover": {
          backgroundColor: "#e26003",
          transition: "background-color 0.3s ease-in-out",
        },
        ":active": {
          backgroundColor: "#b04b03",
          // Add a transition effect for the hover state
          transition: "background-color 0.3s ease-in-out",
        },
        // Define a transition for the base state as well
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {text}
    </Button>
  );
};

export default GameButton;
