import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap, Building2, Users, FileText } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PlacementDataOverview() {
  const { students, employers, officers } = usePlacementData();

  const stats = [
    { label: "Total Students", value: students.length, icon: GraduationCap, color: "text-blue-600" },
    { label: "Total Employers", value: employers.length, icon: Building2, color: "text-green-600" },
    { label: "Placement Officers", value: officers.length, icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Overview</h2>
        <p className="text-gray-500 text-sm">System-wide user statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-500">{label}</CardTitle>
              <Icon className={`w-5 h-5 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-semibold ${color}`}>{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { PlacementDataOverview };
