import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, DollarSign, Calendar, Users, Edit, Trash2 } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

function PostedJobs() {
  const { jobs: allJobs, currentUser, removeJob } = usePlacementData();
  const jobs = allJobs.filter((job) => job.employerId === currentUser?.id);

  const getTypeColor = (type) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-green-100 text-green-800";
      case "internship": return "bg-purple-100 text-purple-800";
      case "contract": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Posted Jobs</h2>
        <p className="text-gray-600">Manage your job postings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">{jobs.length}</div>
            <p className="text-sm text-gray-600">Total Jobs Posted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">{jobs.reduce((sum, job) => sum + (job.applicantsCount || 0), 0)}</div>
            <p className="text-sm text-gray-600">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">{jobs.filter((job) => new Date(job.deadline) > new Date()).length}</div>
            <p className="text-sm text-gray-600">Active Jobs</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{job.title}</CardTitle>
                    <Badge className={getTypeColor(job.type)}>{job.type.replace("-", " ")}</Badge>
                    {new Date(job.deadline) < new Date() && (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </div>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      removeJob(job.id);
                      toast.success("Job removed");
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600">{job.applicantsCount || 0} applicants</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
            </CardContent>
          </Card>
        ))}

        {jobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No jobs posted yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { PostedJobs };
