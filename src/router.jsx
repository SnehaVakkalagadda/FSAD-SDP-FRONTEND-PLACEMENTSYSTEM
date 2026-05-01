import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { StudentDashboard } from "./components/dashboards/StudentDashboard";
import { EmployerDashboard } from "./components/dashboards/EmployerDashboard";
import { AdminDashboard } from "./components/dashboards/AdminDashboard";
import { PlacementOfficerDashboard } from "./components/dashboards/PlacementOfficerDashboard";
import { usePlacementData } from "./context/PlacementDataContext";

// Protects a route — only allows access if logged in with the correct role
function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, currentRole } = usePlacementData();

  // Not logged in → go to login
  if (!currentUser || !currentRole) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → go to their own dashboard
  if (currentRole !== requiredRole) {
    const roleRoutes = {
      student: "/student",
      employer: "/employer",
      admin: "/admin",
      "placement-officer": "/officer",
    };
    return <Navigate to={roleRoutes[currentRole] || "/login"} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      {
        path: "student",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "employer",
        element: (
          <ProtectedRoute requiredRole="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "officer",
        element: (
          <ProtectedRoute requiredRole="placement-officer">
            <PlacementOfficerDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export { router };
