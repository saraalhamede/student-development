

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

export default function Header({ user, search, setSearch, courses, materials, assignments, onLogout }) {
  const query = search.trim().toLowerCase();
  const results = query
    ? [
        ...courses.filter((item) => `${item.title} ${item.teacher} ${item.category}`.toLowerCase().includes(query)).slice(0, 3).map((item) => ({ id: `course-${item.id}`, label: item.title, meta: `Course - ${item.teacher}`, to: `/courses/${item.id}` })),
        ...materials.filter((item) => `${item.title} ${item.description} ${item.author}`.toLowerCase().includes(query)).slice(0, 3).map((item) => ({ id: `material-${item.id}`, label: item.title, meta: `Material - ${item.type.toUpperCase()}`, to: `/materials?material=${item.id}` })),
        ...assignments.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(query)).slice(0, 3).map((item) => ({ id: `assignment-${item.id}`, label: item.title, meta: `Assignment - ${item.deadline}`, to: `/assignments?assignment=${item.id}` })),
      ].slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-2xl">
          <SearchBar value={search} onChange={setSearch} />
          {query && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {results.length ? (
                results.map((result) => (
                  <Link key={result.id} to={result.to} onClick={() => setSearch("")} className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 transition last:border-0 hover:bg-indigo-50">
                    <span className="font-bold text-slate-900">{result.label}</span>
                    <span className="text-xs font-semibold text-slate-400">{result.meta}</span>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-5 text-sm text-slate-500">No courses, materials, or assignments match your search.</p>
              )}
            </div>
          )}
        </div>

        <button type="button" onClick={onLogout} className="btn-secondary ml-auto shrink-0 px-3 py-2 lg:hidden">Logout</button>
        <Link to="/settings" className="hidden items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-indigo-50 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-black text-indigo-700">{user?.name?.slice(0, 2).toUpperCase()}</div>
          <div>
            <p className="text-sm font-black text-slate-950">{user?.name}</p>
            <p className="text-xs capitalize text-slate-500">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}


