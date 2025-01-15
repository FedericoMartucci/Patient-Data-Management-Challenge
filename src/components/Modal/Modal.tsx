import React, { type ReactNode } from "react";
import ReactDom from "react-dom";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({
  show,
  onClose,
  children
}: ModalProps): JSX.Element | null => {
  const handleClose = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const portalElement = document.getElementById("portal");
  if (!portalElement) {
    return null;
  } else {
    return ReactDom.createPortal(
      <>
        {show && (
          <div
            onClick={handleClose}
            className={`w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-[4px] z-50 flex justify-center items-center`}
          >
            {children}
          </div>
        )}
      </>,
      portalElement
    );
  }
};
