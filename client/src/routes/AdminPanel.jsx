import React from "react";
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

import { auth } from "../../../server/firebase";

const defaultTheme = createTheme();

const AdminPanel = () => {
  const user = auth.currentUser;
  if (user) {
    console.log(user);
  }
  return (
    <>
      <div>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", my: 2 }}>
          Admin Panel
        </Typography>
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
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
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};

export default AdminPanel;
