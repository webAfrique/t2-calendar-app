import Draggable from "react-draggable";
import { Typography } from "@mui/material";
//import Star from "./Star";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./Hatch.module.css";
import { updatePositions } from "../../features/calendarSlice";

const Hatch = ({ date, setIsClicked, setHatchNumber, setOpen }) => {
  const shape = useSelector((state) => state.calendar.shape);
  const isCircle = shape === "Circle";
  //const isStar = shape === "Star";

  //regarding calendar slice
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.calendar.dates);
  console.log("dates from hatch", dates);
  // const hatches = useSelector((state) => state.hatches.hatchObjects);
  // console.log("hatches", hatches);

  const hatchWidth = useSelector((state) => {
    const hatch = state.calendar.dates.find((hatch) => hatch.number === date);
    return hatch ? hatch.width : 100;
  });
  const hatchHeight = useSelector((state) => {
    const hatch = state.calendar.dates.find((hatch) => hatch.number === date);
    return hatch ? hatch.height : 100;
  });

  const hatchImage = useSelector((state) => {
    const hatch = state.calendar.dates.find((hatch) => hatch.number === date);

    return hatch ? hatch.image.url : "";
  });

  //read hatch positions from redux store
  const hatchPosition = useSelector((state) => {
    const hatch = state.calendar.dates.find((hatch) => hatch.number === date);

    return hatch ? hatch.positions : { x: 0, y: 0 };
  });
  console.log("hatchPosition", hatchPosition);

  const [isHovered, setIsHovered] = useState(false);

  // Preload hatch image to reduce hatch image delay
  useEffect(() => {
    const img = new Image();
    img.src = hatchImage;
  }, [hatchImage]);

  const styleOnHoverBackImage = isHovered
    ? {
        backgroundImage: hatchImage ? `url(${hatchImage})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }
    : {};
  const styleOnHoverFrontDoor = isHovered
    ? {
        backgroundColor: "grey",
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

  const handleStop = (date, data) => {
    dispatch(
      updatePositions({ hatchNumber: date, position: { x: data.x, y: data.y } })
    );
  };

  return (
    <Draggable
      defaultPosition={hatchPosition}
      onStop={(e, data) => handleStop(date, data)}
    >
      <div
        onDoubleClick={() => {
          setIsClicked(true);
          setHatchNumber(date);
          setOpen(true);
        }}
        className={styles.door}
        style={widthHeight}
      >
        <div
          className={styles.doorFront}
          style={{
            ...style,
            ...styleOnHoverFrontDoor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.doorNumber}>
            <Typography variant="h5">{date}</Typography>
          </div>
        </div>
        <div className={styles.doorBack} style={{ widthHeight }}>
          <div
            className={styles.backImage}
            style={{
              ...style,
              ...styleOnHoverBackImage,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          ></div>
        </div>
      </div>
    </Draggable>
  ); // if shape is Square or Circle
};

export default Hatch;
