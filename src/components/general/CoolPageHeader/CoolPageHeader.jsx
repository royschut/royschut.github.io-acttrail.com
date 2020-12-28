import { Box, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import EditableHeader from "../CoolCard/EditableHeader";
import CGContainer from "../CoolGrid/CGContainer";
import IconBtn from "../nav/IconBtn";
import PageAvatar from "../PageAvatar/PageAvatar";

export default function CoolPageHeader(props) {
  const [gridHalfOpen, setGridHalfOpen] = useState(false);

  return (
    <Grid container style={{ paddingBottom: 25 }} spacing={5}>
      <Grid item xs={12} md={gridHalfOpen ? 12 : 8}>
        <Box display="flex" style={{ height: 150 }}>
          {!gridHalfOpen && (
            <>
              <PageAvatar
                assetSrc={props.assetSrc}
                name={props.name}
                gridHalfOpen={gridHalfOpen}
                isSquare={props.isSquare}
                expand={() => setGridHalfOpen(true)}
                showAll={() => props.showAll()}
                uploadPic={() => props.requestUploadPic()}
              />
              <EditableHeader
                title={props.name}
                editable={props.editable !== false}
                onChange={(title) => props.onChange(title)}
              />
              <Divider />
            </>
          )}
          {gridHalfOpen && (
            <>
              <CGContainer
                multiline={false}
                list={props.list}
                selectedID={props.selectedID}
                isSquare={props.isSquare}
                setSelectedID={(id) => props.setSelectedID(id)}
                requestCreate={() => props.requestCreate()}
                requestDelete={(id) => props.requestDelete(id)}
              />
              <div style={{ paddingLeft: 20 }}>
                <IconBtn
                  label={"Smaller"}
                  iconClass={"fas fa-angle-left"}
                  size="small"
                  onClick={(e) => setGridHalfOpen(false)}
                />
                <IconBtn
                  label={"Show all"}
                  iconClass={"fas fa-expand-arrows-alt"}
                  size="small"
                  onClick={(e) => props.showAll()}
                />
              </div>
            </>
          )}
        </Box>
      </Grid>
      {!gridHalfOpen && (
        <Grid item xs={12} md={4}>
          {props.children}
        </Grid>
      )}
    </Grid>
  );
}
