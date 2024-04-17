import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../server/firebase";

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
import Logo from "../assets/WIME-logo.png";

const pages = ["Instruction", "Pricing"];
const settings = ["Register", "Log in"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, loading, error] = useAuthState(auth);

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

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Avatar
              src={Logo}
              alt="Logo"
              sx={{
                mr: 1,
                width: 60,
                height: 60,
                backgroundColor: "transparent",
                borderRadius: "50%",
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#00a8cd",
              textDecoration: "none",
            }}
          >
            WIME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mx: 5 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#00a8cd", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ p: 0, display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}>
                  <Typography
                    style={{
                      color: "#00a8cd",
                    }}
                  >
                    {user.displayName ? user.displayName : user.email}
                  </Typography>
                </Box>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}>
                  <Link
                    to="/user"
                    style={{
                      color: "#00a8cd",
                      textDecoration: "none",
                    }}
                  >
                    Calendars
                  </Link>
                </Box>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}>
                  <Link to="/">
                    <Button
                      onClick={() => auth.signOut()}
                      variant="contained"
                      sx={{
                        width: "100px",
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
                      Log out
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      sx={{
                        width: "100px",
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
                <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      sx={{
                        width: "100px",
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

          <Box sx={{ p: 0, display: { xs: "none", md: "flex" }, mx: 2 }}></Box>

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
