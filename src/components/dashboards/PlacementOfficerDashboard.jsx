import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlacementRecords } from "../placement-officer/PlacementRecords";
import { ReportsGeneration } from "../placement-officer/ReportsGeneration";
import { FileText, BarChart3 } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PlacementOfficerDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();

  if (!currentUser || currentRole !== "placement-officer") {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout userName={currentUser.name} userEmail={currentUser.email} userRole="placement-officer">
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-72">
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" /> Applications
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="w-4 h-4" /> Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applications"><PlacementRecords /></TabsContent>
        <TabsContent value="reports"><ReportsGeneration /></TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { PlacementOfficerDashboard };
