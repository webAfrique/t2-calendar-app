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
import { Box, Button, IconButton } from "@mui/material";
import { hatchImageSet, hatchImageDelete } from "../../features/calendarSlice";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../server/firebase";
import { v4 } from "uuid";

const UploadImage = ({ hatchNumber }) => {
  const [open, setOpen] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    dispatch(
      hatchImageDelete({
        hatchNumber,
      })
    );
    if (imageRef) {
      await deleteObject(imageRef);
    }
  };

  // Function to handle file upload to Firebase storage
  const handleUpload = async (e) => {
    const newImageRef = ref(storage, `images/${v4()}`);
    const snapshot = await uploadBytes(newImageRef, e.target.files[0]);
    const url = await getDownloadURL(snapshot.ref);
    setImageRef(newImageRef);
    console.log("url", url);
    if (url) {
      dispatch(
        hatchImageSet({
          url: url,
          hatchNumber,
        })
      );
    }
  };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setOpen(!open)}
            sx={{ color: "#476C92" }}
          >
            <ListItemText
              primary={<PhotoOutlinedIcon sx={{ color: "#476C92" }} />}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pr: 0,
                display: "flex",
                alighItems: "center",
                justifyContent: "center",
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
                  color: "#476C92",
                  borderColor: "#476C92",
                }}
              >
                Upload file
                <input type="file" hidden onChange={handleUpload} />
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={deleteHandler}>
                  <DeleteForeverOutlinedIcon sx={{ color: "#476C92" }} />
                </IconButton>
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
    </>
  );
};

export default UploadImage;
