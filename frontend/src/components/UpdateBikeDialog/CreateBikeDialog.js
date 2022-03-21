import { useState } from "react";
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

const UpdateBikeDialog = ({ id, open, handleClose }) => {
  const [bikeColor, setBikeColor] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [create, { isLoading, error: apiError }] = useCreateBikeMutation();

  const onSubmit = (form) => {
    create({ bikeColor, ...form });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Bike</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="normal"
          fullWidth
          label="ID"
          value={id}
          disabled
        />

        <TextField
          select
          required
          margin="normal"
          fullWidth
          label="Model"
          {...register("model", {
            required: errorMessages.required,
            value: "model",
          })}
          error={!!errors["model"]}
          helperText={errors["model"]?.message}
          disabled={isLoading}
        >
          {Object.keys(models).map((state, index) => (
            <MenuItem key={index} value={state}>
              {states[state]}
            </MenuItem>
          ))}
        </TextField>
        <ColorPicker
          required
          margin="normal"
          fullWidth
          label="Color"
          disabled={isLoading}
          value={bikeColor}
          onChange={(selected) => setBikeColor(selected.value)}
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

export default UpdateBikeDialog;
