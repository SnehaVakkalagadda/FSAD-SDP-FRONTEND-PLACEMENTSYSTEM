import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { GraduationCap, Building2, Eye, EyeOff } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

function SignupPage() {
  const navigate = useNavigate();
  const { studentRegister, employerRegister } = usePlacementData();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // Student fields: name, email, password, branch, cgpa, year, username, collegeName, contact
  const [sf, setSf] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    branch: "", cgpa: "", year: "",
    username: "", collegeName: "", contact: "",
  });

  // Employer fields: companyName, email, password
  const [ef, setEf] = useState({
    companyName: "", email: "", password: "", confirmPassword: "",
    username: "", contact: "", companyMail: "", location: "",
  });

  const s = (k) => (e) => setSf({ ...sf, [k]: e.target.value });
  const em = (k) => (e) => setEf({ ...ef, [k]: e.target.value });

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (sf.password !== sf.confirmPassword) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    const result = await studentRegister(sf);
    setLoading(false);
    if (result.ok) { toast.success("Registered! Please login."); navigate("/login"); }
    else toast.error(result.message);
  };

  const handleEmployerSubmit = async (e) => {
    e.preventDefault();
    if (ef.password !== ef.confirmPassword) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    const result = await employerRegister(ef);
    setLoading(false);
    if (result.ok) { toast.success("Registered! Please login."); navigate("/login"); }
    else toast.error(result.message);
  };

  const btnStyle = (active, color) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 16px", borderRadius: 10, cursor: "pointer",
    border: `2px solid ${active ? color : "#e2e8f0"}`,
    background: active ? (color === "#2563eb" ? "#eff6ff" : "#f0fdf4") : "#fff",
    width: "100%", textAlign: "left",
    boxShadow: "none", color: "var(--foreground)",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <GraduationCap className="w-9 h-9 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">PlacementHub</span>
          </div>
          <p className="text-gray-500">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Students and employers can register here</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role toggle */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button type="button" onClick={() => setRole("student")} style={btnStyle(role === "student", "#2563eb")}>
                <GraduationCap style={{ width: 20, height: 20, color: "#2563eb", flexShrink: 0 }} />
                <span style={{ fontWeight: 500, fontSize: 14 }}>Student</span>
              </button>
              <button type="button" onClick={() => setRole("employer")} style={btnStyle(role === "employer", "#16a34a")}>
                <Building2 style={{ width: 20, height: 20, color: "#16a34a", flexShrink: 0 }} />
                <span style={{ fontWeight: 500, fontSize: 14 }}>Employer</span>
              </button>
            </div>

            {/* Student form */}
            {role === "student" && (
              <form onSubmit={handleStudentSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Full Name *</Label>
                    <Input placeholder="e.g. Rahul Sharma" required value={sf.name} onChange={s("name")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Username *</Label>
                    <Input placeholder="e.g. rahul123" required value={sf.username} onChange={s("username")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@email.com" required value={sf.email} onChange={s("email")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Contact *</Label>
                    <Input placeholder="e.g. 9876543210" required value={sf.contact} onChange={s("contact")} />
                  </div>
                  <div className="space-y-1">
                    <Label>College Name *</Label>
                    <Input placeholder="e.g. KLEF University" required value={sf.collegeName} onChange={s("collegeName")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Branch *</Label>
                    <Input placeholder="e.g. Computer Science" required value={sf.branch} onChange={s("branch")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Year *</Label>
                    <Input type="number" min="1" max="5" placeholder="e.g. 2" required value={sf.year} onChange={s("year")} />
                  </div>
                  <div className="space-y-1">
                    <Label>CGPA *</Label>
                    <Input type="number" step="0.01" min="0" max="10" placeholder="e.g. 8.5" required value={sf.cgpa} onChange={s("cgpa")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Password *</Label>
                    <div className="relative">
                      <Input type={showPw ? "text" : "password"} placeholder="Create password" required value={sf.password} onChange={s("password")} />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", boxShadow: "none", padding: 0 }}>
                        {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Confirm Password *</Label>
                    <Input type="password" placeholder="Re-enter password" required value={sf.confirmPassword} onChange={s("confirmPassword")} />
                    {sf.confirmPassword && sf.password !== sf.confirmPassword && (
                      <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#93c5fd" : "var(--primary)", color: "#fff", border: "none", borderRadius: 10, padding: "10px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontSize: 14, marginTop: 4 }}>
                  {loading ? "Registering..." : "Create Student Account"}
                </button>
              </form>
            )}

            {/* Employer form */}
            {role === "employer" && (
              <form onSubmit={handleEmployerSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Company Name *</Label>
                    <Input placeholder="e.g. TechCorp Solutions" required value={ef.companyName} onChange={em("companyName")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="hr@company.com" required value={ef.email} onChange={em("email")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Password *</Label>
                    <div className="relative">
                      <Input type={showPw ? "text" : "password"} placeholder="Create password" required value={ef.password} onChange={em("password")} />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", boxShadow: "none", padding: 0 }}>
                        {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Confirm Password *</Label>
                    <Input type="password" placeholder="Re-enter password" required value={ef.confirmPassword} onChange={em("confirmPassword")} />
                    {ef.confirmPassword && ef.password !== ef.confirmPassword && (
                      <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#93c5fd" : "var(--primary)", color: "#fff", border: "none", borderRadius: 10, padding: "10px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontSize: 14, marginTop: 4 }}>
                  {loading ? "Registering..." : "Create Employer Account"}
                </button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center border-t pt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export { SignupPage };
