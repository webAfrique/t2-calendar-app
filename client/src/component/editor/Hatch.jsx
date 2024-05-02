import Draggable from "react-draggable";
import { Box, Typography } from "@mui/material";
import Star from "./Star";
import { useSelector } from "react-redux";
import styles from "./Hatch.module.css";

const Hatch = ({ date, setIsClicked, hatchDimensions, setHatchNumber }) => {
  const shape = useSelector((state) => state.calendar.shape);
  const isCircle = shape === "Circle";
  const isStar = shape === "Star";
  //const { width, height } = hatchDimensions;

  const style = {
    border: "1px dotted #666",
    borderRadius: isCircle ? "50%" : "0",
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
            variant="h5"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
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
      <div
        onClick={() => {
          setIsClicked(true);
          setHatchNumber(date);
        }}
        className={styles.door}
      >
        <div className={styles.doorFront} style={style}>
          <div className={styles.doorNumber}>
            <Typography variant="h5">{date}</Typography>
          </div>
        </div>
        <div className={styles.doorBack}>
          <div className={styles.backImage} style={style}></div>
        </div>
      </div>
    </Draggable>
  ); // if shape is Square or Circle
};

export default Hatch;
