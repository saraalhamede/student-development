export default function SearchBar({ value, onChange, onClear,placeholder = "Search courses, materials, assignments..." }) {
    return (
            <label className="relative block w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-indigo-500">Q</span>
                
            </label>
    );
}