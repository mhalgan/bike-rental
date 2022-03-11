import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignInForm />
      </Grid>
    </Grid>
  );
};

export default SignIn;
