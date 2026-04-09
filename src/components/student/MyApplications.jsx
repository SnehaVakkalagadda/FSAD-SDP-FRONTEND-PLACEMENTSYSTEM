import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText, Briefcase } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

const STATUS_COLORS = {
  applied: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  shortlisted: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

function MyApplications() {
  const { applications, jobs, currentUser } = usePlacementData();
  const myApps = applications.filter((a) => Number(a.studentId) === Number(currentUser?.id));

  const getJobTitle = (jobId) => jobs.find((j) => j.id === jobId)?.title || `Job #${jobId}`;
  const getJobSalary = (jobId) => jobs.find((j) => j.id === jobId)?.salary;
  const colorFor = (s) => STATUS_COLORS[s?.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">My Applications</h2>
        <p className="text-gray-500 text-sm">Track your application statuses</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total", count: myApps.length, color: "text-gray-900" },
          { label: "Reviewing", count: myApps.filter((a) => a.status?.toLowerCase() === "reviewing").length, color: "text-blue-600" },
          { label: "Accepted", count: myApps.filter((a) => a.status?.toLowerCase() === "accepted").length, color: "text-green-600" },
          { label: "Rejected", count: myApps.filter((a) => a.status?.toLowerCase() === "rejected").length, color: "text-red-600" },
        ].map(({ label, count, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-semibold ${color}`}>{count}</div>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application list */}
      <div className="space-y-3">
        {myApps.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3" />
              <p>No applications yet. Go to Explore Jobs to apply!</p>
            </CardContent>
          </Card>
        ) : (
          myApps.map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {getJobTitle(app.jobId)}
                    </CardTitle>
                    <CardDescription>
                      {getJobSalary(app.jobId) ? `${getJobSalary(app.jobId)} LPA · ` : ""}
                      Application ID: {app.id}
                    </CardDescription>
                  </div>
                  <Badge className={colorFor(app.status)}>{app.status}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export { MyApplications };
