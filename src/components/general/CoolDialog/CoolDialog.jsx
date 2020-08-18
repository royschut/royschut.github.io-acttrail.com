import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export default function CoolDialog(props) {
  const onKeyDown = (e) => {
    // if (e.keyCode === 13) props.onSubmit();
    if (e.keyCode === 27) props.onClose();
  };
  return (
    <Dialog
      open={props.open}
      onClose={(e) => props.onClose()}
      aria-labelledby="form-dialog-title"
      onKeyDown={(e) => onKeyDown(e)}
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={(e) => props.onClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={(e) => props.onSubmit()} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
