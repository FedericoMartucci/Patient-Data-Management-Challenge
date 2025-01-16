import NotificationBadge from "../../components/NotificationBadge/NotificationBadge";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import ReactDom from "react-dom";

interface SnackBar {
  message: string;
  type: "default" | "successEdit" | "successDelete" | "successAdd" | "error";
}

interface SnackBarContextType {
  showSnackBar: (
    message: string,
    type: "default" | "successEdit" | "successDelete" | "successAdd" | "error"
  ) => void;
}

const SnackbarContext = createContext<SnackBarContextType | null>(null);

export const useSnackBar = (): SnackBarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackBarProviderProps {
  children: ReactNode;
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children
}: SnackBarProviderProps) => {
  const [snackBars, setSnackBars] = useState<SnackBar[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackBars((prev) => prev.slice(1));
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [snackBars]);

  const showSnackBar = (
    message: string,
    type: "default" | "successEdit" | "successDelete" | "successAdd" | "error"
  ): void => {
    setSnackBars((prev) => [...prev, { message, type }]);
  };

  const handleOnClose = (): void => {
    setSnackBars((prev) => prev.slice(1));
  };

  const portalElement = document.getElementById("notification-portal");

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      {children}
      {portalElement &&
        ReactDom.createPortal(
          <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
            {snackBars.map((snackBar: SnackBar, index: number) => (
              <div className="animate-slideInLeft z-50" key={index}>
                <NotificationBadge
                  variant={snackBar.type}
                  handleClose={handleOnClose}
                >
                  {snackBar.message}
                </NotificationBadge>
              </div>
            ))}
          </div>,
          portalElement
        )}
    </SnackbarContext.Provider>
  );
};
