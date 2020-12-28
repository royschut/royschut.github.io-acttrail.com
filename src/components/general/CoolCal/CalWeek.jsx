import React, {  useState } from "react";
import { Button, Box, makeStyles } from "@material-ui/core";

import { days, months } from "../../../data/Constants";
import CoolGridItem from "../CoolGrid/CoolGridItem";

const useStyles = makeStyles((theme) => {
  return {
    weekBox: {
      // borderRadius: 20,
    },
    day: {
      border: "1px solid rgba(0,0,0,0.2)",
      minWidth: 80,
      minHeight: 200,
      width: "100%",
      maxWidth: 300,
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    today: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  };
});

export default function CalWeek(props) {
  const initWeek = () => {
    const date = new Date();
    const firstDayOfWeek = date.getDate() - date.getDay();
    date.setDate(firstDayOfWeek);
    return date;
  };

  const [firstDayCurWeek, setFirstDayCurWeek] = useState(initWeek());

  const setCurWeek = (nr) => {
    const d = new Date(firstDayCurWeek);
    d.setDate(d.getDate() + nr * 7);
    setFirstDayCurWeek(d);
  };

  const classes = useStyles();

  return (
    <>
      <Box>
        <Box style={{ float: "left", minWidth: 200 }}>
          {"Wk " + getWeekNumber(firstDayCurWeek) + " - "}
          {months[firstDayCurWeek.getMonth()] +
            " " +
            firstDayCurWeek.getFullYear()}
        </Box>
        <Button onClick={(e) => setCurWeek(-1)}>{"\u003C"}</Button>
        <Button onClick={(e) => setFirstDayCurWeek(initWeek())}>
          {"Today"}
        </Button>
        <Button onClick={(e) => setCurWeek(1)}>{"\u003E"}</Button>
      </Box>
      <Box display="flex" flexDirection="row" className={classes.weekBox}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <CalDay
            nr={i}
            firstDayCurWeek={firstDayCurWeek}
            viewAsList={props.viewAsList}
            list={props.list}
            onClick={(id) => props.itemClicked(id)}
          />
        ))}
      </Box>
    </>
  );
}
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
function CalDay(props) {
  const today = new Date();
  const d = new Date(props.firstDayCurWeek);
  d.setDate(props.firstDayCurWeek.getDate() + props.nr);
  const isCurDay = d.toDateString() === today.toDateString();

  const itemsFound = props.list.filter(
    (i) => new Date(i.date).toDateString() === d.toDateString()
  );

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.day}>
      <Box
        padding={1}
        borderBottom="1px solid rgba(0,0,0,0.5)"
        style={{ width: "100%" }}
        className={classes.header + (isCurDay ? " " + classes.today : "")}
      >
        {days[props.nr] + " " + d.getDate()}
      </Box>
      <Box padding={1}>
        {/* {itemsFound.length > 0 && props.viewAsList && (
          <CoolList
            list={itemsFound}
            itemClicked={(id) => props.onClick(id)}
            multiline={true}
            small
          />
        )}
        {itemsFound.length > 0 && !props.viewAsList && (
          <CoolGrid
            list={itemsFound}
            multiline={true}
            itemClicked={(id) => props.onClick(id)}
          />
        )} */}
        {itemsFound.map((i) => (
          <CoolGridItem
            img={i.assetsrc}
            name={i.name}
            small
            clickable
            onClick={(e) => props.onClick(i.id)}
          />
        ))}
        {/* {itemsFound.length == 0 && (
          <Typography variant="body2" className={classes.italic}>
            -
          </Typography>
        )} */}
      </Box>
    </Box>
  );
}
