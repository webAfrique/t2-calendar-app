import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { widthSet, heightSet } from "../../features/hatchSlice";

function WidthHeight({ hatchNumber }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const hatchWidth = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.width : 100;
  });

  const hatchHeight = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.height : 100;
  });

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
                onChange={(e) =>
                  dispatch(
                    widthSet({
                      value: +e.target.value,
                      hatchNumber: hatchNumber,
                    })
                  )
                }
                placeholder="100"
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
                onChange={(e) =>
                  dispatch(
                    heightSet({
                      value: +e.target.value,
                      hatchNumber: hatchNumber,
                    })
                  )
                }
                placeholder="100"
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
