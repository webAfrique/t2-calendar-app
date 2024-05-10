import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LinkIcon from "@mui/icons-material/Link";
import PropTypes from "prop-types";
import { videoSet, videoDelete } from "../../features/hatchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

Video.propTypes = {
  onVideoAdd: PropTypes.func.isRequired,
};

function Video({ hatchNumber }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const hatchVideo = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.video : "";
  });
  console.log("hatchVideo", hatchVideo);

  const handleToggleInput = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleToggleInput}
          style={{ color: "#476C92" }}
        >
          <ListItemText
            primary={<PlayCircleOutlineIcon style={{ color: "#476C92" }} />}
          />
          {open ? <ExpandMoreIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pb: 1, pl: 2, pr: 2 }}>
            <TextField
              fullWidth
              placeholder="Place your URL"
              value={hatchVideo.url}
              onChange={(e) => {
                dispatch(
                  videoSet({
                    url: e.target.value,
                    hatchNumber,
                  })
                );
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#476C92", // Set text field border color
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {hatchVideo.url && (
                <IconButton
                  onClick={() =>
                    dispatch(
                      videoDelete({
                        hatchNumber,
                      })
                    )
                  }
                >
                  <ClearIcon sx={{ color: "#476C92" }} />
                </IconButton>
              )}
            </Box>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default Video;
