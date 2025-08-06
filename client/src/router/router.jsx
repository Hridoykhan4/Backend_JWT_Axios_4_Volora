import App from "../App";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
        {
            index: true,
            element: <h2>Hii</h2>
        }
    ]
  },
]);

export default router;
