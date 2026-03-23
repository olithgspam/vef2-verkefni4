export function Button({ children, pending }: { children: React.ReactNode, pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-4 px-8 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 disabled:bg-slate-600 disabled:text-slate-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.4)]"
    >
      {pending ? "Sendi inn..." : children}
    </button>
  );
}