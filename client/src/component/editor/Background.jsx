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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

function Background() {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("red");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  function FileUploadButton() {
    const handleUpload = (event) => {
      const file = event.target.files[0];
      console.log(file);
      // You can now use the file object for further processing
    };

    return (
      <Button
        variant="outlined"
        component="label"
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
        <VisuallyHiddenInput type="file" onChange={handleUpload} />
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
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Background color" />
              <MuiColorInput
                size="small"
                sx={{ padding: 0, maxWidth: "120px" }}
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
