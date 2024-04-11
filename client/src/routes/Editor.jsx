import React, { useState } from "react";
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
  const [backgoroundStyles, setBackgoroundStyles] = React.useState({});
  const [dates, setDates] = React.useState([]);
  const [create, setCreate] = React.useState(false);
  const [inputText, setInputText] = useState("");

  return (
    <>
      <Divider />
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
                marginTop: "70px",
              },
            }}
            open
          >
            <Title
              setTitleStyles={setTitleStyles}
              inputText={inputText}
              setInputText={setInputText}
            />
            <DateCalendar setDates={setDates} />
            <Background setBackgoroundStyles={setBackgoroundStyles} />
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
          </Drawer>
        </Box>

        <Box
          style={backgoroundStyles}
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: "100vh",
          }}
        >
          <Typography paragraph style={titleStyles}>
            {inputText}
          </Typography>
          <Box>
            {create ? ( // if create is true, render Canvas component
              <Calendar dates={dates} />
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
