import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import { apisMiddleware } from "../services";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...apisMiddleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
