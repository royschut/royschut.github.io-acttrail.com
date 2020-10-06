import React from "react";
import {
  IconButton,
  Icon,
  Tooltip,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    iconBtn: {
      borderRadius: 25,
      color: theme.palette.deselectedGray,
      marginRight: 5,
      "&:hover": {
        color: theme.palette.normalText,
      },
    },
    selected: {
      marginRight: 5,
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    labelAvatar: {
      color: theme.palette.normalText,
    },
    selectedIndicator: {
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export default function NavButton(props) {
  //props.icon.className = "icon btn" + (props.selected ? " selected" : "");

  const classes = useStyles();

  const vert = !props.smallScreen;
  let fontSize = vert
    ? props.selected
      ? "1em"
      : "0.8em"
    : props.selected
    ? "1.4em"
    : "1em";
  fontSize = props.small ? "0.6em" : fontSize;

  return (
    <Box
      // alignItems="center"
      flexDirection={vert ? "row" : "column-reverse"}
      display="flex"
      justifyContent={"space-between"}
    >
      <Box
        display="flex"
        minWidth={vert ? 7 : "100%"}
        minHeight={vert ? "100%" : 7}
      >
        {props.selected && (
          <Box
            className={classes.selectedIndicator}
            minWidth={vert ? 7 : "100%"}
            minHeight={vert ? 40 : 7}
            style={{
              borderRadius: vert ? "0px 10px 10px 0px" : "10px 10px 0px 0px",
              paddingBottom: vert ? 0 : 0,
            }}
          >
            &nbsp;
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        style={{
          paddingLeft: props.selected ? 7 : 10,
        }}
      >
        <Tooltip
          title={"props.tooltip || props.label"}
          // placement="right-start"
          arrow
          // enterDelay={500}
        >
          <>
            <IconButton
              aria-label={props.label}
              className={
                classes.iconBtn + (props.selected ? " " + classes.selected : "")
              }
              onClick={(e) => (props.onClick ? props.onClick(e) : {})}
            >
              {props.avatar || ""}
              {props.iconClass && (
                <Icon
                  className={props.iconClass}
                  style={{
                    fontSize: fontSize,
                    minWidth: "1.3em",
                  }}
                />
              )}
              {props.menuExpanded && (
                <Box
                  display="flex"
                  // justifyContent="center"
                  alignItems="center"
                  style={{ width: "100%", marginLeft: 15 }}
                >
                  <Typography
                    variant="body1"
                    className={props.avatar ? classes.labelAvatar : ""}
                  >
                    {props.label.toUpperCase()}
                  </Typography>
                </Box>
              )}
            </IconButton>
          </>
        </Tooltip>
      </Box>
    </Box>
  );
}
