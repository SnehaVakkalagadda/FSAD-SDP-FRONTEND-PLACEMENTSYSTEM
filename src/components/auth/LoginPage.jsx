import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { GraduationCap, Eye, EyeOff, AlertCircle } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = usePlacementData();
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { value: "student", label: "Student", demoEmail: "rahul.sharma@university.edu" },
    { value: "employer", label: "Employer", demoEmail: "john@techcorp.com" },
    { value: "placement-officer", label: "Placement Officer", demoEmail: "officer@university.edu" },
    { value: "admin", label: "Admin", demoEmail: "admin@university.edu" },
  ];

  const handleRoleSelect = (roleValue) => {
    setSelectedRole(roleValue);
    const role = roles.find((r) => r.value === roleValue);
    if (role) {
      setEmail(role.demoEmail);
      setPassword("demo123");
    }
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role to continue");
      return;
    }
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    const result = await login({ role: selectedRole, email, password });
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-semibold">PlacementHub</span>
          </div>
          <h1 className="text-4xl mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Select Your Role</Label>
                  <Select value={selectedRole} onValueChange={handleRoleSelect}>
                    <SelectTrigger id="role" className="mt-1">
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={!selectedRole}>
                {selectedRole
                  ? `Sign in as ${roles.find((r) => r.value === selectedRole)?.label}`
                  : "Sign in"}
              </Button>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 text-center">
                  <strong>Demo Mode:</strong> Select a role to auto-fill credentials and explore the system
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help accessing your account? Contact{" "}
            <a href="mailto:support@placementhub.edu" className="text-blue-600 hover:underline">
              support@placementhub.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
