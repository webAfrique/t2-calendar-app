import Draggable from "react-draggable";
import { Box, Card, Typography } from "@mui/material";
import Star from "./Star";
import { useSelector } from "react-redux";

const Hatch = ({ date, setIsClicked, hatchDimensions, setHatchNumber }) => {
  const shape = useSelector((state) => state.calendar.shape);
  const isCircle = shape === "Circle";
  const isStar = shape === "Star";
  //const { width, height } = hatchDimensions;

  const style = {
    border: "1px dotted #333",
    // width: width,
    // height: height,
    width: "100px",
    height: "100px",
    borderRadius: isCircle ? "50%" : "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }; // default style

  if (isStar) {
    return (
      <Draggable>
        <Box
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
          }}
          onClick={() => {
            setIsClicked(true);
            setHatchNumber(date);
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
      </Draggable>
    );
  } // if shape is Star

  return (
    <Draggable>
      <Card
        style={style}
        onClick={() => {
          setIsClicked(true);
          setHatchNumber(date);
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: "grey",
          }}
        >
          {date}
        </Typography>
      </Card>
    </Draggable>
  ); // if shape is Square or Circle
};

export default Hatch;
