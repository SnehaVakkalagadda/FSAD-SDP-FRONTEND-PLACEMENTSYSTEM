import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Edit, X } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const btnPrimary = {
  background: "var(--primary)", color: "#fff", border: "none",
  borderRadius: 8, padding: "8px 20px", fontWeight: 600,
  cursor: "pointer", fontSize: 14,
};
const btnOutline = {
  background: "#fff", color: "var(--foreground)",
  border: "1px solid var(--border)", borderRadius: 8,
  padding: "8px 16px", fontWeight: 600, cursor: "pointer",
  fontSize: 14, boxShadow: "none",
};

function StudentProfile() {
  const { currentUser, updateStudentProfile } = usePlacementData();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: "",
    branch: currentUser?.branch || "",
    resume: currentUser?.resume || "",
    cgpa: currentUser?.cgpa || "",
    year: currentUser?.year || "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openEdit = () => {
    setForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      password: "",
      branch: currentUser?.branch || "",
      resume: currentUser?.resume || "",
      cgpa: currentUser?.cgpa || "",
      year: currentUser?.year || "",
    });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateStudentProfile(form);
    setLoading(false);
    if (result.ok) {
      toast.success("Profile updated!");
      setEditing(false);
    } else {
      toast.error(result.message);
    }
  };

  const fields = [
    { label: "Full Name", value: currentUser?.name },
    { label: "Email", value: currentUser?.email },
    { label: "Branch", value: currentUser?.branch },
    { label: "Year", value: currentUser?.year ? `Year ${currentUser.year}` : "—" },
    { label: "CGPA", value: currentUser?.cgpa },
    { label: "Resume", value: currentUser?.resume },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">My Profile</h2>
          <p className="text-gray-500 text-sm">Your registered information</p>
        </div>
        <button type="button" onClick={openEdit} style={btnPrimary}>
          <Edit style={{ width: 14, height: 14, display: "inline", marginRight: 6 }} />
          Edit Profile
        </button>
      </div>

      {/* Profile info card */}
      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-gray-900">{value || "—"}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inline edit form — no Dialog/Portal */}
      {editing && (
        <Card style={{ border: "2px solid var(--primary)" }}>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CardTitle>Edit Profile</CardTitle>
              <button
                type="button"
                onClick={() => setEditing(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#64748b", boxShadow: "none" }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave}>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="p-name">Full Name *</Label>
                    <Input id="p-name" required value={form.name} onChange={set("name")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p-email">Email *</Label>
                    <Input id="p-email" type="email" required value={form.email} onChange={set("email")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p-branch">Branch *</Label>
                    <Input id="p-branch" required value={form.branch} onChange={set("branch")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p-year">Year *</Label>
                    <Input id="p-year" type="number" min="1" max="5" required value={form.year} onChange={set("year")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p-cgpa">CGPA *</Label>
                    <Input id="p-cgpa" type="number" step="0.01" min="0" max="10" required value={form.cgpa} onChange={set("cgpa")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="p-resume">Resume filename *</Label>
                    <Input id="p-resume" required value={form.resume} onChange={set("resume")} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="p-password">New Password (leave blank to keep current)</Label>
                  <Input id="p-password" type="password" placeholder="Enter new password" value={form.password} onChange={set("password")} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
                <button type="button" style={btnOutline} onClick={() => setEditing(false)}>Cancel</button>
                <button
                  type="submit"
                  disabled={loading}
                  style={loading ? { ...btnPrimary, background: "#93c5fd", cursor: "not-allowed" } : btnPrimary}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { StudentProfile };
