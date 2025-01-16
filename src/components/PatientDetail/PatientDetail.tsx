import { useEffect, useRef, useState } from "react";
import {
  useAppDispatch,
  useCurrentPatient,
  usePatients
} from "../../redux/hooks";
import NoAvatar from "../NoAvatar/NoAvatar";
import Body1 from "../../utils/typography/body1/body1";
import H1 from "../../utils/typography/h1/h1";
import Body2 from "../../utils/typography/body2/body2";
import Button from "../Button/Button";
import DeletePatientModal from "../Modal/DeletePatientModal/DeletePatientModal";
import { setCurrentPatient, setPatients } from "../../redux/patient";
import AddOrEditPatientModal from "../Modal/AddOrEditPatientModal/AddOrEditPatientModal";
import { useSnackBar } from "../SnackBarProvider/SnackBarProvider";

const PatientDetail = () => {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const currentPatient = useCurrentPatient();
  const patients = usePatients();
  const dispatch = useAppDispatch();
  const { showSnackBar } = useSnackBar();

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFullText(false);
    if (textRef.current) {
      const lineHeight = parseInt(
        getComputedStyle(textRef.current).lineHeight || "0",
        10
      );
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines;

      const isOverflowing = textRef.current.scrollHeight > maxHeight;
      setHasOverflow(isOverflowing);
    }
  }, [currentPatient]);

  useEffect(() => {
    setIsImageError(false);
  }, [currentPatient]);

  const toggleTextVisibility = (): void => {
    setShowFullText(!showFullText);
  };

  const handleDelete = (): void => {
    if (!currentPatient || currentPatient.id === 0) {
      console.error("No patient selected to be deleted.");
      return;
    }

    const updatedPatients = patients.filter(
      (patient) => patient.id !== currentPatient.id
    );

    showSnackBar('Patient deleted successfully', 'successDelete');

    dispatch(setPatients(updatedPatients));
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
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full">
      <AddOrEditPatientModal
        onClose={() => {
          setShowEditModal(false);
        }}
        show={showEditModal}
        edit
      />
      <DeletePatientModal
        onClose={() => {
          setShowDeleteModal(false);
        }}
        handleDelete={handleDelete}
        show={showDeleteModal}
        patientId={currentPatient.id}
      />
      <div className="w-full flex justify-between items-start">
        <div className="min-w-20 min-h-20 rounded-full">
          {currentPatient.avatar !== "" && !isImageError ? (
            <img
              src={currentPatient.avatar}
              alt={currentPatient.name + "'s avatar"}
              className="w-20 h-20 rounded-full"
              onError={() => setIsImageError(true)}
            />
          ) : (
            <NoAvatar text={currentPatient.name} />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <H1>Patient #{currentPatient.id}</H1>
          <Body1>{currentPatient.name}</Body1>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex gap-1">
          <Body2 className="font-bold">Website:</Body2>
          <a href={currentPatient.website} target="_blank">
            <Body2>{currentPatient.website}</Body2>
          </a>
        </div>
        <Body2>
          <strong>Registration date:</strong>{" "}
          {currentPatient.createdAt.toString()}
        </Body2>
      </div>
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col gap-2 items-start w-full">
          <div
            className="text-ellipsis overflow-hidden w-full"
            ref={textRef}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: showFullText ? "unset" : 3,
              WebkitBoxOrient: "vertical",
              maxHeight: showFullText ? "unset" : "72px",
              textOverflow: "ellipsis"
            }}
          >
            <Body1 className="min-h-5 text-wrap">
              {currentPatient.description}
            </Body1>
          </div>
          {currentPatient.description && hasOverflow && !showFullText && (
            <button
              className="underline text-primary/70 hover:text-primary active:text transition-colors duration-300"
              onClick={toggleTextVisibility}
            >
              See more
            </button>
          )}
          {currentPatient.description && showFullText && (
            <button
              className="underline text-primary/70 hover:text-primary active:text transition-colors duration-300"
              onClick={toggleTextVisibility}
            >
              See less
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-4 px-4 w-full">
        <Button
          onClick={() => {
            setShowEditModal(true);
          }}
          variant={"outline"}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            setShowDeleteModal(true);
          }}
          variant={"error"}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PatientDetail;
