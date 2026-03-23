import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const res = await fetch(`https://verkefni.gold/articles/${slug}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    notFound();
  }

  const article = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black from-40% via-amber-500 via-50% to-black to-60% animate-liquid font-sans p-8 text-slate-200">
      <div className="max-w-3xl mx-auto mt-8">
        
        <Link href="/" className="inline-block mb-8 text-amber-500 hover:text-amber-400 transition-colors font-semibold">
          &larr; Til baka á forsíðu
        </Link>

        <article className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
            <p className="text-slate-400">
              Eftir <span className="font-bold text-amber-400">{article.author?.name}</span>
            </p>
          </div>

          <p className="text-xl text-slate-300 font-medium mb-10 leading-relaxed italic">
            {article.summary}
          </p>

          <div className="text-slate-200 leading-loose text-lg whitespace-pre-wrap">
            {article.content}
          </div>
        </article>

      </div>
    </main>
  );
}