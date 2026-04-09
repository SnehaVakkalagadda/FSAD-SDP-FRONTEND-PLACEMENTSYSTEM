import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FileText } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const STATUS_COLORS = {
  applied: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  shortlisted: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const STATUSES = ["Reviewing", "Shortlisted", "Accepted", "Rejected"];

function PlacementRecords() {
  const { applications, jobs, updateApplicationStatus } = usePlacementData();
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  const filtered = filter === "all"
    ? applications
    : applications.filter((a) => a.status?.toLowerCase() === filter);

  const getJobTitle = (jobId) => jobs.find((j) => Number(j.id) === Number(jobId))?.title || `Job #${jobId}`;
  const colorFor = (s) => STATUS_COLORS[s?.toLowerCase()] || "bg-gray-100 text-gray-700";

  const handleStatusUpdate = async (app, status) => {
    setUpdating(app.id);
    // PUT /officer/updatestatus?applicationId=&status=&studentId=
    const result = await updateApplicationStatus(app.id, status, app.studentId);
    setUpdating(null);
    if (result.ok) toast.success(`Status updated to ${status}`);
    else toast.error(result.message);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">All Applications</h2>
        <p className="text-gray-500 text-sm">View and update student application statuses</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total", val: applications.length, color: "text-gray-900" },
          { label: "Applied", val: applications.filter((a) => a.status?.toLowerCase() === "applied").length, color: "text-yellow-600" },
          { label: "Shortlisted", val: applications.filter((a) => a.status?.toLowerCase() === "shortlisted").length, color: "text-purple-600" },
          { label: "Accepted", val: applications.filter((a) => a.status?.toLowerCase() === "accepted").length, color: "text-green-600" },
          { label: "Rejected", val: applications.filter((a) => a.status?.toLowerCase() === "rejected").length, color: "text-red-600" },
        ].map(({ label, val, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className={`text-2xl font-semibold ${color}`}>{val}</div>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} application{filtered.length !== 1 ? "s" : ""}</p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3" />
              <p>No applications found</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{getJobTitle(app.jobId)}</CardTitle>
                    <CardDescription>
                      Student ID: {app.studentId} · Application ID: {app.id}
                    </CardDescription>
                  </div>
                  <Badge className={colorFor(app.status)}>{app.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500 mb-2">Update Status:</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={app.status?.toLowerCase() === s.toLowerCase() ? "default" : "outline"}
                      disabled={updating === app.id}
                      onClick={() => handleStatusUpdate(app, s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export { PlacementRecords };
