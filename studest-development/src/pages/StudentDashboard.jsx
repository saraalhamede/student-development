import AnnouncementCard from "../component/AnnouncementCard.jsx";
import AssignmentCard from "../component/AssignmentCard.jsx";
import CourseCard from "../component/CourseCard.jsx";
import MaterialCard from "../component/MaterialCard.jsx";
import SearchBar from "../component/SearchBar.jsx";

export default function StudentDashboard({ user, courses, materials, assignments, announcements, search, setSearch }) {
    const query = search.trim().toLowerCase();
    const shownCourses = courses.filter((course) => !query || `${course.title} ${course.teacher} ${course.category}`.toLowerCase().includes(query));
    const shownMaterials = materials.filter((material) => !query || `${material.title} ${material.description} ${material.author}`.toLowerCase().includes(query));
    const shownAssignments = assignments.filter((assignment) => !query || `${assignment.title} ${assignment.description}`.toLowerCase().includes(query));
    const shownAnnouncements = announcements.filter((announcement) => !query || `${announcement.title} ${announcement.message}`.toLowerCase().includes(query));
    const averageProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
    const totalMatches= shownCourses.length + shownMaterials.length + shownAssignments.length + shownAnnouncements.length;
    

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-white via-indigo-50 to-sky-50 p-6 shadow-soft">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_260px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Student dashboard</p>
            <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Continue your learning journey with connected courses, resources, assignments, and announcements.</p>
            <div className="mt-6 max-w-xl"><SearchBar value={search} onChange={setSearch} placeholder="Search everything in my dashboard..." /></div>
            {query && <p className="mt-3 text-sm font-bold text-indigo-600">{totalMatches} matching items</p>}
          </div>
          <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">Overall progress</p>
            <p className="mt-2 text-4xl font-black text-indigo-600">{averageProgress}%</p>
            <div className="mt-4 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-indigo-600" style={{ width: `${averageProgress}%` }} /></div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="card p-5">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-slate-950">My Courses</h2><span className="text-sm font-bold text-indigo-600">{shownCourses.length} shown</span></div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{shownCourses.slice(0, 4).map((course) => <CourseCard key={course.id} course={course} />)}</div>
            {!shownCourses.length && <p className="py-8 text-center text-sm text-slate-500">No matching courses.</p>}
          </section>

          <section className="card px-5">
            <h2 className="border-b border-slate-100 py-4 text-xl font-black text-slate-950">Recent Materials</h2>
            {shownMaterials.slice(0, 5).map((material) => <MaterialCard key={material.id} material={material} course={courses.find((course) => course.id === Number(material.courseId))} />)}
            {!shownMaterials.length && <p className="py-8 text-center text-sm text-slate-500">No matching materials.</p>}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Announcements</h2>
            <div className="mt-3">{shownAnnouncements.slice(0, 4).map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}</div>
            {!shownAnnouncements.length && <p className="py-6 text-sm text-slate-500">No matching announcements.</p>}
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-950">Upcoming Assignments</h2>
            {shownAssignments.filter((item) => item.status === "pending").slice(0, 3).map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} course={courses.find((course) => course.id === Number(assignment.courseId))} />)}
          </section>
        </aside>
      </div>
    </div>
  );
}