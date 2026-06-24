import { useState } from "react";

export default function Settings({ user, updateProfile }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(user);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    updateProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), location: form.location.trim(), bio: form.bio.trim(), notifications: form.notifications });
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function cancelEdit() {
    setForm(user);
    setEditing(false);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Profile</p>
          <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">Account Settings</h1>
          <p className="mt-2 text-slate-500">Update your information and save it locally.</p>
        </div>
        {!editing && <button type="button" onClick={() => setEditing(true)} className="btn-primary">Edit profile</button>}
      </section>

      {saved && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">Profile saved successfully.</div>}

      <form onSubmit={handleSave} className="grid min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section className="card p-4 sm:p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-2xl font-black text-indigo-700">{form.name.slice(0, 2).toUpperCase()}</div>
          <h2 className="mt-4 break-words text-2xl font-black text-slate-950">{form.name}</h2>
          <p className="mt-1 break-words text-sm text-slate-500">{form.email}</p>
          <p className="mt-4 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-black capitalize text-indigo-700">{form.role}</p>
          <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
            <p>{form.location || "Location not added"}</p>
            <p className="mt-2">{form.phone || "Phone not added"}</p>
          </div>
        </section>

        <section className="card p-4 sm:p-6">
          <h2 className="text-xl font-black text-slate-950">Personal information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold text-slate-700">Full name<input name="name" value={form.name} onChange={updateField} disabled={!editing} className="input mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>
            <label className="text-sm font-bold text-slate-700">Email<input name="email" type="email" value={form.email} onChange={updateField} disabled={!editing} className="input mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>
            <label className="text-sm font-bold text-slate-700">Phone<input name="phone" value={form.phone || ""} onChange={updateField} disabled={!editing} className="input mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>
            <label className="text-sm font-bold text-slate-700">Location<input name="location" value={form.location || ""} onChange={updateField} disabled={!editing} className="input mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>
            <label className="text-sm font-bold text-slate-700 md:col-span-2">Bio<textarea name="bio" value={form.bio || ""} onChange={updateField} disabled={!editing} className="input mt-2 min-h-28 resize-none disabled:bg-slate-50 disabled:text-slate-500" /></label>
          </div>

          <label className="mt-5 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span><span className="block font-black text-slate-900">Notifications</span><span className="mt-1 block text-sm text-slate-500">Receive reminders for materials and assignments.</span></span>
            <input name="notifications" type="checkbox" checked={Boolean(form.notifications)} onChange={updateField} disabled={!editing} className="h-5 w-5 accent-indigo-600" />
          </label>

          {editing && <div className="mt-6 flex flex-wrap gap-3"><button className="btn-primary">Save changes</button><button type="button" onClick={cancelEdit} className="btn-secondary">Cancel</button></div>}
        </section>
      </form>
    </div>
  );
}
