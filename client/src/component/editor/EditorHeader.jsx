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
import Logo from "../../assets/Advent_Calendar.png";
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
          <Link to="/user">
            <Avatar
              src={Logo}
              alt="Logo"
              variant="square"
              sx={{
                mr: 1,
                width: 60,
                height: 60,
              }}
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#00a8cd",
              textDecoration: "none",
            }}
          >
            WIME
          </Typography>

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
