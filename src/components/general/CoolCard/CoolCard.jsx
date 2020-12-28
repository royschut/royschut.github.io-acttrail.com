import React, { useState, useEffect, useCallback } from "react";
import { Box, makeStyles } from "@material-ui/core";

import IconBtn from "../nav/IconBtn";
import ExpandPanel from "./ExpandPanel";
import EditItem from "./EditItem";

const useStyles = makeStyles((theme) => ({
  fullBox: {
    width: "100%",
    height: "100%",
  },
}));

export const CoolCard = (props) => {
  const classes = useStyles();

  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const [items, setItems] = useState();

  
  const renderCopy = useCallback(() => {
    let copy = [];
    props.formData.forEach((i) => {
      copy.push({ ...i });
    });
    setItems(copy);
  }, [props.formData]);
  
  const onChange = (i, value) => {
    let copy = [];
    items.forEach((it) => copy.push(it));
    copy[i].value = value;
    setItems(copy);
  };
  const save = () => {
    let changed = items.filter((it, i) => it.value !== props.formData[i].value);
    let obj = [];
    changed.forEach((it) => (obj[it.key] = it.value));
    props.onChange(obj);
    setEditing(false);
  };
  const cancel = () => {
    renderCopy();
    setEditing(false);
  };
  
  useEffect(() => {
    if (props.formData) renderCopy();
  }, [props.formData, renderCopy]);
  //VIEW

  const expandable = props.expandable !== false;
  const hasBackground = props.hasBackground !== false;
  const editable = props.editable !== false;

  const title = props.title
    ? props.title
    : props.formData.length > 0
    ? props.formData[0].key
    : "";

  return (
    <div
      onMouseOver={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      style={{ width: "100%" }}
    >
      <ExpandPanel
        title={title}
        elevation={props.elevation}
        expandable={expandable}
        featured={props.featured}
        secondary={props.secondary}
        hasBackground={hasBackground}
        headerIcon={props.headerIcon}
        controls={
          editable && (
            <Controls
              editing={editing}
              hover={hover}
              setEditing={(val) => setEditing(val)}
              save={() => save()}
              cancel={() => cancel()}
            />
          )
        }
      >
        <Box className={classes.fullBox}>
          {items &&
            items.map((item, i) => (
              <React.Fragment key={i}>
                <EditItem
                  item={item}
                  editing={editing}
                  hideKeys={props.hideKeys}
                  onChange={(val) => onChange(i, val)}
                />
              </React.Fragment>
            ))}
        </Box>
      </ExpandPanel>
    </div>
  );
};
function Controls(props) {
  return (
    <Box
      style={{
        minWidth: 38,
      }}
    >
      {true && (
        <Box display="flex" flexDirection="row">
          {!props.editing && props.hover && (
            <IconBtn
              label="Edit"
              iconClass="fas fa-pen"
              size="small"
              fontSize="0.8em"
              onClick={() => props.setEditing(true)}
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
      )}
    </Box>
  );
}
export default CoolCard;
