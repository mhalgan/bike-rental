import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../services/usersService";

const initialState = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { token, ...user } = payload;

        state.token = token;
        state.user = user;
      }
    );
  },
});

export const { reducer } = authSlice;
