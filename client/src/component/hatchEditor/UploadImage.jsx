import { useState } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const UploadImage = ({ setSrc }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  let fileName = file ? file.name : "No file chosen";

  const getFile = (e) => {
    setFile(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const deleteHandler = () => {
    setSrc(null);
    setFile(null);
  };

  return (
    <>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemText primary={<PhotoOutlinedIcon />} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pr: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  padding: "5px 10px",
                  marginBottom: "5px",
                  color: "black",
                  borderColor: "black",
                }}
              >
                Upload file
                <input type="file" hidden onChange={getFile} />
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">{fileName}</Typography>
                {file && (
                  <IconButton onClick={deleteHandler}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default UploadImage;
