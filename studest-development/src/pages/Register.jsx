import {Link, useNavigate} from "react-router-dom";
export default function Register({onLogin}){
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email").trim();
        const name = formData.get("name").trim();
        const role = formData.get("role");
        const user = onLogin({ email,name, role });
        navigate(user.role === "teacher" ? "/teacher" : "/student");
    }
   

return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <form onSubmit={handleSubmit} className="card w-full max-w-md p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white">SD</div>
          <div className="text-xl font-black leading-6 text-slate-950">
            <p>Student</p>
            <p>Development</p>
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-950">Create account</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">This is a fake local account for the simple project version.</p>
        <div className="mt-6 space-y-4">
          <input name="name" required className="input" placeholder="Full name" />
          <input name="email" type="email" required className="input" placeholder="you@example.com" />
          <select name="role" className="input" defaultValue="student">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button className="btn-primary w-full">Register</button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">
          Already registered? <Link to="/login" className="font-black text-indigo-600">Login</Link>
        </p>
      </form>
    </main>
  );
}