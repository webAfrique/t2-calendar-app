import React, { useEffect, useState } from "react";
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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Background({ setBackgoroundStyles }) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("white");
  const [imageURL, setImageURL] = React.useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setBackgoroundStyles({
      backgroundColor: color,
      backgroundImage: `url(${imageURL})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    });
  }, [color, imageURL, setBackgoroundStyles]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };
  const deleteHandler = () => {
    setImageURL("");
    setFile(null);
  };

  function FileUploadButton() {
    const handleUpload = (event) => {
      const file = event.target.files[0];
      setFile(file.name);
      console.log("file", file);
      // You can now use the file object for further processing
      const url = URL.createObjectURL(file);
      setImageURL(url);
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
              }}
            >
              <Typography variant="body1">{file}</Typography>
              {file && (
                <IconButton onClick={deleteHandler}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Background color" />
              <MuiColorInput
                size="small"
                sx={{ padding: 0, maxWidth: "140px" }}
                format="hex"
                value={color}
                onChange={handleColorChange}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return <div>{backgroundMenu}</div>;
}

export default Background;
