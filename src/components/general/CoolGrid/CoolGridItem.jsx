import React, { useState } from "react";
import {
  ButtonBase,
  Avatar,
  makeStyles,
  Tooltip,
  Box,
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
    card: {
      borderRadius: "50%",
      boxSizing: "box-content",
      border: "1px solid rgba(0,0,0,0.0)",
      opacity: "0.9",
      "&:hover": {
        opacity: 1,
        border: "1px solid " + "rgba(0, 0, 0, 0.6)",
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

  const size = props.small
    ? props.selected
      ? classes.medium
      : classes.small
    : classes.large;

  return (
    <Card
      elevation={elevation}
      className={props.selected ? classes.selCard : classes.card + " " + size}
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
          >
            {props.name}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Card>
  );
}
