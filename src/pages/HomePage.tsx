import { useState, useEffect } from 'react';
import { getPatients } from '../data-provider/service';
import { PatientDTO } from '../utils/types.ts';
import PatientList from '../components/PatientList/PatientList.tsx';
import Button from '../components/Button/Button.tsx';
import AddPatientModal from '../components/Modal/AddPatientModal/AddPatientModal.tsx';

function HomePage() {
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handlePatients = async () => {
    try {
      setIsLoading(true);
      const data = await getPatients();
      if(data)
        setPatients(data);
    } catch (e) {
      console.error("Error fetching patients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePatients();
  }, []);


  return (
    <div className="flex flex-col items-center justify-between w-full gap-10 max-w-[90%] bg-extrawhite rounded-3xl p-10 max-h-[600px] min-h-[600px] h-full">
      <PatientList patients={patients} isLoading={isLoading} />
      <AddPatientModal
        onClose={() => setShowModal(false)}
        show={showModal}
        patients={patients}
      />
      <div className="w-full max-w-[400px]">
        <Button onClick={() => setShowModal(true)}>Add Patient</Button>
      </div>
    </div>
  )
}

export default HomePage;

