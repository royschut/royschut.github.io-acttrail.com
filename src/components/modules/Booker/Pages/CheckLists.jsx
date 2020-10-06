import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  checklistBox: {
    marginBottom: 20,
    padding: 25,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
const listsInit = [
  {
    id: 1,
    title: "Artist 1 @ Dominator Festival",
    list: [
      { label: "Contract versturen", checked: true },
      { label: "Data invoeren", checked: true },
      { label: "Contract getekend ontvangen", checked: false },
      { label: "Presskit versturen", checked: false },
      { label: "Timetable ontvangen", checked: true },
    ],
    deadline: "17 augustus 2020",
  },
  {
    id: 2,
    title: "Artist 3 @ Defqon.1 Festival 2020",
    list: [
      { label: "Contract versturen", checked: true },
      { label: "Data invoeren", checked: true },
      { label: "Contract getekend ontvangen", checked: false },
      { label: "Presskit versturen", checked: false },
      { label: "Timetable ontvangen", checked: true },
    ],
    deadline: "15 juni 2020",
  },
];

export default function CheckLists(props) {
  const classes = useStyles();
  const [lists, setLists] = useState(listsInit);

  const newItem = (id) => {
    const l = lists;
    l[id].list.push({ label: "New", checked: false });
    setLists(l);
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h7"
        style={{ fontStyle: "italic", fontWeight: "bold" }}
      >
        Feature in progress, dummy data below
      </Typography>
      {lists.length > 0 && (
        <>
          <FormControl component="fieldset" className={classes.formControl}>
            {lists.map((listObj, i) => (
              <React.Fragment key={i}>
                {(!props.preview || i === 0) && (
                  <ChecklistBox
                    listObj={listObj}
                    newItem={(id) => newItem(id)}
                  />
                )}
              </React.Fragment>
            ))}
          </FormControl>
        </>
      )}
    </div>
  );
}
const ChecklistBox = (props) => {
  const listObj = props.listObj;
  const classes = useStyles();

  const handleChange = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Box className={classes.checklistBox}>
      <FormLabel component="legend">{listObj.title}</FormLabel>
      <Button onClick={(e) => props.newItem(listObj.id)}>Add</Button>
      <FormGroup>
        {listObj.list.map((sublist, j) => (
          <FormControlLabel
            key={j}
            control={
              <Checkbox
                //   checked={gilad}
                onChange={handleChange}
                name="giContractlad"
              />
            }
            label={sublist.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>Deadline: {listObj.deadline}</FormHelperText>
    </Box>
  );
};
