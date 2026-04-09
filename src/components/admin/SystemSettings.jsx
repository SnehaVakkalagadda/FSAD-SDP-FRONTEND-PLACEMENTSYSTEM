import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { usePlacementData } from "../../context/PlacementDataContext";
function SystemSettings() {
  const { settings, updateSettings, resetSettings } = usePlacementData();

  const handleInputChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    resetSettings();
    toast.success("Settings reset to defaults");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-2", children: "System Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Configure system-wide settings and preferences" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "General Settings" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Basic system configuration" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "systemName", children: "System Name" }),
          /* @__PURE__ */ jsx(Input, { id: "systemName", value: settings.systemName, onChange: (e) => handleInputChange("systemName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "institutionName", children: "Institution Name" }),
          /* @__PURE__ */ jsx(Input, { id: "institutionName", value: settings.institutionName, onChange: (e) => handleInputChange("institutionName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "contactEmail", children: "Contact Email" }),
          /* @__PURE__ */ jsx(Input, { id: "contactEmail", type: "email", value: settings.contactEmail, onChange: (e) => handleInputChange("contactEmail", e.target.value) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Application Settings" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Configure application behavior and limits" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Allow Student Registration" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Enable students to self-register" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: settings.allowStudentRegistration, onCheckedChange: (checked) => handleInputChange("allowStudentRegistration", checked) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Allow Employer Registration" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Enable employers to self-register" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: settings.allowEmployerRegistration, onCheckedChange: (checked) => handleInputChange("allowEmployerRegistration", checked) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Email Notifications" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Send email notifications for application updates" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: settings.emailNotifications, onCheckedChange: (checked) => handleInputChange("emailNotifications", checked) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "maxApplications", children: "Max Applications per Student" }),
          /* @__PURE__ */ jsx(Input, { id: "maxApplications", type: "number", value: settings.maxApplications, onChange: (e) => handleInputChange("maxApplications", Number(e.target.value) || 0) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Placement Cycle Settings" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Configure current placement cycle" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cycleYear", children: "Placement Year" }),
          /* @__PURE__ */ jsx(Input, { id: "cycleYear", value: settings.cycleYear, onChange: (e) => handleInputChange("cycleYear", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cycleStatus", children: "Cycle Status" }),
          /* @__PURE__ */ jsx(Input, { id: "cycleStatus", value: settings.cycleStatus, onChange: (e) => handleInputChange("cycleStatus", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cycleStart", children: "Start Date" }),
          /* @__PURE__ */ jsx(Input, { id: "cycleStart", type: "date", value: settings.cycleStart, onChange: (e) => handleInputChange("cycleStart", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cycleEnd", children: "End Date" }),
          /* @__PURE__ */ jsx(Input, { id: "cycleEnd", type: "date", value: settings.cycleEnd, onChange: (e) => handleInputChange("cycleEnd", e.target.value) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Security Settings" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "System security and access control" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Require Email Verification" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Users must verify email before access" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: settings.requireEmailVerification, onCheckedChange: (checked) => handleInputChange("requireEmailVerification", checked) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Two-Factor Authentication" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Require 2FA for admin accounts" })
          ] }),
          /* @__PURE__ */ jsx(Switch, { checked: settings.twoFactorAuthForAdmin, onCheckedChange: (checked) => handleInputChange("twoFactorAuthForAdmin", checked) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "sessionTimeout", children: "Session Timeout (minutes)" }),
          /* @__PURE__ */ jsx(Input, { id: "sessionTimeout", type: "number", value: settings.sessionTimeout, onChange: (e) => handleInputChange("sessionTimeout", Number(e.target.value) || 0) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: handleReset, children: "Reset to Defaults" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSave, children: "Save All Settings" })
    ] })
  ] });
}
export {
  SystemSettings
};
