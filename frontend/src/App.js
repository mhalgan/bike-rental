import React, { lazy, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </Suspense>
      </Container>
    </React.Fragment>
  );
};

export default App;
