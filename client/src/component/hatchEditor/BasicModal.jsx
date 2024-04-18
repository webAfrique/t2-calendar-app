import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid #00A8CD",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

function convertToEmbedURL(url) {
  const regex = /(?:v=)(.*?)(?:&|$)/;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function BasicModal({ hatchNumber, videoURL}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 2,
          paddingTop: 2,
          marginTop: 2,
        }}
      >
        <Button onClick={handleOpen} sx={{ fontWeight: "bold" }}>
          Preview hatch # {hatchNumber}
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Title
          </Typography>
          <Box
            component="section"
            sx={{
              p: 3,
              height: "100px",
              alignContent: "center",
              border: "1px dashed grey",
              textAlign: "center",
            }}
          >
            Image
          </Box>
          <Typography
            sx={{ my: 2 }}
            id="modal-modal-description"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Text
          </Typography>
          <Box
            component="section"
            sx={{
              p: 3,
              height: "100px",
              alignContent: "center",
              border: "1px dashed grey",
              textAlign: "center",
            }}
          >
            {videoURL && 
            <iframe src={convertToEmbedURL(videoURL)} 
            title="Video" 
            width="100%" 
            height="100%" />}
          </Box>
          <Button
            variant="contained"
            sx={{
              display: "block",
              margin: "auto",
              mt: 4,
              width: "160px",
              backgroundColor: "#476C92",
              color: "white",
              borderRadius: "30px",
              textTransform: "capitalize",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "#476C92",
                borderColor: "#476C92",
                boxShadow: "none",
                border: "1px solid",
              },
            }}
            onClick={handleClose} // close the modal
          >
            Back to calendar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
