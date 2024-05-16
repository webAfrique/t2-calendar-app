import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../../server/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Title from "../component/editor/Title";
import DateCalendar from "../component/editor/DateCalendar";
import Calendar from "../component/editor/Calender";
import Background from "../component/editor/Background";
import { Divider } from "@mui/material";
import WidthHeight from "../component/hatchEditor/WidthHeight";
import Shapes from "../component/editor/Shapes";
import TextEditor from "../component/hatchEditor/TextEditor";
import BasicModal from "../component/hatchEditor/BasicModal";
import HatchNavigation from "../component/hatchEditor/HatchNavigation";
import Video from "../component/hatchEditor/Video";
import UploadImage from "../component/hatchEditor/UploadImage";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const drawerWidth = 350;

function Editor({ calendarView }) {
  const [hatchNumber, setHatchNumber] = useState(1);
  const [maxHatchNumber, setMaxHatchNumber] = useState(31);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isClicked, setIsClicked] = useState(false);

  //regarding calendar slice
  const calendarTitle = useSelector((state) => state.calendar.title);
  const calendarStyles = useSelector((state) => state.calendar.styles);
  const background = useSelector((state) => state.calendar.background);
  //check to ensure that state.calendar.background is defined
  const { color = "", imageURL = "", defaultImage = "" } = background || {};

  const dates = useSelector((state) =>
    state.calendar.dates ? state.calendar.dates : []
  );

  const backgoroundStyles = {
    backgroundColor: color,
    backgroundImage: defaultImage ? `url(${defaultImage})` : `url(${imageURL})`, // Use defaultImage if available, otherwise use imageURL
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  //modal window related settings
  const [open, setOpen] = useState(false);

  // if user is not logged in, redirect to login page
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  // Update max hatch number based on the number of days in the current month
  useEffect(() => {
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    setMaxHatchNumber(daysInMonth);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // To move to the next hatch
  const nextHatch = () => {
    if (hatchNumber < maxHatchNumber) {
      setHatchNumber((prev) => prev + 1);
    }
  };

  // To move to the previous hatch
  const previousHatch = () => {
    if (hatchNumber > 1) {
      setHatchNumber((prev) => prev - 1);
    }
  };

  return (
    <>
      <Divider sx={{ borderColor: "#9AC8E8" }} />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "65px",
                borderColor: "#9AC8E8",
              },
            }}
            open
          >
            {/* please place your single hatch menu components below */}
            {isClicked && (
              <>
                <HatchNavigation
                  hatchNumber={hatchNumber}
                  maxHatchNumber={maxHatchNumber}
                  nextHatch={nextHatch}
                  previousHatch={previousHatch}
                />
                <WidthHeight hatchNumber={hatchNumber} />
                <TextEditor hatchNumber={hatchNumber} />
                <UploadImage hatchNumber={hatchNumber} />
                <Video hatchNumber={hatchNumber} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingBottom: 2,
                    paddingTop: 2,
                    marginTop: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    color="primary"
                    onClick={() => setIsClicked(false)}
                    sx={{
                      color: "#476C92",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    <ExitToAppOutlinedIcon
                      style={{
                        transform: "scaleX(-1)",
                        marginRight: "10px",
                        color: "#476C92",
                      }}
                    />
                    Calendar
                  </Button>
                </Box>
              </>
            )}
            {/* code below will be shown when no hatches are clicked*/}
            {!isClicked && (
              <>
                <Title />
                <DateCalendar onSelectDate={handleDateChange} />
                <Background />
                <Shapes />
              </>
            )}
          </Drawer>
        </Box>

        <Box
          style={backgoroundStyles}
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: dates.length < 26 ? `calc(100vh - 110px)` : "auto", // if dates are more than 30, set height to 100vh
          }}
        >
          {/* this code will be rendered conditionally later */}
          {!calendarTitle ? (
            <Typography paragraph sx={{ fontStyle: "italic", color: "grey" }}>
              Calendar name will appear here
            </Typography>
          ) : (
            <Typography paragraph style={calendarStyles}>
              {calendarTitle}
            </Typography>
          )}
          <Box>
            {/* if create is true, render Canvas component */}
            <Calendar
              setIsClicked={setIsClicked}
              setHatchNumber={setHatchNumber}
              setOpen={setOpen}
            />
          </Box>
        </Box>

        {open && (
          <BasicModal
            setOpen={setOpen}
            open={open}
            onClose={() => setOpen(false)}
            hatchNumber={hatchNumber}
          />
        )}
      </Box>
    </>
  );
}

export default Editor;
