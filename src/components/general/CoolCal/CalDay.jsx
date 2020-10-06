import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { days, daysFull, months } from "../../../data/Constants";
import CoolGrid from "../CoolGrid/CoolGrid";
import CoolGridItem from "../CoolGrid/CoolGridItem";
import CoolList from "../CoolGrid/CoolList";
import CalMonth from "./CalMonth";
const useStyles = makeStyles((theme) => {
  return {
    day: {
      border: "1px solid rgba(0,0,0,0.2)",
      minWidth: 80,
      minHeight: 200,
      width: "100%",
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    italic: {
      fontStyle: "italic",
    },
    miniday: {
      border: "1px solid rgba(0,0,0,0.2)",
      width: 50,
      height: 50,
      cursor: "pointer",
    },
    miniday_today: {
      // borderColor: theme.palette.primary.main,
      // backgroundColor: theme.palette.primary.light,
    },
    miniday_curday: {
      borderColor: theme.palette.secondary.main,
      boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    },
    minidayHeader: {
      width: 50,
      height: 20,
      padding: 0,
      textAlign: "center",
      backgroundColor: "#F3F3F3",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      color: theme.palette.primary.dark,
    },
    today: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    curday: {
      backgroundColor: theme.palette.secondary.main,
      fontWeight: "bold",
      color: theme.palette.secondary.contrastText,
    },
    itemCountBtn: {
      width: 15,
      height: 15,
      fontSize: "0.8em",
      borderRadius: 30,
      color: "black",
      paddingLeft: 5,
      marginLeft: 4,
      fontWeight: "bold",
      backgroundColor: theme.palette.primary.main,
    },
    itemCountBtn_selected: {
      backgroundColor: "white",
      color: theme.palette.primary.main,
    },
  };
});
export default function CalDay(props) {
  const [curDay, setCurDay] = useState(new Date());

  const isCurDayToday = curDay.toDateString() === new Date().toDateString();

  const itemsFound = props.list.filter(
    (i) => new Date(i.date).toDateString() === curDay.toDateString()
  );
  const changeCurDay = (nr) => {
    const d = new Date(curDay);
    d.setDate(d.getDate() + nr);
    setCurDay(d);
  };

  const classes = useStyles();

  return (
    <>
      <Box>
        <Button onClick={(e) => changeCurDay(-1)}>{"\u003C"}</Button>
        <Button onClick={(e) => setCurDay(new Date())}>{"Today"}</Button>
        <Button onClick={(e) => changeCurDay(1)}>{"\u003E"}</Button>
      </Box>
      <Box display="flex" flexDirection="column" className={classes.day}>
        <Box
          padding={1}
          borderBottom="1px solid rgba(0,0,0,0.5)"
          style={{ width: "100%" }}
          className={
            classes.header + (isCurDayToday ? " " + classes.today : "")
          }
        >
          {`${curDay.getDate()} ${
            months[curDay.getMonth()]
          } ${curDay.getFullYear()}`}
          <br />
          {`${daysFull[curDay.getDay()]} Wk ${getWeekNumber(curDay)}`}
        </Box>
        <Box padding={1}>
          {itemsFound.length > 0 && props.viewAsList && (
            <CoolList
              list={itemsFound}
              itemClicked={(id) => props.itemClicked(id)}
            />
          )}
          {itemsFound.length > 0 && !props.viewAsList && (
            <CoolGrid
              list={itemsFound}
              multiline
              itemClicked={(id) => props.itemClicked(id)}
            />
          )}
          {itemsFound.length == 0 && (
            <Typography variant="body2" className={classes.italic}>
              - No items -
            </Typography>
          )}
        </Box>
      </Box>
      <MiniMonth
        list={props.list}
        curDay={curDay}
        reset={() => setCurDay(new Date())}
        dateClicked={(date) => setCurDay(date)}
      />
    </>
  );
}
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function MiniMonth(props) {
  const initMonth = () => {
    const date = new Date();
    date.setDate(1);
    return date;
  };

  const [firstDayCurMonth, setFirstDayCurMonth] = useState(initMonth());

  useEffect(() => {
    if (props.curDay.getMonth() !== firstDayCurMonth.getMonth()) {
      const d = new Date(props.curDay);
      d.setMonth(d.getMonth());
      setFirstDayCurMonth(d);
    }
  }, [props.curDay]);

  const setCurMonth = (nr) => {
    const d = new Date(firstDayCurMonth);
    d.setMonth(d.getMonth() + nr);
    setFirstDayCurMonth(d);
  };
  const reset = () => {
    props.reset();
    setFirstDayCurMonth(initMonth());
  };
  // const firstDayOfMonth = console.log(firstDayCurMonth.getDay());

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
        <Button onClick={(e) => reset()}>{"Today"}</Button>
        <Button onClick={(e) => setCurMonth(1)}>{"\u003E"}</Button>
      </Box>
      <Box display="flex" flexDirection="row">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <MiniWeekDays
            curDay={props.curDay}
            dayNr={i}
            dayOffset={firstDayCurMonth.getDay() - 1}
            firstDayCurMonth={firstDayCurMonth}
            list={props.list}
            viewAsList={props.viewAsList}
            dateClicked={(date) => props.dateClicked(date)}
          />
        ))}
      </Box>
    </>
  );
}
function MiniWeekDays(props) {
  const isCurDay = false; //todo d.toDateString() === today.toDateString();

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.weekDay}>
      <Box
        padding={1}
        borderBottom="1px solid rgba(0,0,0,0.5)"
        className={classes.miniDay + (isCurDay ? " " + classes.today : "")}
      >
        {days[props.dayNr]}
      </Box>
      <Box padding={0} style={{ minHeight: 200 }}>
        {[0, 1, 2, 3, 4].map((w) => (
          <MiniDay
            curDay={props.curDay}
            week={w}
            dayNr={props.dayNr}
            dayOffset={props.dayOffset}
            firstDayCurMonth={props.firstDayCurMonth}
            list={props.list}
            viewAsList={props.viewAsList}
            onClick={(date) => props.dateClicked(date)}
          />
        ))}
      </Box>
    </Box>
  );
}
function MiniDay(props) {
  const date = new Date(props.firstDayCurMonth);
  date.setDate(props.week * 7 + props.dayNr - props.dayOffset);

  const isSelectedDay = props.curDay.toDateString() === date.toDateString();
  const isToday = date.toDateString() === new Date().toDateString();

  const itemsFound = props.list.filter(
    (i) => new Date(i.date).toDateString() === date.toDateString()
  );
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      className={
        classes.miniday +
        (isToday ? " " + classes.miniday_today : "") +
        (isSelectedDay ? " " + classes.miniday_curday : "")
      }
      onClick={(e) => props.onClick(date)}
    >
      <Box
        className={
          classes.minidayHeader +
          (isToday ? " " + classes.today : "") +
          (isSelectedDay ? " " + classes.curday : "")
        }
      >
        {date.getDate()}
      </Box>
      {/* {itemsFound.length > 0 && (
        <Box
          className={
            classes.itemCountBtn +
            (isSelectedDay ? " " + classes.itemCountBtn_selected : "")
          }
        >
          {itemsFound.length}
        </Box>
      )} */}
    </Box>
  );
}
