import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { SignInForm } from "../../components";

const SignIn = () => {
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
