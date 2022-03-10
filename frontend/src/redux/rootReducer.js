import { usersApi } from "../services/usersService";

const rootReducer = {
  [usersApi.reducerPath]: usersApi.reducer,
};

export const apisMiddleware = [usersApi.middleware];

export default rootReducer;
