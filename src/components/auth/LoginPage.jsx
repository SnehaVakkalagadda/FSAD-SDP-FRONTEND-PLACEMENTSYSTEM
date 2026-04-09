import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const ROLES = [
  { value: "student", label: "Student" },
  { value: "employer", label: "Employer" },
  { value: "placement-officer", label: "Placement Officer" },
  { value: "admin", label: "Admin" },
];

const ROLE_ROUTES = {
  student: "/student",
  employer: "/employer",
  "placement-officer": "/officer",
  admin: "/admin",
};

function LoginPage() {
  const navigate = useNavigate();
  const { login } = usePlacementData();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) { toast.error("Select a role"); return; }
    setLoading(true);
    const result = await login({ role, email, password });
    setLoading(false);
    if (result.ok) {
      navigate(ROLE_ROUTES[role]);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <GraduationCap className="w-9 h-9 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">PlacementHub</span>
          </div>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Role</Label>
                <Select value={role} onValueChange={(v) => { setRole(v); setEmail(""); setPassword(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!role || loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t pt-4">
            <p className="text-sm text-gray-500">
              New student or employer?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export { LoginPage };
