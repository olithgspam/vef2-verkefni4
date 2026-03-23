"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { createNewsItem } from './actions';

export default function CreateNewsPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = title
      .toLowerCase()
      .replace(/[áàâãäå]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòôõöð]/g, "o")
      .replace(/[úùûü]/g, "u")
      .replace(/[ý]/g, "y")
      .replace(/[þ]/g, "th")
      .replace(/[æ]/g, "ae")
      .replace(/[^a-z0-9 -]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const data = {
      title: title,
      slug: slug,
      summary: formData.get('summary'),
      content: formData.get('content'),
      authorId: 1,
      category: 1
    };

    const result = await createNewsItem(data);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      e.currentTarget.reset();
    }
    
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black from-40% via-amber-500 via-50% to-black to-60% animate-liquid font-sans p-8 text-slate-200">
      <div className="max-w-2xl mx-auto mt-8">
        
        <Link href="/" className="inline-block mb-8 text-amber-500 hover:text-amber-400 transition-colors font-semibold">
          &larr; Til baka á forsíðu
        </Link>

        <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">Ert þú með frétt?</h1>
          <p className="text-slate-400 mb-8">Fylltu út formið hér að neðan til að birta nýja frétt á vefnum okkar.</p>

          {error && (
            <div className="p-4 mb-6 rounded-xl bg-red-900/50 border border-red-500 text-red-200">
              <span className="font-bold">Villa: </span>{error}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 rounded-xl bg-green-900/50 border border-green-500 text-green-200">
              Fréttin hefur verið vistuð með ágætum! 🎉
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input label="Fyrirsögn" name="title" required={true} />
            <Input label="Stuttur útdráttur" name="summary" required={true} />
            
            <div className="flex flex-col mb-6">
              <label htmlFor="content" className="mb-2 font-semibold text-slate-300">Nánari fréttatexti</label>
              <textarea 
                id="content" 
                name="content" 
                rows={5} 
                required 
                className="px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
              ></textarea>
            </div>

            <Button pending={loading}>Skrá frétt</Button>
          </form>

        </div>
      </div>
    </main>
  );
}