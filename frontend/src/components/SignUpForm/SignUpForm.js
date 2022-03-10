import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSnackBar } from "../../hooks";
import { useRegisterMutation } from "../../services/usersService";
import errorMessages from "../../utils/errorMessages";

const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [registerUser, { isLoading, isSuccess, error: apiError }] =
    useRegisterMutation();

  const [Snackbar, showSnackbar] = useSnackBar({
    message: errorMessages.invalidCredentials,
    severity: "error",
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (!!apiError) {
      showSnackbar(true);
    }
  }, [apiError, showSnackbar]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [navigate, isSuccess]);

  return (
    <React.Fragment>
      <Snackbar />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="given-name"
                fullWidth
                label="First Name"
                autoFocus
                {...register("firstName", {
                  required: errorMessages.required,
                })}
                error={!!errors["firstName"]}
                helperText={errors["firstName"]?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                autoComplete="family-name"
                {...register("lastName", {
                  required: errorMessages.required,
                })}
                error={!!errors["lastName"]}
                helperText={errors["lastName"]?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                {...register("email", {
                  required: errorMessages.required,
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: errorMessages.invalidEmail,
                  },
                })}
                error={!!errors["email"]}
                helperText={errors["email"]?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="new-password"
                {...register("password", { required: errorMessages.required })}
                error={!!errors["password"]}
                helperText={errors["password"]?.message}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Repeat password"
                type="password"
                {...register("repeatPassword", {
                  required: errorMessages.required,
                  validate: (value) =>
                    value === getValues("password") ||
                    errorMessages.matchPasswords,
                })}
                error={!!errors["repeatPassword"]}
                helperText={errors["repeatPassword"]?.message}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignUpForm;
