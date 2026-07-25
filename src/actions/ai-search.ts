"use server";

export async function generatePropertyEmbedding(text: string): Promise<number[]> {
  // Mock embedding generation (e.g., calling OpenAI API)
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return dummy 1536-dimensional array
  return Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
}

export async function semanticSearch(query: string) {
  // Mock semantic search
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Dummy data returning property list based on semantic "magic"
  const mockResults = [
    {
      id: "ai-1",
      title: "Rumah Modern Minimalis Dekat MRT (AI Pick)",
      price: 1950000000,
      address: "Lebak Bulus, Jakarta Selatan",
      specs: { bed: 3, bath: 2, area: 120 },
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      isVerified: true,
      isFeatured: true,
    },
    {
      id: "ai-2",
      title: "Townhouse Exclusive Akses Tol 5 Menit",
      price: 2100000000,
      address: "Bintaro, Tangerang Selatan",
      specs: { bed: 4, bath: 3, area: 150 },
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      isVerified: true,
      isFeatured: false,
    },
    {
      id: "ai-3",
      title: "Rumah Nyaman Cocok untuk Keluarga Muda",
      price: 1800000000,
      address: "Serpong, Tangerang",
      specs: { bed: 2, bath: 1, area: 90 },
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      isVerified: false,
      isFeatured: false,
    },
  ];

  // If query is empty, maybe return empty or the default set
  if (!query.trim()) {
    return { data: [] };
  }

  return { data: mockResults };
}
