import React, { useEffect, useState } from "react";
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
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// For the react/prop-types rule/ validation/ typechecking/ eslint error:

TextEditorMenu.propTypes = {
  inputHatchTitle: PropTypes.string.isRequired,
  setInputHatchTitle: PropTypes.func.isRequired,
  inputHatchText: PropTypes.string.isRequired,
  setInputHatchText: PropTypes.func.isRequired,
  setHatchTitleStyles: PropTypes.func.isRequired,
  setHatchTextStyles: PropTypes.func.isRequired,
};

const fontFamilies = [
  "Roboto",
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
];

function TextEditorMenu({
  inputHatchTitle,
  setInputHatchTitle,
  inputHatchText,
  setInputHatchText,
  setHatchTitleStyles,
  setHatchTextStyles,
}) {
  const [open, setOpen] = React.useState(false);
  const [alignment, setAlignment] = React.useState("");
  const [fontFamily, setFontFamily] = React.useState("Roboto");
  const [color, setColor] = React.useState("black");
  const [selectedSize, setSelectedSize] = React.useState(16);
  const [fontStyle, setFontStyle] = React.useState([]);
  const [activeField, setActiveField] = useState("title");

  useEffect(() => {
    const newStyles = {
      textAlign: alignment,
      fontFamily: fontFamily,
      color: color,
      fontSize: selectedSize,
      textDecoration: fontStyle.includes("underlined") ? "underline" : "none",
      fontWeight: fontStyle.includes("bold") ? "bold" : "normal",
      fontStyle: fontStyle.includes("italic") ? "italic" : "normal",
    };

    if (activeField === "text") {
      setHatchTextStyles(newStyles);
    } else {
      setHatchTitleStyles(newStyles);
    }
  }, [
    alignment,
    fontFamily,
    color,
    selectedSize,
    fontStyle,
    activeField,
    setHatchTextStyles,
    setHatchTitleStyles,
  ]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleFontStyleChange = (event, newStyles) => {
    setFontStyle(newStyles);
  };

  const handleFieldToggle = (field) => {
    setActiveField(field);
    console.log(field, activeField);
  };

  const children = [
    <ToggleButton value="left" key="left">
      <FormatAlignLeftIcon />
    </ToggleButton>,
    <ToggleButton value="center" key="center">
      <FormatAlignCenterIcon />
    </ToggleButton>,
    <ToggleButton value="right" key="right">
      <FormatAlignRightIcon />
    </ToggleButton>,
    <ToggleButton value="justify" key="justify">
      <FormatAlignJustifyIcon />
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
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <span
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginLeft: 5,
                  }}>
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
                }}>
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
                  color="primary">
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
                    placeholder="Hatch title"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={inputHatchTitle}
                    onChange={(e) => setInputHatchTitle(e.target.value)}
                  />
                )}
                {activeField === "text" && (
                  <TextField
                    id="filled-multiline-static"
                    placeholder="Text"
                    multiline
                    rows={4}
                    variant="filled"
                    fullWidth
                    value={inputHatchText}
                    onChange={(e) => setInputHatchText(e.target.value)}
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
              <ListItemText primary="Alignment" />
              <ToggleButtonGroup
                size="small"
                {...control}
                aria-label="Small sizes">
                {children}
              </ToggleButtonGroup>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Font Family" />
              <Select
                value={fontFamily}
                size="small"
                onChange={handleFontFamilyChange}
                sx={{ padding: 0 }}>
                {fontFamilies.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Color" />

              <MuiColorInput
                size="small"
                sx={{ padding: 0, maxWidth: "100px" }}
                format="hex"
                value={color}
                onChange={handleColorChange}
              />
            </ListItemButton>
            <ListItemButton sx={{ pt: 1, pb: 1 }}>
              <ListItemText primary="Size" />
              <Select
                value={selectedSize}
                size="small"
                onChange={handleSizeChange}
                sx={{ minWidth: "80px", padding: 0 }}>
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
              <ListItemText primary="Font Style" />
              <ToggleButtonGroup
                size="small"
                value={fontStyle}
                onChange={handleFontStyleChange}
                aria-label="text formatting">
                <ToggleButton value="bold" aria-label="bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                  <FormatUnderlinedIcon />
                </ToggleButton>
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
