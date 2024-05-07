import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { useDispatch } from "react-redux";
import {
  backgroundDefaultImageSet,
  backgroundDefaultImageDelete,
} from "../../features/calendarSlice";

const images = [
  {
    label: "Christmas dogs",
    imgPath:
      "https://images.unsplash.com/photo-1608096299230-81c7b43d5dfc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Cute Dog",
    imgPath:
      "https://images.unsplash.com/photo-1609463504690-b036bc73b97e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Christmas deer decoration",
    imgPath:
      "https://images.unsplash.com/photo-1576109026346-0e5cc7955858?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Santa",
    imgPath:
      "https://plus.unsplash.com/premium_photo-1661292179662-f67e85c9101a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Santa crystal ball",
    imgPath:
      "https://images.unsplash.com/photo-1551650322-a0cfff4dd76b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Decorations",
    imgPath:
      "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Angels",
    imgPath:
      "https://images.unsplash.com/photo-1481709761765-0876c08d7d26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Flowers",
    imgPath:
      "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?q=80&w=2214&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Sweets",
    imgPath:
      "https://images.unsplash.com/photo-1578330747074-ed30783e858f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Pinky background",
    imgPath:
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Christmas gift",
    imgPath:
      "https://images.unsplash.com/photo-1512916206820-bd6d503c003e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Carousel({ handleSaveDefaultImage, defaultImage }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleToggleDefaultImage = (imgPath) => {
    if (defaultImage === imgPath) {
      dispatch(backgroundDefaultImageDelete()); // Dispatch action to remove default image
    } else {
      dispatch(backgroundDefaultImageSet(imgPath)); // Dispatch action to set default image
    }
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  position: "relative",
                  height: 245,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <img
                  src={step.imgPath}
                  alt={step.label}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleToggleDefaultImage(step.imgPath)}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                  }}>
                  {defaultImage === step.imgPath ? "Remove" : "Save"}
                </Button>
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Carousel;
