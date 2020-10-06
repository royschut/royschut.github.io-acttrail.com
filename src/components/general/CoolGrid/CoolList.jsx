import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Avatar,
  ListItemAvatar,
  Fade,
  Zoom,
} from "@material-ui/core";
import { useState } from "react";

import IconBtn from "../nav/IconBtn";
import CoolGridItem from "./CoolGridItem";
import { BaseURL, UploadURL } from "../../../data/Constants";

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
    // console.log("clicked", id);
    if (props.deleteMode) props.requestDelete(id);
    else props.itemClicked(id);
  };

  let cnt = 0; //For timeout calculation (ID can be too high)

  return (
    <List className={"CoolList"} component="nav">
      {props.list && (
        <>
          {props.list.map((l, id) => (
            <Zoom in={props.list.length > 0} timeout={100 * cnt++} key={id}>
              <ListItem
                key={id}
                onClick={(e) => itemClicked(l.id)}
                selected={props.selectedID === l.id}
                onMouseOver={(e) => setHover(id)}
                onMouseOut={(e) => setHover(false)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={UploadURL + l.assetsrc}
                    alt={l.name}
                    className={classes.large}
                  >
                    {l.name}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  style={{ width: "100%" }}
                  primary={l.name}
                  secondary={l[props.secondaryKey]}
                />
                {hover === id && props.deleteMode && (
                  <IconBtn
                    label="Delete"
                    iconClass="fas fa-trash-alt"
                    size="small"
                    selectedColor="error"
                    selected
                    onMouseOver={(e) => setHover(id)}
                  />
                )}
              </ListItem>
            </Zoom>
          ))}
        </>
      )}
    </List>
  );
}
