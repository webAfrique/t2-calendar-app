import { Box, Divider, IconButton, Typography } from "@mui/material";
import DoorSlidingOutlinedIcon from "@mui/icons-material/DoorSlidingOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useSelector } from "react-redux";

const HatchNavigation = ({ hatchNumber, setHatchNumber }) => {
  const dates = useSelector((state) =>
    state.calendar.dates ? state.calendar.dates : []
  );
  console.log("dates from nav", dates);

  const firstHatch = dates[0].number;
  const lastHatch = dates[dates.length - 1].number;

  const handleNextHatch = () => {
    if (hatchNumber < lastHatch) {
      setHatchNumber((prev) => prev + 1);
    }
  };

  // To move to the previous hatch
  const handlePreviousHatch = () => {
    if (hatchNumber > firstHatch) {
      setHatchNumber((prev) => prev - 1);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 1,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <IconButton onClick={handlePreviousHatch}>
          <WestOutlinedIcon sx={{ stroke: "#476C92", strokeWidth: 1 }} />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            fontWeight: "bold",
            width: "50px",
            color: "#476C92",
          }}
        >
          {
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {" "}
              {hatchNumber}
            </Typography>
          }
          <DoorSlidingOutlinedIcon />
        </Box>

        <IconButton onClick={handleNextHatch}>
          <EastOutlinedIcon sx={{ stroke: "#476C92", strokeWidth: 1 }} />
        </IconButton>
      </Box>
      <Divider />
    </div>
  );
};

export default HatchNavigation;
