import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WrapperPage from "../pages/WrapperPage";

export const ROUTER = createBrowserRouter([
  {
    element: <WrapperPage />,
    children: [
      {
        element: <HomePage />,
        path: "/"
      }
    ]
  }
]);
