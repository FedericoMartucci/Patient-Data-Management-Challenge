import { useState } from "react";
import { useCurrentPatient } from "../../redux/hooks";
import NoAvatar from "../NoAvatar/NoAvatar";

const PatientDetail = () => {
    const [isImageError, setIsImageError] = useState<boolean>(false);
  const currentPatient = useCurrentPatient();
  return (
    <div>
      {currentPatient.avatar && currentPatient.avatar !== "" && !isImageError ? (
        <img
          src={currentPatient.avatar}
          alt={currentPatient.name + "'s avatar"}
          className="w-[20px] h-[20px] rounded-sm"
          onError={() => setIsImageError(true)}
        />
      ) : (
        <NoAvatar text={currentPatient.name} />
      )}
    </div>
  );
};

export default PatientDetail;
