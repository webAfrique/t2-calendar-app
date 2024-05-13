import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUser } from "../../../server/firebase";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
//import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
//import ShareIcon from "@mui/icons-material/Share";
import {
  getDefault,
  getExistingCalendars,
  getSpecificCalendars,
} from "../../../server/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCalendarID, setInitialState } from "../features/calendarSlice";

function User() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [calendars, setCalendars] = useState([]);
  const [loadingCalendars, setLoadingCalendars] = useState(true);

  console.log("calendars", calendars);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  //navigation only happens after the data has been fetched
  const handleClick = async () => {
    await getDefault(dispatch);
    dispatch(setCalendarID(Date.now()));
    navigateTo("/editor");
  };

  useEffect(() => {
    if (user) {
      const userID = user.uid;
      getExistingCalendars(userID)
        .then((fetchedCalendars) => {
          setCalendars(fetchedCalendars);
          setLoadingCalendars(false);
        })
        .catch((error) => {
          console.error("Error fetching calendars: ", error);
          setLoadingCalendars(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userData = await getUser(user.uid);
        setUsername(userData.name);
      };
      fetchUser();
    }
  }, [user]);

  const handleEditCalendar = async (id) => {
    const calendarData = await getSpecificCalendars(id);
    if (calendarData) {
      dispatch(setInitialState(calendarData));
    }
  };

  // if user is not logged in, redirect to login page
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      className="user-dashboard"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 68.5px - 46px)",
        justifyContent: "center",
      }}
    >
      {loadingCalendars ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <CircularProgress sx={{ color: "#476C92" }} />
          <Typography variant="h5" sx={{ color: "#476C92" }}>
            Loading calendars...
          </Typography>
        </Box>
      ) : calendars.length > 0 ? (
        <>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#476C92",
              mt: -5,
              mb: 5,
            }}
          >
            Your calendars
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <TableContainer component={Paper} sx={{ my: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {calendars.map((calendar) => (
                    <TableRow
                      key={calendar.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography
                          component={Link}
                          to={`/calendars/${calendar.id}/view`}
                          variant="h6"
                          sx={{
                            mx: 1,
                            fontWeight: "bold",
                            textDecoration: "none",
                            color: "#00A8CD",
                          }}
                        >
                          {calendar.title ? calendar.title : "Untitled"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 1 }}>
                        {/* <IconButton
                          component={Link}
                          to={`/calendars/${calendar.id}/view`}
                          aria-label="view calendar"
                          sx={{ mx: 1, color: "#00A8CD" }}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton> */}
                        <IconButton
                          component={Link}
                          to={`/editor/${calendar.id}`}
                          aria-label="edit calendar"
                          sx={{ mx: 1, color: "#00A8CD" }}
                          onClick={() => handleEditCalendar(calendar.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          component={Link}
                          to={`/calendars/${calendar.id}/delete`}
                          aria-label="delete calendar"
                          sx={{ mx: 1, color: "#00A8CD" }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                        {/*   <IconButton
                          component={Link}
                          to={`/calendars/${calendar.id}/like`}
                          aria-label="like calendar"
                          sx={{ mx: 1, color: "#00A8CD" }}
                        >
                          <FavoriteBorderOutlinedIcon />
                        </IconButton> */}
                        {/* <IconButton
                          component={Link}
                          to={`/calendars/${calendar.id}/share`}
                          aria-label="share calendar"
                          sx={{ mx: 1, color: "#00A8CD" }}
                        >
                          <ShareIcon />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
              <Button
                variant="contained"
                sx={{
                  mt: 5,
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
                }}
                onClick={handleClick}
              >
                Create New
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          className="user-dashboard"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "50vh",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "#476C92",
              mt: -5,
              mb: 5,
            }}
          >
            You have no calendars
          </Typography>
          <Box>
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
              }}
              onClick={handleClick}
            >
              Create new
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default User;
