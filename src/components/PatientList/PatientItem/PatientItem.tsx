import { FC } from "react";
import { PatientDTO } from "../../../utils/types";
import Body1 from "../../../utils/typography/body1/body1";
import Icon from "../../Icon/Icon";
import config from "../../../../tailwind.config";
import { useAppDispatch, useCurrentPatient } from "../../../redux/hooks";
import { setCurrentPatient } from "../../../redux/patient";

type PatientItemProps = {
  patient: PatientDTO;
};

const PoemItem: FC<PatientItemProps> = ({ patient }) => {
  const colors = config.theme.extend.colors;
  const dispatch = useAppDispatch();
  const currentPatient = useCurrentPatient();

  const handleClick = () => {
    dispatch(setCurrentPatient(patient));
  };

  const activeStyles =
    currentPatient.id === patient.id
      ? "bg-primary text-white"
      : "bg-transparent hover:bg-gray-200";

  return (
    <div
      className={
        `flex w-full border-b border-gray-300 cursor-pointer transition-colors duration-300 ` +
        activeStyles
      }
      key={patient.id}
      onClick={handleClick}
    >
      <div className="p-2 flex min-h-10 w-full max-w-[20%] items-center">
        <Body1 className="truncate leading-[22px]">{patient.name}</Body1>
      </div>
      <div className=" p-2 flex min-h-10 w-full md:max-w-[76%] max-w-[70%] items-center">
        <Body1 className="truncate leading-[22px]">{patient.description}</Body1>
      </div>
      <div className="-rotate-90 min-w-5 min-h-5 p-1 flex items-center justify-center">
        <Icon
          width={"20"}
          height={"20"}
          fillColor={
            currentPatient.id === patient.id ? colors.white : colors.gray[800]
          }
          name={"ChevronIcon"}
        />
      </div>
    </div>
  );
};

export default PoemItem;
