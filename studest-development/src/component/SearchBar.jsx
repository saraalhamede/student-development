export default function SearchBar({ value, onChange, onClear,placeholder = "Search courses, materials, assignments..." }) {
    return (
            <label className="relative block w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-indigo-500">Q</span>
                <input
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="input pl-10 pr-11 sm:pl-11 sm:pr-12"
                    aria-label={placeholder}
                />   
                {
                    value && (
                        <button
                            type="button"
                            onClick={onClear || (()=> onChange(""))} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 text-xs font-black text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Clear search">
                            X
                        </button>
                    )
                }             
            </label>
    );
}
