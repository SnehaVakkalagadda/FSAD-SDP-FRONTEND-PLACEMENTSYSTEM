import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, UserPlus, Edit, Trash2, Mail } from "lucide-react";
import { AddUserDialog } from "./AddUserDialog";
import { usePlacementData } from "../../context/PlacementDataContext";
import { toast } from "sonner";
function UserManagement() {
  const { students, employers, addUserByAdmin, removeUserByRole } = usePlacementData();
  const [searchQuery, setSearchQuery] = useState("");
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const filteredStudents = students.filter(
    (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredEmployers = employers.filter(
    (employer) => employer.name.toLowerCase().includes(searchQuery.toLowerCase()) || employer.email.toLowerCase().includes(searchQuery.toLowerCase()) || employer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "User Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Manage students, employers, and system users" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setAddUserDialogOpen(true), children: [
        /* @__PURE__ */ jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
        "Add User"
      ] })
    ] }),
    /* @__PURE__ */ jsx(AddUserDialog, { open: addUserDialogOpen, onOpenChange: setAddUserDialogOpen, onCreateUser: addUserByAdmin }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search by name, email, or company...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "students", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "students", children: [
          "Students (",
          students.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "employers", children: [
          "Employers (",
          employers.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "students", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Student Accounts" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage student user accounts and profiles" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Graduation Year" }),
              /* @__PURE__ */ jsx(TableHead, { children: "CGPA" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredStudents.map((student) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: student.name }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-gray-400" }),
                student.email
              ] }) }),
              /* @__PURE__ */ jsx(TableCell, { children: student.department }),
              /* @__PURE__ */ jsx(TableCell, { children: student.graduationYear }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: student.cgpa >= 8 ? "default" : "secondary", children: student.cgpa.toFixed(2) }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                  removeUserByRole("student", student.id);
                  toast.success("Student removed");
                }, children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-600" }) })
              ] }) })
            ] }, student.id)) })
          ] }),
          filteredStudents.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-500", children: "No students found" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "employers", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Employer Accounts" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage employer user accounts and company profiles" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Company" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Designation" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Industry" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredEmployers.map((employer) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { children: employer.name }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-gray-400" }),
                employer.email
              ] }) }),
              /* @__PURE__ */ jsx(TableCell, { children: employer.company }),
              /* @__PURE__ */ jsx(TableCell, { children: employer.designation }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: employer.industry }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                  removeUserByRole("employer", employer.id);
                  toast.success("Employer removed");
                }, children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-600" }) })
              ] }) })
            ] }, employer.id)) })
          ] }),
          filteredEmployers.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-500", children: "No employers found" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  UserManagement
};
