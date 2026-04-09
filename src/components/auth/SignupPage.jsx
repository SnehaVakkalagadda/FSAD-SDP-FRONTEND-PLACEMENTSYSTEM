import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
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

  // Student fields: name, email, password, branch, resume, cgpa, year
  const [sf, setSf] = useState({ name: "", email: "", password: "", confirmPassword: "", branch: "", resume: "", cgpa: "", year: "" });
  // Employer fields: companyName, email, password
  const [ef, setEf] = useState({ companyName: "", email: "", password: "", confirmPassword: "" });

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
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg transition-all ${role === "student" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-sm">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg transition-all ${role === "employer" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <Building2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-sm">Employer</span>
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
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@email.com" required value={sf.email} onChange={s("email")} />
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
                    <Label>Resume filename *</Label>
                    <Input placeholder="e.g. resume.pdf" required value={sf.resume} onChange={s("resume")} />
                  </div>
                  <div className="space-y-1">
                    <Label>Password *</Label>
                    <div className="relative">
                      <Input type={showPw ? "text" : "password"} placeholder="Create password" required value={sf.password} onChange={s("password")} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                <Button type="submit" className="w-full mt-2" disabled={loading}>
                  {loading ? "Registering..." : "Create Student Account"}
                </Button>
              </form>
            )}

            {/* Employer form */}
            {role === "employer" && (
              <form onSubmit={handleEmployerSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label>Company Name *</Label>
                  <Input placeholder="e.g. TechCorp Solutions" required value={ef.companyName} onChange={em("companyName")} />
                </div>
                <div className="space-y-1">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="hr@company.com" required value={ef.email} onChange={em("email")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Password *</Label>
                    <div className="relative">
                      <Input type={showPw ? "text" : "password"} placeholder="Create password" required value={ef.password} onChange={em("password")} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                <Button type="submit" className="w-full mt-2" disabled={loading}>
                  {loading ? "Registering..." : "Create Employer Account"}
                </Button>
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
