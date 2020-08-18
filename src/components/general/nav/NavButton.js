import React from "react";
import { IconButton, Icon, Tooltip, Box } from "@material-ui/core";

export default function NavButton(props) {
  //props.icon.className = "icon btn" + (props.selected ? " selected" : "");

  return (
    <Box className="navButton">
      <div className="navButtonIndicator">
        {props.selected && <Box bgcolor="secondary.main">&nbsp;</Box>}
      </div>
      <Box className="navIconContainer">
        <Tooltip
          title={props.label}
          placement="right-start"
          arrow
          enterDelay={500}
        >
          <IconButton
            color="primary"
            aria-label={props.label}
            onClick={(e) => props.onClick(e)}
          >
            <Icon
              className={props.iconClass}
              color={props.selected ? "secondary" : "primary"}
              style={{ minWidth: 30 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
