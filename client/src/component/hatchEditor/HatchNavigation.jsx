import { Box, Divider, IconButton } from "@mui/material";
import DoorSlidingOutlinedIcon from "@mui/icons-material/DoorSlidingOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

const HatchNavigation = ({ hatchNumber }) => {
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
        }}>
        <IconButton>
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
          }}>
          {hatchNumber || (
            <div
              style={{
                visibility: "hidden",
                width: "20px",
              }}></div>
          )}
          <DoorSlidingOutlinedIcon />
        </Box>

        <IconButton>
          <EastOutlinedIcon sx={{ stroke: "#476C92", strokeWidth: 1 }} />
        </IconButton>
      </Box>
      <Divider />
    </div>
  );
};

export default HatchNavigation;
