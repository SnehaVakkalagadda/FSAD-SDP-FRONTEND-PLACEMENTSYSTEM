import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PostJobForm({ onSuccess }) {
  const { addJob, currentUser } = usePlacementData();
  const [requirements, setRequirements] = useState([""]);
  const [responsibilities, setResponsibilities] = useState([""]);
  const [jobType, setJobType] = useState("full-time");

  const addRequirement = () => setRequirements([...requirements, ""]);
  const removeRequirement = (index) => setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index, value) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addResponsibility = () => setResponsibilities([...responsibilities, ""]);
  const removeResponsibility = (index) => setResponsibilities(responsibilities.filter((_, i) => i !== index));
  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title")?.toString().trim(),
      type: jobType,
      location: form.get("location")?.toString().trim(),
      salary: form.get("salary")?.toString().trim(),
      deadline: form.get("deadline")?.toString(),
      description: form.get("description")?.toString().trim(),
      requirements: requirements.map((item) => item.trim()).filter(Boolean),
      responsibilities: responsibilities.map((item) => item.trim()).filter(Boolean),
      employerId: currentUser.id,
      company: currentUser.company,
    };

    if (!payload.title || !payload.location || !payload.salary || !payload.deadline || !payload.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!payload.requirements.length || !payload.responsibilities.length) {
      toast.error("Add at least one requirement and one responsibility.");
      return;
    }

    const result = await addJob(payload);
    if (result.ok) {
      toast.success("Job posted successfully!");
      onSuccess();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Post a New Job</h2>
        <p className="text-gray-600">Create a new job posting to attract candidates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the information about the job opening</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input id="title" name="title" placeholder="e.g., Software Engineer" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type *</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" placeholder="e.g., Bangalore, India" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range *</Label>
                <Input id="salary" name="salary" placeholder="e.g., ₹8-12 LPA" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline *</Label>
                <Input id="deadline" name="deadline" type="date" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role, team, and what the candidate will be working on..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Requirements *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              <div className="space-y-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Bachelor's degree in Computer Science"
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      required
                    />
                    {requirements.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeRequirement(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Responsibilities *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addResponsibility}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
              <div className="space-y-2">
                {responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., Design and develop scalable web applications"
                      value={resp}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      required
                    />
                    {responsibilities.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeResponsibility(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">Post Job</Button>
              <Button type="button" variant="outline" className="flex-1">Save as Draft</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { PostJobForm };
