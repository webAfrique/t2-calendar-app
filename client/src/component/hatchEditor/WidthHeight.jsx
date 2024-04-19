import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { TextField } from "@mui/material";

function WidthHeight({ setHatchDimensions }) {
  const [open, setOpen] = useState(false);
  const [hatchWidth, setHatchWidth] = useState(100);
  const [hatchHeight, setHatchHeight] = useState(100);

  useEffect(() => {
    setHatchDimensions({
      width: hatchWidth,
      height: hatchHeight,
    });
  }, [hatchWidth, hatchHeight]);

  const handleClick = () => {
    setOpen(!open);
  };

  const widthHeightMenu = (
    <div>
      <List>
        {/* Title list item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={<TuneOutlinedIcon />} />{" "}
            {/* Icon for menu */}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ display: "flex" }}>
            <ListItemButton sx={{ pr: 0 }}>
              <TextField
                id="standard-number"
                label="Width"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                sx={{ width: "120px" }}
                onChange={(e) => setHatchWidth(+e.target.value)}
                value={hatchWidth}
              />
            </ListItemButton>
            <ListItemButton sx={{ pr: 0 }}>
              <TextField
                id="standard-number"
                label="Height"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                sx={{ width: "120px" }}
                onChange={(e) => setHatchHeight(+e.target.value)}
                value={hatchHeight}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
    </div>
  );

  return <div>{widthHeightMenu}</div>;
}

export default WidthHeight;
