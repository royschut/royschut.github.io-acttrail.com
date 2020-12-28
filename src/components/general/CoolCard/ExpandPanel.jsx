import React, { useState } from "react";
import {
  Card,
  Collapse,
  Typography,
  Icon,
  IconButton,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
  },
  featured: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: 25,
  },
  featuredSec: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: 25,
  },
  mainCard: {
    borderRadius: 25,
    // marginTop: 10,
    width: "100%",
  },
  bgr: {
    boxShadow: theme.boxShadowWide,
    border: theme.thinnerBorder,
    backgroundColor: theme.palette.softerBackground,
  },
  nobgr: {
    background: "none",
  },
  mainCardFeatured: {
    background: "none",
    color: theme.palette.secondary.contrastText,
  },
}));
export default function ExpandPanel(props) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);
  const [hover, setHover] = useState(false);

  const expandable = props.expandable === false;
  const hasBackground = props.hasBackground === true;

  const ftClass = props.featured
    ? props.secondary
      ? classes.featuredSec
      : classes.featured
    : "";

  return (
    <Box
      elevation={props.elevation ? props.elevation : 0}
      className={classes.root + " " + ftClass}
    >
      <Box
        onMouseOver={(e) => setHover(true)}
        onMouseOut={(e) => setHover(false)}
        style={{ width: "100%" }}
      >
        <Box style={{ width: "100%" }}>
          <Box
            display="flex"
            flexDirection="row"
            style={{ width: "100%", cursor: "pointer" }}
          >
            {props.headerIcon && (
              <Icon
                className={props.headerIcon}
                style={{
                  marginRight: 20,
                  marginLeft: props.featured ? 0 : 10,
                  marginTop: 5,
                  fontSize: props.featured ? "1.4rem" : "1.1rem",
                }}
              />
            )}
            <Typography
              variant="h6"
              style={{
                fontWeight: props.featured ? "bold" : "normal",
                width: "100%",
              }}
              onClick={(e) => setCollapsed(!collapsed)}
            >
              {props.title}
            </Typography>
            {(props.controls || expandable) && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="100%"
              >
                {props.controls || ""}
                <div style={{ minWidth: 30 }}>
                  {expandable && hover && (
                    <IconButton
                      color="primary"
                      aria-label="Collapse panel"
                      onClick={(e) => setCollapsed(!collapsed)}
                      size={"small"}
                      style={{ paddingTop: 0, marginTop: 0 }}
                    >
                      <Icon
                        className={
                          "fas fa-chevron-" + (collapsed ? "up" : "down")
                        }
                        color="primary"
                        style={{ fontSize: "0.6em" }}
                      />
                    </IconButton>
                  )}
                </div>
              </Box>
            )}
          </Box>
          <div style={{ minHeight: 13, width: "100%", marginTop: 4 }}>
            <Divider light hidden={!hover} />
          </div>
        </Box>
      </Box>
      <Collapse in={collapsed} collapsedHeight={0}>
        <Card
          className={
            (props.featured ? classes.mainCardFeatured : classes.mainCard) +
            " " +
            (hasBackground ? classes.bgr : classes.nobgr)
          }
          elevation={0}
          style={{ padding: 25 }}
        >
          {props.children}
        </Card>
      </Collapse>
    </Box>
  );
}
