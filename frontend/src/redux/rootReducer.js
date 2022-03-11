import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authSlice } from "./auth/authSlice";
import { reducer as usersReducer } from "./users/usersSlice";

import { usersApi } from "../services/usersService";
import { bikesApi } from "../services/bikesService";

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [bikesApi.reducerPath]: bikesApi.reducer,
});

export default rootReducer;
