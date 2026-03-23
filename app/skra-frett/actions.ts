"use server";
import { revalidatePath } from 'next/cache';

const API_URL = 'https://verkefni.gold';

export async function fetchAuthorsAction() {
  try {
    const res = await fetch(`${API_URL}/authors`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    
    if (json && json.data && Array.isArray(json.data)) {
      return json.data;
    }
    
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Villa við að sækja höfunda:", err);
    return [];
  }
}

export async function createAuthorAction(name: string, email: string) {
  try {
    const res = await fetch(`${API_URL}/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Villa (höfundur):", errorData);
      return { success: false, error: errorData.error || "API hafnaði skráningu" };
    }

    return { success: true };
  } catch (err) {
    console.error("Tengingarvilla:", err);
    return { success: false, error: "Náði ekki sambandi við vefþjón" };
  }
}

export async function createNewsItem(data: any) {
  try {
    const res = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || "Ógild gögn" };
    }

    revalidatePath('/');
    return { success: true };
  } catch (err) {
    return { error: "Tengingarvilla" };
  }
}


export async function deleteAuthorAction(id: number) {
  try {
    const res = await fetch(`${API_URL}/authors/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return { success: false, error: "API neitaði að eyða" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Tengingarvilla" };
  }
}

export async function deleteNewsAction(id: number) {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) return { success: false, error: "API neitaði að eyða frétt" };

    revalidatePath('/');
    return { success: true };
  } catch (err) {
    return { success: false, error: "Tengingarvilla" };
  }
}