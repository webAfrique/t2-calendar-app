import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function ErrorPage() {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/4ca96afb-996b-41f7-bc05-dbfcbb389edb/K1WRrD2XA1.json",
    });
    return () => animation.destroy();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "50px",
      }}>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom
        sx={{
          fontFamily: "Inter",
          fontSize: "64px",
          fontWeight: "bold",
          color: "#00A8CD",
          textAlign: "center",
        }}>
        Oops! Page not found.
      </Typography>
      <Box
        ref={animationContainer}
        sx={{
          width: 300,
          height: 300,
          mb: 2,
        }}></Box>
      <Typography>
        The page you are looking for doesn't exist or an other error occurred.{" "}
        <br />
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 3,
            width: "150px",
            height: "45px",
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
          }}>
          Go Home
        </Button>
      </Typography>
    </Box>
  );
}

export default ErrorPage;
