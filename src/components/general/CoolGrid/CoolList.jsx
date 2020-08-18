import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import { useState } from "react";

import IconBtn from "../nav/IconBtn";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
export default function CoolList(props) {
  const classes = useStyles();

  const [hover, setHover] = useState();

  const itemClicked = (id) => {
    if (props.deleteMode) props.requestDelete(id);
    else props.itemClicked(id);
  };

  return (
    <List className={"CoolList"} component="nav">
      {props.list && (
        <>
          {props.list.map((l, i) => (
            <ListItem
              key={i}
              onClick={(e) => itemClicked(l.id)}
              selected={props.selectedID === l.id}
              onMouseOver={(e) => setHover(i)}
              onMouseOut={(e) => setHover(false)}
            >
              <ListItemAvatar>
                <Avatar
                  src={"img/" + l.assetsrc}
                  alt={l.name}
                  className={classes.large}
                >
                  {i.name}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ width: "100%" }}
                primary={l.name}
                secondary={l[props.secondaryKey]}
                // secondary={Math.round(Math.random() * 20) + " Bookings"}
              />
              {hover === i && props.deleteMode && (
                <IconBtn
                  label="Delete"
                  iconClass="fas fa-trash-alt"
                  size="small"
                  selectedColor="error"
                  selected
                  onMouseOver={(e) => setHover(i)}
                />
              )}
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
}
