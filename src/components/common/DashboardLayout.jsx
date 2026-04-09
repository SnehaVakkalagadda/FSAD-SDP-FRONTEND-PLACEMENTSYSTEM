import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut, GraduationCap } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function DashboardLayout({ children, userName, userEmail, userRole }) {
  const navigate = useNavigate();
  const { logout } = usePlacementData();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) =>
    (name || "U")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl">Placement Portal</h1>
                <p className="text-xs text-gray-500 capitalize">
                  {userRole.replace("-", " ")} Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <Avatar>
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}

export { DashboardLayout };
