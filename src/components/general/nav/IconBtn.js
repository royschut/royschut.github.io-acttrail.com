import React from "react";
import { IconButton, Icon, Tooltip, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    iconBtn: {
      color: theme.palette.deselectedGray,
      minWidth: 30,
      // marginRight: 15,
    },
    selected: {
      // marginRight: 16,
      color: theme.palette.primary.main,
    },
  };
});

export default function IconBtn(props) {
  const selectedLabel = props.selectedLabel ? props.selectedLabel : props.label;

  const classes = useStyles();

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
          className={
            classes.iconBtn + (props.selected ? " " + classes.selected : "")
          }
        >
          <Icon
            className={props.iconClass}
            style={{
              minWidth: "1.7em",
              minHeight: 24,
              fontSize: props.fontSize ? props.fontSize : "1em",
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
