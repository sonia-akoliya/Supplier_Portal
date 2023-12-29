import reducers from "./Registration.reducer";

export const selectSlice = (state) => state[reducers.name];

export const selectRegistrationUser = (state) => selectSlice(state).user;