import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../server/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { saveSettings } from "../../../../server/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Popup from "../../component/Popup";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

function EditorHeader({ setPreviewClicked, previewClicked }) {
  const [open, setOpen] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert

  const location = useLocation();
  console.log("saveClicked", saveClicked);
  const navigate = useNavigate();
  const handleClickOpen = (e) => {
    e.preventDefault(); // prevent the default action
    if (!saveClicked) {
      // if save button was not clicked, show the popup
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    setSaveClicked(false);
    setOpen(false);
    navigate("/user"); // navigate to /user when the user confirms
  };

  const handleSave = () => {
    console.log("Save button clicked!");
    setSaveClicked(true);
    saveSettings(calendarSettings, userID, calendarID);
    setShowAlert(true); // Show the alert when the user clicks the save button
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  setTimeout(() => {
    setShowAlert(false);
  }, 2000);

  const calendarSettings = useSelector((state) => state.calendar);
  const [user] = useAuthState(auth);
  //check if user is defined
  const userID = user ? user.uid : null;
  //heck if calendarID is defined
  const calendarID = useSelector((state) =>
    state.calendar.id ? state.calendar.id.toString() : ""
  );
  // console.log("calendarID", calendarID);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={
              saveClicked || location.pathname.endsWith("/view")
                ? handleConfirm
                : handleClickOpen
            }>
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
              }}>
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
              }}>
              calendar
            </Typography>
          </Box>

          <Popup
            open={open}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
          />
          <Box sx={{ flexGrow: 1 }} />
          {showAlert && (
            <Alert sx={{ mx: 5 }} severity="success">
              Changes saved successfully!
            </Alert>
          )}
          <Box sx={{ p: 0, display: { md: "flex" }, mx: 1 }}>
            <Tooltip title={!previewClicked ? "Preview" : "Edit"}>
              <IconButton
                component={Link}
                to={
                  !previewClicked
                    ? `/editor/${calendarID}/view`
                    : `/editor/${calendarID}`
                }
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
                  setPreviewClicked(!previewClicked);
                }}>
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
            }}>
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
                onClick={() => {
                  setSaveClicked(true);
                  saveSettings(calendarSettings, userID, calendarID);
                  handleSave();
                }}>
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
                }}>
                Log out
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default EditorHeader;
