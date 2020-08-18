import React from "react";
import { IconButton, Icon, Tooltip, Box } from "@material-ui/core";

export default function IconBtn(props) {
  const selectedColor = props.selectedColor ? props.selectedColor : "secondary";
  const selectedLabel = props.selectedLabel ? props.selectedLabel : props.label;

  return (
    <Box className={props.classProp}>
      <Tooltip
        title={props.selected ? selectedLabel : props.label}
        placement="right-start"
        arrow
        enterDelay={500}
      >
        <IconButton
          color="primary"
          aria-label={props.selected ? selectedLabel : props.label}
          onClick={(e) => props.onClick(e)}
          size={props.size ? props.size : "medium"}
        >
          <Icon
            className={props.iconClass}
            color={props.selected ? selectedColor : "primary"}
            style={{ minWidth: 30, fontSize: "1em" }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
