import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PatientDTO } from "../utils/types";

interface InitialStateType {
  patients: PatientDTO[];
  currentPatient: PatientDTO;
}

export const initialState: InitialStateType = {
  patients: [],
  currentPatient: {
    id: 0,
    name: "",
    avatar: "",
    description: "",
    website: "",
    createdAt: ""
  }
};

const userSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<PatientDTO[]>) => {
      state.patients = action.payload;
    },
    setCurrentPatient: (state, action: PayloadAction<PatientDTO>) => {
      state.currentPatient = action.payload;
    }
  }
});

export const { setPatients, setCurrentPatient } = userSlice.actions;
export default userSlice.reducer;
