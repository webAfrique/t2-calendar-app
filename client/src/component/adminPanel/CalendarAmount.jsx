import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Europe/Helsinki", // Specify the Europe/Helsinki timezone for Finland
};

const date = new Date().toLocaleDateString("en-US", options);

function CalendarAmount({ calendarCount }) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Total Calendars
      </Typography>
      <div>
        <CalendarMonthIcon />
      </div>
      <Typography component="p" variant="h4">
        {calendarCount}
      </Typography>
      <div style={{ marginTop: "auto" }}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {date}
        </Typography>
      </div>
    </React.Fragment>
  );
}

CalendarAmount.propTypes = {
  calendarCount: PropTypes.number.isRequired,
};

export default CalendarAmount;
