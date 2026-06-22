const dotColors ={
    material:"bg-indigo-500",
    assignment:"bg-amber-500",
    general:"bg-emerald-500",
    event:"bg-violet-500",
    schedule:"bg-sky-500",
}
export default function AnnouncementCard({ announcement }) {
    return (  
    <article className="border-b border-slate-100 py-4 last:border-0">
        <div className="flex gap-3">
            <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dotColors[announcement.category] || dotColors.general}`} />
            <div>
            <h3 className="font-black text-slate-950">{announcement.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{announcement.message}</p>
            <p className="mt-2 text-xs font-bold text-slate-400">{announcement.date}</p>
            </div>
        </div>
    </article>
    );
}