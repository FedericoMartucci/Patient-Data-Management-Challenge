import React from "react";
import useScreenSize from "../hooks/useScreenSize";
import HomePage from "./HomePage";
import { useNavigate, useParams } from "react-router";
import { Modal } from "../components/Modal/Modal";
import Button from "../components/Button/Button";
import Icon from "../components/Icon/Icon";
import PatientDetail from "../components/PatientDetail/PatientDetail";

const PatientDetailPage = () => {
  const screen = useScreenSize();
  const navigate = useNavigate();
  const { id: currentPatientId } = useParams();

  return screen.width >= 768 ? (
    <div className="h-full w-full flex items-center">
      <div className="max-w-[467px] w-full h-full">
        <HomePage />
      </div>
      {currentPatientId !== "" && (
        <div className="flex flex-col justify-between h-full w-full rounded-r-xl">
          <div className="overflow-y-hidden hover:overflow-y-scroll w-full h-full pr-[5px] hover:pr-0">
            <div className="w-full h-full pt-[72px] xl:px-10 px-5 flex flex-col gap-10">
              <PatientDetail />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex flex-col">
      <HomePage />
      {currentPatientId !== "" && (
        <Modal onClose={() => navigate("/")} show={currentPatientId !== ""}>
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

export default PatientDetailPage;
