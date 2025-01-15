import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PatientDTO } from "../utils/types";

interface InitialStateType {
  patients: PatientDTO[];
}

export const initialState: InitialStateType = {
  patients: []
};

const userSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<PatientDTO[]>) => {
      state.patients = action.payload;
    }
  }
});

export const { setPatients } = userSlice.actions;
export default userSlice.reducer;
