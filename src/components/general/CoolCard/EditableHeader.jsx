import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import IconBtn from "../nav/IconBtn";

export default function EditableHeader(props) {
  const [editing, setEditing] = useState();
  const [hover, setHover] = useState();
  const [titleCopy, setTitleCopy] = useState();

  useEffect(() => {
    if (props.title) setTitleCopy(props.title.substring(0));
  }, [props.title]);

  const save = () => {
    props.onChange(titleCopy);
    setEditing(false);
  };
  const cancel = () => {
    setTitleCopy(props.title.substring(0));
    setEditing(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      style={{ width: "100%" }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      {props.headerIcon && <Icon className={props.headerIcon} />}

      {!editing && <Typography variant="h6">{props.title}</Typography>}
      {editing && (
        <FormControl
        //    className={classes.formControl}
        >
          <TextField
            id={"title"}
            value={titleCopy}
            variant="outlined"
            //   className={classes.input}
            // helperText={valProps[i] ? "Has to validate" : ""}
            //   error={(e) => console.log("check", e)}
            onChange={(e) => setTitleCopy(e.target.value)}
          />
        </FormControl>
      )}
      {props.editable && hover && (
        <Controls
          editing={editing}
          setEditing={() => setEditing(true)}
          cancel={() => cancel()}
          save={() => save()}
        />
      )}
    </Box>
  );
}
function Controls(props) {
  return (
    <Box
      style={{
        minWidth: 38,
      }}
    >
      <Box display="flex" flexDirection="row">
        {!props.editing && (
          <IconBtn
            label="Edit"
            iconClass="fas fa-pen"
            size="small"
            fontSize="0.8em"
            onClick={() => props.setEditing()}
          />
        )}
        {props.editing && (
          <Box display="flex" flexDirection="row">
            <IconBtn
              label="Save"
              iconClass="fas fa-save"
              size="small"
              onClick={() => props.save()}
              fontSize="0.8em"
            />
            <IconBtn
              label="Cancel"
              iconClass="fas fa-window-close"
              size="small"
              fontSize="0.8em"
              onClick={() => props.cancel()}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
