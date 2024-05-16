import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GetAllUsers from "../component/adminPanel/GetAllUsers";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { auth, getUser, getUserCount } from "../../../server/firebase";
import { countAllCalendars } from "../../../server/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import UserAmount from "../component/adminPanel/UserAmount";
import CalendarAmount from "../component/adminPanel/CalendarAmount";

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserDate] = React.useState(null);
  const [userCount, setUserCount] = useState(null);
  const [calendarCount, setCalendarCount] = useState(null);

  React.useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userData = await getUser(user.uid);
        setUserDate(userData);
      };
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchUserCount();
    fetchCalendarCount();
  }, [user]);

  const fetchUserCount = async () => {
    try {
      if (user) {
        const totalCount = await getUserCount(user.uid);
        setUserCount(totalCount);
        // console.log(totalCount);
      }
    } catch (error) {
      console.log("Error fetching user count:", error);
    }
  };

  const fetchCalendarCount = async () => {
    try {
      const totalCount = await countAllCalendars();
      setCalendarCount(totalCount);
    } catch (error) {
      console.error("Error fetching calendar count:", error);
    }
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 56.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }
  if (!user) {
    // User not logged in
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 56.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Alert severity="warning">
          <AlertTitle>Reminder</AlertTitle>
          Please log in as admin to access the Admin Panel.
        </Alert>
      </Box>
    );
  } else if (!userData || !userData.isAdmin) {
    // User logged in but data not fetched yet or not an admin
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 56.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Alert severity="warning">
          <AlertTitle>Reminder</AlertTitle>
          You are not authorized to access the Admin Panel.
        </Alert>
      </Box>
    );
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            minHeight: "calc(100vh - 64px - 56.5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}>
          <Container maxWidth="md">
            <Grid container spacing={3} justifyContent="center">
              {/* Calendar Amount */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 140,
                    margin: "auto",
                  }}>
                  <CalendarAmount calendarCount={calendarCount} />
                </Paper>
              </Grid>
              {/* User Amount */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 140,
                    margin: "auto",
                  }}>
                  <UserAmount userCount={userCount} />
                </Paper>
              </Grid>
              {/* Get All Users */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <GetAllUsers />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
};

export default AdminPanel;
