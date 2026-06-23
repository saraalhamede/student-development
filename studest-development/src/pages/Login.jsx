import {Link, useNavigate} from "react-router-dom";
export default function Login({onLogin}){
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email").trim();
        const name = formData.get("name").trim() || email.split("@")[0];
        const user = onLogin({ email,name });
        navigate(user.role === "teacher" ? "/teacher" : "/student");
    }
    return (
        <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_0.9fr]">
            <section className="flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-200">SD</div>
                    <div className="text-xl font-black leading-6 text-slate-950">
                    <p>Student</p>
                    <p>Development</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="card p-7">
                    <h1 className="text-3xl font-black text-slate-950">Welcome back</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Login with any email. If it contains teacher, you enter as a teacher.</p>
                    <div className="mt-6 space-y-4">
                    <input name="name" className="input" placeholder="Your name" defaultValue="Sara Alhamede" />
                    <input name="email" type="email" required className="input" placeholder="student@demo.com" defaultValue="student@demo.com" />
                    <button className="btn-primary w-full">Login</button>
                    </div>
                    <p className="mt-5 text-center text-sm text-slate-500">
                    New account? <Link to="/register" className="font-black text-indigo-600">Register</Link>
                    </p>
                </form>
                </div>
            </section>

            <section className="hidden bg-indigo-600 p-10 text-white lg:block">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl shadow-indigo-900/20">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-100">Education Center</p>
                    <h2 className="mt-5 max-w-xl text-5xl font-black leading-tight">A simple, polished dashboard for students and teachers.</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {['Courses', 'Materials', 'Progress'].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/15 p-4">
                        <p className="text-2xl font-black">{item.slice(0, 2)}</p>
                        <p className="mt-2 text-sm text-indigo-100">{item}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>
        </main>
    );

}
