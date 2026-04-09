import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";

const ROLE_ROUTES = {
  student: "/student",
  employer: "/employer",
  "placement-officer": "/officer",
  admin: "/admin",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
  padding: "2rem",
  width: "100%",
  maxWidth: 420,
};

const labelStyle = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#1e293b",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "0.55rem 0.75rem",
  fontSize: "0.9rem",
  border: "1.5px solid #e2e8f0",
  borderRadius: 10,
  outline: "none",
  color: "#1e293b",
  background: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "auto",
};

const btnStyle = (disabled) => ({
  width: "100%",
  padding: "0.65rem",
  background: disabled ? "#93c5fd" : "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  fontSize: "0.9375rem",
  cursor: disabled ? "not-allowed" : "pointer",
  marginTop: 8,
  transition: "background 0.15s",
});

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
    if (!role) { toast.error("Please select a role"); return; }
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
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "1rem",
      background: "linear-gradient(135deg, #eff6ff 0%, #fff 50%, #eef2ff 100%)",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <GraduationCap style={{ width: 36, height: 36, color: "#2563eb" }} />
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>PlacementHub</span>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Sign in to your account</p>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Sign In</h2>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.5rem" }}>Choose your role and enter credentials</p>

          <form onSubmit={handleSubmit}>
            {/* Role */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Role</label>
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setEmail(""); setPassword(""); }}
                style={selectStyle}
                required
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="employer">Employer</option>
                <option value="placement-officer">Placement Officer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "2.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute", right: 10, top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", padding: 0,
                    color: "#94a3b8", boxShadow: "none",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={!role || loading} style={btnStyle(!role || loading)}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              New student or employer?{" "}
              <Link to="/signup" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
