export default function Loading() {
  const skeletonArticles = [1, 2, 3, 4];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black from-40% via-amber-500 via-50% to-black to-60% animate-liquid font-sans p-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-20 mt-8">
          <div className="h-12 w-64 bg-white/10 animate-pulse mx-auto rounded-lg relative inline-block">
            <span className="absolute -bottom-4 left-1/4 w-1/2 h-1.5 bg-amber-500/50 rounded-full"></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skeletonArticles.map((id) => (
            <div key={id} className="
                p-8 rounded-3xl border border-white/5
                bg-white/5 backdrop-blur-xl
                shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
            ">
              <div className="h-8 bg-white/10 rounded w-3/4 mb-4 animate-pulse"></div>
              
              <div className="space-y-3 my-4">
                <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse"></div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400/30 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </main>
  );
}