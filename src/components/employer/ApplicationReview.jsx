import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const STATUS_COLORS = {
  applied: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  shortlisted: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

function ApplicationReview({ preselectedJob }) {
  const { jobs, applications, currentUser, loadApplicationsForJob } = usePlacementData();
  const myJobs = jobs.filter((j) => j.employerId === currentUser?.id);
  const [selectedJobId, setSelectedJobId] = useState(preselectedJob ? String(preselectedJob.id) : "");
  const [loading, setLoading] = useState(false);

  const handleJobSelect = async (val) => {
    setSelectedJobId(val);
    setLoading(true);
    await loadApplicationsForJob(parseInt(val));
    setLoading(false);
  };

  const filtered = selectedJobId
    ? applications.filter((a) => String(a.jobId) === selectedJobId)
    : [];

  const colorFor = (s) => STATUS_COLORS[s?.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Applications</h2>
          <p className="text-gray-500 text-sm">Select a job to view its applications</p>
        </div>
        <Select value={selectedJobId} onValueChange={handleJobSelect}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select a job" />
          </SelectTrigger>
          <SelectContent>
            {myJobs.map((j) => (
              <SelectItem key={j.id} value={String(j.id)}>{j.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedJobId && (
        <Card>
          <CardContent className="py-10 text-center text-gray-400">
            <p>Select a job above to view its applications</p>
          </CardContent>
        </Card>
      )}

      {selectedJobId && loading && (
        <Card>
          <CardContent className="py-10 text-center text-gray-400">
            <p>Loading applications...</p>
          </CardContent>
        </Card>
      )}

      {selectedJobId && !loading && (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-gray-400">
                <p>No applications for this job yet</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((app) => (
              <Card key={app.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Student ID: {app.studentId}</CardTitle>
                      <CardDescription>Application ID: {app.id}</CardDescription>
                    </div>
                    <Badge className={colorFor(app.status)}>{app.status}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export { ApplicationReview };
