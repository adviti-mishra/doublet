import { GameLevelWordsProps } from "@/interfaces/GameLevelWordsProps";
import { Typography } from "@mui/material";

const GameLevelWords: React.FC<GameLevelWordsProps> = ({ word }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        fontSize: "2rem", // Adjust this value to match the TextField font size
        textAlign: "left", // Center the text if needed
        mb: 2, // Margin bottom for spacing
        color: "#392A16",
      }}
    >
      {word}
    </Typography>
  );
};

export default GameLevelWords;
