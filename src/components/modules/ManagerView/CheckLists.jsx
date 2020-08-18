import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckLists(props) {
  const classes = useStyles();
  const lists = [
    {
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

  const handleChange = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
  };
  if (props.preview) {
    //Shorter list
  }
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {lists.map((list, i) => (
          <React.Fragment key={i}>
            {(!props.preview || i === 0) && (
              <React.Fragment>
                <FormLabel component="legend">{list.title}</FormLabel>
                <FormGroup>
                  {list.list.map((sublist, j) => (
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
                <FormHelperText>Deadline: {list.deadline}</FormHelperText>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </FormControl>
    </div>
  );
}
