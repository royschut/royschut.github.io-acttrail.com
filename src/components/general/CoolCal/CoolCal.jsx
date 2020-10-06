import React from "react";
import { makeStyles, Box, Button } from "@material-ui/core";

import { useState } from "react";
import CalWeek from "./CalWeek";
import CalMonth from "./CalMonth";
import CalDay from "./CalDay";
import CalYear from "./CalYear";
import IconBtn from "../nav/IconBtn";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  btn: {
    borderRadius: "0%",
    height: 28,
    boxSizing: "box-content",
    border: "1px solid rgba(0,0,0,0.2)",
    opacity: "0.8",
    "&:hover": {
      opacity: 1,
      color: "theme.palette.primary.main",
    },
  },
  selBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      opacity: "0.8",
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));

const TAB_DAY = 0;
const TAB_WEEK = 1;
const TAB_MONTH = 2;
const TAB_YEAR = 3;

const VT_LIST = 1;
const VT_GRID = 2;

export default function CoolCal(props) {
  const classes = useStyles();

  const [curTab, setCurTab] = useState(TAB_DAY);
  const [viewType, setViewType] = useState(VT_GRID);

  const btn = (nr, name) => (
    <Button
      onClick={(e) => setCurTab(nr)}
      className={classes.btn + " " + (curTab === nr ? classes.selBtn : "")}
    >
      {name}
    </Button>
  );
  return (
    <>
      <Box display="flex" flexDirection="row">
        {btn(TAB_DAY, "Day")}
        {btn(TAB_WEEK, "Week")}
        {btn(TAB_MONTH, "Month")}
        {btn(TAB_YEAR, "Year")}
        <IconBtn
          label="Grid view"
          iconClass="fas fa-grip-horizontal"
          size="small"
          selected={viewType === VT_GRID}
          onClick={(e) => setViewType(VT_GRID)}
        />
        <IconBtn
          label="List view"
          iconClass="fas fa-list-ul"
          size="small"
          selected={viewType === VT_LIST}
          onClick={(e) => setViewType(VT_LIST)}
        />
      </Box>
      <Box style={{ padding: 20 }}>
        {curTab === TAB_DAY && (
          <CalDay
            list={props.list}
            viewAsList={viewType === VT_LIST}
            itemClicked={(id) => props.itemClicked(id)}
          />
        )}
        {curTab === TAB_WEEK && (
          <CalWeek
            list={props.list}
            viewAsList={viewType === VT_LIST}
            itemClicked={(id) => props.itemClicked(id)}
          />
        )}
        {curTab === TAB_MONTH && (
          <CalMonth
            list={props.list}
            viewAsList={viewType === VT_LIST}
            itemClicked={(id) => props.itemClicked(id)}
          />
        )}
        {curTab === TAB_YEAR && (
          <CalYear
            list={props.list}
            viewAsList={viewType === VT_LIST}
            itemClicked={(id) => props.itemClicked(id)}
          />
        )}
      </Box>
    </>
  );
}
