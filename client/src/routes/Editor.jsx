import React, { useState } from "react";
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
import Hatch from "../component/editor/Hatch";
import WidthHeight from "../component/hatchEditor/WidthHeight";
import Shapes from "../component/editor/Shapes";
import TextEditor from "../component/hatchEditor/TextEditor";
import BasicModal from "../component/hatchEditor/BasicModal";
import HatchNavigation from "../component/hatchEditor/HatchNavigation";
import Video from "../component/hatchEditor/Video";
import UploadImage from "../component/hatchEditor/UploadImage";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useSelector } from "react-redux";

const drawerWidth = 350;

function Editor({ calendarView }) {
  const [backgoroundStyles, setBackgoroundStyles] = React.useState({});
  const [create, setCreate] = React.useState(false);
  const [shape, setShape] = useState("");
  // const [hatchDimensions, setHastchDimensions] = useState({});
  const [hatchTextStyles, setHatchTextStyles] = React.useState({});
  const [hatchTitleStyles, setHatchTitleStyles] = React.useState({});
  const [inputHatchTitle, setInputHatchTitle] = useState("");
  const [inputHatchText, setInputHatchText] = useState("");
  const [hatchNumber, setHatchNumber] = useState();
  const [onVideoAdd, handleAddVideo] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  //regarding calendar slice
  const calendarTitle = useSelector((state) => state.calendar.calendarTitle);
  const calendarStyles = useSelector((state) => state.calendar.styles);

  //modal window related settings
  const [src, setSrc] = useState(null);
  const [open, setOpen] = useState(false);

  //display calendar in preview or editor mode depending on the calendarView prop

  if (calendarView === "preview") {
    return (
      <Box
        style={backgoroundStyles}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: `calc(100vh - 110px)`,
          margin: "auto",
        }}
      >
        <Typography paragraph style={calendarStyles}>
          {calendarTitle}
        </Typography>
        <Box>
          <Calendar
            shape={shape}
            setIsClicked={setIsClicked}
            setHatchNumber={setHatchNumber}
            hatchDimensions={hatchDimensions}
            setHatchDimensions={setHatchDimensions}
          />
        </Box>
      </Box>
    );
  }

  // if user is not logged in, redirect to login page
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

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
                <HatchNavigation hatchNumber={hatchNumber} />
                <WidthHeight /* setHatchDimensions={setHatchDimensions} */ />
                <TextEditor
                  setHatchTextStyles={setHatchTextStyles}
                  setHatchTitleStyles={setHatchTitleStyles}
                  inputHatchTitle={inputHatchTitle}
                  setInputHatchTitle={setInputHatchTitle}
                  inputHatchText={inputHatchText}
                  setInputHatchText={setInputHatchText}
                />
                <UploadImage setSrc={setSrc} />
                <Video onVideoAdd={handleAddVideo} />
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
                    onClick={() => setOpen(true)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Preview hatch # {hatchNumber}
                  </Button>

                  <Button color="primary" onClick={() => setIsClicked(false)}>
                    <ExitToAppOutlinedIcon
                      style={{ transform: "scaleX(-1)", marginRight: "10px" }}
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
                <DateCalendar />
                <Background setBackgoroundStyles={setBackgoroundStyles} />
                <Shapes setShape={setShape} shape={shape} />

                {/* this button below will be rendered conditionally */}
                <Button
                  variant="contained"
                  sx={{
                    display: "block",
                    margin: "auto",
                    width: "100px",
                    backgroundColor: "#476C92",
                    color: "white",
                    borderRadius: "30px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#476C92",
                      borderColor: "#476C92",
                      boxShadow: "none",
                      border: "1px solid",
                    },
                  }}
                  onClick={() => setCreate(true)}
                >
                  Create
                </Button>
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
            height: `calc(100vh - 110px)`,
          }}
        >
          {open && (
            <BasicModal
              setOpen={setOpen}
              src={src}
              open={open}
              videoURL={onVideoAdd}
              onClose={() => setOpen(false)}
              hatchNumber={hatchNumber}
              inputHatchTitle={inputHatchTitle}
              inputHatchText={inputHatchText}
              hatchTitleStyles={hatchTitleStyles}
              hatchTextStyles={hatchTextStyles}
            />
          )}
          {/* this code will be rendered conditionally later */}

          {!calendarTitle ? (
            <Typography paragraph sx={{ fontStyle: "italic", color: "grey" }}>
              Calendar name
            </Typography>
          ) : (
            <Typography paragraph style={calendarStyles}>
              {calendarTitle}
            </Typography>
          )}

          <Box>
            {create ? ( // if create is true, render Canvas component
              <Calendar
                shape={shape}
                setIsClicked={setIsClicked}
                setHatchNumber={setHatchNumber}
                /*  hatchDimensions={hatchDimensions}
                setHatchDimensions={setHatchDimensions} */
              />
            ) : (
              <Typography paragraph sx={{ fontStyle: "italic", color: "grey" }}>
                Click Create to see hatches
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Editor;
