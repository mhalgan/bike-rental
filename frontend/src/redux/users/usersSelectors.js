import { createSelector } from "@reduxjs/toolkit";

const getUsers = (state) => state.users;
export const getUsersList = createSelector([getUsers], (users) => users.list);
