import { createMuiTheme } from "@material-ui/core";

export default function appTheme(props) {
  const dark = props.darkMode === true;

  const p = dark ? "#7440CF" : "#7440CF";
  // const s = dark ? "#FFB429" : "#FFB429";
  const s = "#ffd359";

  const t = dark ? "#EDEDED" : "#303030";

  const b = dark ? "255, 255, 255" : "0, 0, 0";

  return createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",

      primary: {
        main: p,
        rgb: convertToRGB(p),
      },
      secondary: {
        main: s,
        rgb: convertToRGB(s),
        // contrastText: dark ? "black" : "white",
        boxShadow: "1px 1px 3px 1px rgba(" + convertToRGB(s) + ",0.1)",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,

      softBackground: dark ? "#262526" : "#FBFAFC", //main bgr
      softerBackground: dark ? "#2E2E2E" : "#fdfdfd", //expandPanels
      softestBackground: dark ? "#333333" : "#ffffff", //paper
      deselectedGray: "#b8b8b8",

      normalText: t,
      textRgb: convertToRGB(t),
    },
    boxShadowWide: "1px 1px 30px 1px rgba(0,0,0,0.034)",
    boxShadowBoth:
      "1px 1px 30px 10px rgba(" +
      b +
      ",0.034), 1px 1px 3px 1px rgba(0,0,0,0.1)",
    thinBorder: "1px solid rgba(" + b + ",0.15)",
    thinnerBorder: "1px solid rgba(" + b + ",0.05)",
  });
}

const convertToRGB = (hex) => {
  hex = hex.substring(1);
  if (hex.length !== 6) return "Only six-digit hex colors are allowed.";
  var aRgbHex = hex.match(/.{1,2}/g);
  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
};
// var LightenColor = function (color, percent) {
//   color = color.slice(1);
//   var num = parseInt(color, 16),
//     amt = Math.round(2.55 * percent),
//     R = (num >> 16) + amt,
//     B = ((num >> 8) & 0x00ff) + amt,
//     G = (num & 0x0000ff) + amt;

//   return (
//     "#" +
//     (
//       0x1000000 +
//       (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
//       (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
//       (G < 255 ? (G < 1 ? 0 : G) : 255)
//     )
//       .toString(16)
//       .slice(1)
//   );
// };
