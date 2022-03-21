import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, NavBar } from "./components";
import { authSelectors } from "./redux/auth";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const BikesList = lazy(() => import("./pages/BikesList/BikesList"));

const App = () => {
  const token = useSelector(authSelectors.getToken);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth={!token} disableGutters>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <BikesList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </React.Fragment>
  );
};

export default App;
