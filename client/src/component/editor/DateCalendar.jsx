import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";
import { datesSet } from "../../features/calendarSlice";

const DateCalendar = () => {
  const dispatch = useDispatch();
  const range = useSelector((state) => state.calendar.calendarRange);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => {
    dispatch(datesSet(ranges));
  };

  const DateMenu = (
    <div>
      <Divider />
      <List>
        {/* Date list item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
                  Date
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={range}
            />
          </div>
        </Collapse>
      </List>
    </div>
  );

  return <div>{DateMenu}</div>;
};

export default DateCalendar;
