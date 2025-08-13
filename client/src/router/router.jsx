import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllVolunteer from "../pages/AllVolunteer/AllVolunteer";
import AddVolunteerNeed from "../pages/AddVolunteerNeed/AddVolunteerNeed";
import ManageMyPosts from "../pages/ManageMyPosts/ManageMyPosts";
import PrivateRoute from "./PrivateRoute";
import VolunteerDetails from "../pages/VolunteerDetails/VolunteerDetails";
import VolunteerRequests from "../pages/VolunteerRequests/VolunteerRequests";
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
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allVolunteers",
        element: <AllVolunteer></AllVolunteer>,
      },
      {
        path: "/add-volunteer",
        element: (
          <PrivateRoute>
            <AddVolunteerNeed></AddVolunteerNeed>
          </PrivateRoute>
        ),
      },
      {
        path: "/view-volunteer/:id",
        element: (
          <PrivateRoute>
            <VolunteerDetails></VolunteerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-posts",
        element: (
          <PrivateRoute>
            <ManageMyPosts></ManageMyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteer-requests",
        element: (
          <PrivateRoute>
            <VolunteerRequests></VolunteerRequests>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
