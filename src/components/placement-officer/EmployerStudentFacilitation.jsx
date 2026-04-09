import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Building2, Users, Mail, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";
import { usePlacementData } from "../../context/PlacementDataContext";
function EmployerStudentFacilitation() {
  const { jobs, applications, employers, students } = usePlacementData();
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    toast.success("Message sent successfully");
    setMessage("");
  };
  const activeJobs = jobs.filter((job) => new Date(job.deadline) > /* @__PURE__ */ new Date());
  const recentApplications = applications.slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "Employer-Student Facilitation" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Coordinate interactions between employers and students" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-blue-600" }),
            "Schedule Employer Visit"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Arrange campus recruitment drives" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Dialog, { children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "w-full", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
            "Schedule Visit"
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Schedule Employer Campus Visit" }),
              /* @__PURE__ */ jsx(DialogDescription, { children: "Coordinate a campus visit for recruitment activities" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Select Company" }),
                /* @__PURE__ */ jsx("select", { className: "w-full p-2 border rounded", children: employers.map((emp) => /* @__PURE__ */ jsx("option", { value: emp.id, children: emp.company }, emp.id)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Visit Date" }),
                /* @__PURE__ */ jsx("input", { type: "date", className: "w-full p-2 border rounded" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Time" }),
                /* @__PURE__ */ jsx("input", { type: "time", className: "w-full p-2 border rounded" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Purpose" }),
                /* @__PURE__ */ jsx(Textarea, { placeholder: "e.g., Pre-placement talk, Technical interview..." })
              ] }),
              /* @__PURE__ */ jsx(Button, { className: "w-full", onClick: () => toast.success("Visit scheduled successfully"), children: "Confirm Schedule" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-green-600" }),
            "Send Broadcast Message"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Communicate with students or employers" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Dialog, { children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "w-full", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 mr-2" }),
            "Compose Message"
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Send Broadcast Message" }),
              /* @__PURE__ */ jsx(DialogDescription, { children: "Send announcements to students or employers" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Recipient Group" }),
                /* @__PURE__ */ jsxs("select", { className: "w-full p-2 border rounded", children: [
                  /* @__PURE__ */ jsx("option", { children: "All Students" }),
                  /* @__PURE__ */ jsx("option", { children: "All Employers" }),
                  /* @__PURE__ */ jsx("option", { children: "Placed Students" }),
                  /* @__PURE__ */ jsx("option", { children: "Unplaced Students" }),
                  /* @__PURE__ */ jsx("option", { children: "Computer Science Students" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Subject" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full p-2 border rounded",
                    placeholder: "Message subject..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { children: "Message" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    rows: 6,
                    value: message,
                    onChange: (e) => setMessage(e.target.value),
                    placeholder: "Type your message here..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Button, { className: "w-full", onClick: handleSendMessage, children: "Send Message" })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "employers", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "employers", children: [
          "Registered Employers (",
          employers.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "students", children: [
          "Registered Students (",
          students.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "interactions", children: "Recent Interactions" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "employers", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Registered Employers" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Companies registered for campus placements" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: employers.map((employer) => {
          const jobsPosted = jobs.filter((j) => j.employerId === employer.id).length;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-blue-600" }),
                /* @__PURE__ */ jsx("h3", { className: "text-base", children: employer.company }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: employer.industry })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
                  employer.name,
                  " - ",
                  employer.designation
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                  employer.email
                ] }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { className: "text-blue-600", children: [
                  jobsPosted,
                  " job",
                  jobsPosted !== 1 ? "s" : "",
                  " posted"
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 mr-2" }),
                "Contact"
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "View Profile" })
            ] })
          ] }, employer.id);
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "students", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Registered Students" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Students available for placements" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: students.map((student) => {
          const studentApplications = applications.filter((a) => a.studentId === student.id);
          const placedApp = studentApplications.find((a) => a.status === "accepted");
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base", children: student.name }),
                placedApp && /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800", children: "Placed" }),
                /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                  "CGPA: ",
                  student.cgpa.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                  student.email
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  student.department,
                  " - Class of ",
                  student.graduationYear
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Skills: " }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: student.skills.join(", ") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "View Profile" }) })
          ] }, student.id);
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "interactions", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Recent Interactions" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Recent activities and communications" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: recentApplications.map((app) => {
          const job = jobs.find((j) => j.id === app.jobId);
          return /* @__PURE__ */ jsx("div", { className: "flex items-start gap-4 p-4 border rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm mb-1", children: [
              /* @__PURE__ */ jsx("span", { children: app.studentName }),
              " applied for",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: job?.title }),
              " at",
              " ",
              /* @__PURE__ */ jsx("span", { children: job?.company })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500", children: [
              /* @__PURE__ */ jsx("span", { children: new Date(app.appliedDate).toLocaleDateString() }),
              /* @__PURE__ */ jsx(Badge, { className: "text-xs", children: app.status })
            ] })
          ] }) }, app.id);
        }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Upcoming Events & Schedules" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Planned recruitment activities" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "TechCorp Solutions - Pre-placement Talk" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "March 5, 2026 at 10:00 AM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { children: "Confirmed" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-green-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Analytics Hub - Technical Assessment" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "March 8, 2026 at 2:00 PM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { children: "Confirmed" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-purple-50 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-purple-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "StartupX - Group Discussion Round" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "March 12, 2026 at 11:00 AM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Pending" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  EmployerStudentFacilitation
};
