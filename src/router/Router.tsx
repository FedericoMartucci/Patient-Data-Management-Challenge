import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WrapperPage from "../pages/WrapperPage";
import PatientDetailPage from "../pages/PatientDetailPage";

export const ROUTER = createBrowserRouter([
  {
    element: <WrapperPage />,
    children: [
      {
        element: <HomePage />,
        path: "/"
      },
      {
        element: <PatientDetailPage />,
        path: "/patient/:patientId"
      }
    ]
  }
]);
