import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Title from "../component/editor/Title";
import DateCalendar from "../component/editor/DateCalendar";
import Calendar from "../component/editor/Calender";
import Background from "../component/editor/Background";
import { Divider } from "@mui/material";
import Shapes from "../component/editor/Shapes";

const drawerWidth = 350;

function Editor() {
  const [titleStyles, setTitleStyles] = React.useState({});
  const [dates, setDates] = React.useState([]);
  const [create, setCreate] = React.useState(false);

  return (
    <>
      <Divider />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "70px",
              },
            }}
            open
          >
            <Title setTitleStyles={setTitleStyles} />
            <DateCalendar setDates={setDates} />
            <Background />
            <Shapes />

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
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Typography paragraph style={titleStyles}>
            Title
          </Typography>
          <Box>
            {create ? ( // if create is true, render Canvas component
              <Calendar dates={dates} />
            ) : (
              <Typography paragraph sx={{ fontStyle: "italic", color: "grey" }}>
                Click Create to start
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Editor;
