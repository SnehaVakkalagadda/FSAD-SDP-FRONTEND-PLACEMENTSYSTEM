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

  function persist(user, role, token) {
    const s = { user, role, token };
    setSession(s);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  }

  // Called by LoginPage after OTP verified — stores user+token in session
  function persistLogin(user, role, token) {
    persist(user, role, token);
  }

  // ── Data loaders ──────────────────────────────────────────────────────────

  async function loadStudentJobs() {
    try {
      const res = await API.get("/student/viewjobs");
      setJobs(Array.isArray(res.data) ? res.data : []);
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
  }, [session?.role, session?.user?.id, session?.user?.username]); // eslint-disable-line

  // ── Auth ──────────────────────────────────────────────────────────────────

  const studentRegister = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("branch", data.branch);
    formData.append("cgpa", parseFloat(data.cgpa));
    formData.append("year", parseInt(data.year));
    formData.append("username", data.username);
    formData.append("collegeName", data.collegeName);
    formData.append("contact", data.contact);
    formData.append("file", data.resume);

    await API.post("/student/register", formData);

    return { ok: true };
  } catch (e) {
    if (!e.response) return { ok: false, message: "Cannot connect to server" };

    const msg =
      typeof e.response.data === "string"
        ? e.response.data
        : "Registration failed. Email/username/contact may already exist.";

    return { ok: false, message: msg };
  }
};

  const employerRegister = async (data) => {
    try {
      await API.post("/employer/register", {
        companyName: data.companyName,
        email: data.email,
        password: data.password,
        username: data.username,
        companyMail: data.companyMail,
        location: data.location,
        contact: data.contact,
      });
      return { ok: true };
    } catch (e) {
      if (!e.response) return { ok: false, message: "Cannot connect to server" };
      const msg = typeof e.response.data === "string" ? e.response.data : "Registration failed. Email/username/contact may already exist.";
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

  const updateStudentProfile = async (data) => {
    try {
      await API.put("/student/updateprofile", {
        id: currentUser.id,
        name: data.name,
        email: data.email,
        password: data.password || currentUser.password,
        branch: data.branch,
        cgpa: parseFloat(data.cgpa),
        year: parseInt(data.year),
        username: data.username || currentUser.username,
        collegeName: data.collegeName || currentUser.collegeName,
        contact: data.contact || currentUser.contact,
      });
      persist({ ...currentUser, ...data }, currentRole, session?.token);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Update failed" };
    }
  };

  const applyJob = async (jobId) => {
    try {
      const studentId = Number(currentUser.id);
      await API.post("/student/applyjob", { studentId, jobId: Number(jobId) });
      const res = await API.get(`/student/viewapplications/${studentId}`);
      setApplications(Array.isArray(res.data) ? res.data : []);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Already applied or apply failed" };
    }
  };

  // ── Employer ops ──────────────────────────────────────────────────────────

  const updateEmployerProfile = async (data) => {
    try {
      await API.put("/employer/updateprofile", {
        id: currentUser.id,
        companyName: data.companyName,
        email: data.email,
        password: data.password || currentUser.password,
      });
      persist({ ...currentUser, ...data }, currentRole, session?.token);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Update failed" };
    }
  };

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
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Post job failed" };
    }
  };

  const loadApplicationsForJob = async (jobId) => {
    try {
      const res = await API.get(`/employer/applicationsperjob/${jobId}`);
      const incoming = Array.isArray(res.data) ? res.data : [];
      setApplications((prev) => [...prev.filter((a) => a.jobId !== jobId), ...incoming]);
      return incoming;
    } catch { return []; }
  };

  // ── Officer ops ───────────────────────────────────────────────────────────

  const updateApplicationStatus = async (applicationId, status, studentId) => {
    try {
      await API.put(`/officer/updatestatus?applicationId=${applicationId}&status=${encodeURIComponent(status)}&studentId=${studentId}`);
      setApplications((prev) => prev.map((a) => a.id === applicationId ? { ...a, status } : a));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Update failed" };
    }
  };

  // ── Admin ops ─────────────────────────────────────────────────────────────

  const addOfficer = async (data) => {
    try {
      const res = await API.post("/admin/addofficer", {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      try {
        const oRes = await API.get("/admin/displayofficers");
        if (Array.isArray(oRes.data)) setOfficers(oRes.data);
      } catch { /* no officers yet */ }
      return { ok: true, message: typeof res.data === "string" ? res.data : "Officer added successfully" };
    } catch (e) {
      const d = e.response?.data;
      return { ok: false, message: typeof d === "string" ? d : "Add officer failed" };
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/admin/deletestudent?id=${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Delete failed" };
    }
  };

  const deleteEmployer = async (id) => {
    try {
      await API.delete(`/admin/deletemploeyr?id=${id}`);
      setEmployers((prev) => prev.filter((e) => e.id !== id));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Delete failed" };
    }
  };

  const deleteOfficer = async (id) => {
    try {
      await API.delete(`/admin/deleteofficer/${id}`);
      setOfficers((prev) => prev.filter((o) => o.id !== id));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: typeof e.response?.data === "string" ? e.response.data : "Delete failed" };
    }
  };

  return (
    <PlacementDataContext.Provider value={{
      currentUser, currentRole,
      jobs, applications, students, employers, officers,
      persistLogin,
      studentRegister, employerRegister, logout,
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
