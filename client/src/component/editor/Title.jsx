import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MuiColorInput } from "mui-color-input";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
//regarding slice below
import { useSelector, useDispatch } from "react-redux";
import {
  typedTitle,
  alignmentSet,
  fontFamilySet,
  colorSet,
  fontSizeSet,
  textDecorationSet,
  boldSet,
  italicSet,
} from "../../features/calendarSlice";

const fontFamilies = [
  "Roboto",
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
];

function Title() {
  const [open, setOpen] = React.useState(false);

  //regarding slice below
  const dispatch = useDispatch();
  const title = useSelector((state) =>
    state.calendar.title ? state.calendar.title : ""
  );
  const alignment = useSelector((state) =>
    state.calendar.styles.textAlign ? state.calendar.styles.textAlign : ""
  );
  const fontFamily = useSelector((state) =>
    state.calendar.styles.fontFamily ? state.calendar.styles.fontFamily : ""
  );
  const color = useSelector((state) =>
    state.calendar.styles.color ? state.calendar.styles.color : ""
  );
  const fontSize = useSelector((state) =>
    state.calendar.styles.fontSize ? state.calendar.styles.fontSize : null
  );
  console.log("alignment", alignment);

  const handleHighlightChange = (event, newStyles) => {
    if (newStyles.includes("bold")) {
      dispatch(boldSet(newStyles));
    } else if (newStyles.includes("italic")) {
      dispatch(italicSet(newStyles));
    } else if (newStyles.includes("underline")) {
      dispatch(textDecorationSet(newStyles));
    }
  };
  //create highlighted with grey for selected highlighter in menu

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAlignment = (event, newAlignment) => {
    dispatch(alignmentSet(newAlignment));
  };
  const handleFontFamilyChange = (event) => {
    dispatch(fontFamilySet(event.target.value));
  };

  const handleColorChange = (newColor) => {
    dispatch(colorSet(newColor));
  };

  const handleSizeChange = (event) => {
    dispatch(fontSizeSet(event.target.value));
  };

  const children = [
    <ToggleButton value="left" key="left" sx={{ borderColor: "#476C92" }}>
      <FormatAlignLeftIcon sx={{ color: "#476C92" }} />
    </ToggleButton>,
    <ToggleButton value="center" key="center" sx={{ borderColor: "#476C92" }}>
      <FormatAlignCenterIcon sx={{ color: "#476C92" }} />
    </ToggleButton>,
    <ToggleButton value="right" key="right" sx={{ borderColor: "#476C92" }}>
      <FormatAlignRightIcon sx={{ color: "#476C92" }} />
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleAlignment,
    exclusive: true,
  };

  const titleMenu = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick} sx={{ color: "#476C92" }}>
            <ListItemText
              primary={
                <span
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#476C92", //set text color
                  }}
                >
                  Title
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pb: 1, pl: 2, pr: 2 }}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => dispatch(typedTitle(e.target.value))}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#476C92", // Set text field border color
                  },
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Alignment" sx={{ color: "#476C92" }} />
              <ToggleButtonGroup
                value={alignment}
                size="small"
                {...control}
                aria-label="Small sizes"
              >
                {children}
              </ToggleButtonGroup>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Font Family" sx={{ color: "#476C92" }} />
              <Select
                value={fontFamily}
                size="small"
                onChange={handleFontFamilyChange}
                sx={{
                  color: "#476C92",
                  padding: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#476C92", // Set selector border color
                  },
                }}
              >
                {fontFamilies.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Color" sx={{ color: "#476C92" }} />

              <MuiColorInput
                size="small"
                sx={{
                  padding: 0,
                  maxWidth: "120px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    //set color selector border color
                    borderColor: "#476C92",
                  },
                }}
                format="hex"
                value={color}
                onChange={handleColorChange}
                InputProps={{
                  sx: { color: "#476C92" }, // Set text color for the color input
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Size" sx={{ color: "#476C92" }} />
              <Select
                value={fontSize}
                size="small"
                onChange={handleSizeChange}
                sx={{
                  minWidth: "80px",
                  padding: 0,
                  color: "#476C92",
                  "& .MuiOutlinedInput-notchedOutline": {
                    //set size selector border color
                    borderColor: "#476C92",
                  },
                }}
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={64}>64</MenuItem>
              </Select>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Font Style" sx={{ color: "#476C92" }} />
              <ToggleButtonGroup
                size="small"
                /*  value={highlights} */
                aria-label="text formatting"
                onChange={handleHighlightChange}
              >
                <ToggleButton
                  value="bold"
                  aria-label="bold"
                  sx={{ borderColor: "#476C92", color: "#476C92" }}
                >
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton
                  value="italic"
                  aria-label="italic"
                  sx={{ borderColor: "#476C92", color: "#476C92" }}
                >
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton
                  value="underline"
                  aria-label="underline"
                  sx={{ borderColor: "#476C92", color: "#476C92" }}
                >
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return <div>{titleMenu}</div>;
}

export default Title;
