import axios from "axios";
import { PatientDTO } from "../utils/types.ts";
import apiConfig from "../utils/config";

const url: string = apiConfig.apiUrl;

export const getPatients = async (): Promise<PatientDTO[] | null> => {
  const res = await axios.get(`${url}`);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};
