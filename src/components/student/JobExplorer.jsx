import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Briefcase, DollarSign, X, FileText } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const btnPrimary = {
  display: "inline-flex", alignItems: "center", gap: 6,
  background: "var(--primary)", color: "#fff", border: "none",
  borderRadius: 8, padding: "8px 16px", fontWeight: 600,
  cursor: "pointer", fontSize: 14,
};
const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  background: "#fff", color: "var(--foreground)",
  border: "1px solid var(--border)", borderRadius: 8,
  padding: "8px 16px", fontWeight: 600, cursor: "pointer",
  fontSize: 14, boxShadow: "none",
};
const btnDisabled = { ...btnPrimary, background: "#93c5fd", cursor: "not-allowed" };

function JobExplorer() {
  const { jobs, applications, currentUser, applyJob } = usePlacementData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = jobs.filter((j) =>
    j.title?.toLowerCase().includes(query.toLowerCase()) ||
    j.description?.toLowerCase().includes(query.toLowerCase())
  );

  const hasApplied = (jobId) =>
    applications.some(
      (a) => Number(a.jobId) === Number(jobId) && Number(a.studentId) === Number(currentUser?.id)
    );

  const handleApply = async () => {
    setLoading(true);
    const result = await applyJob(selected.id);
    setLoading(false);
    if (result.ok) {
      toast.success("Applied successfully!");
      setSelected(null);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Explore Jobs</h2>
        <p className="text-gray-500 text-sm">Browse and apply for available positions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Inline job detail + apply panel */}
      {selected && (
        <Card style={{ border: "2px solid var(--primary)" }}>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <CardTitle style={{ fontSize: 18, marginBottom: 4 }}>{selected.title}</CardTitle>
                <CardDescription style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <DollarSign style={{ width: 14, height: 14 }} />
                  {selected.salary} LPA
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#64748b", boxShadow: "none" }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: 14, color: "#334155", marginBottom: 16, lineHeight: 1.6 }}>
              {selected.description}
            </p>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <FileText style={{ width: 16, height: 16, color: "#2563eb" }} />
              <span style={{ fontSize: 13, color: "#1e40af" }}>Your profile and resume will be submitted with this application.</span>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" style={btnOutline} onClick={() => setSelected(null)}>Cancel</button>
              <button
                type="button"
                style={loading || hasApplied(selected.id) ? btnDisabled : btnPrimary}
                disabled={loading || hasApplied(selected.id)}
                onClick={handleApply}
              >
                {loading ? "Applying..." : hasApplied(selected.id) ? "Already Applied" : "Confirm Apply"}
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-gray-500">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>

      <div className="space-y-3">
        {filtered.map((job) => {
          const applied = hasApplied(job.id);
          return (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      {applied && <Badge className="bg-green-100 text-green-700 text-xs">Applied</Badge>}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {job.salary} LPA
                    </CardDescription>
                  </div>
                  <button
                    type="button"
                    disabled={applied}
                    onClick={() => !applied && setSelected(job)}
                    style={applied
                      ? { ...btnOutline, cursor: "not-allowed", opacity: 0.6 }
                      : btnPrimary
                    }
                  >
                    {applied ? "Applied" : "View & Apply"}
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600"
                  style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {job.description}
                </p>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              <Briefcase className="w-10 h-10 mx-auto mb-3" />
              <p>No jobs found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { JobExplorer };
