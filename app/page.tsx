import Link from 'next/link';
export default async function Home() {
  const res = await fetch('https://verkefni.gold/articles', {
    cache: 'no-store'
  });
  
  const data = await res.json();
  const articles = data.data; 

  return (
    <main className="min-h-screen bg-gradient-to-br from-black from-40% via-amber-500 via-50% to-black to-60% animate-liquid font-sans p-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-20 mt-8">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl font-extrabold text-white relative inline-block drop-shadow-lg mb-8">
            Nýjustu fréttir
            <span className="absolute -bottom-4 left-1/4 w-1/2 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
          </h1>
          <br />
          <Link href="/skra-frett" className="inline-block px-8 py-3 rounded-full bg-white/10 border border-amber-500/50 text-amber-500 font-bold hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] backdrop-blur-md">
            Ert þú með frétt? Skrifaðu hana hér!
          </Link>
        </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article: any) => (
            <Link href={`/${article.slug}`} key={article.id} className="
                p-8 rounded-3xl border border-white/10
                bg-white/5 backdrop-blur-xl
                shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/30
            ">
              <h2 className="text-2xl font-semibold text-white mb-4">{article.title}</h2>
              <p className="text-slate-300 my-4 leading-relaxed">{article.summary}</p>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  Höfundur: <span className="font-bold text-amber-400">{article.author?.name}</span>
                </p>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </main>
  );
}