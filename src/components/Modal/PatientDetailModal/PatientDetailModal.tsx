import { FC } from "react";
import PatientDetail from "../../PatientDetail/PatientDetail";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { Modal } from "../Modal";

interface PatientDetailModalProps {
  onClose: () => void;
  show: boolean;
}
const PatientDetailModal: FC<PatientDetailModalProps> = ({
  onClose,
  show
}): JSX.Element => {
  return (
    <Modal onClose={onClose} show={show}>
      <div className="flex flex-col justify-center w-[90%] h-[70%]">
        <Button
          onClick={onClose}
          className="rotate-90 bg-transparent active:bg-transparent hover:bg-transparent absolute top-0 left-0 rounded-full my-6 mx-4"
        >
          <Icon name="ChevronIcon" width="32" height="32" />
        </Button>
        <div className="flex flex-col h-full py-4 items-center justify-center w-full bg-extrawhite rounded-xl">
          <div className="w-full h-full p-8 flex flex-col gap-10 bg-extrawhite rounded-xl">
            <PatientDetail />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PatientDetailModal;
