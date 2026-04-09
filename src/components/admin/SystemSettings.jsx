import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Shield, Server, User, Mail } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function SystemSettings() {
  const { currentUser } = usePlacementData();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Settings</h2>
        <p className="text-gray-500 text-sm">Admin profile and system details</p>
      </div>

      {/* Admin Profile */}
      <Card>
        <CardHeader>
          <CardTitle style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <User style={{ width: 18, height: 18, color: "var(--primary)" }} />
            Admin Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--primary)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.25rem", fontWeight: 700, flexShrink: 0,
              }}>
                {(currentUser?.username || currentUser?.email || "A")[0].toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
                  {currentUser?.username || "Admin"}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>
                  System Administrator
                </p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail style={{ width: 15, height: 15, color: "var(--foreground-muted)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", minWidth: 60 }}>Email</span>
                <span style={{ fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                  {currentUser?.email || currentUser?.username || "—"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Shield style={{ width: 15, height: 15, color: "var(--foreground-muted)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", minWidth: 60 }}>Role</span>
                <span style={{
                  fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)",
                  background: "var(--accent)", padding: "2px 10px", borderRadius: 999,
                }}>
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Server style={{ width: 18, height: 18, color: "var(--primary)" }} />
            System Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[
            ["Application", "Placement Management System"],
            ["Backend", "http://localhost:2007"],
            ["Version", "1.0.0"],
          ].map(([key, val], i, arr) => (
            <div key={key} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.65rem 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)" }}>{key}</span>
              <span style={{ fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>{val}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export { SystemSettings };
