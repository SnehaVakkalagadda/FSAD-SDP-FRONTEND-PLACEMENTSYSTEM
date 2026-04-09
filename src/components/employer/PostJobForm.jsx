import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

function PostJobForm({ onSuccess }) {
  const { postJob } = usePlacementData();
  const [form, setForm] = useState({ title: "", description: "", salary: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await postJob(form);
    setLoading(false);
    if (result.ok) {
      toast.success("Job posted successfully!");
      setForm({ title: "", description: "", salary: "" });
      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Post a Job</h2>
        <p className="text-gray-500 text-sm">Create a new job opening for students</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fields: title, description, salary</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>Job Title *</Label>
              <Input placeholder="e.g. Software Engineer" required value={form.title} onChange={set("title")} />
            </div>
            <div className="space-y-1">
              <Label>Salary (LPA) *</Label>
              <Input type="number" step="0.1" min="0" placeholder="e.g. 8.5" required value={form.salary} onChange={set("salary")} />
            </div>
            <div className="space-y-1">
              <Label>Description *</Label>
              <Textarea rows={4} placeholder="Describe the role and requirements..." required value={form.description} onChange={set("description")} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { PostJobForm };
