import Hatch from "./Hatch";

function Calendar({ dates, shape }) {
  const isStar = shape === "Star";

  const style = {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: isStar ? "0" : "10px",
  };
  return (
    <div style={style}>
      {dates.map((date) => (
        <Hatch key={date} date={date} shape={shape} />
      ))}
    </div>
  );
}

export default Calendar;
