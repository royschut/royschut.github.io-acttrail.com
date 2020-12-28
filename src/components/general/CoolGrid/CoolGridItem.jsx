import React, { useState } from "react";
import {
  ButtonBase,
  Avatar,
  makeStyles,
  Tooltip,
  Card,
} from "@material-ui/core";
import { UploadURL } from "../../../data/Constants";

const useStyles = makeStyles((theme) => {
  const pRgb = theme.palette.primary.rgb;
  return {
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      [theme.breakpoints.down("sm")]: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
    },
    medium: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    small: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    tinyPlus: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    tiny: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    card: {
      borderRadius: "50%",
      boxSizing: "box-content",
      border: "1px solid rgba(0,0,0,0.0)",
      opacity: "0.9",
      "&:hover": {
        opacity: 1,
        border: "1px solid rgba(0, 0, 0, 0.6)",
        boxShadow: "0px 0px 10px 5px rgba(" + pRgb + ",0.11)", //"rgba(0,0,0,0.6)", // + ", 0px 0px 10px " + p,
      },
    },
    selCard: {
      borderRadius: "50%",
      opacity: "1",
      border: "1px solid white",
      // border: "1px solid " + theme.palette.primary.light,
      boxShadow:
        "0px 0px 3px rgba(0, 0, 2, 0.6), 0px 0px 10px rgba(0, 0, 0, 0.2)",
    },
  };
});

export default function CoolGridItem(props) {
  const classes = useStyles();
  const [hovered, setHovered] = useState();
  const elevation = (hovered ? 2 : 1) + (props.selected ? 7 : 0);
  const selected = props.selected;

  let size = "";
  if (props.tiny) size = selected ? classes.tinyPlus : classes.tiny;
  else if (props.small) size = selected ? classes.medium : classes.small;
  else size = classes.large;

  return (
    <Card
      elevation={elevation}
      className={props.selected ? classes.selCard : classes.card + " " + size}
      style={{ borderRadius: props.isSquare ? "15%" : "50%" }}
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
    >
      <Tooltip title={props.name} placement="bottom" enterDelay={500}>
        <ButtonBase
          // className={props.selected ? classes.selBtn : classes.btn}
          elevation={4}
          variant="contained"
        >
          <Avatar
            src={UploadURL + props.img}
            alt={props.name}
            onClick={(e) => props.onClick()}
            className={"CoolGridItem " + size}
            style={{ borderRadius: "inherit" }}
          >
            {props.name}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Card>
  );
}
