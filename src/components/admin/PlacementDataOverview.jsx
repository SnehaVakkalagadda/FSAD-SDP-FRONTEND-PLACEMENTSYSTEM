import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { GraduationCap, Building2, Users, Briefcase } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const DONUT_COLORS = ["#2563eb", "#16a34a", "#9333ea", "#ca8a04"];

function PlacementDataOverview() {
  const { students, employers, officers, jobs } = usePlacementData();

  const stats = [
    { label: "Students", value: students.length, icon: GraduationCap, color: "#2563eb", bg: "#eff6ff" },
    { label: "Employers", value: employers.length, icon: Building2, color: "#16a34a", bg: "#f0fdf4" },
    { label: "Officers", value: officers.length, icon: Users, color: "#9333ea", bg: "#faf5ff" },
    { label: "Jobs Posted", value: jobs.length, icon: Briefcase, color: "#ca8a04", bg: "#fefce8" },
  ];

  const barData = [
    { name: "Students", count: students.length, fill: "#2563eb" },
    { name: "Employers", count: employers.length, fill: "#16a34a" },
    { name: "Officers", count: officers.length, fill: "#9333ea" },
    { name: "Jobs", count: jobs.length, fill: "#ca8a04" },
  ];

  const pieData = stats
    .filter((s) => s.value > 0)
    .map((s) => ({ name: s.label, value: s.value }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", fontSize: 13 }}>
          <p style={{ fontWeight: 600, color: "#1e293b" }}>{payload[0].name}</p>
          <p style={{ color: "#64748b" }}>Count: <strong>{payload[0].value}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Overview</h2>
        <p className="text-gray-500 text-sm">System-wide statistics</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ padding: 10, borderRadius: 10, background: bg, flexShrink: 0 }}>
                  <Icon style={{ width: 20, height: 20, color }} />
                </div>
                <div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Count of each user type in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {barData.every((d) => d.count === 0) ? (
              <p className="text-gray-400 text-sm text-center py-8">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} barSize={40}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Donut chart */}
        <Card>
          <CardHeader>
            <CardTitle>System Composition</CardTitle>
            <CardDescription>Proportion of each user type</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { PlacementDataOverview };
