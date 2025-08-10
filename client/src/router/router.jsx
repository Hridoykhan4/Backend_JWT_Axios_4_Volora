import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllVolunteer from "../pages/AllVolunteer/AllVolunteer";
import AddVolunteerNeed from "../pages/AddVolunteerNeed/AddVolunteerNeed";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/allVolunteers',
        element: <AllVolunteer></AllVolunteer>
      },
      {
        path: '/add-volunteer',
        element: <AddVolunteerNeed></AddVolunteerNeed>
      }
    ],
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;
