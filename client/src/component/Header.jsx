import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUser } from "../../../server/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation } from "react-router-dom";

/* const pages = ["Instruction", "Pricing"]; */
const settings = ["Register", "Log in"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = React.useState("");

  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const isRegisterRoute = location.pathname === "/register";

  React.useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userData = await getUser(user.uid);
        setUsername(userData.name);
      };
      fetchUser();
    }
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 0;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };
  // Not showing tabs for Instruction and Pricing on user route

  const showTabs = location.pathname !== "/user";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "2px solid #9AC8E8",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
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
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {location.pathname !== "/user" && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#00a8cd"
            >
              <MenuIcon />
            </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                textDecoration: "none",
                display: { xs: "block", md: "none" },
                color: "#476C92",
              }}
            >
              {showTabs && (
              <MenuItem
                sx={{
                  textDecoration: "none",
                  color: "#476C92",
                }}
                onClick={() => {
                  scrollToSection("instruction");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Instruction</Typography>
              </MenuItem>
              )}
              {showTabs && (
              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => {
                  scrollToSection("pricing");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Pricing</Typography>
              </MenuItem>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              mx: 5,
              gap: "30px",
            }}
          >
            {showTabs && (
            <Link
              onClick={() => scrollToSection("instruction")}
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                style={{
                  color: "#476C92",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Instruction
              </Typography>
            </Link>
            )}
            {showTabs && (
            <Link
              onClick={() => scrollToSection("pricing")}
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                style={{
                  color: "#476C92",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Pricing
              </Typography>
            </Link>
            )}
          </Box>
          <Box sx={{ p: 0, display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <Box
                  sx={{
                    p: 0,
                    mx: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "40px",
                  }}
                >
                  <Box
                    sx={{
                      width: "80px",
                    }}
                  >
                    {location.pathname !== "/user" && (
                      <Link
                        to="/user"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#476C92",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}
                        >
                          Calendars
                        </Typography>
                      </Link>
                    )}
                  </Box>
                  <Typography
                    style={{
                      color: "#476C92",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {username && `Welcome, ${username}!`}
                  </Typography>
                </Box>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 1 }}>
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
                </Box>
              </>
            ) : (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {!user && !isLoginRoute && (
                  <Link to="/login">
                    <Button
                      variant="text"
                      sx={{
                        width: "100px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#476C92",
                        borderRadius: "30px",
                        textTransform: "capitalize",
                        border: "1px solid transparent",
                        mr: !user && !isRegisterRoute ? 2 : 0, // Set margin-right conditionally
                        "&:hover": {
                          color: "#476C92",
                          borderColor: "#476C92",
                          boxShadow: "none",
                          border: "1px solid",
                        },
                      }}
                    >
                      Log in
                    </Button>
                  </Link>
                )}
                {!user && !isRegisterRoute && (
                  <Link to="/register">
                    <Button
                      variant="text"
                      sx={{
                        width: "120px",
                        fontWeight: "bold",
                        color:
                          location.pathname === "/login" ? "#476C92" : "white",
                        borderRadius: "30px",
                        textTransform: "capitalize",
                        fontSize: "1.1rem",
                        border: "1px solid transparent",
                        backgroundColor:
                          location.pathname === "/login" ? "white" : "#476C92",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#476C92",
                          borderColor: "#476C92",
                          boxShadow: "none",
                          border: "1px solid",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: { xs: "flex", md: "none" } }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
