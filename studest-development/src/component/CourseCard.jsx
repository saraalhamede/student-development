import {Link } from "react-router-dom";
const styles ={
    indigo:"from-indigo-50 to-indigo-100 text-indigo-700 bg-indigo-600",
    blue:"from-blue-50 to-blue-100 text-blue-700 bg-blue-600",
    emerald:"from-emerald-50 to-emerald-100 text-emerald-700 bg-emerald-500",
    violet:"from-violet-50 to-violet-100 text-violet-700 bg-violet-600",
    rose:"from-rose-50 to-rose-100 text-rose-700 bg-rose-500",
    amber:"from-amber-50 to-amber-100 text-amber-700 bg-amber-500",
}
export default function CourseCard({ course }) {
   const styleString = styles[course.color] || styles.indigo;
   const [fromClass, toClass, textClass, barClass] = styleString.split(" ");

return (
    <Link to={`/courses/${course.id}`} className="card group block overflow-hidden transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl active:scale-[0.99]">
      <div className={`bg-gradient-to-br ${fromClass} ${toClass} p-5 ${textClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-xl font-black shadow-sm">{course.title.slice(0, 2).toUpperCase()}</div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black">{course.category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-700">{course.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{course.teacher}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700">{course.materialsCount} materials</span>
          <span className="font-black text-slate-700">{course.progress}%</span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${barClass}`} style={{ width: `${course.progress}%` }} /></div>
      </div>
    </Link>
  );
}

