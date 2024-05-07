import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

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

export default function BasicModal({
  hatchNumber,
  setOpen,
  src,
  open,
  videoURL,
}) {
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
  console.log("titleStyles", titleStyles);

  const textStyles = useSelector((state) => {
    const hatch = state.hatches.hatchObjects.find(
      (hatch) => hatch.number === hatchNumber
    );
    return hatch ? hatch.textStyles : null;
  });
  console.log("textStyles", textStyles);

  return (
    <div>
      <Modal
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
              border: !src && "1px dashed grey", // border if no image
              textAlign: "center",
            }}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }} // set the background image
          >
            {!src && (
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
                Image
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
              border: !videoURL && "1px dashed grey",
              textAlign: "center",
            }}
          >
            {videoURL ? (
              <iframe
                src={convertToEmbedURL(videoURL)}
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
      </Modal>
    </div>
  );
}
