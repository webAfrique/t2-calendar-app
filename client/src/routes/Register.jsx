import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../../server/firebase";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function Register2() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("firstName");
    //const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    if (!name) alert("Please enter your first name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (user) navigate("/user");
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 66px - 44px)" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/10401501/pexels-photo-10401501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)", //change background image
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#476C92", my: 3.5 }}>
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, mx: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    InputLabelProps={{ style: { color: "#476C92" } }} // Set label color
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#476C92", // Set text field border color
                        },
                      "&:hover": {
                        // Define hover effect
                        borderColor: "#476C92 !important", // Change border color on hover
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    InputLabelProps={{ style: { color: "#476C92" } }} // Set label color
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#476C92", // Set text field border color
                        },
                      "&:hover": {
                        // Define hover effect
                        borderColor: "#476C92 !important", // Change border color on hover
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputLabelProps={{ style: { color: "#476C92" } }} // Set label color
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#476C92", // Set text field border color
                        },
                      "&:hover": {
                        // Define hover effect
                        borderColor: "#476C92 !important", // Change border color on hover
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    InputLabelProps={{ style: { color: "#476C92" } }} // Set label color
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#476C92", // Set text field border color
                        },
                      "&:hover": {
                        // Define hover effect
                        borderColor: "#476C92 !important", // Change border color on hover
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  height: "3rem", //set button higher
                  backgroundColor: "#476C92",
                  fontWeight: "bold",
                  textTransform: "none", // Set text transformation
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#79B1D7",
                    color: "#476C92",
                  },
                }}>
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: "#476C92" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
// import React from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Title from "../component/Title";

// const defaultTheme = createTheme();

// export default function Register2() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Title />
//     </ThemeProvider>
//   );
// }
