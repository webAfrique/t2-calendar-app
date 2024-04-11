import Draggable from "react-draggable";
import { Card, Typography } from "@mui/material";

const Hatch = ({ date }) => {
  return (
    <Draggable>
      <Card
        style={{ border: "1px dotted #333", width: "100px", height: "100px" }}
      >
        <Typography variant="h6" style={{ textAlign: "center", color: "grey" }}>
          {date}
        </Typography>
      </Card>
    </Draggable>
  );
};

export default Hatch;
