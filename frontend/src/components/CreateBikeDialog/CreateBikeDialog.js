import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

import { useForm } from "react-hook-form";

import { errorMessages, states, models } from "../../utils";
import { useCreateBikeMutation } from "../../services/bikesService";
import { ColorPicker } from "..";

const CreateUpdateBikeDialog = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [create, { isLoading, isSuccess, error: apiError }] =
    useCreateBikeMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  const onSubmit = (form) => {
    create(form);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Bike</DialogTitle>
      <DialogContent>
        <TextField
          select
          required
          margin="normal"
          fullWidth
          label="Model"
          {...register("model", {
            required: errorMessages.required,
          })}
          error={!!errors["model"]}
          helperText={errors["model"]?.message}
          disabled={isLoading}
        >
          {models.map((model, index) => (
            <MenuItem key={index} value={model}>
              {model}
            </MenuItem>
          ))}
        </TextField>
        <ColorPicker
          margin="normal"
          fullWidth
          label="Color"
          {...register("color", {
            required: errorMessages.required,
          })}
          error={!!errors["color"]}
          helperText={errors["color"]?.message}
          disabled={isLoading}
        />

        <TextField
          select
          required
          margin="normal"
          fullWidth
          label="State"
          {...register("location.state", {
            required: errorMessages.required,
          })}
          error={!!errors.location?.state}
          helperText={errors.location?.state?.message}
          disabled={isLoading}
        >
          {Object.keys(states).map((state, index) => (
            <MenuItem key={index} value={state}>
              {states[state]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          margin="normal"
          fullWidth
          label="City"
          {...register("location.city", { required: errorMessages.required })}
          error={!!errors.location?.city}
          helperText={errors.location?.city?.message}
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUpdateBikeDialog;
