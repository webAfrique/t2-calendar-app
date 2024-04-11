import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { Box, Divider } from "@mui/material";

const shapes = [
  { name: "Square", icon: <SquareOutlinedIcon /> },
  { name: "Circle", icon: <CircleOutlinedIcon /> },
  { name: "Star", icon: <StarOutlineOutlinedIcon /> },
];

function Shapes() {
  const [open, setOpen] = React.useState(false);
  const [shape, setShape] = React.useState("Square");

  const handleClick = () => {
    setOpen(!open);
  };
  const handleShapeChange = (event) => {
    setShape(event.target.value);
  };

  const shapesMenu = (
    <div>
      <Divider />
      <List sx={{ marginBottom: 10 }}>
        {/* Title list item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
                  Shapes
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Hatch shape" />
              <Select
                value={shape}
                size="small"
                onChange={handleShapeChange}
                sx={{ padding: 0, width: 150 }}
              >
                {shapes.map((shape) => (
                  <MenuItem key={shape.name} value={shape.name}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {shape.icon}
                      {shape.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return <div>{shapesMenu}</div>;
}

export default Shapes;
