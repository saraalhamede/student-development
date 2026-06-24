import {useState} from "react";
import AnnouncementCard from "../component/AnnouncementCard.jsx";
import CourseCard from "../component/CourseCard.jsx";
import MaterialCard from "../component/MaterialCard.jsx";
const emptyCourse ={title: "", description: "", category:"Development", level: "Beginner", schedule:"" };
const emptyMaterial ={title: "",type:"pdf",courseId:"" , description: "",   content:""};
const emptyAnnouncement ={courseId:"",title: "", message: ""};
export default function TeacherDashboard({ user, courses, materials, announcements, addCourse, addMaterial, addAnnouncement }) {
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [materialForm, setMaterialForm] = useState(() => ({ ...emptyMaterial, courseId: String(courses[0]?.id || "") }));
  const [announcementForm, setAnnouncementForm] = useState(() => ({ ...emptyAnnouncement, courseId: String(courses[0]?.id || "") }));
  const [notice, setNotice] = useState("");

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function submitCourse(event) {
    event.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) return;
    const course = addCourse(courseForm);
    setCourseForm(emptyCourse);
    setMaterialForm((current) => ({ ...current, courseId: String(course.id) }));
    setAnnouncementForm((current) => ({ ...current, courseId: String(course.id) }));
    showNotice(`${course.title} was added successfully.`);
  }

  function submitMaterial(event) {
    event.preventDefault();
    if (!materialForm.title.trim() || !materialForm.courseId) return;
    const material = addMaterial(materialForm);
    setMaterialForm((current) => ({ ...emptyMaterial, courseId: current.courseId }));
    showNotice(`${material.title} is now visible in Materials and Recent Uploads.`);
  }

  function submitAnnouncement(event) {
    event.preventDefault();
    if (!announcementForm.title.trim() || !announcementForm.message.trim() || !announcementForm.courseId) return;
    const announcement = addAnnouncement(announcementForm);
    setAnnouncementForm((current) => ({ ...emptyAnnouncement, courseId: current.courseId }));
    showNotice(`${announcement.title} was published.`);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-soft sm:p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Teacher dashboard</p>
        <h1 className="mt-3 break-words text-2xl font-black text-slate-950 sm:text-3xl md:text-4xl">Welcome, {user.name}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Create courses, publish detailed learning resources, and keep students updated.</p>
      </section>

      {notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">{notice}</div>}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Courses</p><p className="mt-2 text-3xl font-black text-slate-950">{courses.length}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Materials</p><p className="mt-2 text-3xl font-black text-indigo-600">{materials.length}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Announcements</p><p className="mt-2 text-3xl font-black text-violet-600">{announcements.length}</p></div>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <section className="card p-4 sm:p-5">
            <h2 className="mb-5 text-xl font-black text-slate-950">Course Management</h2>
            <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">{courses.slice(0, 6).map((course) => <CourseCard key={course.id} course={course} />)}</div>
          </section>
          <section className="card px-4 sm:px-5">
            <h2 className="border-b border-slate-100 py-4 text-xl font-black text-slate-950">Recent Uploads</h2>
            {materials.slice(0, 6).map((material) => <MaterialCard key={material.id} material={material} course={courses.find((course) => course.id === Number(material.courseId))} />)}
          </section>
          <section className="card p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">Latest Announcements</h2>
            <div className="mt-3">{announcements.slice(0, 4).map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}</div>
          </section>
        </div>

        <aside className="space-y-6">
          <form onSubmit={submitCourse} className="card p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">Add New Course</h2>
            <div className="mt-4 space-y-4">
              <input required className="input" placeholder="Course title" value={courseForm.title} onChange={(event) => setCourseForm({ ...courseForm, title: event.target.value })} />
              <textarea required className="input min-h-24 resize-none" placeholder="Course description" value={courseForm.description} onChange={(event) => setCourseForm({ ...courseForm, description: event.target.value })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <select className="input" value={courseForm.category} onChange={(event) => setCourseForm({ ...courseForm, category: event.target.value })}><option>Development</option><option>Science</option><option>Languages</option><option>Design</option><option>Skills</option></select>
                <select className="input" value={courseForm.level} onChange={(event) => setCourseForm({ ...courseForm, level: event.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All levels</option></select>
              </div>
              <input className="input" placeholder="Schedule, e.g. Mon 17:00" value={courseForm.schedule} onChange={(event) => setCourseForm({ ...courseForm, schedule: event.target.value })} />
              <button className="btn-primary w-full">Add Course</button>
            </div>
          </form>

          <form onSubmit={submitMaterial} className="card p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">Upload Material</h2>
            <div className="mt-4 space-y-4">
              <select required className="input" value={materialForm.courseId} onChange={(event) => setMaterialForm({ ...materialForm, courseId: event.target.value })}><option value="">Choose course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select>
              <input required className="input" placeholder="Material title" value={materialForm.title} onChange={(event) => setMaterialForm({ ...materialForm, title: event.target.value })} />
              <select className="input" value={materialForm.type} onChange={(event) => setMaterialForm({ ...materialForm, type: event.target.value })}><option value="pdf">PDF</option><option value="doc">Document</option><option value="image">Image</option><option value="video">Video</option></select>
              <textarea className="input min-h-20 resize-none" placeholder="Short description" value={materialForm.description} onChange={(event) => setMaterialForm({ ...materialForm, description: event.target.value })} />
              <textarea className="input min-h-20 resize-none" placeholder="Study instructions" value={materialForm.content} onChange={(event) => setMaterialForm({ ...materialForm, content: event.target.value })} />
              <button className="btn-primary w-full">Upload Material</button>
            </div>
          </form>

          <form onSubmit={submitAnnouncement} className="card p-4 sm:p-5">
            <h2 className="text-xl font-black text-slate-950">Post Announcement</h2>
            <div className="mt-4 space-y-4">
              <select required className="input" value={announcementForm.courseId} onChange={(event) => setAnnouncementForm({ ...announcementForm, courseId: event.target.value })}><option value="">Choose course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select>
              <input required className="input" placeholder="Announcement title" value={announcementForm.title} onChange={(event) => setAnnouncementForm({ ...announcementForm, title: event.target.value })} />
              <textarea required className="input min-h-24 resize-none" placeholder="Message for students" value={announcementForm.message} onChange={(event) => setAnnouncementForm({ ...announcementForm, message: event.target.value })} />
              <button className="btn-secondary w-full">Publish Announcement</button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );    
}
