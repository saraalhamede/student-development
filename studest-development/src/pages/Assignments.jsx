import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AssignmentCard from "../component/AssignmentCard.jsx";

export default function Assignments({ courses, assignments, search, toggleAssignment }) {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState("all");
  const highlightedId = Number(params.get("assignment"));

  const filteredAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return assignments.filter((assignment) => {
      const course = courses.find((item) => item.id === Number(assignment.courseId));
      const matchesSearch = !query || `${assignment.title} ${assignment.description} ${course?.title || ""}`.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || assignment.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [assignments, courses, filter, search]);

  const completed = assignments.filter((item) => item.status === "completed").length;
  const pending = assignments.length - completed;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Assignments</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Upcoming Assignments</h1>
        <p className="mt-2 text-slate-500">Review requirements, track deadlines, and update completion status.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Total</p><p className="mt-2 text-3xl font-black text-slate-950">{assignments.length}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Pending</p><p className="mt-2 text-3xl font-black text-amber-600">{pending}</p></div>
        <div className="card p-5"><p className="text-sm font-bold text-slate-500">Completed</p><p className="mt-2 text-3xl font-black text-emerald-600">{completed}</p></div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "pending", "completed"].map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-xl px-4 py-2 text-sm font-black capitalize transition ${filter === item ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"}`}>{item}</button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} course={courses.find((course) => course.id === Number(assignment.courseId))} onToggle={toggleAssignment} highlighted={assignment.id === highlightedId} />
        ))}
      </div>

      {!filteredAssignments.length && <div className="card p-10 text-center"><p className="font-black text-slate-900">No assignments match this view.</p><p className="mt-2 text-sm text-slate-500">Change the status filter or clear the search field.</p></div>}
    </div>
  );
}
