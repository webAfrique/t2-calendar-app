import React, { useState } from "react";
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
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MuiColorInput } from "mui-color-input";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  hatchTitleSet,
  hatchTextSet,
  hatchAlignmentSet,
  hatchFontFamilySet,
  hatchColorSet,
  hatchFontSizeSet,
  hatchTextDecorationSet,
  hatchBoldSet,
  hatchItalicSet,
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

function TextEditorMenu({ hatchNumber }) {
  const [open, setOpen] = React.useState(false);
  const [activeField, setActiveField] = useState("title");

  //redux
  const dispatch = useDispatch();
  const title = useSelector((state) => {
    const hatch = state.calendar.dates.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.title : "";
  });
  const text = useSelector((state) => {
    const hatch = state.calendar.dates.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.text : "";
  });

  const titleStyles = useSelector((state) => {
    const hatch = state.calendar.dates.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.titleStyles : "";
  });

  const textStyles = useSelector((state) => {
    const hatch = state.calendar.dates.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.textStyles : "";
  });
  console.log("titleStyles", titleStyles);
  console.log("textStyles", textStyles);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleFontFamilyChange = (event) => {
    dispatch(
      hatchFontFamilySet({
        value: event.target.value,
        hatchNumber: hatchNumber,
        activeField: activeField,
      })
    );
  };

  const handleColorChange = (newColor) => {
    dispatch(
      hatchColorSet({
        value: newColor,
        hatchNumber: hatchNumber,
        activeField: activeField,
      })
    );
  };

  const handleSizeChange = (event) => {
    dispatch(
      hatchFontSizeSet({
        value: event.target.value,
        hatchNumber: hatchNumber,
        activeField: activeField,
      })
    );
  };

  const handleHighlightChange = (event, newStyles) => {
    console.log("newStyles", newStyles);
    if (newStyles.includes("bold")) {
      dispatch(
        hatchBoldSet({
          hatchNumber: hatchNumber,
          activeField: activeField,
        })
      );
    } else if (newStyles.includes("italic")) {
      dispatch(
        hatchItalicSet({
          hatchNumber: hatchNumber,
          activeField: activeField,
        })
      );
    } else if (newStyles.includes("underline")) {
      dispatch(
        hatchTextDecorationSet({
          hatchNumber: hatchNumber,
          activeField: activeField,
        })
      );
    }
  };

  const handleFieldToggle = (field) => {
    setActiveField(field);
  };

  const children = [
    <ToggleButton
      value="left"
      key="left"
      sx={{ color: "#476C92", borderColor: "#476C92" }}
    >
      <FormatAlignLeftIcon />
    </ToggleButton>,
    <ToggleButton
      value="center"
      key="center"
      sx={{ color: "#476C92", borderColor: "#476C92" }}
    >
      <FormatAlignCenterIcon />
    </ToggleButton>,
    <ToggleButton
      value="right"
      key="right"
      sx={{ color: "#476C92", borderColor: "#476C92" }}
    >
      <FormatAlignRightIcon />
    </ToggleButton>,
    <ToggleButton
      value="justify"
      key="justify"
      sx={{ color: "#476C92", borderColor: "#476C92" }}
    >
      <FormatAlignJustifyIcon />
    </ToggleButton>,
  ];

  const children2 = [
    <ToggleButton
      value="bold"
      key="bold"
      sx={{ borderColor: "#476C92", color: "#476C92" }}
    >
      <FormatBoldIcon />
    </ToggleButton>,
    <ToggleButton
      value="italic"
      key="italic"
      sx={{ borderColor: "#476C92", color: "#476C92" }}
    >
      <FormatItalicIcon />
    </ToggleButton>,
    <ToggleButton
      value="underline"
      key="underline"
      sx={{ borderColor: "#476C92", color: "#476C92" }}
    >
      <FormatUnderlinedIcon />
    </ToggleButton>,
  ];

  //handle highlighter for alignment
  const control = {
    value:
      activeField === "title" ? titleStyles.textAlign : textStyles.textAlign,

    exclusive: true,
  };
  //handle highlighter for styles to add

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
                    marginLeft: 5,
                    color: "#476C92",
                  }}
                >
                  T
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pb: 1, pl: 2, pr: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                <ToggleButtonGroup
                  value={activeField}
                  exclusive
                  onChange={(event, newField) => {
                    if (newField !== null) {
                      // Prevent deselecting both toggle buttons
                      handleFieldToggle(newField);
                    }
                  }}
                  fullWidth
                  color="primary"
                >
                  {" "}
                  <ToggleButton value="title" aria-label="title">
                    Title
                  </ToggleButton>
                  <ToggleButton value="text" aria-label="text">
                    Text
                  </ToggleButton>
                </ToggleButtonGroup>
                {activeField === "title" && (
                  <TextField
                    id="outlined-basic"
                    placeholder="Type your title here"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={title}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#476C92", // Set text field border color
                        },
                    }}
                    onChange={(e) =>
                      dispatch(
                        hatchTitleSet({
                          value: e.target.value,
                          hatchNumber: hatchNumber,
                        })
                      )
                    }
                  />
                )}
                {activeField === "text" && (
                  <TextField
                    id="filled-multiline-static"
                    placeholder="Type your text here"
                    multiline
                    rows={4}
                    variant="filled"
                    fullWidth
                    value={text}
                    onChange={(e) =>
                      dispatch(
                        hatchTextSet({
                          value: e.target.value,
                          hatchNumber: hatchNumber,
                        })
                      )
                    }
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        minHeight: "100px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      },
                    }}
                  />
                )}
              </Box>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Alignment" sx={{ color: "#476C92" }} />
              <ToggleButtonGroup
                size="small"
                {...control}
                aria-label="Small sizes"
                onChange={(event, newAlignment) => {
                  console.log(newAlignment);
                  dispatch(
                    hatchAlignmentSet({
                      value: newAlignment,
                      hatchNumber: hatchNumber,
                      activeField: activeField,
                    })
                  );
                }}
              >
                {children}
              </ToggleButtonGroup>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Font Family" sx={{ color: "#476C92" }} />
              <Select
                value={
                  activeField === "title"
                    ? titleStyles.fontFamily
                    : textStyles.fontFamily
                }
                size="small"
                onChange={handleFontFamilyChange}
                sx={{
                  padding: 0,
                  color: "#476C92",
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
                  maxWidth: "125px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    //set color selector border color
                    borderColor: "#476C92",
                  },
                }}
                format="hex"
                value={
                  activeField === "title" ? titleStyles.color : textStyles.color
                }
                onChange={handleColorChange}
                InputProps={{
                  sx: { color: "#476C92" }, // Set text color for the color input
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Size" sx={{ color: "#476C92" }} />
              <Select
                value={
                  activeField === "title"
                    ? titleStyles.fontSize
                    : textStyles.fontSize
                }
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
                /* {...control2} */
                onChange={handleHighlightChange}
                aria-label="text formatting"
              >
                {children2}
              </ToggleButtonGroup>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
    </div>
  );

  return <div>{titleMenu}</div>;
}

export default TextEditorMenu;
