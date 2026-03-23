"use server"; 

export async function createNewsItem(data: any) {
  console.log("Sendi gögn:", data);

  try {
    const res = await fetch('https://verkefni.gold/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      
      
      console.log("API VILLU SVAR:", JSON.stringify(errData, null, 2));
      
      let errorMessage = errData.error || 'Ógild gögn.';
      if (errData.errors && Array.isArray(errData.errors)) {
        errorMessage = `Villa: ${errData.errors.map((e: any) => e.message || e.msg).join(", ")}`;
      }

      return { error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Tenging við vefþjón rofnaði.' };
  }
}