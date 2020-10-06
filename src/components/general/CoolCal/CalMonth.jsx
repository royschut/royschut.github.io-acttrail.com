import React, { useState } from "react";
import { Button, Box, makeStyles } from "@material-ui/core";

import { days, months } from "../../../data/Constants";
import CoolGrid from "../CoolGrid/CoolGrid";
import CoolList from "../CoolGrid/CoolList";

const useStyles = makeStyles((theme) => {
  return {
    monthBox: {
      // borderRadius: 20, /* Doesnt work */
    },
    weekDay: {
      border: "1px solid rgba(0,0,0,0.2)",
      minWidth: 80,
      minHeight: 400,
      height: "100%",
      width: "100%",
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      paddingLeft: 15,
    },
    today: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
    day: {
      border: "1px solid rgba(0,0,0,0.2)",
      width: "100%",
      // minHeight: "300",
      height: "120px",
    },
    curDay: {
      backgroundColor: theme.palette.primary.main,
      color: "white",

      // color: theme.palette.secondary.main,
      fontWeight: "bold",
      // border: "2px solid",
      // borderColor: theme.palette.primary.main,
    },
  };
});

export default function CalMonth(props) {
  const initMonth = () => {
    const date = new Date();
    date.setDate(1);
    return date;
  };

  const [firstDayCurMonth, setFirstDayCurMonth] = useState(initMonth());

  const setCurMonth = (nr) => {
    const d = new Date(firstDayCurMonth);
    d.setMonth(d.getMonth() + nr);
    setFirstDayCurMonth(d);
  };
  // const firstDayOfMonth = console.log(firstDayCurMonth.getDay());

  const classes = useStyles();

  return (
    <>
      <Box>
        <Box style={{ float: "left", minWidth: 200 }}>
          <span>
            {months[firstDayCurMonth.getMonth()] +
              " " +
              firstDayCurMonth.getFullYear()}
          </span>
        </Box>
        <Button onClick={(e) => setCurMonth(-1)}>{"\u003C"}</Button>
        <Button onClick={(e) => setFirstDayCurMonth(initMonth())}>
          {"Today"}
        </Button>
        <Button onClick={(e) => setCurMonth(1)}>{"\u003E"}</Button>
      </Box>
      <Box display="flex" flexDirection="row" className={classes.monthBox}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <CalWeekDays
            dayNr={i}
            dayOffset={firstDayCurMonth.getDay() - 1}
            firstDayCurMonth={firstDayCurMonth}
            list={props.list}
            viewAsList={props.viewAsList}
            itemClicked={(id) => props.itemClicked(id)}
          />
        ))}
      </Box>
    </>
  );
}
function CalWeekDays(props) {
  const isCurDay = false; //todo d.toDateString() === today.toDateString();

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.weekDay}>
      <Box
        padding={1}
        borderBottom="1px solid rgba(0,0,0,0.5)"
        className={classes.header + (isCurDay ? " " + classes.today : "")}
      >
        {days[props.dayNr]}
      </Box>
      <Box padding={0} style={{ minHeight: 200 }}>
        {[0, 1, 2, 3, 4].map((w) => (
          <CalDay
            week={w}
            dayNr={props.dayNr}
            dayOffset={props.dayOffset}
            firstDayCurMonth={props.firstDayCurMonth}
            list={props.list}
            viewAsList={props.viewAsList}
            itemClicked={(id) => props.itemClicked(id)}
          />
        ))}
      </Box>
    </Box>
  );
}
function CalDay(props) {
  const date = new Date(props.firstDayCurMonth);
  date.setDate(props.week * 7 + props.dayNr - props.dayOffset);

  // const filteredList = props.list;
  const itemsFound = props.list.filter(
    (i) => new Date(i.date).toDateString() === date.toDateString()
  );
  const classes = useStyles();
  return (
    <Box
      className={
        classes.day +
        (date.toDateString() === new Date().toDateString()
          ? " " + classes.curDay
          : "")
      }
    >
      {date.getDate()}
      {itemsFound.length > 0 && props.viewAsList && (
        <CoolList
          list={itemsFound}
          itemClick={(id) => props.itemClicked(id)}
          multiline
        />
      )}
      {itemsFound.length > 0 && !props.viewAsList && (
        <CoolGrid
          list={itemsFound}
          itemClick={(id) => props.itemClicked(id)}
          multiline
        />
      )}
      {/* {props.week * 7 + props.dayNr - props.dayOffset} */}
    </Box>
  );
}
