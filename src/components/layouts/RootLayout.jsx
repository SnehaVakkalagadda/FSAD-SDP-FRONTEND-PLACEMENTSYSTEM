import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      <Toaster />
    </div>
  );
}

export { RootLayout };
