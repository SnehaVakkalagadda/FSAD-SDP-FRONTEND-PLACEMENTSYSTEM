import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlacementRecords } from "../placement-officer/PlacementRecords";
import { ReportsGeneration } from "../placement-officer/ReportsGeneration";
import { EmployerStudentFacilitation } from "../placement-officer/EmployerStudentFacilitation";
import { FileText, BarChart3, Users } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PlacementOfficerDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();
  const [activeTab, setActiveTab] = useState("records");

  if (!currentUser || currentRole !== "placement-officer") {
    if (currentRole !== null) navigate("/login");
    return null;
  }

  return (
    <DashboardLayout
      userName={currentUser.name || "Placement Officer"}
      userEmail={currentUser.email || "officer@university.edu"}
      userRole="placement-officer"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="records" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Placement Records</span>
            <span className="sm:hidden">Records</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
            <span className="sm:hidden">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="facilitation" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Facilitation</span>
            <span className="sm:hidden">Facilitate</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <PlacementRecords />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsGeneration />
        </TabsContent>
        <TabsContent value="facilitation" className="space-y-4">
          <EmployerStudentFacilitation />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { PlacementOfficerDashboard };
