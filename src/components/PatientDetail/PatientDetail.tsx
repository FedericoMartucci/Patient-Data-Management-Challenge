import { useEffect, useRef, useState } from "react";
import { useCurrentPatient } from "../../redux/hooks";
import NoAvatar from "../NoAvatar/NoAvatar";
import Body1 from "../../utils/typography/body1/body1";
import H1 from "../../utils/typography/h1/h1";
import Body2 from "../../utils/typography/body2/body2";

const PatientDetail = () => {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const currentPatient = useCurrentPatient();
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);

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
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-between items-start">
        {currentPatient.avatar !== "" && !isImageError ? (
          <img
            src={currentPatient.avatar}
            alt={currentPatient.name + "'s avatar"}
            className="w-20 h-20 rounded-full"
            onError={() => setIsImageError(true)}
          />
        ) : (
          <div className="self-center">
            <NoAvatar text={currentPatient.name} />
          </div>
        )}
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
          <Body1 className="min-h-5">{currentPatient.description}</Body1>
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
  );
};

export default PatientDetail;
