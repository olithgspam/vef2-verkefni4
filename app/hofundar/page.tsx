"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { fetchAuthorsAction, createAuthorAction, deleteAuthorAction } from '../skra-frett/actions';


export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const ADMIN_PASSWORD = "132132"; 

  async function loadData() {
    const data = await fetchAuthorsAction();
    setAuthors(Array.isArray(data) ? data : []);
  }

  useEffect(() => { 
    loadData(); 
  }, []);

  async function handleCreateAuthor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const result = await createAuthorAction(name, email);
    
    if (result && result.success) {
      form.reset();
      await loadData();
    } else {
      alert(result?.error || "Villa kom upp við skráningu.");
    }
    setLoading(false);
  }

  async function handleDelete(id: number, name: string) {
    const password = prompt(`Lykilorð til að eyða ${name}:`);
    
    if (password === ADMIN_PASSWORD) {
      if (confirm(`Ertu viss um að þú viljir eyða höfundinum ${name}?`)) {
        const result = await deleteAuthorAction(id);
        
        if (result.success) {
          alert("Höfundi eytt!");
          await loadData();
        } else {
          alert(result.error);
        }
      }
    } else if (password !== null) {
      alert("Vitlaust lykilorð!");
    }
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-amber-500 mb-8 inline-block font-bold hover:underline">
          &larr; Forsíða
        </Link>
        
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-white to-amber-500 bg-clip-text text-transparent italic">
          Umsjón höfunda
        </h1>

        <form onSubmit={handleCreateAuthor} className="mb-12 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
          <h2 className="text-xl mb-6 font-semibold text-amber-500">Skrá nýjan höfund</h2>
          <Input label="Fullt nafn" name="name" required />
          <Input label="Netfang" name="email" type="email" required />
          <Button pending={loading}>Bæta við höfundi</Button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Skráðir höfundar</h2>
          
          {Array.isArray(authors) && authors.length > 0 ? (
            authors.map(a => (
              <div key={a.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-all">
                <div>
                  <p className="font-bold text-lg">{a.name}</p>
                  <p className="text-sm text-slate-400">{a.email}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-600 italic font-mono">ID: {a.id}</span>
                  <button 
                    onClick={() => handleDelete(a.id, a.name)}
                    className="px-3 py-1.5 bg-red-900/20 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold"
                  >
                    Eyða
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic p-4 border border-dashed border-white/10 rounded-xl text-center">
              Engir höfundar fundust eða API er sofandi...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}