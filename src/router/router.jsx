import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

import LogIn from "../pages/Authentication/LogIn/LogIn";
import Register from "../pages/Authentication/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import Error404 from "../pages/Error404/Error404";
import Loading from "../components/Loading/Loading";
import PrivacyPolicy from "../components/PrivacyPolicy";

import AboutUs from "../components/AboutUs";
import Home from "../pages/Home/Home/Home";
import PrivateRouter from "../routes/PrivateRouter";
import GetFreeQuote from "../pages/Home/GetFreeQuote/GetFreeQuote";
import DashBoardLayout from "../layouts/DashBoardLayout";
import DashBoardHome from "../pages/DashBoard/DashBoardHome/DashBoardHome";
import ManageUsers from "../pages/DashBoard/DashBoardHome/AdminDashBoard/ManageUsers/ManageUsers";
import ManageApplications from "../pages/DashBoard/DashBoardHome/AdminDashBoard/ManageApplications/ManageApplications";
import ManageTransactions from "../pages/DashBoard/DashBoardHome/AdminDashBoard/ManageTransactions/ManageTransactions";
import ManagePolicies from "../pages/DashBoard/DashBoardHome/AdminDashBoard/ManagePolicies/ManagePolicies";
import MyPolicies from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/MyPolicies/MyPolicies";
import PaymentPage from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/PaymentPage/PaymentPage";
import PaymentStatus from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/PaymentStatus/PaymentStatus";
import ClaimRequestPage from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/ClaimRequestPage/ClaimRequestPage";
import AssignedCustomers from "../pages/DashBoard/DashBoardHome/AgentDashboard/AssignedCustomers/AssignedCustomers";
import ManageBlogs from "../pages/DashBoard/DashBoardHome/AgentDashboard/ManageBlogs/ManageBlogs";
import PolicyClearance from "../pages/DashBoard/DashBoardHome/AgentDashboard/PolicyClearance/PolicyClearance";
import AllPolicies from "../pages/AllPolicies/AllPolicies";
import PolicyDetails from "../pages/PolicyDetails/PolicyDetails";
import PolicyQuotePage from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/PolicyQuotePage/PolicyQuotePage";
import PolicyApplyForm from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/PolicyApplyForm/PolicyApplyForm";
import PaymentForm from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/PaymentForm/PaymentForm";
import MyPayments from "../pages/DashBoard/DashBoardHome/CustomerDashBoard/MyPayments/MyPayments";
import Blogs from "../pages/Blogs/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "/get-free-quote",
        Component: GetFreeQuote,
      },
      { path: "/all-policies", Component: AllPolicies },
      {
        path: "/policy/:id",
        Component: PolicyDetails,
      },
      {
        path: "/get-quote/:policyId",
        element: (
          <PrivateRouter>
            <PolicyQuotePage></PolicyQuotePage>
          </PrivateRouter>
        ),
      },

      {
        path: "/apply-policy/:policyId",
        element: (
          <PrivateRouter>
            <PolicyApplyForm></PolicyApplyForm>
          </PrivateRouter>
        ),
      },
      {
        path: "/blogs",
        Component: Blogs,
      },

      { path: "/privacy-policy", Component: PrivacyPolicy },
      { path: "/about-us", Component: AboutUs },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRouter>
    ),
    children: [
      { index: true, Component: DashBoardHome },
      { path: "manage-applications", Component: ManageApplications },
      { path: "manage-users", Component: ManageUsers },
      { path: "manage-policies", Component: ManagePolicies },
      { path: "manage-transactions", Component: ManageTransactions },
      { path: "my-policies", Component: MyPolicies },
      // { path: "my-payment", Component: MyPayments },
      { path: "payment-status", Component: PaymentStatus },
      { path: "payment-form/:applicationId", Component: PaymentPage },
      { path: "claim-request", Component: ClaimRequestPage },
      { path: "assigned-customers", Component: AssignedCustomers },
      { path: "manage-blogs", Component: ManageBlogs },
      { path: "policy-clearance", Component: PolicyClearance },
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
