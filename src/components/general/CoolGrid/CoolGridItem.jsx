import React from "react";
import { ButtonBase, Avatar, makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  btn: {
    borderRadius: "50%",
    boxSizing: "box-content",
    border: "1px solid rgba(0,0,0,0.0)",
    opacity: "0.8",
    "&:hover": {
      opacity: 1,
    },
  },
  selBtn: {
    borderRadius: "50%",
    opacity: "1",
    border: "1px solid white",
    boxShadow:
      "0px 0px 3px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
}));

export default function CoolGridItem(props) {
  const classes = useStyles();

  return (
    <Tooltip title={props.name} placement="bottom" enterDelay={500}>
      <ButtonBase className={props.selected ? classes.selBtn : classes.btn}>
        <Avatar
          src={"img/" + props.img}
          alt={props.name}
          onClick={(e) => props.onClick()}
          className={props.small ? classes.small : classes.large}
        >
          {props.name}
        </Avatar>
      </ButtonBase>
    </Tooltip>
  );
}
