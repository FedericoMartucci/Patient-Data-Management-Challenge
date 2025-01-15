import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from "react-redux";
import { type AppDispatch, type RootState } from "./store";
import { type PatientDTO } from "../utils/types";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const usePatients = (): PatientDTO[] =>
  useAppSelector((state) => state.patient.patients);
