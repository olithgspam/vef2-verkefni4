export function Input({ label, name, type = "text", required = false }: { label: string, name: string, type?: string, required?: boolean }) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} className="mb-2 font-semibold text-slate-300">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className="px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-600"
      />
    </div>
  );
}