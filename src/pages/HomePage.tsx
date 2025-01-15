import { useState, useEffect } from "react";
import { getPatients } from "../data-provider/service";
import PatientList from "../components/PatientList/PatientList.tsx";
import Button from "../components/Button/Button.tsx";
import AddPatientModal from "../components/Modal/AddPatientModal/AddPatientModal.tsx";
import { useAppDispatch } from "../redux/hooks.tsx";
import { setPatients } from "../redux/patient.tsx";

const HomePage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handlePatients = async () => {
    try {
      setIsLoading(true);
      const data = await getPatients();
      if (data) dispatch(setPatients(data));
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
      <PatientList isLoading={isLoading} />
      <AddPatientModal onClose={() => setShowModal(false)} show={showModal} />
      <div className="w-full max-w-[400px]">
        <Button onClick={() => setShowModal(true)}>Add Patient</Button>
      </div>
    </>
  );
};

export default HomePage;
