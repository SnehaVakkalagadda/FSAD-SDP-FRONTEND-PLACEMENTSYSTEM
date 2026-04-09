import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserManagement } from "../admin/UserManagement";
import { PlacementDataOverview } from "../admin/PlacementDataOverview";
import { SystemSettings } from "../admin/SystemSettings";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();

  if (!currentUser || currentRole !== "admin") {
    navigate("/login");
    return null;
  }

  // Admin entity has: username, password
  return (
    <DashboardLayout
      userName={currentUser.username || "Admin"}
      userEmail={currentUser.email || currentUser.username || ""}
      userRole="admin"
    >
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-80">
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><PlacementDataOverview /></TabsContent>
        <TabsContent value="users"><UserManagement /></TabsContent>
        <TabsContent value="settings"><SystemSettings /></TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { AdminDashboard };
