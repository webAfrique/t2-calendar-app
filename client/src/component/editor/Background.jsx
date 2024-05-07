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
import { Box, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  backgroundImageSet,
  backgroundColorSet,
  backgroundFileNameSet,
  backgroundFileNameDelete,
  backgroundImageDelete,
  backgroundDefaultImageSet, //import background default image set action
  backgroundDefaultImageDelete, //import background default image delete action
} from "../../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";

function Background() {
  const [open, setOpen] = React.useState(false);
  const color = useSelector((state) => state.calendar.background.color);
  const fileName = useSelector((state) => state.calendar.background.fileName);
  const defaultImage = useSelector(
    (state) => state.calendar.background.defaultImage
  );
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
  const deleteHandler = () => {
    dispatch(backgroundFileNameDelete());
    dispatch(backgroundImageDelete());
  };

  const handleToggleDefaultImage = (imgPath) => {
    if (defaultImage === imgPath) {
      dispatch(backgroundDefaultImageDelete()); // Dispatch action to remove default image
    } else {
      dispatch(backgroundDefaultImageSet(imgPath)); // Dispatch action to set default image
    }
  };

  function FileUploadButton() {
    const handleUpload = (event) => {
      const file = event.target.files[0];
      dispatch(backgroundFileNameSet(file.name));

      console.log("file", file);

      // You can now use the file object for further processing
      const url = URL.createObjectURL(file);
      dispatch(backgroundImageSet(url));
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
            border: "1px solid #555555",
          },
          border: "1px solid #555555",
          color: "black",

          p: 1,
        }}>
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
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
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
              <ListItemText primary="Background image" />
              <FileUploadButton />
            </ListItemButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography variant="body1">{fileName}</Typography>
              {fileName && (
                <IconButton onClick={deleteHandler}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText
                primary="Background color"
                onClick={handleResetColor}
              />
              <MuiColorInput
                size="small"
                sx={{ padding: 0, maxWidth: "138px" }}
                format="hex"
                value={color}
                onChange={handleColorChange}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                pt: 1,
                pb: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>
              <ListItemText primary="Default images" />
              <Carousel
                handleToggleDefaultImage={handleToggleDefaultImage}
                defaultImage={defaultImage}
              />
              {/* Pass defaultImage to Calendar component */}
              {/* {defaultImage && (
                <img src={defaultImage} alt="Default Background" />
              )} */}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return <div>{backgroundMenu}</div>;
}

export default Background;
