import { useState, useEffect } from 'react'
import './App.css'
import { getPatients } from './data-provider/service';
import { PatientDTO } from '@utils/types.ts'

function App() {
  const [patients, setPatients] = useState<PatientDTO[]>([]);

  const handlePatients = async () => {
    try {
      const data = await getPatients();
      if(data)
        setPatients(data);
    } catch (e) {
      console.error("Error fetching patients");
    }
  };

  useEffect(() => {
    handlePatients();
  }, []);


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Patients
      </h1>
      <ul>
      {
        patients.map((patient: PatientDTO, idx: number) => <li key={idx}>{patient.name}</li>)
      }
      </ul>
    </div>
  )
}

export default App
