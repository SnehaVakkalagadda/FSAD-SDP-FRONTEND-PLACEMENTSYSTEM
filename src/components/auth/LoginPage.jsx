import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { GraduationCap, Eye, EyeOff, Mail } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";
import API from "../../services/api";

const ROLE_ROUTES = {
  student: "/student",
  employer: "/employer",
  "placement-officer": "/officer",
  admin: "/admin",
};

const ROLE_MAP = {
  student: "STUDENT",
  employer: "EMPLOYER",
  "placement-officer": "PLACEMENT OFFICER",
  admin: "ADMIN",
};

const wrap = {
  minHeight: "100vh", display: "flex", alignItems: "center",
  justifyContent: "center", padding: "1rem",
  background: "linear-gradient(135deg, #eff6ff 0%, #fff 50%, #eef2ff 100%)",
};

const card = {
  background: "#fff", border: "1px solid #e2e8f0",
  borderRadius: 14, boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
  padding: "2rem", width: "100%", maxWidth: 420,
};

const lbl = {
  display: "block", fontSize: "0.8125rem",
  fontWeight: 500, color: "#1e293b", marginBottom: 6,
};

const inp = {
  width: "100%", padding: "0.55rem 0.75rem", fontSize: "0.9rem",
  border: "1.5px solid #e2e8f0", borderRadius: 10, outline: "none",
  color: "#1e293b", background: "#fff", boxSizing: "border-box",
};

const btn = (disabled) => ({
  width: "100%", padding: "0.65rem",
  background: disabled ? "#93c5fd" : "#2563eb",
  color: "#fff", border: "none", borderRadius: 10,
  fontWeight: 600, fontSize: "0.9375rem",
  cursor: disabled ? "not-allowed" : "pointer", marginTop: 8,
});

function LoginPage() {
  const navigate = useNavigate();
  const { persistLogin } = usePlacementData();

  // Step 1 state
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [step1Loading, setStep1Loading] = useState(false);

  // Step 2 state
  const [step, setStep] = useState(1); // 1 = credentials, 2 = OTP
  const [otp, setOtp] = useState("");
  const [step2Loading, setStep2Loading] = useState(false);

  // Step 1 — send credentials, get OTP sent to email
  const handleCredentials = async (e) => {
    e.preventDefault();
    if (!role) { toast.error("Please select a role"); return; }
    setStep1Loading(true);
    try {
      const res = await API.post("/auth/login", {
        login: email,
        password: password,
        role: ROLE_MAP[role],
      });
      // Response is "OTP Sent to Email"
      if (typeof res.data === "string" && res.data.toLowerCase().includes("otp")) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error("Unexpected response. Try again.");
      }
    } catch (e) {
      const status = e.response?.status;
      const data = e.response?.data;
      if (status === 401) toast.error("Invalid credentials");
      else if (status === 403) toast.error("Invalid role selected");
      else toast.error(typeof data === "string" ? data : "Server error. Try again.");
    }
    setStep1Loading(false);
  };

  // Step 2 — verify OTP, get JWT token + user
  const handleOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) { toast.error("Enter the OTP"); return; }
    setStep2Loading(true);
    try {
      const res = await API.post(`/user/verify-otp?username=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
      // Response: { token, user }
      const { token, user } = res.data;
      persistLogin(user, role, token);
      toast.success("Login successful!");
      navigate(ROLE_ROUTES[role]);
    } catch (e) {
      const data = e.response?.data;
      toast.error(typeof data === "string" ? data : "Invalid OTP. Try again.");
    }
    setStep2Loading(false);
  };

  const handleResendOtp = async () => {
    try {
      await API.post("/auth/login", {
        login: email, password, role: ROLE_MAP[role],
      });
      toast.success("OTP resent!");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div style={wrap}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <GraduationCap style={{ width: 36, height: 36, color: "#2563eb" }} />
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>PlacementHub</span>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Sign in to your account</p>
        </div>

        <div style={card}>
          {/* ── Step 1: Credentials ── */}
          {step === 1 && (
            <>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Sign In</h2>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.5rem" }}>Enter your credentials to receive an OTP</p>

              <form onSubmit={handleCredentials}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={lbl}>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} style={inp} required>
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="employer">Employer</option>
                    <option value="placement-officer">Placement Officer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={lbl}>Email</label>
                  <input type="email" placeholder="your@email.com" required value={email}
                    onChange={(e) => setEmail(e.target.value)} style={inp} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={lbl}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} placeholder="Enter password"
                      required value={password} onChange={(e) => setPassword(e.target.value)}
                      style={{ ...inp, paddingRight: "2.5rem" }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#94a3b8", boxShadow: "none", display: "flex" }}>
                      {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={!role || step1Loading} style={btn(!role || step1Loading)}>
                  {step1Loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {/* ── Step 2: OTP Verification ── */}
          {step === 2 && (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Mail style={{ width: 26, height: 26, color: "#2563eb" }} />
                </div>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Check your email</h2>
                <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  We sent a 6-digit OTP to<br />
                  <strong style={{ color: "#1e293b" }}>{email}</strong>
                </p>
              </div>

              <form onSubmit={handleOtp}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={lbl}>Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    style={{ ...inp, textAlign: "center", fontSize: "1.25rem", letterSpacing: "0.3em", fontWeight: 600 }}
                    autoFocus
                  />
                </div>

                <button type="submit" disabled={otp.length !== 6 || step2Loading} style={btn(otp.length !== 6 || step2Loading)}>
                  {step2Loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button type="button" onClick={handleResendOtp}
                  style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, boxShadow: "none" }}>
                  Resend OTP
                </button>
                <span style={{ color: "#94a3b8", margin: "0 8px" }}>·</span>
                <button type="button" onClick={() => { setStep(1); setOtp(""); }}
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.875rem", boxShadow: "none" }}>
                  Back
                </button>
              </div>
            </>
          )}

          <div style={{ textAlign: "center", marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              New student or employer?{" "}
              <Link to="/signup" style={{ color: "#2563eb", fontWeight: 600 }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
