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
import { shapeSet } from "../../features/calendarSlice";
import { useDispatch, useSelector } from "react-redux";

const shapes = [
  { name: "Square", icon: <SquareOutlinedIcon /> },
  { name: "Circle", icon: <CircleOutlinedIcon /> },
  { name: "Star", icon: <StarOutlineOutlinedIcon /> },
];

function Shapes() {
  const [open, setOpen] = React.useState(false);
  const shape = useSelector((state) => state.calendar.shape);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleShapeChange = (event) => {
    dispatch(shapeSet(event.target.value));
  };

  const shapesMenu = (
    <div>
      <Divider />
      <List sx={{ marginBottom: 10 }}>
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
                  }}>
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
              <ListItemText primary="Hatch shape" sx={{ color: "#476C92" }} />
              <Select
                value={shape}
                size="small"
                onChange={handleShapeChange}
                sx={{
                  color: "#476C92",
                  padding: 0,
                  width: 150,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#476C92", // Set selector border color
                  },
                }}>
                {shapes.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#476C92",
                      }}>
                      {item.icon}
                      {item.name}
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
