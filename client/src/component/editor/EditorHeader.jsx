import { Link } from "react-router-dom";
import { auth } from "../../../../server/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { saveSettings } from "../../../../server/utils";
import { useAuthState } from "react-firebase-hooks/auth";

function EditorHeader({ calendarView, setCalendarView }) {
  const calendarSettings = useSelector((state) => state.calendar);
  const [user] = useAuthState(auth);
  //check if user is defined
  const userID = user ? user.uid : null;
  //heck if calendarID is defined
  const calendarID = useSelector((state) => state.calendar.id);

  const calendarIDString = calendarID ? calendarID.toString() : "";
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                fontFamily: "roboto",
                fontWeight: "bold",
                fontSize: { xs: "30px", md: "30px" },
                textAlign: "center",
                justifyContent: "center",
                color: "#476C92",
                textDecoration: "none",
                mr: 1,
              }}
            >
              WIME
              <br />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                fontFamily: "roboto",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "12", md: "16" },
                color: "#476C92",
                textDecoration: "none",
                marginTop: "-10px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              calendar
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 0, display: { md: "flex" }, mx: 2 }}>
            <Tooltip title="Preview">
              <IconButton
                onClick={() =>
                  setCalendarView(
                    calendarView === "editor" ? "preview" : "editor"
                  )
                }
                sx={{
                  backgroundColor: "#476C92",
                  color: "white",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ p: 0, display: { md: "flex" }, mx: 4 }}>
            <Tooltip title="Save">
              <IconButton
                sx={{
                  backgroundColor: "#476C92",
                  color: "white",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}
                onClick={() =>
                  saveSettings(calendarSettings, userID, calendarIDString)
                }
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ p: 0, display: { md: "flex" }, mx: 2 }}>
            <Link to="/">
              <Tooltip title="Logout">
                <IconButton
                  sx={{
                    backgroundColor: "#476C92",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#476C92",
                      borderColor: "#476C92",
                      boxShadow: "none",
                      border: "1px solid",
                    },
                  }}
                  onClick={() => auth.signOut()}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default EditorHeader;
