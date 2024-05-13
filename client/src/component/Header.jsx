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

/* const pages = ["Instruction", "Pricing"]; */
const settings = ["Register", "Log in"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = React.useState("");

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
          <Link to="/"
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }
          }
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
              fontSize: { xs: "12", md: "16"},
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
              <MenuItem
                sx={{ 
                textDecoration: "none",
                color: "#476C92"
              }}
                onClick={() => {
                  scrollToSection("instruction");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center"
                >Instruction</Typography>
              </MenuItem>
              <MenuItem
                sx={{ textDecoration: "none" }}
                onClick={() => {
                  scrollToSection("pricing");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Pricing</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mx: 5 }}>
            <Button
              onClick={() => scrollToSection("instruction")}
              sx={{
                my: 2,
                color: "#476C92",
                display: "block",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Instruction
            </Button>
            <Button
              onClick={() => scrollToSection("pricing")}
              sx={{
                my: 2,
                color: "#476C92",
                display: "block",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Pricing
            </Button>
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
                    gap: "30px",
                  }}
                >
                  <Typography
                    style={{
                      color: "#476C92",
                      fontWeight: "bold",
                    }}
                  >
                    {username && `Welcome, ${username}!`}
                  </Typography>

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
                      }}
                    >
                      Calendars
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 1 }}>
                  <Link to="/">
                    <Button
                      onClick={() => auth.signOut()}
                      variant="contained"
                      sx={{
                        width: "100px",
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
                    >
                      Log out
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      sx={{
                        mx: 2,
                        width: "100px",
                        fontWeight: "bold",
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
                      }}
                    >
                      Log in
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 1 }}>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      sx={{
                        width: "100px",
                        fontWeight: "bold",
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
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </Box>
              </>
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
