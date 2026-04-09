import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, TrendingUp, Users, Briefcase, CheckCircle2 } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function PlacementRecords() {
  const { applications, jobs, students } = usePlacementData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const placedApplications = applications.filter((app) => app.status === "accepted");

  const filteredRecords = placedApplications.filter((app) =>
    app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.studentEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getJobDetails = (jobId) => jobs.find((j) => j.id === jobId);

  const placementRate = students.length
    ? (placedApplications.length / students.length) * 100
    : 0;

  const averageCGPA =
    placedApplications.reduce((sum, app) => sum + (app.studentCGPA || 0), 0) /
      (placedApplications.length || 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Placement Records</h2>
        <p className="text-gray-600">Track and monitor student placement records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Placements</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{placedApplications.length}</div>
            <p className="text-xs text-muted-foreground">Students placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Placement Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">{placementRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Of total students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg. Student CGPA</CardTitle>
            <Users className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-600">{averageCGPA.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Placed students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Unique Companies</CardTitle>
            <Briefcase className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-600">
              {new Set(placedApplications.map((app) => getJobDetails(app.jobId)?.company)).size}
            </div>
            <p className="text-xs text-muted-foreground">Hiring companies</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by student name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="recent">Recent (30 days)</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Placement Records</CardTitle>
          <CardDescription>
            Showing {filteredRecords.length} placement record{filteredRecords.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Placement Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const job = getJobDetails(record.jobId);
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm">{record.studentName}</p>
                        <p className="text-xs text-gray-500">{record.studentEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{record.studentDepartment}</TableCell>
                    <TableCell>
                      <Badge variant={record.studentCGPA >= 8 ? "default" : "secondary"}>
                        {record.studentCGPA?.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>{job?.company}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{new Date(record.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Placed</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">No placement records found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { PlacementRecords };
