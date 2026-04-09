import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Trash2, UserPlus, Search, X } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

function UserManagement() {
  const { students, employers, officers, deleteStudent, deleteEmployer, deleteOfficer, addOfficer } = usePlacementData();
  const [tab, setTab] = useState("students");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const q = search.toLowerCase();
  const filteredStudents = students.filter((s) => s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q));
  const filteredEmployers = employers.filter((e) => e.companyName?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q));
  const filteredOfficers = officers.filter((o) => o.name?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q));

  const handleDelete = async (type, id) => {
    const fns = { students: deleteStudent, employers: deleteEmployer, officers: deleteOfficer };
    const result = await fns[type](id);
    if (result.ok) toast.success("Deleted successfully");
    else toast.error(result.message);
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    const result = await addOfficer(form);
    setLoading(false);
    if (result.ok) {
      toast.success(result.message || "Officer added successfully!");
      setForm({ name: "", email: "", password: "" });
      setShowForm(false);
      setTab("officers");
    } else {
      toast.error(result.message || "Failed to add officer");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">User Management</h2>
          <p className="text-gray-500 text-sm">View and manage all registered users</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <UserPlus style={{ width: 16, height: 16 }} />
          {showForm ? "Cancel" : "Add Officer"}
        </button>
      </div>

      {/* Inline Add Officer Form — no Dialog/Portal */}
      {showForm && (
        <Card style={{ border: "2px solid var(--primary)" }}>
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CardTitle>Add Placement Officer</CardTitle>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm({ name: "", email: "", password: "" }); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#64748b", boxShadow: "none" }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <CardDescription>Fill in the details to create a new placement officer account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOfficer}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="officer-name">Full Name *</Label>
                  <Input
                    id="officer-name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Mehta"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="officer-email">Email *</Label>
                  <Input
                    id="officer-email"
                    type="email"
                    required
                    placeholder="officer@university.edu"
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="officer-password">Password *</Label>
                  <Input
                    id="officer-password"
                    type="password"
                    required
                    placeholder="Set a password"
                    value={form.password}
                    onChange={set("password")}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm({ name: "", email: "", password: "" }); }}
                  style={{
                    background: "#fff",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                    boxShadow: "none",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "#93c5fd" : "var(--primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                  }}
                >
                  {loading ? "Adding..." : "Add Officer"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={tab} onValueChange={(v) => { setTab(v); setSearch(""); }}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
          <TabsTrigger value="employers">Employers ({employers.length})</TabsTrigger>
          <TabsTrigger value="officers">Officers ({officers.length})</TabsTrigger>
        </TabsList>

        {/* Students */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
              <CardDescription>All registered students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.id}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.branch}</TableCell>
                      <TableCell>{s.cgpa}</TableCell>
                      <TableCell>{s.year}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete("students", s.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-gray-400">No students found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employers */}
        <TabsContent value="employers">
          <Card>
            <CardHeader>
              <CardTitle>Employers ({filteredEmployers.length})</CardTitle>
              <CardDescription>All registered employers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployers.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.id}</TableCell>
                      <TableCell>{e.companyName}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete("employers", e.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEmployers.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-400">No employers found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Officers */}
        <TabsContent value="officers">
          <Card>
            <CardHeader>
              <CardTitle>Placement Officers ({filteredOfficers.length})</CardTitle>
              <CardDescription>Officers added by admin</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOfficers.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.name}</TableCell>
                      <TableCell>{o.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete("officers", o.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOfficers.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-400">No officers found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { UserManagement };
