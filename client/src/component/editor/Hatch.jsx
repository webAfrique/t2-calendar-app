import Draggable from "react-draggable";
import { Typography } from "@mui/material";
//import Star from "./Star";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./Hatch.module.css";
import { setHatchObjects } from "../../features/hatchSlice";

const Hatch = ({ date, setIsClicked, setHatchNumber, setOpen }) => {
  const shape = useSelector((state) => state.calendar.shape);
  const isCircle = shape === "Circle";
  //const isStar = shape === "Star";

  //regarding calendar slice
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.calendar.dates);
  const hatches = useSelector((state) => state.hatches.hatchObjects);
  console.log("hatches", hatches);

  const hatchWidth = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === date
    );
    return hatch ? hatch.width : 100;
  });
  const hatchHeight = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === date
    );
    return hatch ? hatch.height : 100;
  });

  const hatchImage = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === date
    );

    return hatch ? hatch.image.url : "";
  });

  const [isHovered, setIsHovered] = useState(false);

  // Preload hatch image to reduce hatch image delay
  useEffect(() => {
    const img = new Image();
    img.src = hatchImage;
  }, [hatchImage]);

  const styleOnHover = isHovered
    ? {
        backgroundImage: hatchImage ? `url(${hatchImage})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }
    : {};

  const style = {
    border: "1px dotted #666",
    borderRadius: isCircle ? "50%" : "0",
  }; // default style

  const widthHeight = {
    width: `${hatchWidth}px`,
    height: `${hatchHeight}px`,
  };

  // if (isStar) {
  //   return (
  //     <Draggable>
  //       <Box
  //         style={{
  //           position: "relative",
  //           width: "120px",
  //           height: "120px",
  //         }}
  //         onClick={() => {
  //           setIsClicked(true);
  //           setHatchNumber(date);
  //           if (hatches.length === 0) {
  //             dispatch(setHatchObjects(dates));
  //           }
  //         }}
  //       >
  //         <Star />
  //         <Typography
  //           variant="h5"
  //           style={{
  //             position: "absolute",
  //             top: "50%",
  //             left: "50%",
  //             transform: "translate(-50%, -50%)",
  //             textAlign: "center",
  //             color: "white",
  //           }}
  //         >
  //           {date}
  //         </Typography>
  //       </Box>
  //     </Draggable>
  //   );
  // }

  return (
    <Draggable>
      <div
        onClick={() => {
          setIsClicked(true);
          setHatchNumber(date);
          if (hatches.length === 0) {
            dispatch(setHatchObjects(dates));
          }
          setOpen(true);
        }}
        className={styles.door}
        style={widthHeight}>
        <div className={styles.doorFront} style={style}>
          <div className={styles.doorNumber}>
            <Typography variant="h5">{date}</Typography>
          </div>
        </div>
        <div className={styles.doorBack} style={{ widthHeight }}>
          <div
            className={styles.backImage}
            style={{
              ...style,
              ...styleOnHover,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}></div>
        </div>
      </div>
    </Draggable>
  ); // if shape is Square or Circle
};

export default Hatch;
