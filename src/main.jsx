import ReactDOM from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)