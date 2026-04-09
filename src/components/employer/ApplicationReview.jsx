import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Mail, GraduationCap, Award, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import { usePlacementData } from "../../context/PlacementDataContext";

function ApplicationReview() {
  const { jobs, applications, currentUser, loadApplicationsForJob } = usePlacementData();
  const employerJobs = jobs.filter((job) => job.employerId === currentUser?.id);
  const employerJobIds = employerJobs.map((job) => job.id);
  const [selectedJob, setSelectedJob] = useState("all");

  const employerApplications = useMemo(
    () => applications.filter((app) => employerJobIds.includes(app.jobId)),
    [applications, employerJobIds]
  );

  const filteredApplications =
    selectedJob === "all"
      ? employerApplications
      : employerApplications.filter((app) => app.jobId === selectedJob);

  const handleJobFilter = async (jobId) => {
    setSelectedJob(jobId);
    if (jobId !== "all") {
      await loadApplicationsForJob(jobId);
    }
  };

  const getJobTitle = (jobId) => jobs.find((j) => j.id === jobId)?.title || "Unknown Job";

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewing": return "bg-blue-100 text-blue-800";
      case "shortlisted": return "bg-purple-100 text-purple-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Review Applications</h2>
          <p className="text-gray-600">Manage candidate applications</p>
        </div>
        <Select value={selectedJob} onValueChange={handleJobFilter}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs ({employerApplications.length})</SelectItem>
            {employerJobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title} ({employerApplications.filter((a) => a.jobId === job.id).length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["pending", "reviewing", "shortlisted", "accepted", "rejected"].map((status) => (
          <Card key={status}>
            <CardContent className="pt-6">
              <div className="text-2xl mb-1">
                {filteredApplications.filter((a) => a.status === status).length}
              </div>
              <p className="text-xs text-gray-600 capitalize">{status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{application.studentName}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </div>
                  <CardDescription>Applied for: {getJobTitle(application.jobId)}</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{application.studentName}</DialogTitle>
                      <DialogDescription>Application for {getJobTitle(application.jobId)}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <p className="text-sm">{application.studentEmail}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Department</p>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-gray-400" />
                            <p className="text-sm">{application.studentDepartment}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">CGPA</p>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-gray-400" />
                            <p className="text-sm">{application.studentCGPA?.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Applied Date</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm">{new Date(application.appliedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Cover Letter</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">{application.coverLetter}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Resume</p>
                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-900">{application.resume}</span>
                          <Button variant="link" size="sm" className="ml-auto">Download</Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  {application.studentDepartment}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  CGPA: {application.studentCGPA?.toFixed(2)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {new Date(application.appliedDate).toLocaleDateString()}
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{application.coverLetter}</p>
            </CardContent>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No applications to review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { ApplicationReview };
