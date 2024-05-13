import { Link } from "react-router-dom";
import { auth } from "../../../../server/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
//import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { saveSettings } from "../../../../server/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";

function EditorHeader({ calendarView, setCalendarView }) {
  const [previewClicked, setPreviewClicked] = useState(false);
  const calendarSettings = useSelector((state) => state.calendar);
  const [user] = useAuthState(auth);
  //check if user is defined
  const userID = user ? user.uid : null;
  //heck if calendarID is defined
  const calendarID = useSelector((state) =>
    state.calendar.id ? state.calendar.id.toString() : ""
  );

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
                fontWeight: "bold",
                fontSize: { xs: "30px", md: "30px" },
                textAlign: "center",
                justifyContent: "center",
                color: "#476C92",
                textDecoration: "none",
              }}
            >
              WIME
              <br />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "12", md: "16" },
                color: "#476C92",
                textDecoration: "none",
                marginTop: "-10px",
                textTransform: "uppercase",
              }}
            >
              calendar
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 0, display: { md: "flex" }, mx: 1 }}>
            {/*       <Button
              style={{
                color: "#476C92",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
              sx={{
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() =>
                setCalendarView(
                  calendarView === "editor" ? "preview" : "editor"
                )
              }
            >
              Preview
            </Button> */}
            <Tooltip title={!previewClicked ? "Preview" : "Edit"}>
              <IconButton
                sx={{
                  backgroundColor: "#476C92",
                  color: "white",
                  textTransform: "capitalize",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}
                onClick={() => {
                  setCalendarView(
                    calendarView === "editor" ? "preview" : "editor"
                  );
                  setPreviewClicked(!previewClicked);
                }}
              >
                {!previewClicked ? <VisibilityIcon /> : <EditOutlinedIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              p: 0,
              display: { md: "flex" },
              mx: 2,
              marginRight: "70px",
            }}
          >
            {/*  <Button
              style={{
                color: "#476C92",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
              sx={{
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => saveSettings(calendarSettings, userID, calendarID)}
            >
              Save
            </Button> */}
            <Tooltip title="Save">
              <IconButton
                sx={{
                  backgroundColor: "#476C92",
                  color: "white",
                  textTransform: "capitalize",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}
                onClick={() =>
                  saveSettings(calendarSettings, userID, calendarID)
                }
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ p: 0, display: { md: "flex" } }}>
            <Link to="/">
              <Button
                onClick={() => auth.signOut()}
                variant="text"
                sx={{
                  width: "100px",
                  color: "#476C92",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  textTransform: "capitalize",
                  fontSize: "1.1rem",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#476C92",
                    borderColor: "#476C92",
                    boxShadow: "none",
                    border: "1px solid",
                  },
                }}
              >
                Log out
              </Button>
            </Link>

            {/* <Link to="/">
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
            </Link> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default EditorHeader;
