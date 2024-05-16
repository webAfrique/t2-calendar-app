import { Box, Typography } from "@mui/material";
import Calendar from "../component/editor/Calender";
import { useSelector } from "react-redux";
import PreviewModal from "../component/editor/PreviewModal";
import React, { useState } from "react";

const Preview = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hatchNumber, setHatchNumber] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

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

  const backdropStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    zIndex: 100, // Lower z-index than the modal
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Box
        style={backgoroundStyles}
        component="main"
        sx={{
          position: "relative",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: dates.length < 26 ? `calc(100vh)` : "auto", // if dates are more than 25, set height to 100vh
          margin: "auto",
        }}>
        <Typography paragraph style={calendarStyles}>
          {calendarTitle}
        </Typography>
        <Box>
          <Calendar
            setIsClicked={setIsClicked}
            setHatchNumber={setHatchNumber}
            setOpen={setPreviewOpen}
          />
        </Box>
      </Box>
      {previewOpen && (
        <>
          <div style={backdropStyle} />
          <PreviewModal
            setOpen={setPreviewOpen}
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            hatchNumber={hatchNumber}
          />
        </>
      )}
    </>
  );
};

export default Preview;
