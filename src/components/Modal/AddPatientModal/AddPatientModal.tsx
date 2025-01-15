import { useState } from "react";
import { Modal } from "../Modal";
import H1 from "../../../utils/typography/h1/h1";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { PatientDTO } from "../../../utils/types";
import Loader from "../../Loader/Loader";

interface AddPatientModalProps {
  onClose: () => void;
  show: boolean;
  patients: PatientDTO[];
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  onClose,
  show,
  patients
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    description: "",
    website: ""
  });

  const validateForm = (): boolean => {
    const newErrors = { name: "", avatar: "", description: "", website: "" };
    let isValid: boolean = true;

    if (!name.trim()) {
      newErrors.name = "You cannot leave this field empty.";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "You cannot leave this field empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPatient = () => {
    setIsLoading(true);
    if (validateForm()) {
      const newPatient: PatientDTO = {
        name,
        avatar,
        description,
        website,
        createdAt: new Date(),
        id: 1
      };
      patients.push(newPatient);
      setName("");
      setAvatar("");
      setDescription("");
      setWebsite("");
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative max-w-[700px] w-[80%] bg-extrawhite rounded-3xl shadow-loginBox gap-10 px-4 py-10">
        <div className="flex flex-col justify-center items-center gap-10">
          <H1 className="text-[30px] leading-[40px] text-center text-wrap text-black">
            Add Patient
          </H1>
          <div className="flex flex-col gap-10 justify-center w-full px-8 py-4">
            <Input
              variant={errors.name === "" ? "default" : "error"}
              required
              label="Name"
              type="text"
              placeholder="Add the patient's name"
              value={name}
              handleValue={setName}
              error={errors.name}
            />
            <Input
              variant={errors.avatar === "" ? "default" : "error"}
              label="Avatar"
              type="text"
              placeholder="Add the patient's avatar url"
              value={avatar}
              handleValue={setAvatar}
              error={errors.avatar}
            />
            <Input
              variant={errors.description === "" ? "default" : "error"}
              required
              label="Description"
              type="text"
              placeholder="Add a description"
              value={description}
              handleValue={setDescription}
              error={errors.description}
            />
            <Input
              variant={errors.website === "" ? "default" : "error"}
              label="Website"
              type="text"
              placeholder="Add the patient's website"
              value={website}
              handleValue={setWebsite}
              error={errors.website}
            />
            <Button onClick={handleAddPatient} variant="outline">
              {isLoading ? (
                <Loader variant={"black"} size={20} />
              ) : (
                "Add Patient"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddPatientModal;
