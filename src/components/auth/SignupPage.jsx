import { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { GraduationCap, Building2, Users, Shield, Eye, EyeOff, Check } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = usePlacementData();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    studentId: "",
    department: "",
    phone: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (value) => {
    setFormData({ ...formData, password: value });
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[^a-zA-Z0-9]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const result = await signup({ role: selectedRole, formData });
    if (!result.ok) return;

    navigate("/login");
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-semibold">PlacementHub</span>
          </Link>
          <h1 className="text-4xl mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our placement management system today</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Choose your role and fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label className="mb-3 block">I am a:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("student")}
                    className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${selectedRole === "student" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 p-2 rounded-lg text-white">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Student</div>
                        <p className="text-sm text-gray-600">Looking for placements</p>
                      </div>
                      {selectedRole === "student" && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("employer")}
                    className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${selectedRole === "employer" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-lg text-white">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Employer</div>
                        <p className="text-sm text-gray-600">Hiring candidates</p>
                      </div>
                      {selectedRole === "employer" && <Check className="w-5 h-5 text-green-600 ml-auto" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("placement-officer")}
                    className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${selectedRole === "placement-officer" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500 p-2 rounded-lg text-white">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Placement Officer</div>
                        <p className="text-sm text-gray-600">Track placements</p>
                      </div>
                      {selectedRole === "placement-officer" && <Check className="w-5 h-5 text-purple-600 ml-auto" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("admin")}
                    className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${selectedRole === "admin" ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500 p-2 rounded-lg text-white">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Admin</div>
                        <p className="text-sm text-gray-600">Manage system</p>
                      </div>
                      {selectedRole === "admin" && <Check className="w-5 h-5 text-red-600 ml-auto" />}
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={selectedRole === "student" ? "your.email@university.edu" : "your.email@company.com"}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {selectedRole === "student" && (
                  <Fragment>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentId">Student ID *</Label>
                        <Input
                          id="studentId"
                          type="text"
                          placeholder="e.g., STU2024001"
                          required
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Input
                          id="department"
                          type="text"
                          placeholder="e.g., Computer Science"
                          required
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}

                {selectedRole === "employer" && (
                  <div>
                    <Label htmlFor="organization">Organization Name *</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Enter your company name"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                )}

                {(selectedRole === "placement-officer" || selectedRole === "admin") && (
                  <div>
                    <Label htmlFor="organization">Institution Name *</Label>
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Enter your institution name"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
                      </div>
                      <p className="text-xs text-gray-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" required className="mt-1" />
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">Create Account</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Contact{" "}
            <a href="mailto:support@placementhub.edu" className="text-blue-600 hover:underline">
              support@placementhub.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export { SignupPage };
