import { Box, useTheme } from "@material-ui/core";
import React from "react";

export default function LandingArt(props) {
  const theme = useTheme();
  const mainColor = "white"; //theme.palette.secondary.main;
  const fillOpacity = 0;
  const strokeWidth = 8;
  return (
    <Box className={props.className}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Bubbles</title>
          <ellipse
            ry="14vmin"
            rx="14vmin"
            cy="65%"
            cx="-3vmin"
            stroke={mainColor}
            strokeWidth={strokeWidth}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
          <ellipse
            ry="10vmin"
            rx="10vmin"
            cy="26%"
            cx="23%"
            stroke={mainColor}
            strokeWidth={strokeWidth * 0.8}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
          <ellipse
            ry="6vmin"
            rx="6vmin"
            cy="11.5%"
            cx="48%"
            stroke={mainColor}
            strokeWidth={strokeWidth * 0.6}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
          <ellipse
            ry="3.5vmin"
            rx="3.5vmin"
            cy="13%"
            cx="71%"
            stroke={mainColor}
            strokeWidth={strokeWidth * 0.4}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
          <ellipse
            ry="2vmin"
            rx="2vmin"
            cy="35%"
            cx="85%"
            stroke={mainColor}
            strokeWidth={strokeWidth * 0.3}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
          <ellipse
            ry="1vmin"
            rx="1vmin"
            cy="65%"
            cx="92%"
            stroke={mainColor}
            strokeWidth={strokeWidth * 0.2}
            fill={mainColor}
            fillOpacity={fillOpacity}
            opacity="1"
          />
        </g>
      </svg>
    </Box>
  );
}
