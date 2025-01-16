import { FC, useEffect, useState } from "react";
import { Modal } from "../Modal";
import H1 from "../../../utils/typography/h1/h1";
import Button from "../../Button/Button";
import Body1 from "../../../utils/typography/body1/body1";
import Input from "../../Input/Input";

interface DeletePatientModalProps {
  onClose: () => void;
  handleDelete: () => void;
  show: boolean;
  patientId: number;
}

const DeletePatientModal: FC<DeletePatientModalProps> = ({
  onClose,
  handleDelete,
  show,
  patientId
}): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        inputValue === `Patient #${patientId}` &&
        show
      ) {
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputValue, patientId, handleDelete, show]);

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose();
        setInputValue("");
      }}
    >
      <div className="relative max-w-[700px] w-[80%] bg-extrawhite rounded-3xl shadow-loginBox gap-10 px-4 py-10">
        <div className="flex flex-col justify-center gap-4 px-6">
          <H1 className="text-[30px] leading-[40px] text-wrap text-center text-black font-medium">
            Delete <strong>Patient #{patientId}</strong>
          </H1>
          <div className="flex flex-col gap-1">
            <Body1 className="text-gray-900 font-extralight">
              Are you sure you want to delete this patient from the list?
            </Body1>
            <Input
              value={inputValue}
              variant="error"
              type="text"
              label={`To confirm, please type "Patient #${patientId}" in the box below`}
              required
              handleValue={setInputValue}
              placeholder="Patient ####"
            />
          </div>
          <div className="flex justify-center gap-6">
            <Button
              variant="outline"
              size={"large"}
              className="w-[225px] h-[50px] text-primary"
              onClick={() => {
                onClose();
                setInputValue("");
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={inputValue !== `Patient #${patientId}`}
              variant="error"
              size={"large"}
              className="w-[225px] h-[50px] text-white"
              onClick={handleDelete}
            >
              Delete Patient
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePatientModal;
