import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { showcaseData } from "../../data/Constants";

const useStyles = makeStyles((theme) => {
  return {
    showcase2: {
      margin: 50,
    },
    item: {
      marginBottom: "15vh",
      width: "90vw",
      height: "70vh",
      textShadow: "0 5px 30px 0 rgba(255,0,0,17)",
    },
    itemDir: {
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    itemDirReverse: {
      flexDirection: "row-reverse",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    img: {
      maxWidth: "50vw",
      height: "80%",
      boxShadow: "0 5px 30px 0 rgba(0,0,0,.17)",
      border: "1px solid #FAFAFA",
      borderRadius: 10,
      objectFit: "cover",
      objectPosition: "left",
    },
    imgStack: {
      width: "60vw",
      height: "60vh",
      // marginBottom: 30,
      position: "relative",
    },
  };
});
export default function Showcase(props) {
  const classes = useStyles();
  const data = showcaseData;

  return (
    <Box className={classes.showcase2}>
      {data.map((item, i) => (
        <>
          <Box
            display="flex"
            className={
              classes.item +
              " " +
              (i % 2 ? classes.itemDir : classes.itemDirReverse)
            }
            alignItems="center"
            justifyContent="center"
          >
            <Img assets={item.assets} />
            <Box m={8}>
              <Typography variant="h2" style={{ zIndex: 11 }}>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.body}</Typography>
            </Box>
          </Box>
          {i < data.length - 1 && <Divider variant="fullWidth" />}
        </>
      ))}
    </Box>
  );
}
function Img({ alt="Presentation image", assets }) {
  const classes = useStyles();

  if (assets.length === 1) {
    return (
      <img src={`img/landing/showcase/${assets[0]}`} className={classes.img} alt={alt} />
    );
  } else if (assets.length > 1) {
    const imgDist = 140;
    return (
      <div className={classes.imgStack}>
        {assets.map((a, i) => (
          <img
            src={"img/landing/showcase/" + assets[i]}
            className={classes.img}
            alt={alt}
            style={{
              position: "absolute",
              left: `calc(10px + ${i} * ${imgDist}px)`,
              top: `calc(10px + ${i} * ${imgDist}px)`,
            }}
          />
        ))}
      </div>
    );
  }
}
