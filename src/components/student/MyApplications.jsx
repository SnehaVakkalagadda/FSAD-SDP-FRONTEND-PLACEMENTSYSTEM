import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Building2, Calendar, FileText } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function MyApplications() {
  const { applications, jobs, currentUser } = usePlacementData();
  const myApplications = applications.filter((app) => app.studentId === currentUser?.id);

  const getJobTitle = (jobId) => jobs.find((j) => j.id === jobId)?.title || "Unknown Job";
  const getJobCompany = (jobId) => jobs.find((j) => j.id === jobId)?.company || "Unknown Company";

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

  const getStatusProgress = (status) => {
    switch (status) {
      case "pending": return 20;
      case "reviewing": return 40;
      case "shortlisted": return 70;
      case "accepted": return 100;
      case "rejected": return 0;
      default: return 0;
    }
  };

  const stats = {
    total: myApplications.length,
    pending: myApplications.filter((a) => a.status === "pending").length,
    reviewing: myApplications.filter((a) => a.status === "reviewing").length,
    shortlisted: myApplications.filter((a) => a.status === "shortlisted").length,
    accepted: myApplications.filter((a) => a.status === "accepted").length,
    rejected: myApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">My Applications</h2>
        <p className="text-gray-600">Track the status of your job applications</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1">{stats.total}</div><p className="text-xs text-gray-600">Total</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1 text-yellow-600">{stats.pending}</div><p className="text-xs text-gray-600">Pending</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1 text-blue-600">{stats.reviewing}</div><p className="text-xs text-gray-600">Reviewing</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1 text-purple-600">{stats.shortlisted}</div><p className="text-xs text-gray-600">Shortlisted</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1 text-green-600">{stats.accepted}</div><p className="text-xs text-gray-600">Accepted</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl mb-1 text-red-600">{stats.rejected}</div><p className="text-xs text-gray-600">Rejected</p></CardContent></Card>
      </div>

      <div className="space-y-4">
        {myApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-2">No applications yet</p>
              <p className="text-sm text-gray-400">Start exploring jobs and apply!</p>
            </CardContent>
          </Card>
        ) : (
          myApplications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{getJobTitle(application.jobId)}</CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {getJobCompany(application.jobId)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.status !== "rejected" && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Application Progress</span>
                        <span className="text-gray-900">{getStatusProgress(application.status)}%</span>
                      </div>
                      <Progress value={getStatusProgress(application.status)} />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Applied: {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Cover Letter</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{application.coverLetter}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export { MyApplications };
