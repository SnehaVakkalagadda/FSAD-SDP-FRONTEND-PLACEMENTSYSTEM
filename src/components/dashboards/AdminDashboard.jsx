import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SystemSettings } from "../admin/SystemSettings";
import { UserManagement } from "../admin/UserManagement";
import { PlacementDataOverview } from "../admin/PlacementDataOverview";
import { Settings, Users, Database } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();
  const [activeTab, setActiveTab] = useState("overview");

  if (!currentUser || currentRole !== "admin") {
    if (currentRole !== null) navigate("/login");
    return null;
  }

  return (
    <DashboardLayout
      userName={currentUser.name || "Admin User"}
      userEmail={currentUser.email || "admin@university.edu"}
      userRole="admin"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[450px]">
          <TabsTrigger value="overview" className="gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Data Overview</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">User Management</span>
            <span className="sm:hidden">Users</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PlacementDataOverview />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { AdminDashboard };
