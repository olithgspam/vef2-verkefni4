"use client";

import { useRouter } from 'next/navigation';
import { deleteNewsAction } from '@/app/skra-frett/actions';

export function DeleteNewsButton({ id, title }: { id: number, title: string }) {
  const router = useRouter();
  const ADMIN_PASSWORD = "132132";

  async function handleDelete() {
    const password = prompt(`Sláðu inn lykilorð til að eyða fréttinni: "${title}"`);

    if (password === ADMIN_PASSWORD) {
      if (confirm("Ertu viss?")) {
        const result = await deleteNewsAction(id);
        
        if (result.success) {
          alert("Frétt eytt!");
          router.push('/');
          router.refresh();
        } else {
          alert(result.error);
        }
      }
    } else if (password !== null) {
      alert("Rangt lykilorð!");
    }
  }

  return (
    <button 
      onClick={handleDelete}
      className="text-xs text-red-500/40 hover:text-red-500 transition-colors uppercase tracking-widest font-bold"
    >
      Eyða frétt 🗑️
    </button>
  );
}