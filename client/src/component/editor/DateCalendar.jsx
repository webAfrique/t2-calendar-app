import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
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

const DateCalendar = ({ setDates }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    //get the days of the month in the range as an array
    const dates = [];
    const startDate = range[0].startDate.getDate();
    const endDate = range[0].endDate.getDate();
    for (let date = startDate; date <= endDate; date++) {
      dates.push(date);
    }

    setDates(dates);
  }, [range, setDates]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
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
