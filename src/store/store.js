import { createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "store",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const reducer = store.reducer;
export const { setUser } = store.actions;
