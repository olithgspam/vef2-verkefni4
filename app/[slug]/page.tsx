import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteNewsButton } from '@/components/DeleteNewsButton';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const res = await fetch(`https://verkefni.gold/articles/${slug}`, { 
    cache: 'no-store'
  });

  if (!res.ok) {
    notFound();
  }

  const article = await res.json();

  return (
    <main className="min-h-screen bg-black p-4 md:p-12 text-slate-200 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <Link 
          href="/" 
          className="inline-block mb-10 text-amber-500 hover:text-amber-400 transition-colors font-bold group"
        >
          <span className="group-hover:-translate-x-1 inline-block transition-transform">&larr;</span> Til baka á forsíðu
        </Link>

        <article className="p-8 md:p-16 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
          
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-md">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 font-bold uppercase tracking-wider text-[10px]">
                Frétt
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <p>ID: {article.id}</p>
            </div>
          </header>

          <div className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-10 border-l-4 border-amber-500 pl-6 italic">
            {article.summary}
          </div>

          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-lg text-slate-400 leading-loose whitespace-pre-line">
              {article.content}
            </p>
          </div>

          <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-xs italic">
              Birt á vefnum okkar þann {new Date().toLocaleDateString('is-IS')}
            </div>
            
            <DeleteNewsButton id={article.id} title={article.title} />
          </footer>

        </article>

        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
      </div>
    </main>
  );
}