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
  const [activeTab, setActiveTab] = useState("jobs");

  if (!currentUser || currentRole !== "student") {
    if (currentRole !== null) navigate("/login");
    return null;
  }

  return (
    <DashboardLayout
      userName={currentUser.name}
      userEmail={currentUser.email}
      userRole="student"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Explore Jobs</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">My Applications</span>
            <span className="sm:hidden">Apps</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
            <span className="sm:hidden">Profile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <JobExplorer />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <MyApplications />
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <StudentProfile student={currentUser} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { StudentDashboard };
