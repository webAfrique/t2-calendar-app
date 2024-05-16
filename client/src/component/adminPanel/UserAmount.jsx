import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Europe/Helsinki", // Specify the Europe/Helsinki timezone for Finland
};

const date = new Date().toLocaleDateString("en-US", options);

function UserAmount({ userCount }) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Total Users
      </Typography>
      <Typography component="p" variant="h4">
        {userCount}
      </Typography>
      <div style={{ marginTop: "auto" }}>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {date}
        </Typography>
      </div>
    </React.Fragment>
  );
}

UserAmount.propTypes = {
  userCount: PropTypes.number.isRequired,
};

export default UserAmount;
