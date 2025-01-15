import { useState, useEffect } from "react";
import { getPatients } from "../data-provider/service";
import PatientList from "../components/PatientList/PatientList.tsx";
import Button from "../components/Button/Button.tsx";
import AddPatientModal from "../components/Modal/AddPatientModal/AddPatientModal.tsx";
import { useAppDispatch, useCurrentPatient } from "../redux/hooks.tsx";
import { setPatients } from "../redux/patient.tsx";
import useScreenSize from "../hooks/useScreenSize.ts";
import { useNavigate } from "react-router-dom";
import PatientDetail from "../components/PatientDetail/PatientDetail.tsx";
import { Modal } from "../components/Modal/Modal.tsx";
import Icon from "../components/Icon/Icon.tsx";

const HomePage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const screen = useScreenSize();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  return screen.width >= 768 ? (
    <div className="h-full w-full flex items-center">
      <div className="flex flex-col max-w-[50%] w-full h-full items-center gap-4">
        <PatientList isLoading={isLoading} />
        <AddPatientModal onClose={() => setShowModal(false)} show={showModal} />
        <div className="w-full max-w-[400px]">
          <Button onClick={() => setShowModal(true)}>Add Patient</Button>
        </div>
      </div>
      {currentPatient.id !== 0 ? (
        <div className="flex flex-col justify-between h-full w-full rounded-r-xl">
          <div className="overflow-y-hidden hover:overflow-y-scroll w-full h-full pr-[5px] hover:pr-0">
            <div className="w-full h-full pt-[72px] xl:px-10 px-5 flex flex-col gap-10">
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
    <div className="h-full w-full flex flex-col">
      <PatientList isLoading={isLoading} />
        <AddPatientModal onClose={() => setShowModal(false)} show={showModal} />
        <div className="w-full">
          <Button onClick={() => setShowModal(true)}>Add a patient</Button>
        </div>
      {currentPatient.id !== 0 && (
        <Modal onClose={() => navigate("/")} show={currentPatient.id !== 0}>
          <div className="flex flex-col justify-end mt-[90px]">
            <Button
              onClick={() => navigate("/")}
              className="-rotate-90 hover:bg-gray-500 absolute top-0 left-0 rounded-full m-4"
            >
              <Icon name="ChevronIcon" width="32" height="32" />
            </Button>
            <div className="relative max-h-[70vh] flex flex-col bg-gray-700 items-center h-full max-w-screen border-y border-white/15">
              <div
                className="overflow-y-auto"
                style={{
                  boxShadow: "inset 0px -104px 47px 0px rgba(0,0,0,1)"
                }}
              >
                <div className="w-screen h-full pt-[72px] px-8 flex flex-col gap-10">
                  <PatientDetail />
                </div>
              </div>
              <div
                style={{ width: "calc(100% - 10px)" }}
                className={`absolute bottom-0 h-[64px] bg-gradient-to-b from-black/10 via-black/60 to-[#000000]`}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
