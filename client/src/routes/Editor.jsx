import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Title from "../component/editor/Title";

const drawerWidth = 260;

// const cssStyles = {
//   textAlign: "",
//   fontFamily: "Roboto",
//   color: "red",
//   fontSize: 24,
//   textDecoration: "underline",
//   fontWeight: "bold",
//   fontStyle: "italic",
// };

function Editor() {
  //const [title, setTitle] = React.useState("");
  const [titleStyles, setTitleStyles] = React.useState({});
  return (
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
            },
          }}
          open
        >
          <Title setTitleStyles={setTitleStyles} />
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
          Test
        </Typography>
      </Box>
    </Box>
  );
}

export default Editor;
