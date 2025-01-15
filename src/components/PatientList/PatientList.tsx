import H3 from "../../utils/typography/h3/h3";
import H1 from "../../utils/typography/h1/h1";
import Subtitle from "../../utils/typography/subtitle/subtitle";
import { PatientDTO } from "../../utils/types";
import Loader from "../Loader/Loader";
import PatientItem from "./PatientItem/PatientItem";
import { usePatients } from "../../redux/hooks";

type PatientListProps = {
  isLoading: boolean;
};

const PatientList: React.FC<PatientListProps> = ({ isLoading }) => {
  const patients = usePatients();
  return (
    <div className="flex flex-col w-full items-center max-h-[80%]">
      <div className="flex flex-col gap-4 w-full items-center">
        <H1>Patients</H1>
        <div className="flex w-full border-b border-gray-800">
          <div className="p-2 flex min-w-[20%]">
            <H3 className="font-semibold">Name</H3>
          </div>
          <div className="p-2 flex w-full max-w-[80%]">
            <H3 className="font-semibold truncate">Description</H3>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="min-h-full w-full flex items-center justify-center">
          <Loader variant={"black"} size={80} />
        </div>
      ) : patients && patients.length > 0 ? (
        <div className="w-full bg-extrawhite overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col w-full">
            {patients.map((patient: PatientDTO) => (
              <PatientItem patient={patient} key={patient.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 w-full h-full flex items-center justify-center">
          <Subtitle className="text-[20px] leading-[24px] text-center">
            No patients found,
            <br />
            <strong>you can add one with the button below</strong>
          </Subtitle>
        </div>
      )}
    </div>
  );
};

export default PatientList;
