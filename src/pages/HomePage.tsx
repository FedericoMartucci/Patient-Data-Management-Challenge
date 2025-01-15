import { useState, useEffect } from "react";
import { getPatients } from "../data-provider/service";
import { PatientDTO } from "../utils/types.ts";
import PatientList from "../components/PatientList/PatientList.tsx";
import Button from "../components/Button/Button.tsx";
import AddPatientModal from "../components/Modal/AddPatientModal/AddPatientModal.tsx";

function HomePage() {
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handlePatients = async () => {
    try {
      setIsLoading(true);
      const data = await getPatients();
      if (data) setPatients(data);
    } catch (e) {
      console.error("Error fetching patients: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePatients();
  }, []);

  return (
    <>
      <PatientList patients={patients} isLoading={isLoading} />
      <AddPatientModal
        onClose={() => setShowModal(false)}
        show={showModal}
        patients={patients}
      />
      <div className="w-full max-w-[400px]">
        <Button onClick={() => setShowModal(true)}>Add Patient</Button>
      </div>
    </>
  );
}

export default HomePage;
