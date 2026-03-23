import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black font-sans p-8 flex items-center justify-center">
      <div className="text-center p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <h1 className="text-5xl font-extrabold text-white mb-4">Úbbs! 🛸</h1>
        <p className="mb-8 text-xl text-slate-400">Þessi frétt fannst ekki eða henni hefur verið eytt.</p>
        <Link href="/" className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-colors inline-block shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          Fara aftur á forsíðu
        </Link>
      </div>
    </main>
  );
}