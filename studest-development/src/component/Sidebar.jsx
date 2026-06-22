import {Link, NavLink} from "react-router-dom";
export default function Sidebar({user, onLogout}){
    const dashboardPath = user?.role === "teacher" ? "/teacher" : "/student";
    const links =[
        { label: "Dashboard", path: dashboardPath, icon: "D" },
        { label: "Courses", path: "/courses", icon: "C" },
        { label: "Material", path: "/material", icon: "M" },
        { label: "Assignments", path: "/assignments", icon: "A" },
        { label: "Profile", path: "/profile", icon: "P" },
    ];
    return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
        <Link to={dashboardPath} className="flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-indigo-50" aria-label="Go to dashboard">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-200">SD</div>
            <div className="text-lg font-black leading-5 text-slate-950">
            <p>Student</p>
            <p>Development</p>
            </div>
        </Link>

        <nav className="mt-10 space-y-2">
            {links.map((link) => (
            <NavLink
                key={link.path}
                to={link.path}
                end={link.path === dashboardPath}
                className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition active:scale-[0.98] ${
                    isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`
                }
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-xs font-black text-indigo-700 shadow-sm">{link.icon}</span>
                {link.label}
            </NavLink>
            ))}
        </nav>
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 p-5">
            <p className="font-black text-indigo-700">Learning center</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Courses, materials, assignments, and updates in one connected dashboard.</p>
        </div>

        <button onClick={onLogout} className="btn-secondary mt-auto w-full shrink-0">Logout</button>
        </aside>
    )
}
