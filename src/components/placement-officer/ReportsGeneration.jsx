import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { usePlacementData } from "../../context/PlacementDataContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";

const STATUS_COLORS = {
  Applied: { badge: "bg-yellow-100 text-yellow-800", chart: "#ca8a04" },
  Reviewing: { badge: "bg-blue-100 text-blue-800", chart: "#2563eb" },
  Shortlisted: { badge: "bg-purple-100 text-purple-800", chart: "#9333ea" },
  Accepted: { badge: "bg-green-100 text-green-800", chart: "#16a34a" },
  Rejected: { badge: "bg-red-100 text-red-800", chart: "#dc2626" },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", fontSize: 13 }}>
        <p style={{ fontWeight: 600, color: "#1e293b" }}>{payload[0].name || payload[0].payload?.name}</p>
        <p style={{ color: "#64748b" }}>Count: <strong>{payload[0].value}</strong></p>
      </div>
    );
  }
  return null;
};

function ReportsGeneration() {
  const { applications, jobs } = usePlacementData();

  const counts = Object.fromEntries(
    Object.keys(STATUS_COLORS).map((s) => [
      s,
      applications.filter((a) => a.status?.toLowerCase() === s.toLowerCase()).length,
    ])
  );

  const statusChartData = Object.entries(counts).map(([name, value]) => ({
    name, value, fill: STATUS_COLORS[name].chart,
  }));

  const jobChartData = jobs.map((job) => ({
    name: job.title.length > 14 ? job.title.slice(0, 14) + "…" : job.title,
    fullName: job.title,
    applications: applications.filter((a) => Number(a.jobId) === Number(job.id)).length,
  }));

  const placementRate = applications.length > 0
    ? Math.round((counts.Accepted / applications.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Reports</h2>
        <p className="text-gray-500 text-sm">Application analytics and status breakdown</p>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(counts).map(([status, count]) => (
          <Card key={status}>
            <CardContent className="pt-5">
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: STATUS_COLORS[status].chart, lineHeight: 1, marginBottom: 8 }}>
                {count}
              </div>
              <Badge className={STATUS_COLORS[status].badge}>{status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placement rate */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Rate</CardTitle>
          <CardDescription>{counts.Accepted} accepted out of {applications.length} total applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 999, height: 12, overflow: "hidden" }}>
              <div style={{
                width: `${placementRate}%`, background: "linear-gradient(90deg, #2563eb, #16a34a)",
                height: "100%", borderRadius: 999, transition: "width 0.6s ease",
              }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#2563eb", minWidth: 52 }}>
              {placementRate}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Status donut chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Breakdown of all application statuses</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No applications yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusChartData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusChartData.filter((d) => d.value > 0).map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Applications per job bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>Applications per Job</CardTitle>
            <CardDescription>How many students applied for each job</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">No jobs available</p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={jobChartData} barSize={32} layout="vertical">
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        return (
                          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", fontSize: 13 }}>
                            <p style={{ fontWeight: 600, color: "#1e293b" }}>{payload[0].payload.fullName}</p>
                            <p style={{ color: "#64748b" }}>Applications: <strong>{payload[0].value}</strong></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="applications" radius={[0, 6, 6, 0]} fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { ReportsGeneration };
