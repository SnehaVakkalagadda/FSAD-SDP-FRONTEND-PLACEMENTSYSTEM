import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { StudentDashboard } from "./components/dashboards/StudentDashboard";
import { EmployerDashboard } from "./components/dashboards/EmployerDashboard";
import { AdminDashboard } from "./components/dashboards/AdminDashboard";
import { PlacementOfficerDashboard } from "./components/dashboards/PlacementOfficerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "student", Component: StudentDashboard },
      { path: "employer", Component: EmployerDashboard },
      { path: "admin", Component: AdminDashboard },
      { path: "officer", Component: PlacementOfficerDashboard },
    ],
  },
]);

export { router };
