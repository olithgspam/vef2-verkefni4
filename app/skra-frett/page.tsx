"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { createNewsItem } from './actions';

export default function CreateNewsPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await fetch('https://verkefni.gold/authors');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAuthors(data);
      } catch (err) {
        console.log("CORS eða tengivilla, sýnum prufu höfund");
        setAuthors([{id: 1, name: "Aðalhöfundur"}]); 
      }
    }
    fetchAuthors();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(form);
    const title = formData.get('title') as string;

    const slug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const data = {
      title: title,
      slug: slug,
      summary: formData.get('summary'),
      content: formData.get('content'),
      authorId: Number(formData.get('authorId')) || 1,
    };

    const result = await createNewsItem(data);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      form.reset();
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black p-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-amber-500 mb-8 inline-block font-bold">← Forsíða</Link>
        
        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold text-white mb-6">Skrá nýja frétt</h1>

          {success && <div className="p-4 mb-6 bg-green-900/50 border border-green-500 rounded-xl text-green-200 text-center font-bold">Vistun tókst! 🚀</div>}
          {error && <div className="p-4 mb-6 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Höfundur</label>
              <div className="flex gap-2">
                <select name="authorId" required className="flex-1 p-3 rounded-xl bg-black border border-white/20 text-white">
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <Link href="/hofundar" className="p-3 border border-amber-500 text-amber-500 rounded-xl font-bold">+ Nýr</Link>
              </div>
            </div>

            <Input label="Fyrirsögn" name="title" required />
            <Input label="Útdráttur" name="summary" required />
            <div className="flex flex-col mb-8">
              <label className="mb-2 font-semibold">Frétt</label>
              <textarea name="content" rows={5} required className="p-4 rounded-xl bg-black border border-white/20 text-white focus:border-amber-500 outline-none"></textarea>
            </div>

            <Button pending={loading}>Skrá frétt strax</Button>
          </form>
        </div>
      </div>
    </main>
  );
}