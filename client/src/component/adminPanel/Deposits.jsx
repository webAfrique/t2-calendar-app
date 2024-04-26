import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function preventDefault(event) {
  event.preventDefault();
}

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Users</Title>
      <Typography component="p" variant="h4">
        23
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 26 Apr, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View users
        </Link>
      </div>
    </React.Fragment>
  );
}
