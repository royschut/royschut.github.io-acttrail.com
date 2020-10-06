import { Avatar, Card, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { UploadURL } from "../../../data/Constants";
import IconBtn from "../nav/IconBtn";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  avatarDiv: {
    display: "flex",
    "&:hover div": {
      display: "block",
    },
    marginRight: 30,
    width: 240,
    background: "none",
  },
  gridControlsDiv: {
    height: "100%",
  },
  gridControls: {
    display: "none",
  },
  header: {
    height: 130,
    display: "flex",
    flexDirection: "row",
  },
}));

export default function ArtistPageAvatar(props) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  return (
    <Card
      elevation={hover ? 3 : 0}
      className={classes.avatarDiv + " CoolGridControls"}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Card
        elevation={2}
        style={{
          borderRadius: "50%",
          opacity: "1",
          border: "1px solid white",
          boxShadow:
            "0px 0px 3px rgba(0, 0, 2, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        className={classes.large}
      >
        <Avatar
          src={UploadURL + props.assetSrc}
          alt={props.name}
          style={{ width: "100%", height: "100%" }}
        >
          {props.name}
        </Avatar>
      </Card>
      <div className={classes.gridControls}>
        <IconBtn
          label="Expand"
          iconClass={
            props.gridHalfOpen ? "fas fa-angle-left" : "fas fa-arrows-alt-h"
          }
          size="small"
          onClick={(e) => props.expand(true)}
        />
        <IconBtn
          label="Show all"
          iconClass="fas fa-expand-arrows-alt"
          size="small"
          onClick={(e) => props.showAll()}
        />
        <IconBtn
          label="Upload picture"
          iconClass="fas fa-file-upload"
          size="small"
          onClick={(e) => props.uploadPic()}
        />
      </div>
    </Card>
  );
}
