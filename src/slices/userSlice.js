import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;

      const token = action.payload?.data?.accessToken;

      if (token) {
        const tokenData = {
          value: token,
          expiry: Date.now() + 5 * 60 * 60 * 1000,
        };

        localStorage.setItem("token", JSON.stringify(tokenData));
      }
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
