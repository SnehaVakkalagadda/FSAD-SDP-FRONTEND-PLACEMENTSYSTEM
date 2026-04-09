import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { DollarSign, ChevronRight } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PostedJobs({ onViewApplications }) {
  const { jobs, currentUser } = usePlacementData();
  const myJobs = jobs.filter((j) => j.employerId === currentUser?.id);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Posted Jobs</h2>
        <p className="text-gray-500 text-sm">{myJobs.length} job{myJobs.length !== 1 ? "s" : ""} posted</p>
      </div>

      <div className="space-y-3">
        {myJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-3 h-3" /> {job.salary} LPA
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => onViewApplications?.(job)}>
                  Applications <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
            </CardContent>
          </Card>
        ))}

        {myJobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              <p>No jobs posted yet. Use "Post Job" tab to add one.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { PostedJobs };
