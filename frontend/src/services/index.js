import { usersApi } from "./usersService";
import { bikesApi } from "./bikesService";

export const apisMiddleware = [usersApi.middleware, bikesApi.middleware];
