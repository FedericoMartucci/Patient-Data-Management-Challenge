import { RouterProvider } from "react-router";
import { ROUTER } from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={ROUTER} />
    </Provider>
  );
}

export default App;
