import { Link, useParams } from "react-router-dom";
import AssignmentCard from "../component/AssignmentCard.jsx";
import MaterialCard from "../component/MaterialCard.jsx";
import AnnouncementCard from "../component/AnnouncementCard.jsx";

export default function CourseDetails({ courses, materials, assignments, announcements, toggleAssignment }) {
  const { id } = useParams();
  const courseId = Number(id);
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return <div className="card p-10 text-center"><p className="font-black text-slate-900">Course not found.</p><Link to="/courses" className="mt-4 inline-flex font-bold text-indigo-600">Return to courses</Link></div>;
  }

  const courseMaterials = materials.filter((item) => Number(item.courseId) === courseId);
  const courseAssignments = assignments.filter((item) => Number(item.courseId) === courseId);
  const courseAnnouncements = announcements.filter((item) => Number(item.courseId) === courseId);

  return (
    <div className="space-y-6">
      <Link to="/courses" className="inline-flex rounded-xl px-3 py-2 font-bold text-indigo-600 transition hover:bg-indigo-50">Back to courses</Link>

      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-white to-indigo-50 p-4 shadow-soft sm:p-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">{course.category}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{course.level}</span></div>
            <h1 className="mt-4 break-words text-2xl font-black text-slate-950 sm:text-3xl">{course.title}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{course.description}</p>
            <p className="mt-4 text-sm font-bold text-slate-500">Teacher: {course.teacher} - {course.schedule}</p>
          </div>
          <div className="w-full rounded-2xl bg-white p-5 shadow-sm sm:w-auto sm:min-w-56">
            <p className="text-sm font-bold text-slate-500">Course progress</p><p className="mt-2 text-4xl font-black text-indigo-600">{course.progress}%</p>
            <div className="mt-4 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-indigo-600" style={{ width: `${course.progress}%` }} /></div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Materials</p><p className="mt-2 text-3xl font-black text-slate-950">{courseMaterials.length}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Assignments</p><p className="mt-2 text-3xl font-black text-indigo-600">{courseAssignments.length}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Announcements</p><p className="mt-2 text-3xl font-black text-violet-600">{courseAnnouncements.length}</p></div>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="card px-4 sm:px-5">
          <h2 className="border-b border-slate-100 py-4 text-xl font-black text-slate-950">Course Materials</h2>
          {courseMaterials.map((material) => <MaterialCard key={material.id} material={material} course={course} />)}
          {!courseMaterials.length && <p className="py-8 text-sm text-slate-500">No materials have been uploaded for this course yet.</p>}
        </section>

        <aside className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-950">Assignments</h2>
            {courseAssignments.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} course={course} onToggle={toggleAssignment} />)}
            {!courseAssignments.length && <div className="card p-5 text-sm text-slate-500">No assignments yet.</div>}
          </section>
          <section className="card p-5">
            <h2 className="text-xl font-black text-slate-950">Announcements</h2>
            <div className="mt-3">{courseAnnouncements.map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}</div>
            {!courseAnnouncements.length && <p className="py-4 text-sm text-slate-500">No announcements yet.</p>}
          </section>
        </aside>
      </div>
    </div>
  );
}
