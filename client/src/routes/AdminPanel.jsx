import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../component/adminPanel/Chart";
import GetAllUsers from "../component/adminPanel/GetAllUsers";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import {
  auth,
  getUser,
  getUserCount,
  getAllUsers,
} from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserDate] = React.useState(null);
  const [userCount, setUserCount] = useState(null);

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

  function preventDefault(event) {
    event.preventDefault();
  }

  function Title(props) {
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
    );
  }

  Title.propTypes = {
    children: PropTypes.node,
  };

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Europe/Helsinki", // Specify the Europe/Helsinki timezone for Finland
  };

  const date = new Date().toLocaleDateString("en-US", options);

  const Deposits = () => {
    return (
      <React.Fragment>
        <Title>Total Users</Title>
        <Typography component="p" variant="h4">
          {userCount}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {date}
        </Typography>
      </React.Fragment>
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 66px - 44px)",
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
          height: "calc(100vh - 66px - 44px)",
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
  } else if (!userData) {
    // User logged in but data not fetched yet
    return <CircularProgress />;
  } else if (!userData.isAdmin) {
    // User logged in but not an admin
    return <Navigate to="/user" />;
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Users */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <GetAllUsers />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
};

export default AdminPanel;
