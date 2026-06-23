import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MaterialCard from "../component/MaterialCard.jsx";
import SearchBar from "../component/SearchBar.jsx";

const REVIEWED_KEY = "student-development-reviewed-materials";

export default function Materials({ courses, materials, search, setSearch }) {
  const [params, setParams] = useSearchParams();
  const [reviewedIds, setReviewedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(REVIEWED_KEY)) || [];
    } catch {
      return [];
    }
  });

  const filteredMaterials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return materials;
    return materials.filter((material) => {
      const course = courses.find((item) => item.id === Number(material.courseId));
      return `${material.title} ${material.description} ${material.author} ${material.type} ${course?.title || ""}`.toLowerCase().includes(query);
    });
  }, [courses, materials, search]);

  const requestedId = Number(params.get("material"));
  const selectedMaterial = materials.find((item) => item.id === requestedId) || filteredMaterials[0];
  const selectedCourse = courses.find((item) => item.id === Number(selectedMaterial?.courseId));
  const isReviewed = selectedMaterial ? reviewedIds.includes(selectedMaterial.id) : false;

  function toggleReviewed() {
    if (!selectedMaterial) return;
    const nextIds = isReviewed ? reviewedIds.filter((id) => id !== selectedMaterial.id) : [...reviewedIds, selectedMaterial.id];
    setReviewedIds(nextIds);
    localStorage.setItem(REVIEWED_KEY, JSON.stringify(nextIds));
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Materials</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Learning Materials</h1>
          <p className="mt-2 text-slate-500">Open resources, review details, and keep track of what you studied.</p>
        </div>
        <div className="w-full max-w-md"><SearchBar value={search} onChange={setSearch} placeholder="Filter materials..." /></div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="card px-5">
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} course={courses.find((course) => course.id === Number(material.courseId))} />
          ))}
          {!filteredMaterials.length && <div className="py-12 text-center"><p className="font-black text-slate-900">No materials found</p><p className="mt-2 text-sm text-slate-500">Try a course name, teacher, type, or resource title.</p></div>}
        </section>

        <aside className="card h-fit p-6 xl:sticky xl:top-28">
          {selectedMaterial ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black uppercase text-indigo-700">{selectedMaterial.type}</span>
                  <h2 className="mt-4 text-2xl font-black text-slate-950">{selectedMaterial.title}</h2>
                </div>
                {requestedId ? <button type="button" onClick={() => setParams({})} className="btn-secondary px-3 py-2">Close</button> : null}
              </div>
              <p className="mt-3 text-sm font-bold text-indigo-600">{selectedCourse?.title} - {selectedMaterial.author}</p>
              <p className="mt-4 leading-7 text-slate-600">{selectedMaterial.description}</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Study instructions</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedMaterial.content}</p>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-100 p-3"><dt className="text-slate-400">Uploaded</dt><dd className="mt-1 font-black text-slate-800">{selectedMaterial.date}</dd></div>
                <div className="rounded-2xl border border-slate-100 p-3"><dt className="text-slate-400">Size</dt><dd className="mt-1 font-black text-slate-800">{selectedMaterial.size}</dd></div>
                <div className="rounded-2xl border border-slate-100 p-3"><dt className="text-slate-400">Study time</dt><dd className="mt-1 font-black text-slate-800">{selectedMaterial.duration}</dd></div>
                <div className="rounded-2xl border border-slate-100 p-3"><dt className="text-slate-400">Status</dt><dd className={`mt-1 font-black ${isReviewed ? "text-emerald-600" : "text-amber-600"}`}>{isReviewed ? "Reviewed" : "Not reviewed"}</dd></div>
              </dl>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={toggleReviewed} className="btn-primary flex-1">{isReviewed ? "Mark unread" : "Mark reviewed"}</button>
                <Link to={`/courses/${selectedMaterial.courseId}`} className="btn-secondary">Course</Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a material to view its details.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
