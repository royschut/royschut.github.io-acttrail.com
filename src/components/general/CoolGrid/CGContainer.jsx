import React, { useState } from "react";
import { Paper } from "@material-ui/core";

import IconBtn from "../nav/IconBtn";
import CoolGrid from "./CoolGrid";
import CoolList from "./CoolList";

const VT_GRID = 0;
const VT_LIST = 1;

CGContainer.defaultProps = {
  multiline: true,
  list: [],
  selectedID: null,
  setSelectedID: () => {},
  requestCreate: () => {},
};

export default function CGContainer(props) {
  const [viewType, setViewType] = useState(VT_GRID);
  const [deleteMode, setDeleteMode] = useState();

  return (
    <Paper
      elevation={3}
      style={{
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: props.multiline ? 20 : 10,
        paddingBottom: props.multiline ? 20 : 0,
        width: "100%",
        height: "100%",
        minHeight: "200",
      }}
    >
      {props.multiline && (
        <div className="CoolGrid_viewControl">
          <div>
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
          </div>
        </div>
      )}

      {viewType === VT_GRID && (
        <CoolGrid
          list={props.list}
          selectedID={props.selectedID}
          multiline={props.multiline}
          itemClicked={(id) => props.setSelectedID(id)}
        />
      )}
      {viewType === VT_LIST && (
        <CoolList
          list={props.list}
          selectedID={props.selectedID}
          deleteMode={deleteMode}
          itemClicked={(id) => props.setSelectedID(id)}
          requestDelete={(id) => props.requestDelete(id)}
        />
      )}
    </Paper>
  );
}
