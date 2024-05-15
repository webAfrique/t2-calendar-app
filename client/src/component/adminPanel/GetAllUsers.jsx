import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../../../../server/firebase";
import { countUserCalendars } from "../../../../server/utils";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function GetAllUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch all users' data with calendar count
  React.useEffect(() => {
    const fetchUsersAndCounts = async () => {
      try {
        const usersData = await getAllUsers();
        const usersWithCounts = await Promise.all(
          usersData.map(async (user) => {
            const calendarCount = await countUserCalendars(user.uid);
            return { ...user, calendarCount };
          })
        );
        setUsers(usersWithCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users and calendar counts:", error);
        setLoading(false);
      }
    };

    fetchUsersAndCounts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <Table size="small">
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#9AC8E8",
            }}>
            <TableRow>
              <TableCell>UserID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell align="right">Calendar Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{user.calendarCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
}
