import React, { useState } from "react";
import CoolDialog from "./general/CoolDialog/CoolDialog";

//Does some simple top control, like a dialog

export default function ViewShell(props) {
  const [dialogVO, setDialogVO] = useState();

  return (
    <>
      {dialogVO && <CoolDialog dialogVO={dialogVO} />}
      {props.children(props)}
    </>
  );
}
