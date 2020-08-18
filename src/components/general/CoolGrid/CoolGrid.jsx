import React from "react";
import { Grid } from "@material-ui/core";

import CoolGridItem from "./CoolGridItem";

export default function CoolGrid(props) {
  if (props.selectedIndex) {
    //ref.current.scrollLeft = props.selectedIndex * 81;
  }
  const overfl = props.multiline
    ? { overflowX: "hidden", overflowY: "auto" }
    : { overflowY: "hidden", overflowX: "auto" };

  return (
    <Grid
      container
      className="CoolGrid"
      spacing={3}
      direction={props.multiline ? "row" : "column"}
      justify="flex-start"
      alignContent="flex-start"
      style={overfl}
    >
      {props.list &&
        props.list.length > 0 &&
        props.list.map((tile, i) => (
          <Grid item key={i}>
            <CoolGridItem
              img={tile.assetsrc}
              name={tile.name}
              small={!props.multiline}
              selected={tile.id === props.selectedID}
              onClick={(e) => props.itemClicked(tile.id)}
              clickable
              deleteMode={props.deleteMode}
            />
          </Grid>
        ))}
    </Grid>
  );
}
