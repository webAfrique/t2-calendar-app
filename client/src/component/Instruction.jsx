import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const instructions = [
  {
    icon: <HowToRegIcon />,
    description: "Register or Login",
  },
  {
    icon: <DevicesRoundedIcon />,
    description: "Create your calendar",
  },
  {
    icon: <EditCalendarIcon />,
    description:
      "Personalize the calendar by adding your images, videos and more",
  },
  {
    icon: <RemoveRedEyeOutlinedIcon />,
    description: "Preview your calendar and share with others",
  },
];

const Instruction = () => {
  return (
    <Box
      sx={{
        margin: 0,
        minHeight: "100vh",
        backgroundImage: "url(/hero_image.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "40px", md: "0 50px" },
        textAlign: "center",
      }}>
      <Container id="instruction" sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <div>
              <Typography
                component="h1"
                variant="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: "36px", md: "64px" },
                  fontWeight: "bold",
                  color: "#00A8CD",
                  textAlign: "center",
                }}>
                Instruction
              </Typography>
              <Typography
                component="h2"
                variant="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: "18px", md: "24px" },
                  fontWeight: "bold",
                  color: "#476C92",
                  textAlign: "center",
                  marginBottom: "30px",
                }}>
                Follow these simple steps to start your design
              </Typography>
            </div>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              useFlexGap
              sx={{
                width: "80%",
                alignItems: "center",
                marginLeft: "auto", // Move the Stack to the right
                marginRight: "auto", // Move the Stack to the right
              }}>
              {instructions.map(({ icon, description }, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    p: 3,
                    borderRadius: "16px",
                    backgroundColor: "white",
                  }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ width: "100%" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "#476C92",
                        fontSize: "2rem",
                      }}>
                      {index + 1}
                    </Typography>
                    <Box sx={{ color: "#476C92" }}>{icon}</Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#476C92",
                        fontSize: "1rem",
                      }}>
                      {description}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Instruction;
