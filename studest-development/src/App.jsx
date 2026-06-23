import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./component/Sidebar.jsx";
import Header from "./component/Header.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Materials from "./pages/Materials.jsx";
import Assignments from "./pages/Assignments.jsx";
import Settings from "./pages/Settings.jsx";
import { announcements as initialAnnouncements, assignments as initialAssignments, courses as initialCourses, materials as initialMaterials, users } from "./data/mockData.js";

const STORAGE = {
  user: "student-development-user",
  courses: "student-development-courses-v2",
  materials: "student-development-materials-v2",
  assignments: "student-development-assignments-v2",
  announcements: "student-development-announcements-v2",
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function createUser({ name, email, role }) {
  const finalRole = role || (email.toLowerCase().includes("teacher") ? "teacher" : "student");
  const demoUser = users.find((item) => item.role === finalRole);
  return {
    ...demoUser,
    id: demoUser?.id || Date.now(),
    name: name || demoUser?.name || email.split("@")[0],
    email,
    role: finalRole,
  };
}

function Layout({ user, search, setSearch, courses, materials, assignments, onLogout, children }) {
  const links = [
    { label: "Home", path: user.role === "teacher" ? "/teacher" : "/student" },
    { label: "Courses", path: "/courses" },
    { label: "Materials", path: "/materials" },
    { label: "Assignments", path: "/assignments" },
    { label: "Profile", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="min-w-0 flex-1">
        <Header user={user} search={search} setSearch={setSearch} courses={courses} materials={materials} assignments={assignments} onLogout={onLogout} />
        <main className="px-4 py-6 pb-24 lg:px-8 lg:pb-8">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white px-2 py-2 shadow-2xl lg:hidden">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-xl px-2 py-2 text-center text-xs font-black transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => readStorage(STORAGE.user, null));
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(() => readStorage(STORAGE.courses, initialCourses));
  const [materials, setMaterials] = useState(() => readStorage(STORAGE.materials, initialMaterials));
  const [assignments, setAssignments] = useState(() => readStorage(STORAGE.assignments, initialAssignments));
  const [announcements, setAnnouncements] = useState(() => readStorage(STORAGE.announcements, initialAnnouncements));

  useEffect(() => localStorage.setItem(STORAGE.courses, JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem(STORAGE.materials, JSON.stringify(materials)), [materials]);
  useEffect(() => localStorage.setItem(STORAGE.assignments, JSON.stringify(assignments)), [assignments]);
  useEffect(() => localStorage.setItem(STORAGE.announcements, JSON.stringify(announcements)), [announcements]);

  const dashboardPath = user?.role === "teacher" ? "/teacher" : "/student";

  const courseMaterialCounts = useMemo(() => {
    return materials.reduce((counts, material) => {
      counts[material.courseId] = (counts[material.courseId] || 0) + 1;
      return counts;
    }, {});
  }, [materials]);

  const displayCourses = useMemo(
    () => courses.map((course) => ({ ...course, materialsCount: courseMaterialCounts[course.id] || 0 })),
    [courses, courseMaterialCounts],
  );

  function handleLogin(values) {
    const nextUser = createUser(values);
    localStorage.setItem(STORAGE.user, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE.user);
    setUser(null);
    setSearch("");
    navigate("/login");
  }

  function updateProfile(profile) {
    const previousName = user.name;
    const nextUser = { ...user, ...profile };
    localStorage.setItem(STORAGE.user, JSON.stringify(nextUser));
    setUser(nextUser);
    if (user.role === "teacher" && previousName !== nextUser.name) {
      setCourses((current) => current.map((course) => course.teacher === previousName ? { ...course, teacher: nextUser.name } : course));
    }
  }

  function addCourse(course) {
    const nextCourse = {
      id: Date.now(),
      title: course.title.trim(),
      teacher: user.name,
      description: course.description.trim() || "Course description coming soon.",
      materialsCount: 0,
      progress: 0,
      color: course.color || "indigo",
      category: course.category || "General",
      level: course.level || "Beginner",
      schedule: course.schedule || "Schedule to be announced",
    };
    setCourses((current) => [nextCourse, ...current]);
    return nextCourse;
  }

  function addMaterial(material) {
    const nextMaterial = {
      id: Date.now(),
      courseId: Number(material.courseId),
      title: material.title.trim(),
      type: material.type,
      date: new Date().toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
      description: material.description.trim() || "New learning resource uploaded by the teacher.",
      content: material.content.trim() || "Open this resource during your next study session and record any questions.",
      author: user.name,
      size: material.type === "video" ? "85 MB" : "1.5 MB",
      duration: material.type === "video" ? "30 min" : "20 min",
    };
    setMaterials((current) => [nextMaterial, ...current]);
    return nextMaterial;
  }

  function addAnnouncement(announcement) {
    const nextAnnouncement = {
      id: Date.now(),
      courseId: Number(announcement.courseId),
      title: announcement.title.trim(),
      message: announcement.message.trim(),
      date: "Just now",
      category: "general",
    };
    setAnnouncements((current) => [nextAnnouncement, ...current]);
    return nextAnnouncement;
  }

  function toggleAssignment(id) {
    setAssignments((current) => current.map((assignment) =>
      assignment.id === id ? { ...assignment, status: assignment.status === "completed" ? "pending" : "completed" } : assignment,
    ));
  }

  const protectedPage = (children) => (
    <ProtectedRoute user={user}>
      {user && (
        <Layout user={user} search={search} setSearch={setSearch} courses={displayCourses} materials={materials} assignments={assignments} onLogout={handleLogout}>
          {children}
        </Layout>
      )}
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={dashboardPath} replace /> : <Login onLogin={handleLogin} />} />
      <Route path="/register" element={user ? <Navigate to={dashboardPath} replace /> : <Register onLogin={handleLogin} />} />
      <Route path="/" element={<Navigate to={user ? dashboardPath : "/login"} replace />} />
      <Route path="/student" element={protectedPage(user?.role === "teacher" ? <Navigate to="/teacher" replace /> : <StudentDashboard user={user} courses={displayCourses} materials={materials} assignments={assignments} announcements={announcements} search={search} setSearch={setSearch} />)} />
      <Route path="/teacher" element={protectedPage(user?.role === "student" ? <Navigate to="/student" replace /> : <TeacherDashboard user={user} courses={displayCourses} materials={materials} announcements={announcements} addCourse={addCourse} addMaterial={addMaterial} addAnnouncement={addAnnouncement} />)} />
      <Route path="/courses" element={protectedPage(<Courses courses={displayCourses} search={search} />)} />
      <Route path="/courses/:id" element={protectedPage(<CourseDetails courses={displayCourses} materials={materials} assignments={assignments} announcements={announcements} toggleAssignment={toggleAssignment} />)} />
      <Route path="/materials" element={protectedPage(<Materials courses={displayCourses} materials={materials} search={search} setSearch={setSearch} />)} />
      <Route path="/assignments" element={protectedPage(<Assignments courses={displayCourses} assignments={assignments} search={search} toggleAssignment={toggleAssignment} />)} />
      <Route path="/settings" element={protectedPage(<Settings user={user} updateProfile={updateProfile} />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}