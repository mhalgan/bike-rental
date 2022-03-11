import React, { lazy, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const BikesList = lazy(() => import("./pages/BikesList/BikesList"));

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main">
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
