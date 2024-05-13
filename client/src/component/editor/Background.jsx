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
} from "../../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";

function Background() {
  const [open, setOpen] = React.useState(false);
  const color = useSelector((state) => state.calendar.background.color);
  const fileName = useSelector((state) => state.calendar.background.fileName);

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
              <ListItemText
                primary="Background image"
                sx={{ color: "#476C92" }}
              />
              <FileUploadButton />
            </ListItemButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                sx={{ color: "#476C92" }}
                onClick={handleResetColor}
              />
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
              <ListItemText
                primary="Default images"
                sx={{ color: "#476C92" }}
              />
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
