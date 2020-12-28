import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Collapse,
  IconButton,
  Icon,
  Card,
  Divider,
  InputBase,
  makeStyles,
  fade,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import IconBtn from "../nav/IconBtn";
import CoolGrid from "./CoolGrid";
import CoolList from "./CoolList";
import CoolCal from "../CoolCal/CoolCal";

const VT_GRID = 0;
const VT_LIST = 1;
const VT_CAL = 2;

CGContainer.defaultProps = {
  multiline: true,
  list: [],
  selectedID: null,
  setSelectedID: () => {},
  requestCreate: () => {},
};
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function CGContainer(props) {
  const classes = useStyles();

  const [viewType, setViewType] = useState(VT_GRID);
  const [searchValue, setSearchValue] = useState("");
  const [deleteMode, setDeleteMode] = useState();
  const [collapsed, setCollapsed] = useState(true);

  const filteredList = (list) => {
    return searchValue
      ? list.filter(
          (i) => i.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        )
      : list;
  };
  return (
    <Box
      elevation={props.multiline ? 0 : 1}
      style={{
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: props.multiline ? 20 : 8,
        paddingBottom: props.multiline ? 20 : 0,
        width: "100%",
        height: "100%",
        minHeight: "230",
      }}
    >
      {props.multiline && (
        <div className="CoolGrid_viewControl">
          <Typography variant="h5" style={{ paddingBottom: 15 }}>
            {props.title}
          </Typography>
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {props.list.some((i) => i.date) && (
              <IconBtn
                label="Calendar view"
                iconClass="fas fa-calendar-alt"
                size="small"
                selected={viewType === VT_CAL}
                onClick={(e) => setViewType(VT_CAL)}
              />
            )}
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
            <Divider orientation="vertical" />
            <IconBtn
              label="Create"
              iconClass="fas fa-plus-square"
              size="small"
              onClick={() => props.requestCreate()}
            />
            <IconBtn
              label="Delete mode"
              selectedLabel="Cancel delete mode"
              iconClass="fas fa-trash-alt"
              size="small"
              selectedColor="error"
              selected={deleteMode}
              onClick={() => {
                setDeleteMode(!deleteMode);
                setViewType(VT_LIST);
              }}
            />
            {props.expandable && (
              <IconButton
                color="primary"
                aria-label="Collapse panel"
                onClick={(e) => setCollapsed(!collapsed)}
                size={"small"}
                style={{ paddingTop: 0, marginTop: 0 }}
              >
                <Icon
                  className={"fas fa-chevron-" + (collapsed ? "up" : "down")}
                  color="primary"
                  style={{ fontSize: "0.8em" }}
                />
              </IconButton>
            )}
          </div>
        </div>
      )}
      {viewType === VT_GRID && (
        <CoolGrid
          list={filteredList(props.list)}
          selectedID={props.selectedID}
          multiline={props.multiline}
          isSquare={props.isSquare}
          itemClicked={(id) => props.setSelectedID(id)}
        />
      )}
      {viewType === VT_LIST && (
        <CoolList
          list={filteredList(props.list)}
          selectedID={props.selectedID}
          deleteMode={deleteMode}
          secondaryKey={props.secondaryKey}
          isSquare={props.isSquare}
          itemClicked={(id) => props.setSelectedID(id)}
          requestDelete={(id) => props.requestDelete(id)}
        />
      )}
      {viewType === VT_CAL && (
        <CoolCal
          list={filteredList(props.list)}
          selectedID={props.selectedID}
          secondaryKey={props.secondaryKey}
          itemClicked={(id) => props.setSelectedID(id)}
        />
      )}
    </Box>
  );
}
