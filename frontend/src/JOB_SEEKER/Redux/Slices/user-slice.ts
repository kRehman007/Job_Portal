import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../utils/interface";

// Define a type for the slice state
interface userState {
  user: User | null;
}

// Define the initial state using that type
const initialState: userState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUsers, clearUser } = userSlice.actions;

export default userSlice.reducer;
