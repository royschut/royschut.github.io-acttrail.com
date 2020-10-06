import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { months } from "../../../data/Constants";
import CoolGrid from "../CoolGrid/CoolGrid";
import CoolList from "../CoolGrid/CoolList";

const useStyles = makeStyles((theme) => {
  return {
    monthBox: {
      // borderRadius: 20,
    },
    month: {
      border: "1px solid rgba(0,0,0,0.2)",
      minWidth: 180,
      minHeight: 200,
      width: "100%",
      maxWidth: 300,
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "white",

      paddingLeft: 20,
    },
    today: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  };
});
export default function CalYear(props) {
  const [curYearDate, setCurYearDate] = useState(new Date());
  const setCurYear = (nr) => {
    const d = new Date(curYearDate);
    d.setFullYear(d.getFullYear() + nr);
    setCurYearDate(d);
  };
  return (
    <Box>
      <Box>
        <Box style={{ float: "left", minWidth: 200 }}>
          <Typography variant="h5">{curYearDate.getFullYear()}</Typography>
        </Box>
        <Button onClick={(e) => setCurYear(-1)}>{"\u003C"}</Button>
        <Button onClick={(e) => setCurYearDate(new Date())}>{"Today"}</Button>
        <Button onClick={(e) => setCurYear(1)}>{"\u003E"}</Button>
      </Box>
      <YearBox
        list={props.list.filter(
          (i) => new Date(i.date).getFullYear() === curYearDate.getFullYear()
        )}
        viewAsList={props.viewAsList}
        isCurYear={curYearDate.getFullYear() === new Date().getFullYear()}
        itemClicked={(id) => props.itemClicked(id)}
      />
    </Box>
  );
}
const YearBox = (props) => {
  return (
    <Grid container spacing={3}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
        <Grid item key={m}>
          <MonthBox
            monthNr={m}
            viewAsList={props.viewAsList}
            isCurMonth={props.isCurYear && m === new Date().getMonth()}
            list={props.list.filter((i) => new Date(i.date).getMonth() === m)}
            itemClicked={(id) => props.itemClicked(id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const MonthBox = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.monthBox}>
      <Box display="flex" flexDirection="column" className={classes.month}>
        <Box
          padding={1}
          borderBottom="1px solid rgba(0,0,0,0.5)"
          style={{ width: "100%" }}
          className={
            classes.header + (props.isCurMonth ? " " + classes.today : "")
          }
        >
          <Typography variant="body1">{months[props.monthNr]}</Typography>
        </Box>
        <Box padding={1}>
          {props.list.length > 0 && props.viewAsList && (
            <CoolList
              list={props.list}
              multiline={true}
              itemClicked={(id) => props.itemClicked(id)}
              small
            />
          )}
          {props.list.length > 0 && !props.viewAsList && (
            <CoolGrid
              list={props.list}
              multiline={true}
              itemClicked={(id) => props.itemClicked(id)}
              small
            />
          )}
          {props.list.length === 0 && <br />}
        </Box>
      </Box>
    </Card>
  );
};
