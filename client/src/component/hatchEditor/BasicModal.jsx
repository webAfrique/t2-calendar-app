import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";

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
  console.log("match:", match);
  const videoId = match ? match[1] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function BasicModal({ hatchNumber, setOpen, open }) {
  //redux
  const title = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.title : "";
  });

  const text = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.text : "";
  });

  const titleStyles = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.titleStyles : null;
  });

  const textStyles = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.textStyles : null;
  });

  const image = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.image : "";
  });

  const video = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.video : "";
  });

  return (
    <Draggable defaultPosition={{ x: -580, y: -10 }}>
      <Box
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              mb: 2,
              ...(title
                ? titleStyles
                : { textAlign: "center", color: "#666", fontStyle: "italic" }),
            }}
            id="modal-modal-title"
            component="h2"
          >
            {title ? title : "Title"}
          </Typography>
          <Box
            component="section"
            sx={{
              p: 3,
              height: "200px",
              alignContent: "center",
              border: !image.url && "1px dashed grey", // border if no image
              textAlign: "center",
            }}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }} // set the background image
          >
            {!image && (
              <Typography
                sx={{
                  m: 2,
                  textAlign: "center",
                  color: "#666",
                  fontStyle: "italic",
                }}
                id="modal-modal-title"
                component="h2"
                textAlign={"center"}
              >
                {image.filename ? image.filename : "Image"}
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              mt: 2,
              mb: 2,
              ...(text
                ? textStyles
                : { textAlign: "center", color: "#666", fontStyle: "italic" }),
            }}
            id="modal-modal-description"
            component="h2"
          >
            {text ? text : "Text"}
          </Typography>
          <Box
            component="section"
            sx={{
              height: "200px",
              alignContent: "center",
              border: !video.url && "1px dashed grey",
              textAlign: "center",
            }}
          >
            {video.url ? (
              <iframe
                src={convertToEmbedURL(video.url)}
                title="Video"
                width="100%"
                height="100%"
                style={{ border: "none", padding: 0 }}
              />
            ) : (
              <Typography
                sx={{
                  m: 2,
                  textAlign: "center",
                  color: "#666",
                  fontStyle: "italic",
                }}
                id="modal-modal-title"
                component="h2"
              >
                Video
              </Typography>
            )}
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
            onClick={() => setOpen(false)} // close the modal
          >
            Back to calendar
          </Button>
        </Box>
      </Box>
    </Draggable>
  );
}
