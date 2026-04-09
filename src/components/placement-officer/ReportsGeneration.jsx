import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { usePlacementData } from "../../context/PlacementDataContext";

const STATUS_COLORS = {
  Applied: "bg-yellow-100 text-yellow-800",
  Reviewing: "bg-blue-100 text-blue-800",
  Shortlisted: "bg-purple-100 text-purple-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

function ReportsGeneration() {
  const { applications, jobs } = usePlacementData();

  const counts = {
    Applied: applications.filter((a) => a.status?.toLowerCase() === "applied").length,
    Reviewing: applications.filter((a) => a.status?.toLowerCase() === "reviewing").length,
    Shortlisted: applications.filter((a) => a.status?.toLowerCase() === "shortlisted").length,
    Accepted: applications.filter((a) => a.status?.toLowerCase() === "accepted").length,
    Rejected: applications.filter((a) => a.status?.toLowerCase() === "rejected").length,
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Reports</h2>
        <p className="text-gray-500 text-sm">Application status breakdown</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(counts).map(([status, count]) => (
          <Card key={status}>
            <CardContent className="pt-5">
              <div className="text-2xl font-semibold mb-2">{count}</div>
              <Badge className={STATUS_COLORS[status]}>{status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications per Job</CardTitle>
          <CardDescription>Number of students who applied for each job</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-gray-400 text-sm">No jobs available.</p>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => {
                const count = applications.filter((a) => Number(a.jobId) === Number(job.id)).length;
                return (
                  <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.salary} LPA</p>
                    </div>
                    <Badge variant="secondary">{count} application{count !== 1 ? "s" : ""}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { ReportsGeneration };
