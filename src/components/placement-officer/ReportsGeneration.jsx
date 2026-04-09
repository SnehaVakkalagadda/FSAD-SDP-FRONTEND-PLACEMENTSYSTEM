import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { usePlacementData } from "../../context/PlacementDataContext";
function ReportsGeneration() {
  const { applications, jobs, stats } = usePlacementData();
  const handleDownloadReport = (reportType) => {
    toast.success(`${reportType} report downloaded successfully`);
  };
  const departmentData = [
    { name: "Computer Science", placements: 45, applications: 120 },
    { name: "Information Technology", placements: 38, applications: 95 },
    { name: "Electronics", placements: 28, applications: 75 },
    { name: "Mechanical", placements: 22, applications: 68 },
    { name: "Civil", placements: 18, applications: 52 }
  ];
  const jobTypeData = [
    { name: "Full-time", value: jobs.filter((j) => j.type === "full-time").length },
    { name: "Internship", value: jobs.filter((j) => j.type === "internship").length },
    { name: "Part-time", value: jobs.filter((j) => j.type === "part-time").length },
    { name: "Contract", value: jobs.filter((j) => j.type === "contract").length }
  ];
  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];
  const statusData = [
    { name: "Pending", count: applications.filter((a) => a.status === "pending").length },
    { name: "Reviewing", count: applications.filter((a) => a.status === "reviewing").length },
    { name: "Shortlisted", count: applications.filter((a) => a.status === "shortlisted").length },
    { name: "Accepted", count: applications.filter((a) => a.status === "accepted").length },
    { name: "Rejected", count: applications.filter((a) => a.status === "rejected").length }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "Reports & Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Generate comprehensive placement reports and analytics" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-600" }),
            "Placement Summary Report"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Overall placement statistics" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Button, { className: "w-full", onClick: () => handleDownloadReport("Placement Summary"), children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download PDF"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }),
            "Department-wise Analysis"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Placement by department" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Button, { className: "w-full", onClick: () => handleDownloadReport("Department Analysis"), children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download Excel"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-purple-600" }),
            "Company-wise Report"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Hiring company details" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Button, { className: "w-full", onClick: () => handleDownloadReport("Company Report"), children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download PDF"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Custom Report Generator" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Generate customized reports based on your requirements" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Report Type" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "summary", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "summary", children: "Placement Summary" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "department", children: "Department-wise" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "company", children: "Company-wise" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "student", children: "Student-wise" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "timeline", children: "Timeline Analysis" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Time Period" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "current", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "current", children: "Current Year" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "last30", children: "Last 30 Days" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "last90", children: "Last 90 Days" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "custom", children: "Custom Range" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Format" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: "pdf", children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "pdf", children: "PDF" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "excel", children: "Excel" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "csv", children: "CSV" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { className: "w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Generate Report"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Department-wise Placement Analysis" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Placements vs Applications by Department" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: departmentData, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "name" }),
        /* @__PURE__ */ jsx(YAxis, {}),
        /* @__PURE__ */ jsx(Tooltip, {}),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Bar, { dataKey: "placements", fill: "#3b82f6", name: "Placements" }),
        /* @__PURE__ */ jsx(Bar, { dataKey: "applications", fill: "#e5e7eb", name: "Applications" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Job Type Distribution" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Distribution of job types posted" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: jobTypeData,
              cx: "50%",
              cy: "50%",
              labelLine: false,
              label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`,
              outerRadius: 80,
              fill: "#8884d8",
              dataKey: "value",
              children: jobTypeData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
            }
          ),
          /* @__PURE__ */ jsx(Tooltip, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Application Status Overview" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Current status of all applications" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(BarChart, { data: statusData, layout: "vertical", children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(XAxis, { type: "number" }),
          /* @__PURE__ */ jsx(YAxis, { dataKey: "name", type: "category", width: 100 }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Bar, { dataKey: "count", fill: "#8b5cf6" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Key Insights" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Important metrics and trends" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 mb-1", children: "Placement Rate" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl text-blue-900", children: [
            (stats.placedStudents / Math.max(stats.totalStudents, 1) * 100).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 mb-1", children: "Active Jobs" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl text-green-900", children: stats.activeJobs })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-purple-600 mb-1", children: "Total Companies" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl text-purple-900", children: stats.companiesRegistered })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-orange-600 mb-1", children: "Avg. Apps/Job" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl text-orange-900", children: (stats.totalApplications / Math.max(stats.totalJobs, 1)).toFixed(1) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ReportsGeneration
};
