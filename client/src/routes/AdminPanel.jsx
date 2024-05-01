import React from "react";
import { Navigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../component/adminPanel/Chart";
import Deposits from "../component/adminPanel/Deposits";
import Orders from "../component/adminPanel/Orders";

import { auth, getUser } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserDate] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const userData = await getUser(user.uid);
        setUserDate(userData);
      };
      fetchUser();
    }
  }, [userData, user]);

  if (!userData) {
    return <div>loading...</div>;
  } else if (userData.isAdmin) {
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
                }}
              >
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
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  } else {
    return <Navigate to="/user" />;
  }
};

export default AdminPanel;
