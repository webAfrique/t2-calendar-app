import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { MuiColorInput } from "mui-color-input";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  backgroundImageSet,
  backgroundColorSet,
  backgroundImageDelete,
} from "../../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../server/firebase";
import { v4 } from "uuid";
import { IconButton } from "@mui/material";

function Background() {
  const [open, setOpen] = React.useState(false);
  const color = useSelector((state) => state.calendar.background.color);
  const [imageRef, setImageRef] = React.useState(null);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleResetColor = () => {
    color !== "white" && dispatch(backgroundColorSet("white"));
  };

  const handleColorChange = (newColor) => {
    dispatch(backgroundColorSet(newColor));
  };
  const deleteHandler = async () => {
    dispatch(backgroundImageDelete());
    if (imageRef) {
      await deleteObject(imageRef);
    }
  };

  function FileUploadButton() {
    // Function to handle file upload to Firebase storage
    const handleUpload = async (e) => {
      const newImageRef = ref(storage, `images/${v4()}`);
      const snapshot = await uploadBytes(newImageRef, e.target.files[0]);
      const url = await getDownloadURL(snapshot.ref);
      setImageRef(newImageRef);
      console.log("url", url);
      if (url) {
        dispatch(backgroundImageSet(url));
      }
    };

    return (
      <Button
        component="label"
        variant="outlined"
        role={undefined}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          "&:hover": {
            border: "1px solid #476C92",
          },
          border: "1px solid #476C92",
          color: "#476C92",

          p: 1,
        }}
      >
        Upload File
        <input type="file" hidden onChange={handleUpload} />
      </Button>
    );
  }

  const backgroundMenu = (
    <div>
      <Divider />
      <List>
        {/* Title list item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick} sx={{ color: "#476C92" }}>
            <ListItemText
              primary={
                <span
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#476C92",
                  }}
                >
                  Background
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Image" sx={{ color: "#476C92" }} />

              <FileUploadButton />
              <IconButton onClick={deleteHandler}>
                <DeleteOutlineOutlinedIcon sx={{ color: "#476C92" }} />
              </IconButton>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Color" sx={{ color: "#476C92" }} />
              <MuiColorInput
                size="small"
                sx={{
                  color: "#476C92",
                  padding: 0,
                  maxWidth: "138px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#476C92", // Set color selector border color
                  },
                }}
                format="hex"
                value={color}
                onChange={handleColorChange}
                InputProps={{
                  sx: { color: "#476C92" }, // Set text color for the color input
                }}
              />
              <IconButton onClick={handleResetColor}>
                <DeleteOutlineOutlinedIcon sx={{ color: "#476C92" }} />
              </IconButton>
            </ListItemButton>

            <ListItemButton
              sx={{
                pt: 1,
                pb: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Carousel />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return <div>{backgroundMenu}</div>;
}

export default Background;
