import { createContext, useContext, useMemo, useState, useEffect } from "react";
import API from "../services/api";

const PlacementDataContext = createContext(null);

const DEFAULT_SETTINGS = {
  systemName: "Placement Management System",
  institutionName: "University Name",
  contactEmail: "admin@university.edu",
  allowStudentRegistration: true,
  allowEmployerRegistration: true,
  emailNotifications: true,
  maxApplications: 10,
  cycleYear: "2025-2026",
  cycleStatus: "Active",
  cycleStart: "2025-09-01",
  cycleEnd: "2026-05-31",
  requireEmailVerification: true,
  twoFactorAuthForAdmin: false,
  sessionTimeout: 60,
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

// Session stored in sessionStorage so it clears on tab close
const SESSION_KEY = "placement_session";

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function PlacementDataProvider({ children }) {
  // session holds { user, role }
  const [session, setSession] = useState(() => loadSession());

  // local caches — populated after login
  const [students, setStudents] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const currentUser = session?.user || null;
  const currentRole = session?.role || null;

  // ── Helpers ─────────────────────────────────────────────────────────────────

  async function loadStudentData(studentId) {
    try {
      const jobsRes = await API.get("/student/jobs");
      setJobs(jobsRes.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const appsRes = await API.get(`/student/applications/${studentId}`);
      setApplications(appsRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadEmployerData(employerId) {
    try {
      const jobsRes = await API.get(`/employer/jobs/${employerId}`);
      setJobs(jobsRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadOfficerData() {
    try {
      const appsRes = await API.get("/officer/applications");
      setApplications(appsRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Reload data whenever session changes
  useEffect(() => {
    if (!session) return;
    if (session.role === "student") loadStudentData(session.user.id);
    if (session.role === "employer") loadEmployerData(session.user.id);
    if (session.role === "placement-officer") loadOfficerData();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Stats (derived) ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const placedCount = applications.filter((a) => a.status === "accepted").length;
    const activeJobs = jobs.filter((j) => new Date(j.deadline) > new Date()).length;
    return {
      totalStudents: students.length,
      placedStudents: placedCount,
      totalJobs: jobs.length,
      activeJobs,
      totalApplications: applications.length,
      companiesRegistered: employers.length,
    };
  }, [applications, jobs, students, employers]);

  // ── Auth ─────────────────────────────────────────────────────────────────────

  const signup = async ({ role, formData }) => {
    if (role === "student") {
      try {
        const response = await API.post("/student/register", {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          department: formData.department || "General",
          studentId: formData.studentId || "",
          phone: formData.phone || "",
        });
        alert(response.data);
        return { ok: true };
      } catch (error) {
        console.log(error);
        alert("Operation Failed");
        return { ok: false, message: "Operation Failed" };
      }
    }

    if (role === "employer") {
      try {
        const response = await API.post("/employer/register", {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          company: formData.organization || "New Company",
          phone: formData.phone || "",
        });
        alert(response.data);
        return { ok: true };
      } catch (error) {
        console.log(error);
        alert("Operation Failed");
        return { ok: false, message: "Operation Failed" };
      }
    }

    return { ok: false, message: "Self-registration not available for this role." };
  };

  const login = async ({ role, email, password }) => {
    let endpoint = "";
    if (role === "student") endpoint = "/student/login";
    else if (role === "employer") endpoint = "/employer/login";
    else if (role === "admin") endpoint = "/admin/login";
    else if (role === "placement-officer") endpoint = "/officer/login";

    try {
      const response = await API.post(`${endpoint}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      // backend may return a user object or just a success string
      const data = response.data;
      const user = typeof data === "object" && data !== null
        ? data
        : { name: email.split("@")[0], email, role };
      const newSession = { user, role };
      setSession(newSession);
      saveSession(newSession);
      return { ok: true };
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
      return { ok: false, message: "Invalid role, email, or password." };
    }
  };

  const logout = () => {
    setSession(null);
    clearSession();
    setStudents([]);
    setEmployers([]);
    setJobs([]);
    setApplications([]);
  };

  // ── Admin ────────────────────────────────────────────────────────────────────

  const addUserByAdmin = async (formData) => {
    const role = formData.role;

    if (role === "student") {
      try {
        const response = await API.post("/admin/student", {
          name: formData.name,
          email: formData.email,
          password: "demo123",
          department: formData.department || "General",
          phone: formData.phone || "",
        });
        alert(response.data);
        return { ok: true };
      } catch (error) {
        console.log(error);
        alert("Operation Failed");
        return { ok: false, message: "Operation Failed" };
      }
    }

    if (role === "employer") {
      try {
        const response = await API.post("/admin/employer", {
          name: formData.name,
          email: formData.email,
          password: "demo123",
          company: formData.company || "New Company",
          phone: formData.phone || "",
        });
        alert(response.data);
        return { ok: true };
      } catch (error) {
        console.log(error);
        alert("Operation Failed");
        return { ok: false, message: "Operation Failed" };
      }
    }

    if (role === "placement-officer") {
      try {
        const response = await API.post("/admin/officer", {
          name: formData.name,
          email: formData.email,
          password: "demo123",
          phone: formData.phone || "",
        });
        alert(response.data);
        return { ok: true };
      } catch (error) {
        console.log(error);
        alert("Operation Failed");
        return { ok: false, message: "Operation Failed" };
      }
    }

    return { ok: false, message: "Unsupported role." };
  };

  // kept for UI compatibility — admin remove is not in backend spec, so local only
  const removeUserByRole = (role, userId) => {
    if (role === "student") setStudents((prev) => prev.filter((s) => s.id !== userId));
    if (role === "employer") setEmployers((prev) => prev.filter((e) => e.id !== userId));
  };

  // ── Jobs ─────────────────────────────────────────────────────────────────────

  const addJob = async (payload) => {
    try {
      const response = await API.post("/employer/job", {
        title: payload.title,
        company: payload.company,
        location: payload.location,
        type: payload.type,
        salary: payload.salary,
        description: payload.description,
        requirements: payload.requirements,
        responsibilities: payload.responsibilities,
        deadline: payload.deadline,
        employerId: payload.employerId,
      });
      alert(response.data);
      // refresh employer jobs
      await loadEmployerData(payload.employerId);
      return { ok: true };
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
      return { ok: false };
    }
  };

  // remove job is local-only (no backend endpoint provided)
  const removeJob = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setApplications((prev) => prev.filter((a) => a.jobId !== jobId));
  };

  // ── Applications ─────────────────────────────────────────────────────────────

  const addApplication = async ({ jobId, coverLetter }) => {
    if (!currentUser || currentRole !== "student") {
      return { ok: false, message: "Please login as a student to apply." };
    }

    try {
      const response = await API.post("/student/apply", {
        jobId,
        studentId: currentUser.id,
        coverLetter,
      });
      alert(response.data);
      // refresh applications
      await loadStudentData(currentUser.id);
      return { ok: true };
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
      return { ok: false, message: "Operation Failed" };
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await API.put(`/officer/status?applicationId=${applicationId}&status=${status}`);
      alert(response.data);
      // refresh applications list
      setApplications((prev) =>
        prev.map((a) =>
          a.id === applicationId ? { ...a, status, lastUpdated: getToday() } : a
        )
      );
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  // ── Student profile update ────────────────────────────────────────────────────

  const updateStudentProfile = async (studentId, updates) => {
    try {
      const response = await API.put("/student/update", {
        id: studentId,
        ...updates,
      });
      alert(response.data);
      // update local session user
      const updatedUser = { ...currentUser, ...updates };
      const newSession = { user: updatedUser, role: currentRole };
      setSession(newSession);
      saveSession(newSession);
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  // ── Settings (local only — no backend endpoint) ───────────────────────────────
  const updateSettings = (updates) =>
    setSettings((prev) => ({ ...prev, ...updates }));

  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  // ── Employer profile update ───────────────────────────────────────────────────
  const updateEmployerProfile = async (updates) => {
    try {
      const response = await API.put("/employer/update", {
        id: currentUser.id,
        ...updates,
      });
      alert(response.data);
      const updatedUser = { ...currentUser, ...updates };
      const newSession = { user: updatedUser, role: currentRole };
      setSession(newSession);
      saveSession(newSession);
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  // ── Load employer applications for a specific job ─────────────────────────────
  const loadApplicationsForJob = async (jobId) => {
    try {
      const response = await API.get(`/employer/applications/${jobId}`);
      // merge into applications list (replace entries for this job)
      setApplications((prev) => {
        const others = prev.filter((a) => a.jobId !== jobId);
        return [...others, ...response.data];
      });
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const value = {
    students,
    employers,
    systemUsers: [],
    jobs,
    applications,
    settings,
    stats,
    currentUser,
    currentRole,
    signup,
    login,
    logout,
    addUserByAdmin,
    removeUserByRole,
    addJob,
    removeJob,
    addApplication,
    updateApplicationStatus,
    updateStudentProfile,
    updateEmployerProfile,
    loadApplicationsForJob,
    updateSettings,
    resetSettings,
  };

  return (
    <PlacementDataContext.Provider value={value}>
      {children}
    </PlacementDataContext.Provider>
  );
}

export function usePlacementData() {
  const context = useContext(PlacementDataContext);
  if (!context)
    throw new Error("usePlacementData must be used within PlacementDataProvider");
  return context;
}
