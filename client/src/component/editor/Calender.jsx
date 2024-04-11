import Hatch from "./Hatch";

function Calendar({ dates }) {
  return (
    <div
      style={{
        with: "100%",
        height: "fit-content",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "10px",
      }}
    >
      {dates.map((date) => (
        <Hatch key={date} date={date} />
      ))}
    </div>
  );
}

export default Calendar;
