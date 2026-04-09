import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { JobExplorer } from "../student/JobExplorer";
import { MyApplications } from "../student/MyApplications";
import { StudentProfile } from "../student/StudentProfile";
import { Briefcase, FileText, User } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();
  const [tab, setTab] = useState("jobs");

  if (!currentUser || currentRole !== "student") {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout userName={currentUser.name} userEmail={currentUser.email} userRole="student">
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="w-4 h-4" /> Jobs
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" /> Applications
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs"><JobExplorer /></TabsContent>
        <TabsContent value="applications"><MyApplications /></TabsContent>
        <TabsContent value="profile"><StudentProfile /></TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { StudentDashboard };
