// import { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../server/firebase";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const calendars = [
//   { id: 1, name: "chokolokobangoshe" },
//   { id: 2, name: "na wetin dey haffen" },
//   { id: 3, name: "Senibo Dagogo Jack" },
//   { id: 4, name: "honourable nkagbara" },
// ];

// function User() {
//   const [user, loading, error] = useAuthState(auth);
//   const [calendar, setCalendar] = useState([]);

//   return (
//     <div className="user-dashboard">
//       <AccountCircleIcon
//         color="disabled"
//         style={{ width: "100px", height: "100px" }}
//       />
//       <p>{user.email}</p>
//       {calendars.length > 0 ? (
//         <div>
//           <h2 style={{ textAlign: "center" }}>Your calendars</h2>
//           <ul style={{ padding: "none", listStyle: "none" }}>
//             {calendars.map((calendar) => (
//               <li key={calendar.id} style={{ marginTop: "10px" }}>
//                 {calendar.name}
//                 <a href="" style={{ marginLeft: "25px" }}>
//                   <button>View</button>
//                 </a>
//                 <a href="" style={{ marginLeft: "25px" }}>
//                   <button>Editor</button>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>You have no calendars</p>
//       )}
//       <a href="">Create new calendar</a>
//     </div>
//   );
// }

// export default User;

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../server/firebase";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserAvatar from "../component/UserAvatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from "@mui/icons-material/Share";

function User() {
  const [user, loading, error] = useAuthState(auth);
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    // Simulate fetching calendars
    const fetchCalendars = async () => {
      // Simulated delay to mimic fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCalendars([
        { id: 1, name: "chokolokobangoshe" },
        { id: 2, name: "na wetin dey haffen" },
        { id: 3, name: "Senibo Dagogo Jack" },
        { id: 4, name: "honourable nkagbara" },
      ]);
    };

    fetchCalendars();
  }, []);

  return (
    <Box
      className="user-dashboard"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "70vh",
        justifyContent: "center",
      }}>
      {" "}
      <UserAvatar />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {user ? `${user.email}, welcome back!` : "Loading user information..."}
      </Typography>
      {calendars.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {/* <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
            Your calendars
          </Typography> */}
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {calendars.map((calendar) => (
                  <TableRow
                    key={calendar.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Button
                        component={Link}
                        to={`/calendars/${calendar.id}/view`}
                        variant="contained">
                        {calendar.name}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/view`}
                        color="primary"
                        aria-label="view calendar">
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    {/* <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/calendars/${calendar.id}/view`}
                        variant="outlined">
                        View
                      </Button>
                    </TableCell> */}
                    {/* <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/calendars/${calendar.id}/edit`}
                        variant="outlined">
                        Edit
                      </Button>
                    </TableCell> */}
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/edit`}
                        color="primary"
                        aria-label="edit calendar">
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/delete`}
                        color="primary"
                        aria-label="delete calendar">
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/like`}
                        color="primary"
                        aria-label="like calendar">
                        <FavoriteBorderOutlinedIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/share`}
                        color="primary"
                        aria-label="share calendar">
                        <ShareIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <Link to="/editor">
              <Button
                variant="contained"
                sx={{
                  my: 2,
                  width: "150px",
                  height: "45px",
                  backgroundColor: "#476C92",
                  color: "white",
                  borderRadius: "30px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}>
                Create Another
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box>
          <p>You have no calendars.</p>
          <Box>
            <Link to="/editor">
              <Button
                variant="contained"
                sx={{
                  width: "150px",
                  height: "45px",
                  backgroundColor: "#476C92",
                  color: "white",
                  borderRadius: "30px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}>
                Create Now
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default User;
