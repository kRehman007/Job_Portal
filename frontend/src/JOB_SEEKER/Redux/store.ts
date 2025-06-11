import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slices/user-slice";
import { JobsAPI } from "./API/JobsAPI";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [JobsAPI.reducerPath]: JobsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(JobsAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
