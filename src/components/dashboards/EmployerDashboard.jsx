import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostedJobs } from "../employer/PostedJobs";
import { ApplicationReview } from "../employer/ApplicationReview";
import { PostJobForm } from "../employer/PostJobForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Briefcase, Users, PlusCircle, User, Edit, X } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const btnPrimary = {
  background: "var(--primary)", color: "#fff", border: "none",
  borderRadius: 8, padding: "8px 20px", fontWeight: 600,
  cursor: "pointer", fontSize: 14, display: "inline-flex",
  alignItems: "center", gap: 6,
};
const btnOutline = {
  background: "#fff", color: "var(--foreground)",
  border: "1px solid var(--border)", borderRadius: 8,
  padding: "8px 16px", fontWeight: 600, cursor: "pointer",
  fontSize: 14, boxShadow: "none",
};

function EmployerDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentRole, updateEmployerProfile } = usePlacementData();
  const [tab, setTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: currentUser?.companyName || "",
    email: currentUser?.email || "",
    password: "",
  });

  if (!currentUser || currentRole !== "employer") {
    navigate("/login");
    return null;
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openEdit = () => {
    setForm({ companyName: currentUser.companyName || "", email: currentUser.email || "", password: "" });
    setEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateEmployerProfile(form);
    setLoading(false);
    if (result.ok) { toast.success("Profile updated!"); setEditing(false); }
    else toast.error(result.message);
  };

  const handleViewApplications = (job) => {
    setSelectedJob(job);
    setTab("applications");
  };

  return (
    <DashboardLayout userName={currentUser.companyName} userEmail={currentUser.email} userRole="employer">
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[480px]">
          <TabsTrigger value="jobs" className="gap-1">
            <Briefcase className="w-4 h-4" /> Jobs
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-1">
            <Users className="w-4 h-4" /> Applications
          </TabsTrigger>
          <TabsTrigger value="post" className="gap-1">
            <PlusCircle className="w-4 h-4" /> Post Job
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-1">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <PostedJobs onViewApplications={handleViewApplications} />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationReview preselectedJob={selectedJob} />
        </TabsContent>

        <TabsContent value="post">
          <PostJobForm onSuccess={() => setTab("jobs")} />
        </TabsContent>

        <TabsContent value="profile">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Company Profile</h2>
                <p className="text-gray-500 text-sm">Your registered company information</p>
              </div>
              <button type="button" onClick={openEdit} style={btnPrimary}>
                <Edit style={{ width: 14, height: 14 }} /> Edit Profile
              </button>
            </div>

            {/* Profile info */}
            <Card>
              <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Company Name</p>
                    <p className="text-gray-900">{currentUser.companyName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-gray-900">{currentUser.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inline edit form — no Dialog/Portal */}
            {editing && (
              <Card style={{ border: "2px solid var(--primary)" }}>
                <CardHeader>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <CardTitle>Edit Company Profile</CardTitle>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#64748b", boxShadow: "none" }}
                    >
                      <X style={{ width: 18, height: 18 }} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdate}>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="e-company">Company Name *</Label>
                        <Input id="e-company" required value={form.companyName} onChange={set("companyName")} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="e-email">Email *</Label>
                        <Input id="e-email" type="email" required value={form.email} onChange={set("email")} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="e-password">New Password (leave blank to keep current)</Label>
                        <Input id="e-password" type="password" placeholder="Enter new password" value={form.password} onChange={set("password")} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
                      <button type="button" style={btnOutline} onClick={() => setEditing(false)}>Cancel</button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={loading ? { ...btnPrimary, background: "#93c5fd", cursor: "not-allowed" } : btnPrimary}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

export { EmployerDashboard };
