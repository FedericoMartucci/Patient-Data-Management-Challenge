import { useState, useEffect } from "react";
import { getPatients } from "../data-provider/service";
import PatientList from "../components/PatientList/PatientList.tsx";
import Button from "../components/Button/Button.tsx";
import AddOrEditPatientModal from "../components/Modal/AddOrEditPatientModal/AddOrEditPatientModal.tsx";
import { useAppDispatch, useCurrentPatient } from "../redux/hooks.tsx";
import { setCurrentPatient, setPatients } from "../redux/patient.tsx";
import useScreenSize from "../hooks/useScreenSize.ts";
import PatientDetail from "../components/PatientDetail/PatientDetail.tsx";
import PatientDetailModal from "../components/Modal/PatientDetailModal/PatientDetailModal.tsx";

const HomePage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const screen = useScreenSize();
  const dispatch = useAppDispatch();
  const currentPatient = useCurrentPatient();

  useEffect(() => {
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

    handlePatients();
  }, [dispatch]);

  const handleClosePatientModal = (): void => {
    dispatch(
      setCurrentPatient({
        id: 0,
        name: "",
        description: "",
        avatar: "",
        website: "",
        createdAt: ""
      })
    );
  };

  return screen.width >= 768 ? (
    <div className="h-full w-full flex items-center">
      <div className="flex flex-col max-w-[50%] w-full h-full items-center justify-between gap-4">
        <PatientList isLoading={isLoading} />
        <AddOrEditPatientModal
          onClose={() => setShowAddModal(false)}
          show={showAddModal}
        />
        <div className="w-full max-w-[400px]">
          <Button onClick={() => setShowAddModal(true)}>Add Patient</Button>
        </div>
      </div>
      {currentPatient.id !== 0 ? (
        <div className="flex flex-col justify-between h-full w-full">
          <div className="w-full h-full hover:pr-0">
            <div className="w-full h-full pt-1 xl:px-10 px-5 flex flex-col gap-10">
              <PatientDetail />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="w-1/2 ml-10">
            <img src="/transparent-medify-logo-2.png" alt="Medify logo" />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex flex-col gap-4">
      <PatientList isLoading={isLoading} />
      <AddOrEditPatientModal
        onClose={() => setShowAddModal(false)}
        show={showAddModal}
      />
      <div className="w-full">
        <Button onClick={() => setShowAddModal(true)}>Add a patient</Button>
      </div>
      <PatientDetailModal
        onClose={handleClosePatientModal}
        show={currentPatient.id !== 0}
      />
    </div>
  );
};

export default HomePage;
