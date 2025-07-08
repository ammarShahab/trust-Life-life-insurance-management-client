import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AddPackage from "../components/packages/AddPackage";
import LogIn from "../pages/Authentication/LogIn/LogIn";
import Register from "../pages/Authentication/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import Error404 from "../pages/Error404/Error404";

import Loading from "../components/Loading/Loading";
import PrivacyPolicy from "../components/PrivacyPolicy";
import AllPackages from "../components/packages/AllPackages";
import PackageDetails from "../components/PackageDetails";
import MyPackages from "../components/packages/MyPackages";
import UpdatePackages from "../components/packages/UpdatePackages";
import ApplyBooking from "../components/bookings/ApplyBooking";
import MyBookings from "../components/bookings/MyBookings";
import AboutUs from "../components/AboutUs";
import Home from "../pages/Home/Home/Home";
import PrivateRouter from "../routes/PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "/allPackages",
        /* loader: () => fetch("http://localhost:3000/packages"), */
        Component: AllPackages,
        // hydrateFallbackElement: <Loading></Loading>,
      },
      { path: "/add-package", element: <AddPackage></AddPackage> },
      {
        path: "/packages/:id",
        loader: ({ params }) =>
          fetch(
            `https://b11a11-server-side-ashahab007.vercel.app/packages/${params.id}`
          ),
        // fetch(`http://localhost:3000/packages/${params.id}`),
        element: (
          <PrivateRouter>
            <PackageDetails></PackageDetails>
          </PrivateRouter>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/manage-myPackages/:email",
        loader: ({ params }) =>
          fetch(
            `https://b11a11-server-side-ashahab007.vercel.app/manage-myPackages/${params.email}`
          ),
        // fetch(`http://localhost:3000/manage-myPackages/${params.email}`),
        element: (
          <PrivateRouter>
            <MyPackages></MyPackages>
          </PrivateRouter>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/update-myPackages/:id",
        loader: ({ params }) =>
          // fetch(`http://localhost:3000/packages/${params.id}`),
          fetch(
            `https://b11a11-server-side-ashahab007.vercel.app/packages/${params.id}`
          ),
        element: (
          <PrivateRouter>
            <UpdatePackages></UpdatePackages>
          </PrivateRouter>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/apply-booking/:id",
        loader: ({ params }) =>
          fetch(
            `https://b11a11-server-side-ashahab007.vercel.app/packages/${params.id}`
          ),
        // fetch(`http://localhost:3000/packages/${params.id}`),
        element: (
          <PrivateRouter>
            <ApplyBooking></ApplyBooking>
          </PrivateRouter>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/my-bookings",
        /* loader: ({ params }) =>
          fetch(`http://localhost:3000/packages/${params.id}`), */
        element: (
          <PrivateRouter>
            <MyBookings></MyBookings>
          </PrivateRouter>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },

      { path: "/privacy-policy", Component: PrivacyPolicy },
      { path: "/about-us", Component: AboutUs },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      { path: "/auth/login", element: <LogIn></LogIn> },
      { path: "/auth/register", element: <Register></Register> },
    ],
  },
  {
    path: "/*",
    Component: Error404,
  },
]);

export default router;
