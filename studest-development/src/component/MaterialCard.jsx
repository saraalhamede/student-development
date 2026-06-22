import { Link } from "react-router-dom";

export default function MaterialCard({ material, course }) {
  const typeStyle = {
    pdf: "bg-rose-50 text-rose-600",
    doc: "bg-amber-50 text-amber-600",
    image: "bg-sky-50 text-sky-600",
    video: "bg-violet-50 text-violet-600",
  }[material.type] || "bg-slate-50 text-slate-600";

  return (
    <article className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-black uppercase ${typeStyle}`}>{material.type}</div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-black text-slate-950">{material.title}</h3>
        <p className="mt-1 truncate text-sm text-slate-500">{course?.title || "Course"} - {material.author}</p>
      </div>
      <p className="hidden text-sm text-slate-500 md:block">{material.date}</p>
      <Link to={`/materials?material=${material.id}`} className="btn-secondary px-3 py-2">Open</Link>
    </article>
  );
}

