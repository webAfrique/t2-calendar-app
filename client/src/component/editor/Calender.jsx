import { useSelector } from "react-redux";
import Hatch from "./Hatch";

function Calendar({ shape, setIsClicked, setHatchNumber, setOpen }) {
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
          key={date.number}
          date={date.number}
          shape={shape}
          setIsClicked={setIsClicked}
          setHatchNumber={setHatchNumber}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
}

export default Calendar;
