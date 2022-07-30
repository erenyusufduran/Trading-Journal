import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicers/user";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk, { serializableCheck: false }];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware(middlewares);
  },
});
