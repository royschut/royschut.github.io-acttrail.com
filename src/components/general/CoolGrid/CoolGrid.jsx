import React from "react";
import { Fade, Grid, makeStyles } from "@material-ui/core";

import CoolGridItem from "./CoolGridItem";

const useStyles = makeStyles((theme) => {
  return {
    grid: {
      backgroundColor: theme.palette.softerBackground,
      boxShadow: "0px 1px 45px 5px rgba(180,180,180,0.09)",
      border: "1px solid rgba(0,0,0,0.05)",
      borderRadius: 25,
    },
  };
});

export default function CoolGrid(props) {
  const classes = useStyles();

  if (props.selectedIndex) {
    //ref.current.scrollLeft = props.selectedIndex * 81;
  }
  const overfl = props.multiline
    ? { overflowX: "hidden", overflowY: "auto" }
    : { overflowY: "hidden", overflowX: "auto", justifyContent: "center" };

  let cnt = 0; //For timeout calculation (ID can be too high)

  return (
    <Grid
      container
      className={"CoolGrid " + classes.grid}
      spacing={4}
      direction={props.multiline ? "row" : "column"}
      justify="flex-start"
      alignContent="flex-start"
      style={overfl}
    >
      {props.list && (
        <>
          {props.list.map((tile, id) => (
            <Fade in={props.list.length > 0} timeout={100 * cnt++} key={id}>
              <Grid item>
                <CoolGridItem
                  img={tile.assetsrc}
                  name={tile.name}
                  small={props.small ? props.small : !props.multiline}
                  selected={tile.id === props.selectedID}
                  onClick={(e) => props.itemClicked(tile.id)}
                  clickable
                  deleteMode={props.deleteMode}
                />
              </Grid>
            </Fade>
          ))}
        </>
      )}
    </Grid>
  );
}
