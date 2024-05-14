import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function Popup({ open, handleClose, handleConfirm }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "18px" }}>
            If you haven&apos;t saved your modifications, they will be lost.{" "}
            <br /> Are you sure you want to leave?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{
              width: "100px",
              color: "#476C92",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              border: "1px solid transparent",
              "&:hover": {
                backgroundColor: "white",
                color: "#476C92",
                borderColor: "#476C92",
                boxShadow: "none",
                border: "1px solid",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              width: "100px",
              color: "#476C92",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              border: "1px solid transparent",
              "&:hover": {
                backgroundColor: "white",
                color: "#476C92",
                borderColor: "#476C92",
                boxShadow: "none",
                border: "1px solid",
              },
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
