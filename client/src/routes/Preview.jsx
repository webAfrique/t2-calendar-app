import { Box, Typography } from "@mui/material";
import Calendar from "../component/editor/Calender";
import { useSelector } from "react-redux";

const Preview = ({ setIsClicked, setHatchNumber }) => {
  const drawerWidth = 350;
  const dates = useSelector((state) =>
    state.calendar.dates ? state.calendar.dates : []
  );
  const calendarTitle = useSelector((state) => state.calendar.title);
  const calendarStyles = useSelector((state) => state.calendar.styles);
  const background = useSelector((state) => state.calendar.background);

  const { color = "", imageURL = "", defaultImage = "" } = background || {};

  const backgoroundStyles = {
    backgroundColor: color,
    backgroundImage: defaultImage ? `url(${defaultImage})` : `url(${imageURL})`, // Use defaultImage if available, otherwise use imageURL
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <>
      <Box
        style={backgoroundStyles}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: dates.length < 26 ? `calc(100vh)` : "auto", // if dates are more than 25, set height to 100vh
          margin: "auto",
        }}
      >
        <Typography paragraph style={calendarStyles}>
          {calendarTitle}
        </Typography>
        <Box>
          <Calendar
            setIsClicked={setIsClicked}
            setHatchNumber={setHatchNumber}
          />
        </Box>
      </Box>
    </>
  );
};

export default Preview;
