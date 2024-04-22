import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
      setCalendars([
        { id: 1, name: "chokolokobangoshe" },
        { id: 2, name: "na wetin dey haffen" },
        { id: 3, name: "Senibo Dagogo Jack" },
        { id: 4, name: "honourable nkagbara" },
      ]);
    };

    fetchCalendars();
  }, []);

  // if user is not logged in, redirect to login page
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      className="user-dashboard"
      sx={{
        display: "flex",
        mt: 3,
        flexDirection: "column",
        alignItems: "center",
        minHeight: "70vh",
        justifyContent: "center",
      }}>
      {" "}
      <UserAvatar />
      <Typography variant="body1" sx={{ my: 2 }}>
        {user ? `${user.email}, welcome back!` : "Loading user information..."}
      </Typography>
      {calendars.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontFamily: "Inter",
              fontSize: "32px",
              color: "#333333",
              textAlign: "center",
              mt: 5,
            }}>
            Your calendars
          </Typography>

          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {calendars.map((calendar) => (
                  <TableRow
                    key={calendar.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography
                        component={Link}
                        to={`/calendars/${calendar.id}/view`}
                        variant="h4"
                        sx={{
                          mx: 1,
                          fontFamily: "Inter",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#00A8CD",
                          textAlign: "center",
                          marginBottom: "30px",
                        }}>
                        {calendar.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 1 }}>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/view`}
                        color="primary"
                        aria-label="view calendar"
                        sx={{ mx: 1 }}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/edit`}
                        color="primary"
                        aria-label="edit calendar"
                        sx={{ mx: 1 }}>
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/delete`}
                        color="primary"
                        aria-label="delete calendar"
                        sx={{ mx: 1 }}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/like`}
                        color="primary"
                        aria-label="like calendar"
                        sx={{ mx: 1 }}>
                        <FavoriteBorderOutlinedIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/calendars/${calendar.id}/share`}
                        color="primary"
                        aria-label="share calendar"
                        sx={{ mx: 1 }}>
                        <ShareIcon />
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
                  fontWeight: "bold",
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
                Create New
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box
          className="user-dashboard"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "50vh",
            justifyContent: "center",
          }}>
          <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
            You have no calendars
          </Typography>
          <Box>
            <Link to="/editor">
              <Button
                variant="contained"
                sx={{
                  width: "150px",
                  height: "45px",
                  backgroundColor: "#476C92",
                  color: "white",
                  fontWeight: "bold",
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
                Create
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default User;
