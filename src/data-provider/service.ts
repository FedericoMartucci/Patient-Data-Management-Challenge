import axios from 'axios'
import { PatientDTO } from '@utils/types.ts'

const url: string = import.meta.env.VITE_PATIENTS_URL;

export const getPatients = async (): Promise<PatientDTO[] | null> => {
  const res = await axios.get(`${url}`)
  if (res.status === 200) {
    return res.data
  }
  return null
}