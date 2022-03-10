import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSnackBar } from "../../hooks";
import { useLoginMutation } from "../../services/usersService";
import errorMessages from "../../utils/errorMessages";

const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading, isSuccess, error: apiError }] = useLoginMutation();

  const [Snackbar, showSnackbar] = useSnackBar({
    message: errorMessages.invalidCredentials,
    severity: "error",
  });

  const onSubmit = (data) => {
    login(data);
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
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            required
            margin="normal"
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
          <TextField
            required
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: errorMessages.required })}
            error={!!errors["password"]}
            helperText={errors["password"]?.message}
            disabled={isLoading}
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" disabled={isLoading} />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignInForm;
