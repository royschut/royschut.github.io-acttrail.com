import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    imgContainer: {
      //   backgroundColor: "/sred",
    },
    img: {
      objectFit: "cover",
      maxWidth: "80vw",
      maxHeight: "80vh",
    },
  };
});

export default function Uploader(props) {
  const [img, setImg] = useState([]);
  const fileInput = React.createRef();

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onFilePicked = async (e) => {
    let file = e.target.files[0];

    const formData = new FormData();
    formData.append("img", file);
    props.onChange(formData);

    let reader = new FileReader();
    reader.onloadend = () => {
      const img = {
        img: reader.result,
        name: file.name,
        date: new Date(),
      };
      setImg(img);
    };
    reader.readAsDataURL(file);
    fileInput.current.value = "";
  };

  const onAddFile = (e) => {};

  const classes = useStyles();

  return (
    <form className="formUpload" onSubmit={onSubmit}>
      <input type="file" ref={fileInput} onChange={(e) => onFilePicked(e)} />
      {img && (
        <div className={classes.imgContainer}>
          <img src={img.img} alt={img.name} className={classes.img} />
        </div>
      )}
    </form>
  );
}
