import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DashboardLayout } from "../common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { MapPin, Building2, DollarSign, Calendar, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { usePlacementData } from "../../context/PlacementDataContext";

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, addApplication, currentUser } = usePlacementData();
  const job = jobs.find((j) => j.id === id);
  const [coverLetter, setCoverLetter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  if (!job) {
    return (
      <DashboardLayout userName={currentUser.name} userEmail={currentUser.email} userRole="student">
        <div className="text-center py-12">
          <p className="text-gray-500">Job not found</p>
          <Button onClick={() => navigate("/student")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleApply = async () => {
    const result = await addApplication({ jobId: job.id, coverLetter: coverLetter.trim() });
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.success("Application submitted successfully!");
    setIsDialogOpen(false);
    setCoverLetter("");
  };

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
    <DashboardLayout userName={currentUser.name} userEmail={currentUser.email} userRole="student">
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/student")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <CardTitle className="text-3xl">{job.title}</CardTitle>
                  <Badge className={getTypeColor(job.type)}>{job.type.replace("-", " ")}</Badge>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-700 mb-4">
                  <Building2 className="w-5 h-5" />
                  {job.company}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />{job.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />{job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="shrink-0">Apply Now</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                    <DialogDescription>Submit your application for this position at {job.company}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter *</Label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Write a brief cover letter explaining why you're a good fit for this role..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={6}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 mb-2">Your application will include:</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Your resume</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Academic details (CGPA, Department)</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Contact information</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancel</Button>
                    <Button onClick={handleApply} disabled={!coverLetter.trim()} className="flex-1">Submit Application</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
          <CardContent><p className="text-gray-700 leading-relaxed">{job.description}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Key Responsibilities</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(job.responsibilities || []).map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Requirements</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(job.requirements || []).map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Additional Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Total Applicants</span>
              <span className="text-gray-900">{job.applicantsCount || 0}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Application Deadline</span>
              <span className="text-gray-900">
                {new Date(job.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Job Type</span>
              <span className="text-gray-900 capitalize">{job.type.replace("-", " ")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export { JobDetailsPage };
