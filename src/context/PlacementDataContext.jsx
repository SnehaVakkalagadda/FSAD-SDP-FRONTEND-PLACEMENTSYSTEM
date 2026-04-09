import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const PlacementDataContext = createContext(null);
const SESSION_KEY = "placement_session";

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function PlacementDataProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [officers, setOfficers] = useState([]);

  const currentUser = session?.user || null;
  const currentRole = session?.role || null;

  function persist(user, role) {
    const s = { user, role };
    setSession(s);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  }

  // ── Data loaders ──────────────────────────────────────────────────────────

  async function loadStudentJobs() {
    try {
      const res = await API.get("/student/viewjobs");
      setJobs(res.data || []);
    } catch { setJobs([]); }
  }

  async function loadStudentApplications(studentId) {
    try {
      const res = await API.get(`/student/viewapplications/${studentId}`);
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch { setApplications([]); }
  }

  async function loadEmployerJobs(employerId) {
    try {
      const res = await API.get(`/employer/viewjobs/${employerId}`);
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch { setJobs([]); }
  }

  async function loadOfficerApplications() {
    try {
      const [appsRes, jobsRes] = await Promise.allSettled([
        API.get("/officer/applications"),
        API.get("/student/viewjobs"),
      ]);
      setApplications(appsRes.status === "fulfilled" && Array.isArray(appsRes.value.data) ? appsRes.value.data : []);
      setJobs(jobsRes.status === "fulfilled" && Array.isArray(jobsRes.value.data) ? jobsRes.value.data : []);
    } catch { setApplications([]); }
  }

  async function loadAdminData() {
    try {
      const [sRes, eRes, oRes] = await Promise.allSettled([
        API.get("/admin/displaystudents"),
        API.get("/admin/displayemployers"),
        API.get("/admin/displayofficers"),
      ]);
      setStudents(sRes.status === "fulfilled" && Array.isArray(sRes.value.data) ? sRes.value.data : []);
      setEmployers(eRes.status === "fulfilled" && Array.isArray(eRes.value.data) ? eRes.value.data : []);
      setOfficers(oRes.status === "fulfilled" && Array.isArray(oRes.value.data) ? oRes.value.data : []);
    } catch { /* handled per-promise above */ }
  }

  useEffect(() => {
    if (!session) return;
    if (session.role === "student") {
      loadStudentJobs();
      loadStudentApplications(session.user.id);
    }
    if (session.role === "employer") loadEmployerJobs(session.user.id);
    if (session.role === "placement-officer") loadOfficerApplications();
    if (session.role === "admin") loadAdminData();
  }, [session?.role, session?.user?.id]); // eslint-disable-line

  // ── Auth ──────────────────────────────────────────────────────────────────

  // Student: { name, email, password, branch, resume, cgpa, year }
  const studentRegister = async (data) => {
    try {
      await API.post("/student/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        branch: data.branch,
        resume: data.resume,
        cgpa: parseFloat(data.cgpa),
        year: parseInt(data.year),
      });
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Registration failed";
      return { ok: false, message: msg };
    }
  };

  // Employer: { companyName, email, password }
  const employerRegister = async (data) => {
    try {
      await API.post("/employer/register", {
        companyName: data.companyName,
        email: data.email,
        password: data.password,
      });
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Registration failed";
      return { ok: false, message: msg };
    }
  };

  const login = async ({ role, email, password }) => {
    const endpoints = {
      student: "/student/login",
      employer: "/employer/login",
      "placement-officer": "/officer/login",
      admin: "/admin/login",
    };
    try {
      const res = await API.post(
        `${endpoints[role]}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
      persist(res.data, role);
      return { ok: true };
    } catch (e) {
      const msg = e.response?.status === 401 || e.response?.status === 404
        ? "Invalid credentials"
        : "Server error. Try again.";
      return { ok: false, message: msg };
    }
  };

  const logout = () => {
    setSession(null);
    sessionStorage.removeItem(SESSION_KEY);
    setJobs([]);
    setApplications([]);
    setStudents([]);
    setEmployers([]);
    setOfficers([]);
  };

  // ── Student ops ───────────────────────────────────────────────────────────

  // PUT /student/updateprofile — full Student object with id
  const updateStudentProfile = async (data) => {
    try {
      await API.put("/student/updateprofile", {
        id: currentUser.id,
        name: data.name,
        email: data.email,
        password: data.password || currentUser.password,
        branch: data.branch,
        resume: data.resume,
        cgpa: parseFloat(data.cgpa),
        year: parseInt(data.year),
      });
      persist({ ...currentUser, ...data }, currentRole);
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Update failed";
      return { ok: false, message: msg };
    }
  };

  // POST /student/applyjob — body: ApplicationDTO { studentId, jobId }
  const applyJob = async (jobId) => {
    try {
      const studentId = Number(currentUser.id);
      const numericJobId = Number(jobId);
      await API.post("/student/applyjob", {
        studentId: studentId,
        jobId: numericJobId,
      });
      // refresh applications list
      const res = await API.get(`/student/viewapplications/${studentId}`);
      setApplications(Array.isArray(res.data) ? res.data : []);
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Already applied or apply failed";
      return { ok: false, message: msg };
    }
  };

  // ── Employer ops ──────────────────────────────────────────────────────────

  // PUT /employer/updateprofile — full Employer object with id
  const updateEmployerProfile = async (data) => {
    try {
      await API.put("/employer/updateprofile", {
        id: currentUser.id,
        companyName: data.companyName,
        email: data.email,
        password: data.password || currentUser.password,
      });
      persist({ ...currentUser, ...data }, currentRole);
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Update failed";
      return { ok: false, message: msg };
    }
  };

  // POST /employer/postjob — body: JobDTO { title, description, salary, employerId }
  const postJob = async (data) => {
    try {
      await API.post("/employer/postjob", {
        title: data.title,
        description: data.description,
        salary: parseFloat(data.salary),
        employerId: currentUser.id,
      });
      await loadEmployerJobs(currentUser.id);
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Post job failed";
      return { ok: false, message: msg };
    }
  };

  // GET /employer/applicationsperjob/{jobId}
  const loadApplicationsForJob = async (jobId) => {
    try {
      const res = await API.get(`/employer/applicationsperjob/${jobId}`);
      const incoming = Array.isArray(res.data) ? res.data : [];
      setApplications((prev) => {
        const others = prev.filter((a) => a.jobId !== jobId);
        return [...others, ...incoming];
      });
      return incoming;
    } catch {
      return [];
    }
  };

  // ── Officer ops ───────────────────────────────────────────────────────────

  // PUT /officer/updatestatus?applicationId=&status=&studentId=
  const updateApplicationStatus = async (applicationId, status, studentId) => {
    try {
      await API.put(`/officer/updatestatus?applicationId=${applicationId}&status=${encodeURIComponent(status)}&studentId=${studentId}`);
      setApplications((prev) =>
        prev.map((a) => a.id === applicationId ? { ...a, status } : a)
      );
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Update failed";
      return { ok: false, message: msg };
    }
  };

  // ── Admin ops ─────────────────────────────────────────────────────────────

  // POST /admin/addofficer — body: PlacementOfficer { name, email, password }
  const addOfficer = async (data) => {
    try {
      const res = await API.post("/admin/addofficer", {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      // fetch updated officers list; 404 = none yet, keep existing
      try {
        const oRes = await API.get("/admin/displayofficers");
        if (Array.isArray(oRes.data)) setOfficers(oRes.data);
      } catch { /* 404 — no officers yet */ }
      return { ok: true, message: typeof res.data === "string" ? res.data : "Officer added successfully" };
    } catch (e) {
      const status = e.response?.status;
      const data = e.response?.data;
      const msg = typeof data === "string" ? data
        : status === 500 ? "Server error — email may already exist"
        : "Add officer failed";
      return { ok: false, message: msg };
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/admin/deletestudent?id=${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Delete failed";
      return { ok: false, message: msg };
    }
  };

  const deleteEmployer = async (id) => {
    try {
      await API.delete(`/admin/deletemploeyr?id=${id}`);
      setEmployers((prev) => prev.filter((e) => e.id !== id));
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Delete failed";
      return { ok: false, message: msg };
    }
  };

  const deleteOfficer = async (id) => {
    try {
      await API.delete(`/admin/deleteofficer/${id}`);
      setOfficers((prev) => prev.filter((o) => o.id !== id));
      return { ok: true };
    } catch (e) {
      const msg = typeof e.response?.data === "string" ? e.response.data : "Delete failed";
      return { ok: false, message: msg };
    }
  };

  return (
    <PlacementDataContext.Provider value={{
      currentUser, currentRole,
      jobs, applications, students, employers, officers,
      studentRegister, employerRegister, login, logout,
      updateStudentProfile, applyJob,
      updateEmployerProfile, postJob, loadApplicationsForJob,
      updateApplicationStatus,
      addOfficer, deleteStudent, deleteEmployer, deleteOfficer,
      loadAdminData,
    }}>
      {children}
    </PlacementDataContext.Provider>
  );
}

export function usePlacementData() {
  const ctx = useContext(PlacementDataContext);
  if (!ctx) throw new Error("usePlacementData must be used within PlacementDataProvider");
  return ctx;
}
