import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";

export default function Settings(props) {
  const darkMode = useTheme().palette.type === "dark";
  return (
    <Box>
      <h2>Settings</h2>
      <IconButton
        onClick={(e) => props.switchDarkLightMode()}
        className={"fas fa-" + (darkMode ? "sun" : "moon")}
      >
        <Typography variant="h6">
          {darkMode ? " Light mode" : " Dark mode"}
        </Typography>
      </IconButton>
    </Box>
  );
}
