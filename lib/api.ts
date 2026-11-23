

import type { Tuition } from "@/types/tuition";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getTuitions(): Promise<Tuition[]> {
  const res = await fetch(`${API_URL}/tuitions`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tuitions: ${res.status}`);
  }

  return res.json();
}

export async function getTuitionById(
  id: string
): Promise<Tuition> {
  const res = await fetch(
    `${API_URL}/tuitions/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(
      `Tuition API Error: ${res.status} ${errorText}`
    );
  }

  return res.json();
}
