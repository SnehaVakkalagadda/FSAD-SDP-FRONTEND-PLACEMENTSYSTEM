import { RouterProvider } from "react-router";
import { router } from "./router";
import "./App.css";
import { PlacementDataProvider } from "./context/PlacementDataContext";

function App() {
  return (
    <PlacementDataProvider>
      <RouterProvider router={router} />
    </PlacementDataProvider>
  );
}

export default App;
