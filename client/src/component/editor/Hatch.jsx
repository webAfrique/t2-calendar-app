import Draggable from "react-draggable";
import { Box, Card, Typography } from "@mui/material";
import Star from "./Star";

const ShapedBox = ({ date, shape }) => {
  const isCircle = shape === "Circle";
  const isStar = shape === "Star";

  const style = {
    border: "1px dotted #333",
    width: "100px",
    height: "100px",
    borderRadius: isCircle ? "50%" : "0",
  }; // default style

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
    <Card style={style}>
      <Typography variant="h6" style={{ textAlign: "center", color: "grey" }}>
        {date}
      </Typography>
    </Card>
  ); // if shape is Square or Circle
};

const Hatch = ({ date, shape }) => (
  <Draggable>
    <ShapedBox date={date} shape={shape} />
  </Draggable>
);

export default Hatch;
