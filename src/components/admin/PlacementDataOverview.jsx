import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Users, Briefcase, Building2, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { usePlacementData } from "../../context/PlacementDataContext";
function PlacementDataOverview() {
  const { stats, jobs, applications, students, employers } = usePlacementData();
  const placementRate = stats.totalStudents ? stats.placedStudents / stats.totalStudents * 100 : 0;
  const recentJobs = jobs.slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "Placement Data Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "System-wide placement statistics and metrics" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Total Students" }),
          /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: stats.totalStudents }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Registered in the system" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Placed Students" }),
          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl text-green-600", children: stats.placedStudents }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            placementRate.toFixed(1),
            "% placement rate"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Total Jobs" }),
          /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: stats.totalJobs }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            stats.activeJobs,
            " currently active"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Companies" }),
          /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: stats.companiesRegistered }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Registered companies" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Applications" }),
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: stats.totalApplications }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total applications submitted" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Avg. Applications/Job" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: (stats.totalApplications / Math.max(stats.totalJobs, 1)).toFixed(1) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Applications per job posting" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Placement Progress" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Current year placement statistics" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Overall Placement Rate" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
              placementRate.toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: placementRate, className: "h-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Students Placed" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.placedStudents })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Students Pending" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.totalStudents - stats.placedStudents })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Active Opportunities" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.activeJobs })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Recent Job Postings" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Latest jobs added to the system" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recentJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between border-b pb-3 last:border-0", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: job.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: job.company })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
            job.applicantsCount,
            " apps"
          ] })
        ] }, job.id)) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "User Statistics" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Breakdown of system users" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Students" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: students.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-green-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Employers" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: employers.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-purple-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Active Jobs" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: stats.activeJobs })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-orange-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Pending Applications" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: applications.filter((a) => a.status === "pending").length })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  PlacementDataOverview
};
