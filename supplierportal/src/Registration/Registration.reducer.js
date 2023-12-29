import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRegistrationUser
} from "./Registration.action";

const initialState = {
  user : null,
};

const slice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistrationUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchRegistrationUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.user = action.payload;
      })
  },
});

export default slice;

export const { name, reducer, actions } = slice;
