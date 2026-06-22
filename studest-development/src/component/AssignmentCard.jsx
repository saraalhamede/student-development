export default function AssignmentCard({ assignment, course , onToggle , highlighted=false}) {
    const parts = assignment.deadline.split(" ");
    const month = parts[0]?.slice(0, 3) || "Jun";
    const day = parts[1]?.replace(",", "") || "10";
    const completed = assignment.status === "completed";
    return (
        <article className={`card flex gap-4 p-5 transition hover:-translate-y-1 hover:shadow-xl ${highlighted ? "border-indigo-400 ring-4 ring-indigo-100" : ""}`}>
      <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ${completed ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"}`}>
        <span className="text-xl font-black">{day}</span>
        <span className="text-xs font-black uppercase">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-black text-slate-950">{assignment.title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-black capitalize ${completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{assignment.status}</span>
        </div>
        <p className="mt-1 text-sm font-semibold text-slate-500">{course?.title || "Course"} - {assignment.points} points</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-indigo-600">{assignment.time}</p>
          {onToggle && <button type="button" onClick={() => onToggle(assignment.id)} className={completed ? "btn-secondary px-3 py-2" : "btn-primary px-3 py-2"}>{completed ? "Reopen" : "Mark complete"}</button>}
        </div>
      </div>
    </article>
    );
}