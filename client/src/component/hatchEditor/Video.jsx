import React, { useState } from "react";
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

Video.propTypes = {
  onVideoAdd: PropTypes.func.isRequired,
};

function Video({ onVideoAdd }) {
  const [videoURL, setVideoURL] = useState("");
  const [open, setOpen] = useState(false);

  const handleVideoChange = (e) => {
    setVideoURL(e.target.value);
    onVideoAdd(e.target.value);
  };

  const handleToggleInput = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleToggleInput}
          style={{ color: "#476C92" }}>
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
              value={videoURL}
              onChange={handleVideoChange}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#476C92",
                },
                "& .Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#476C92", // Border color when focused
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
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default Video;
