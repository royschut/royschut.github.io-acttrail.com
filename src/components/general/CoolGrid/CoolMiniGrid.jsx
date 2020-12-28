import { Box, Divider } from "@material-ui/core";
import React from "react";
import IconBtn from "../nav/IconBtn";
import CGContainer from "./CGContainer";
import CoolGrid from "./CoolGrid";

export default function CoolMiniGrid(props) {
  return (
    <Box style={{ width: "100%", height: 150, marginBottom: 25 }}>
      <CoolGrid
        list={props.list}
        selectedID={props.selectedID}
        multiline={false}
        tiny
        isSquare={props.isSquare}
        itemClicked={(id) => props.setSelectedID(id)}
      />
      <Divider />
    </Box>
  );
}
