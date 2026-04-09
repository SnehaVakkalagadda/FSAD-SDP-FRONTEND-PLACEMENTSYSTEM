import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostedJobs } from "../employer/PostedJobs";
import { ApplicationReview } from "../employer/ApplicationReview";
import { PostJobForm } from "../employer/PostJobForm";
import { Briefcase, Users, PlusCircle } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function EmployerDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = usePlacementData();
  const [activeTab, setActiveTab] = useState("jobs");

  if (!currentUser || currentRole !== "employer") {
    if (currentRole !== null) navigate("/login");
    return null;
  }

  return (
    <DashboardLayout
      userName={currentUser.name}
      userEmail={currentUser.email}
      userRole="employer"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Posted Jobs</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Applications</span>
            <span className="sm:hidden">Apps</span>
          </TabsTrigger>
          <TabsTrigger value="post" className="gap-2">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Post Job</span>
            <span className="sm:hidden">Post</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <PostedJobs />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <ApplicationReview />
        </TabsContent>
        <TabsContent value="post" className="space-y-4">
          <PostJobForm onSuccess={() => setActiveTab("jobs")} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { EmployerDashboard };
