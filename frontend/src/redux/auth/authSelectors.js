import { createSelector } from "@reduxjs/toolkit";

const getAuth = (state) => state.auth;

export const getUser = createSelector([getAuth], (auth) => auth.user);
export const getToken = createSelector([getAuth], (auth) => auth.token);
export const isManager = createSelector(
  [getAuth],
  (auth) => auth.user?.role === "Manager"
);
