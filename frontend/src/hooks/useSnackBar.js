import { useState, useMemo, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const DURATION = 3000;

const useSnackBar = ({ message, severity, otherProps }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const SnackbarComponent = useMemo(() => {
    return () => (
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={DURATION}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        {...otherProps}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    );
  }, [handleClose, message, open, severity, otherProps]);

  return [SnackbarComponent, setOpen];
};

export default useSnackBar;
