import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
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
  const [alignment, setAlignment] = React.useState("");
  const [fontFamily, setFontFamily] = React.useState("Roboto");
  const [color, setColor] = React.useState("#ffffff");
  const [selectedSize, setSelectedSize] = React.useState(16);
  const [fontStyle, setFontStyle] = React.useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
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
      <Toolbar />
      <Divider />
      <List>
        {/* Title list item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
                  Title
                </span>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <TextField id="outlined-basic" size="small" variant="outlined" />
            </ListItemButton>
            <ListItemButton sx={{ p: 1 }}>
              <ListItemText primary="Alignment" />
              <ToggleButtonGroup
                size="small"
                {...control}
                aria-label="Small sizes"
              >
                {children}
              </ToggleButtonGroup>
            </ListItemButton>
            <ListItemButton sx={{ p: 1 }}>
              <ListItemText primary="Font Family" />
              <Select
                value={fontFamily}
                size="small"
                onChange={handleFontFamilyChange}
                sx={{ padding: 0 }}
              >
                {fontFamilies.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </ListItemButton>
            <ListItemButton sx={{ p: 1 }}>
              <ListItemText primary="Color" />

              <MuiColorInput
                size="small"
                sx={{ padding: 0, maxWidth: "100px" }}
                format="hex"
                value={color}
                onChange={handleColorChange}
              />
            </ListItemButton>
            <ListItemButton sx={{ p: 1 }}>
              <ListItemText primary="Size" />
              <Select
                value={selectedSize}
                size="small"
                onChange={handleSizeChange}
                sx={{ minWidth: "80px", padding: 0 }}
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
            <ListItemButton sx={{ p: 1 }}>
              <ListItemText primary="Font Style" />
              <ToggleButtonGroup
                size="small"
                value={fontStyle}
                onChange={handleFontStyleChange}
                aria-label="text formatting"
              >
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
    </div>
  );

  return <div>{titleMenu}</div>;
}

export default Title;
