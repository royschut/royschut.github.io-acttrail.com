import {
  Box,
  Dialog,
  FormControl,
  InputAdornment,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { days, months } from "../../../data/Constants";

const euroAdorn = {
  startAdornment: <InputAdornment position="start">€</InputAdornment>,
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  input: {
    color: "white",
  },
}));
export default function EditItem(props) {
  const classes = useStyles();

  const item = props.item;
  const valProps = item.validationProps;

  if (!item) return "";

  //Form type
  const isSelect = valProps.options;
  const isDate = valProps.type === "date";
  const isTextfield = valProps.type === "string" && !valProps.options;
  const isNumber = valProps.type === "number" && !valProps.options;
  const isMoney = valProps.type === "money";

  return (
    <Box display="flex" style={{ width: "100%" }}>
      {!props.hideKeys && (
        <Box style={{ width: "30%" }}>
          <Typography variant="body2">{item.label + ": "}</Typography>
        </Box>
      )}
      <Box style={{ width: "100%" }}>
        {isTextfield && <ItemTextfield {...props} />}
        {isNumber && <ItemTextfield {...props} isNumber />}
        {isMoney && <ItemTextfield {...props} isMoney />}
        {isSelect && <ItemSelect {...props} />}
        {isDate && <ItemDate {...props} />}
      </Box>
    </Box>
  );
}
function ItemTextfield(props) {
  const classes = useStyles();

  const item = props.item;
  const editing = props.editing;
  const valProps = item.validationProps;
  const value = item.value ? item.value : "";

  const tfType = props.isNumber ? "number" : "text";
  const inputProps = props.isMoney ? euroAdorn : "";
  const moneyPrefix = props.isMoney ? "€ " : "";

  if (!editing)
    return (
      <Typography variant="body2">
        {valProps.multiline && (
          <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
            {value}
          </pre>
        )}
        {!valProps.multiline && moneyPrefix + value}
      </Typography>
    );
  else
    return (
      <FormControl className={classes.formControl}>
        <TextField
          id={item.key}
          value={value}
          multiline={valProps.multiline}
          variant="outlined"
          size="small"
          margin="dense"
          variant="filled"
          type={tfType}
          className={classes.input}
          // helperText={valProps[i] ? "Has to validate" : ""}
          InputProps={inputProps}
          error={(e) => console.log("check", e)}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </FormControl>
    );
}
function ItemDate(props) {
  const classes = useStyles();

  const item = props.item;
  const editing = props.editing;
  const valProps = item.validationProps;

  const value = item.value ? item.value : "";

  const formatDateString = (str) => {
    if (!str) return "";
    const d = new Date(str);
    return `${days[d.getDay()]} ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  if (!editing)
    return <Typography variant="body2">{formatDateString(value)}</Typography>;
  else
    return (
      <FormControl className={classes.formControl}>
        <TextField
          id={item.key}
          value={value}
          variant="outlined"
          size="small"
          margin="dense"
          variant="filled"
          className={classes.input}
          helperText={"YYYY-MM-DD"}
          error={(e) => console.log("check", e)}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </FormControl>
    );
}
function ItemSelect(props) {
  const classes = useStyles();

  const item = props.item;
  const editing = props.editing;
  const valProps = item.validationProps;

  const valueObj = valProps.options.find(
    (o) => Number(o.id) === Number(item.value)
  );
  const label = valueObj ? valueObj.label : "";

  if (!editing) return <Typography variant="body2">{label}</Typography>;
  else
    return (
      <FormControl className={classes.formControl}>
        <Select
          id={item.key}
          value={item.value}
          size="small"
          margin="dense"
          error={(e) => console.log("check", e)}
          // helperText={valProps[i] ? "Has to validate" : ""}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {valProps.options.map((option) => (
            <MenuItem value={option.id}> {option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
}
