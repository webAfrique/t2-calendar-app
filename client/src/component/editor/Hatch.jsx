import Draggable from "react-draggable";
import { Box, Card, Typography } from "@mui/material";
import Star from "./Star";

const Hatch = ({ date, shape, hatchDimensions }) => {
  const isCircle = shape === "Circle";
  const isStar = shape === "Star";
  const { width, height } = hatchDimensions;

  const style = {
    border: "1px dotted #333",
    width: width,
    height: height,
    borderRadius: isCircle ? "50%" : "0",
  }; // default style

  console.log("style", style);

  if (isStar) {
    return (
      <Box
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
        }}
      >
        <Star />
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "grey",
          }}
        >
          {date}
        </Typography>
      </Box>
    );
  } // if shape is Star

  return (
    <Draggable>
      <Card style={style}>
        <Typography variant="h6" style={{ textAlign: "center", color: "grey" }}>
          {date}
        </Typography>
      </Card>
    </Draggable>
  ); // if shape is Square or Circle
};

export default Hatch;
