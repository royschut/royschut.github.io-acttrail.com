import React, { useState, useEffect } from "react";
import { Card, Typography, Box, Grid, TextField } from "@material-ui/core";

import IconBtn from "../nav/IconBtn";

export const CoolCard = ({
  title = "",
  editable = true,
  items = [],
  elevation = 2,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const [initItems, setInitItems] = useState([]);
  const [itemsCopy, setItemsCopy] = useState([]);

  useEffect(() => {
    setInitItems(items.slice());
    setItemsCopy(items.slice());
  }, [setInitItems, setItemsCopy, items]);

  const onChange = (i, key, value) => {
    let iCopy = [...itemsCopy];
    iCopy[i].value = value;
    setItemsCopy(iCopy);
  };
  const save = () => {
    setEditing(false);
    // props.onAction(title);
    console.log("Has to dispatch an event to UPDATE: ", title);
  };

  const cancel = () => {
    setItemsCopy(initItems);
    setEditing(false);
  };

  //View layout styles
  const styleHeader = { width: "100%", display: "flex", paddingBottom: 15 };

  return (
    <Card
      style={{ padding: 15 }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(editing)}
      elevation={elevation}
    >
      <div style={styleHeader}>
        <div style={{ width: "100%" }}>
          <Typography variant="h6" selectable>
            {title}
          </Typography>
        </div>
        <Box style={{ minWidth: 50 }}>
          {editable && (
            <Box hidden={!hover}>
              <Box display="flex" flexDirection="row">
                {!editing && (
                  <IconBtn
                    label="Edit"
                    iconClass="fas fa-pen-square"
                    size="small"
                    onClick={() => setEditing(true)}
                  />
                )}
                {editing && (
                  <Box display="flex" flexDirection="row">
                    <IconBtn
                      label="Save"
                      iconClass="fas fa-save"
                      size="small"
                      onClick={() => save()}
                    />
                    <IconBtn
                      label="Cancel"
                      iconClass="fas fa-window-close"
                      size="small"
                      onClick={() => cancel()}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </div>
      <Grid container spacing={1}>
        {itemsCopy.map((item, i) => (
          <>
            <Grid item xs={5}>
              <Typography variant="body2"> {item.label + ": "} </Typography>
            </Grid>
            <Grid item xs={7}>
              {!editing && (
                <Typography variant="body2">{item.value} </Typography>
              )}
              {editing && (
                <TextField
                  id={item.key}
                  //   variant="outlined"
                  //   style={{ height: 18 }}
                  value={item.value}
                  onChange={(e) => onChange(i, item.key, e.target.value)}
                />
              )}
            </Grid>
          </>
        ))}
      </Grid>
    </Card>
  );
};
export default CoolCard;
