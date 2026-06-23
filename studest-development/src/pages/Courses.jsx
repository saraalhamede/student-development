import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";

export default function Courses({ courses, search }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(courses.map((course) => course.category))];

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch = !query || `${course.title} ${course.teacher} ${course.description} ${course.category} ${course.level}`.toLowerCase().includes(query);
      const matchesCategory = category === "All" || course.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, courses, search]);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Courses</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Explore Courses</h1>
        <p className="mt-2 text-slate-500">Browse active learning paths and open a connected course workspace.</p>
      </section>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${category === item ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"}`}>{item}</button>)}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div>
      {!filteredCourses.length && <div className="card p-10 text-center"><p className="font-black text-slate-900">No courses found.</p><p className="mt-2 text-sm text-slate-500">Try another category or clear the search field.</p></div>}
    </div>
  );
}