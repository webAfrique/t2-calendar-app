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
import { imageSet } from "../../features/hatchSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadImage = ({ hatchNumber, setSrc }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  let fileName = file ? file.name : "No file chosen";

  const hatchImage = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.image.fileName : "";
  });

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
                <input type="file" hidden onChange=
                  {(e) => {
                    setFile(e.target.files[0]);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    dispatch(
                      imageSet({
                        url: URL.createObjectURL(e.target.files[0]),
                        fileName: e.target.files[0].name,
                        hatchNumber,
                      })
                    );
                  }
                }
                value= {hatchImage}/>
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
