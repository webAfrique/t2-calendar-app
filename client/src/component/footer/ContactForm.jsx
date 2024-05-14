import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Grid
        container
        component="main"
        sx={{ height: "65%", //set height of the form
       
        }}>
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
    <Box onSubmit={handleSubmit}
    sx={{
      my: 8,
      mx: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
    >
      <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#476C92", my: 3.5 }}>
              Contact Us
            </Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        required
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
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
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
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="message"
        label="Message"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        multiline
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
        rows={4}
        value={formData.message}
        onChange={handleChange}
      />
       <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  height: "3rem", //set button higher
                  backgroundColor: "#476C92",
                  fontWeight: "bold", //set font weight
                  textTransform: "none", // Set text transformation to none
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#79B1D7",
                    color: "#476C92",
                  },
                }}>Submit</Button>
    </Box>
  </Grid>
  </Grid>

  );
}

export default ContactForm;
