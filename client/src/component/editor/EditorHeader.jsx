import { Link } from "react-router-dom";
import { auth } from "../../../../server/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Container } from "@mui/material";

function EditorHeader({ calendarView, setCalendarView }) {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/user" style={{textDecoration: "none"}}>
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
              fontSize: { xs: "12", md: "16"},
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
                >
                  <LogoutIcon onClick={() => auth.signOut()} />
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
