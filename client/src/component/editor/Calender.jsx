import Hatch from "./Hatch";
import { useSelector } from "react-redux";

function Calendar({ shape, setIsClicked, setHatchNumber, hatchDimensions }) {
  const dates = useSelector((state) => state.calendar.dates);
  const isStar = shape === "Star";

  const style = {
    width: "100%",
    height: "fit-content",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    justifyItems: "center",
    gap: isStar ? "0" : "10px",
  };

  return (
    <div style={style}>
      {dates.map((date) => (
        <Hatch
          key={date}
          date={date}
          shape={shape}
          setIsClicked={setIsClicked}
          setHatchNumber={setHatchNumber}
          hatchDimensions={hatchDimensions}
        />
      ))}
    </div>
  );
}

export default Calendar;
