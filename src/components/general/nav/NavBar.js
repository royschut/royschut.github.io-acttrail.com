import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import NavButton from "./NavButton";
import { logout } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    navbar: {
      position: "fixed",
      height: "inherit",
      width: "inherit",
      // backgroundColor: "blue",
    },
    navbarLeft: {
      padding: "30px 0px 20px 0px",
    },
    navbarBottom: {
      //
    },
    avatar: {
      color: theme.palette.deselectedGray,
    },
    avatarSelected: {
      color: theme.palette.normalText,
      fontWeight: "bold",
    },
    expander: {
      width: 20,
      height: 20,
      cursor: "pointer",
      paddingLeft: 5,
      "&:hover": {
        border: "1px solid rgba(0,0,0,0.3)",
      },
    },
    logoutButton: {
      fontSize: "1em",
      marginBottom: 15,
      color: theme.palette.deselectedGray,
    },
  };
});

export default function NavBar(props) {
  const isNavPage = props.pageData.main.some((p) => p.id === props.curPage);
  const topBtn = props.pageData.top;
  const mainMenu = props.pageData.main;
  const bottom1 = props.pageData.bottom1;
  const bottom2 = props.pageData.bottom2;

  const pageIndex = isNavPage
    ? mainMenu.findIndex((p) => p.id === props.curPage)
    : mainMenu.length / 2;

  const calculateMargin = () => {
    let m = 48 * pageIndex + 180;
    //todo: max and min for smaller windows
    return m;
  };
  const classes = useStyles();

  return (
    <Box
      component="header"
      className={
        classes.navbar +
        " nav_scrolling " +
        (props.smallScreen ? classes.navSmall : classes.navLeft)
      }
      display="flex"
      flexDirection={props.smallScreen ? "row" : "column"}
      alignItems="center"
      justifyContent="center"
    >
      {!props.xsScreen && (
        <Box style={{ width: props.smallScreen ? "auto" : "100%" }}>
          <Link to={"/" + topBtn.id}>
            <NavButton
              label={props.userVO.firstname}
              tooltip={topBtn.label}
              avatar={<Avatar src="./img/0.jpg" alt={props.userVO.firstname} />}
              selected={topBtn.id === props.curPage}
              smallScreen={props.smallScreen}
              menuExpanded={props.menuExpanded}
            />
          </Link>
        </Box>
      )}
      <Box
        component="nav"
        display="flex"
        flexDirection="inherit"
        justifyContent="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Box
          display="flex"
          component="ul"
          flexDirection="inherit"
          justifyContent={props.smallScreen ? "center" : ""}
          style={{
            overflow: "hidden",
            height: "100%",
            width: "100%",
            marginTop: !props.smallScreen
              ? "calc(50vh - " + calculateMargin() + "px)"
              : "",
          }}
          className={!props.smallScreen ? "nav_scrolling" : ""}
        >
          {mainMenu.map(
            (m) =>
              (m.xs || !props.xsScreen) && (
                <React.Fragment key={m.id}>
                  <li
                    key={m.id}
                    style={{
                      width: !props.smallScreen ? "100%" : "",
                      height: props.smallScreen ? "100%" : "",
                    }}
                  >
                    <Link to={"/" + m.id}>
                      <NavButton
                        label={m.label}
                        iconClass={m.iconClass}
                        selected={props.curPage === m.id}
                        small={m.small}
                        smallScreen={props.smallScreen}
                        menuExpanded={props.menuExpanded}
                      />
                    </Link>
                  </li>
                </React.Fragment>
              )
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          width: props.smallScreen ? "auto" : "100%",
          paddingRight: "20%",
        }}
      >
        <NavButton
          label={bottom1.iconClass}
          iconClass={bottom1.iconClass}
          smallScreen={props.smallScreen}
          small={bottom1.small}
          onClick={(e) => props.logout()}
        />
      </Box>
      <Box style={{ width: props.smallScreen ? "auto" : "100%" }}>
        <Link to={"/" + bottom2.id}>
          <NavButton
            label={bottom2.label}
            iconClass={bottom2.iconClass}
            selected={bottom2.id === props.curPage}
            smallScreen={props.smallScreen}
            menuExpanded={props.menuExpanded}
          />
        </Link>
      </Box>
    </Box>
  );
}
