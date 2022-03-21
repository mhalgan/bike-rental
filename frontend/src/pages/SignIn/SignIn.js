import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { SignInForm } from "../../components";
import { authSelectors } from "../../redux/auth";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const authUser = useSelector(authSelectors.getUser);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!!authUser) navigate(from, { replace: true });
  }, [authUser, from, navigate]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/bike-image.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Bike Rental
          </Typography>
        </Box>
        <SignInForm />
      </Grid>
    </Grid>
  );
};

export default SignIn;
