import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MapPin, Building2, DollarSign, Calendar, Users, Search } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";

function JobExplorer() {
  const navigate = useNavigate();
  const { jobs } = usePlacementData();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-green-100 text-green-800";
      case "internship": return "bg-purple-100 text-purple-800";
      case "contract": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Explore Job Opportunities</h2>
        <p className="text-gray-600">Find and apply for positions that match your skills</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by job title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
        </p>

        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge className={getTypeColor(job.type)}>{job.type.replace("-", " ")}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </CardDescription>
                </div>
                <Button onClick={() => navigate(`/job/${job.id}`)}>View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />{job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />{job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />{job.applicantsCount || 0} applicants
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
            </CardContent>
          </Card>
        ))}

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No jobs found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { JobExplorer };
