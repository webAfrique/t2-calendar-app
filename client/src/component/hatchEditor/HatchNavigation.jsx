import { Box, Divider, IconButton, Typography } from "@mui/material";
import DoorSlidingOutlinedIcon from "@mui/icons-material/DoorSlidingOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

const HatchNavigation = ({ hatchNumber, nextHatch, previousHatch }) => {
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
        <IconButton onClick={previousHatch}>
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

        <IconButton onClick={nextHatch}>
          <EastOutlinedIcon sx={{ stroke: "#476C92", strokeWidth: 1 }} />
        </IconButton>
      </Box>
      <Divider />
    </div>
  );
};

export default HatchNavigation;
