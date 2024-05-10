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

  const startDate = new Date(
    useSelector((state) => state.calendar.calendarRange[0].startDate)
  );
  const endDate = new Date(
    useSelector((state) => state.calendar.calendarRange[0].endDate)
  );

  const objectSelection = [
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => {
    dispatch(
      datesSet({
        selection: {
          startDate: ranges.selection.startDate.toISOString(),
          endDate: ranges.selection.endDate.toISOString(),
        },
      })
    );
  };

  const DateMenu = (
    <div>
      <Divider />
      <List>
        {/* Date list item */}
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
              ranges={objectSelection}
            />
          </div>
        </Collapse>
      </List>
    </div>
  );

  return <div>{DateMenu}</div>;
};

export default DateCalendar;
