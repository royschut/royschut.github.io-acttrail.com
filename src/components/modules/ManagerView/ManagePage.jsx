import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Grid,
  Card,
  Box,
  makeStyles,
} from "@material-ui/core";

import CGContainer from "../../general/CoolGrid/CGContainer";
import CoolList from "../../general/CoolGrid/CoolList";
import IconBtn from "../../general/nav/IconBtn";

//SITUATIONS
const S_FULLGRID = "FULL GRID";
const S_DETAILSPAGE = "DETAILSPAGE";
const S_DETAILS_SUBPAGE = "DETAILS_SUBPAGE";
const S_DEFAULT = S_FULLGRID;

const styleGridFull = { height: "100%", flexDirection: "column" };
const styleGridHalf = { height: 130, padding: 15 };

export default function ManagePage(props) {
  const [gridHalfOpen, setGridHalfOpen] = useState(false);

  //Calculate the situation
  let situation = S_DEFAULT;
  if (!props.curMainID) situation = S_FULLGRID;
  else if (props.curSubID) situation = S_DETAILS_SUBPAGE;
  else if (!props.curSubID) situation = S_DETAILSPAGE;

  //Render view
  return (
    <>
      {(situation === S_FULLGRID || gridHalfOpen) && (
        <Box
          display="flex"
          style={gridHalfOpen ? styleGridHalf : styleGridFull}
        >
          <CGContainer
            multiline={!gridHalfOpen}
            list={props.mainList}
            selectedID={props.curMainID}
            setSelectedID={(id) => props.setSelectedID(id)}
            requestCreate={() => props.requestNewMain()}
            requestDelete={(id) => props.requestDelete(id)}
          />
          {gridHalfOpen && (
            <HalfGridControls
              setGridHalfOpen={(bln) => setGridHalfOpen(bln)}
              expand={() => props.setSelectedID()}
            />
          )}
        </Box>
      )}
      {situation !== S_FULLGRID && (
        <Grid container spacing={5}>
          {!gridHalfOpen && (
            <>
              <Grid item xs={12} md={8}>
                <Header
                  assetSrc={props.mainVO.assetsrc}
                  name={props.mainVO.name}
                  gridHalfOpen={gridHalfOpen}
                  headerCard={props.headerCard}
                  setGridHalfOpen={() => setGridHalfOpen(true)}
                  setSelectedID={() => props.setSelectedID()}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {props.topCard}
              </Grid>
            </>
          )}
          {situation === S_DETAILSPAGE && (
            <>
              <Grid item xs={12} md={8}>
                <Paper style={{ height: "100%" }}>
                  <Card style={{ padding: 15 }}>
                    <Box flexDirection="row" display="flex">
                      <Box style={{ width: "100%" }}>
                        <Typography variant="h6" selectable>
                          {props.mainCardTitle}
                        </Typography>
                      </Box>
                      <BtnAddSub onClick={(e) => props.requestNewSub()} />
                    </Box>
                    <CoolList
                      list={props.subList}
                      itemClicked={(id) => props.setCurSubID(id)}
                      secondaryKey="name"
                    />
                  </Card>
                </Paper>
              </Grid>
              <Grid item container xs={12} md={4} spacing={5}>
                {props.sideCards.map((c, i) => (
                  <Grid item xs={12} key={i}>
                    {c}
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          {situation === S_DETAILS_SUBPAGE && (
            <Grid item xs={12} style={{ height: "100%" }}>
              <Paper
                elevation={3}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 15,
                  backgroundColor: "#EEEEEE",
                }}
              >
                <Typography variant="h5" style={{ padding: 10 }}>
                  {props.subTitle}
                </Typography>
                {props.subPage}
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
const BtnAddSub = (props) => {
  return (
    <IconBtn
      label="Add Booking"
      iconClass="fas fa-plus-square"
      size="small"
      onClick={(e) => props.onClick()}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  avatarDiv: {
    display: "flex",
    "&:hover div": {
      display: "block",
    },
    width: 150,
  },
  gridControlsDiv: {
    height: "100%",
  },
  gridControls: {
    display: "none",
  },
  header: {
    height: 130,
    display: "flex",
    flexDirection: "row",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  return (
    <Box display="flex" flexDirection="row" style={{ height: 130 }}>
      <Card
        elevation={hover ? 3 : 0}
        className={classes.avatarDiv + " CoolGridControls"}
        onMouseEnter={(e) => setHover(true)}
        onMouseLeave={(e) => setHover(false)}
      >
        <Avatar
          src={"img/" + props.assetSrc}
          alt={props.name}
          className={classes.large}
        >
          {props.name}
        </Avatar>
        <div className={classes.gridControls}>
          <IconBtn
            label="Expand"
            iconClass={
              props.gridHalfOpen ? "fas fa-angle-left" : "fas fa-arrows-alt-h"
            }
            size="small"
            onClick={(e) => props.setGridHalfOpen(true)}
          />
          <IconBtn
            label="Show all"
            iconClass="fas fa-expand-arrows-alt"
            size="small"
            onClick={(e) => props.setSelectedID()}
          />
        </div>
      </Card>
      {props.headerCard}
    </Box>
  );
};
const HalfGridControls = (props) => {
  return (
    <div style={{ paddingLeft: 20 }}>
      <IconBtn
        label={"Smaller"}
        iconClass={"fas fa-angle-left"}
        size="small"
        onClick={(e) => props.setGridHalfOpen(false)}
      />
      <IconBtn
        label={"Show all"}
        iconClass={"fas fa-expand-arrows-alt"}
        size="small"
        onClick={(e) => {
          props.expand();
          props.setGridHalfOpen(false);
        }}
      />
    </div>
  );
};
