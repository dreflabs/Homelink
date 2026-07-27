"use server";

import prisma from "@/lib/prisma";

export async function generatePropertyEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY belum dikonfigurasi. Generasi vector embedding dinonaktifkan.");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI Embedding API error: ${errorData?.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

export async function semanticSearch(query: string) {
  if (!query.trim()) {
    return { data: [], message: "Kata kunci pencarian kosong." };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      data: [],
      message: "Fitur AI Semantic Search sedang disiapkan (OPENAI_API_KEY belum dikonfigurasi).",
    };
  }

  try {
    const queryEmbedding = await generatePropertyEmbedding(query);
    const vectorStr = `[${queryEmbedding.join(",")}]`;

    const dbResults: any[] = await prisma.$queryRaw`
      SELECT id, title, price, address, status
      FROM "Property"
      WHERE "isDeleted" = false AND status = 'PUBLISHED' AND embedding IS NOT NULL
      ORDER BY embedding <-> ${vectorStr}::vector
      LIMIT 10;
    `;

    return { data: dbResults };
  } catch (error: any) {
    console.error("AI Semantic Search error:", error);
    return { data: [], error: "Gagal melakukan pencarian AI. Silakan coba lagi nanti." };
  }
}
