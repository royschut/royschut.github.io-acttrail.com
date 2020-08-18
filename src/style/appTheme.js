import { createMuiTheme } from "@material-ui/core";

export default function appTheme() {
  return createMuiTheme({
    palette: {
      primary: {
        main: "#344955", // main: "#3667e7",
      },
      secondary: {
        main: "#F9AA33", // main: "#FF9900",
        contrastText: "#1f2c33",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });
}
